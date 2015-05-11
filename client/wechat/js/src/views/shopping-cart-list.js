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
  events: {
    'click .select-all': 'selectAllEvent',
    'click .create-order-btn': 'createOrderEvent'
  },
  initialize: function () {
    this.selectAllChecked = false;
    this.collection = new ShoppingCartItemCollection(this.model.get('items'));

    this.listenTo(this.model, 'change:checkedPrice', this.renderCheckedPrice);
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
        self.listenTo(model, 'change:checked', self.checkedChangeHandler);
        model.listenTo(self, 'selectAllChanged', function (checked) {
          this.set('checked', checked);
        });
        mainEl.append(new ShoppingCartItemView({model: model}).render().el);
      });

    }
    return this;
  },
  renderCheckedPrice: function (model, value) {
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
  },
  checkedChangeHandler: function(model, checked) {
    if (!checked) {
      this.$el.find('.select-all').removeClass('dx_sel_active').addClass('dx_sel');
    }
    this.resetCheckedPrice();
  },
  resetCheckedPrice: function () {
    var checkedModels = this.collection.where({checked: true});
    var amount = 0;
    if (checkedModels && checkedModels.length > 0) {
      _.each(checkedModels, function (model) {
        amount += model.get('price') * model.get('count');
      });
    }
    this.model.set('checkedPrice', amount);

    if (checkedModels.length === this.collection.length) {
      this.selectAllChecked = true;
      this.resetSelectAll();
    }
  },
  selectAllEvent: function () {
    this.selectAllChecked = !this.selectAllChecked;
    this.resetSelectAll();
  },
  resetSelectAll: function () {
    if (this.selectAllChecked) {
      this.$el.find('.select-all').removeClass('dx_sel').addClass('dx_sel_active');
    } else {
      this.$el.find('.select-all').removeClass('dx_sel_active').addClass('dx_sel');
    }
    this.trigger('selectAllChanged', this.selectAllChecked);
  },
  createOrderEvent: function () {
    var checkedModels = this.collection.where({checked: true});

    if (checkedModels.length <= 0) {
      console.warn('Not select item.');
    } else {
      // 切至下单画面
      var ids = '';
      _.each(checkedModels, function (model) {
        ids += (model.id + ',');
      });
      if (ids) ids = ids.substring(0, ids.length - 1);

      window.pollexmomApp.navigate("/generate-order/" + ids, {trigger: true});
    }
  }
});