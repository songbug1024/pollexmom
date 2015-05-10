/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var _ = require('underscore');
var Settings = require('../settings.json');
var View = require('../base/view');
var ShoppingCartItemCollection = require('../collections/shopping-cart-item');
var ShoppingCartItemView = require('./shopping-cart-item');
var template = require('../templates/shopping-cart-items.tpl');

module.exports = View.extend({
  name: 'ShoppingCartItemList',
  className: 'shopping-cart-item-list',
  template: _.template(template),
  initialize: function () {
    this.collection = new ShoppingCartItemCollection(this.model.get('items'));

    this.listenTo(this.model, 'change:checkPrice', this.renderCheckPrice);
    this.listenTo(this.model, 'change:amountPrice', this.renderAmountPrice);
  },
  render: function () {
    var self = this;
    this.model.resetAmountPrice();

    this.$el.empty();
    this.$el.html(this.template(this.model.attributes));

    var collection = this.collection;
    var mainEl = this.$el.find('.gwc_main');
    if (collection && collection.length > 0) {

      _.each(collection.models, function (model) {
        self.listenTo(model, 'change:count', self.resetCountHandler);
        mainEl.append(new ShoppingCartItemView({model: model}).render().el);
      });

    }
    return this;
  },
  renderCheckPrice: function (model, value) {
    this.$el.find('.gwc_hj span').text(value);
  },
  renderAmountPrice: function (model, value) {
    this.$el.find('.gwc_amount span').text(value);
  },
  resetCountHandler: function (model, count) {
    var items = this.model.get('items');
    var existedItem = _.findWhere(items, {id: model.id});
    if (existedItem) {
      existedItem.count = count;
    }
    this.model.set('items', items);

    this.model.resetAmountPrice();
    localStorage.setItem(Settings.locals.userShoppingCart, JSON.stringify(this.model.toJSON()));
  }
});