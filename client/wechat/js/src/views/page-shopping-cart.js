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
var FooterNavbarView = require('./footer-navbar');
var Settings = require('../settings.json');
var ShoppingCartModel = require('../models/shopping-cart');
var ShoppingCartListView = require('../views/shopping-cart-list');

module.exports = Page.extend({
  id: 'shopping-cart-page',
  template: _.template(template),
  initialize: function () {
    var self = this;
    var model = new ShoppingCartModel({userId: Settings.userId});

    localStorage.removeItem(Settings.locals.userShoppingCart);
    model.url = model.userRelationUrl();
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
      this.model.set(storedModel);
    }

    model = model || this.model;
    if (model && model.id) {
      localStorage.setItem(Settings.locals.userShoppingCart, JSON.stringify(model.toJSON()));
    }

    this.$el.empty();
    this.$el.html(this.template(model.attributes));
    var items = model.get('items');
    if (items && items.length > 0) {
      this.$el.find('.shopping-cart-main-container').append(new ShoppingCartListView({model: model}).render().el);
    }
    this.$el.append(new FooterNavbarView().render().el);
    return this;
  }
});