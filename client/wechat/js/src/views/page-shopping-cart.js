/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
var _ = require('underscore');
var Page = require('../base/page');
var template = require('../templates/shopping-cart.tpl');
var Settings = require('../settings.json');
var ShoppingCartModel = require('../models/shopping-cart');
var ShoppingCartListView = require('../views/shopping-cart-list');

module.exports = Page.extend({
  id: 'shopping-cart-page',
  template: _.template(template),
  initialize: function () {
    var self = this;
    var model = new ShoppingCartModel({userId: window._currentUserId});

    localStorage.removeItem(Settings.locals.userShoppingCart);
    model.url = model.userRelationIncludeItemsUrl();
    model.fetch({
      success: function (model, res) {
        if (!res || !_.isObject(res) || !res.id) {
          self.render(model);
        }
      },
      error: function (model, res) {
        if (res.status !== 500) {
          self.render(model);
        } else {
          // TODO SHOW error message
        }
      }
    });

    this.listenToOnce(model, 'change', this.render);
    this.model = model;
  },
  render: function (model) {
    if (!model) {
      var storedModel = localStorage.getItem(Settings.locals.userShoppingCart);
      storedModel = JSON.parse(storedModel) || {};

      this.model.clear();
      this.model.set(storedModel);
    } else {
      localStorage.setItem(Settings.locals.userShoppingCart, JSON.stringify(model.toJSON()));
    }
    model = model || this.model;

    this.$el.empty();
    this.$el.html(this.template(model.attributes));
    var items = model.get('items');
    if (items && items.length > 0) {
      var shoppingCartListView = new ShoppingCartListView({model: model});
      this.listenTo(shoppingCartListView, 'listEmpty', this.render);
      this.$el.find('.shopping-cart-main-container').append(shoppingCartListView.render().el);
    }
    this.$el.append('<div class="blank66"></div>');
    return this;
  }
});