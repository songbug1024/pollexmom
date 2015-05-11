/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
var _ = require('underscore');
var $ = require('jquery');
var Page = require('../base/page');
var template = require('../templates/my-orders.tpl');
var FooterNavbarView = require('./footer-navbar');
var Settings = require('../settings.json');
var OrderCollection = require('../collections/order');

module.exports = Page.extend({
  id: 'my-orders-page',
  template: _.template(template),
  initialize: function () {
    var allOrders = this.allOrders = new OrderCollection(); //所有
    var tobePaidOrders = this.tobePaidOrders = new OrderCollection(); //待支付
    var receiptOrders = this.receiptOrders = new OrderCollection(); //待收获
    var userId = Settings.userId;

    allOrders.userId = userId;
    allOrders.url = allOrders.allUrl();

    tobePaidOrders.userId = userId;
    tobePaidOrders.url = tobePaidOrders.tobePaidUrl();

    receiptOrders.userId = userId;
    receiptOrders.url = receiptOrders.receiptUrl();

    localStorage.removeItem(Settings.locals.userTobePaidOrders);
    localStorage.removeItem(Settings.locals.userReceiptOrders);
    localStorage.removeItem(Settings.locals.userAllOrders);

    this.prepareOrders('tobePaid');
  },
  render: function (model) {
    this.$el.empty();
    this.$el.html(this.template());
    this.$el.append(new FooterNavbarView().render().el);
    return this;
  },
  prepareOrders: function (type) {
    var self = this;
    var collection;
    var storedOrders;

    switch (type) {
      case 'tobePaid':
        collection = this.tobePaidOrders;
        storedOrders = localStorage.getItem(Settings.locals.userTobePaidOrders);
        break;
      case 'all':
        collection = this.allOrders;
        storedOrders = localStorage.getItem(Settings.locals.userAllOrders);
        break;
      case 'receipt':
        collection = this.receiptOrders;
        storedOrders = localStorage.getItem(Settings.locals.userReceiptOrders);
        break;
      default:
        break;
    }

    if (storedOrders && storedOrders.length > 0) {
      collection.reset(storedOrders);
      this.renderOrders(collection, type);
    } else {
      collection.fetch({
        success: function (collection) {
          self.renderOrders(collection, type);
        },
        error: function (collection, err) {
          console.error('Fetch orders error: ' + err);
          alert('获取数据失败！');
        }
      });
    }
  },
  renderOrders: function (collection, type) {
    this.$el.find('.order-type-tab.active').removeClass('active');
    this.$el.find('.order-type-tab.active').removeClass('active');

    this.$el.find('.order-type-tab[data-type="' + type + '"]').addClass('active');

    if (collection) {

    }
  }
});