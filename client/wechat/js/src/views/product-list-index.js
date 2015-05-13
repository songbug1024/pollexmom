/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var _ = require('underscore');
var Settings = require('../settings.json');
var View = require('../base/view');
var ProductCollection = require('../collections/product');
var ProductItemView = require('./product-item');

module.exports = View.extend({
  name: 'IndexProductList',
  role: 'list-view',
  className: 'w',
  initialize: function () {
    var collection = new ProductCollection();

    collection.url = collection.indexUrl();
    collection.fetch({reset: true});

    this.listenToOnce(collection, 'reset', this.render);
  },
  render: function (collection) {
    var self = this;
    this.$el.empty();
    if (collection && collection.length > 0) {
      // save index Products into localStorage
      localStorage.setItem(Settings.locals.indexProducts, JSON.stringify(collection.toJSON()));

      _.each(collection.models, function (model) {
        self.$el.append(new ProductItemView({model: model}).render().el);
      });
    }
    this.$el.wrapInner("<div class='w_bd'></div>");
    return this;
  }
});