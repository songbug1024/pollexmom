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
var OrderView = require('./order');

module.exports = Page.extend({
  id: 'my-orders-page',
  template: _.template(template),
  events: {
    'click .order-type-tab': 'orderTypeTabEvent' // change to hash change
  },
  initialize: function (options) {
    options = options || {};
    this.type = options.type;

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
  },
  render: function (model) {
    this.$el.empty();
    this.$el.html(this.template());
    this.$el.append(new FooterNavbarView().render().el);

    this.prepareOrders(this.type || 'tobePaid');
    return this;
  },
  prepareOrders: function (type) {
    var self = this;
    var collection;
    var storedOrders;
    var localKey;

    switch (type) {
      case 'tobePaid':
        collection = this.tobePaidOrders;
        localKey = Settings.locals.userTobePaidOrders;
        break;
      case 'all':
        collection = this.allOrders;
        localKey = Settings.locals.userAllOrders;
        break;
      case 'receipt':
        collection = this.receiptOrders;
        localKey = Settings.locals.userReceiptOrders;
        break;
      default:
        break;
    }

    storedOrders = JSON.parse(localStorage.getItem(localKey));

    if (storedOrders && storedOrders.length > 0) {
      collection.reset(storedOrders);
      this.renderOrders(collection, type);
    } else {
      collection.fetch({
        success: function (collection) {
          self.renderOrders(collection, type);

          localStorage.setItem(localKey, JSON.stringify(collection.toJSON()));
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
    this.$el.find('.order-list.active').removeClass('active');

    this.$el.find('.order-type-tab[data-type="' + type + '"]').addClass('active');

    var $el = this.$el.find('.order-list[data-type="' + type + '"]');
    $el.addClass('active').empty();

    if (collection && collection.length > 0) {

      _.each(collection.models, function (model) {
        $el.append(new OrderView({model: model}).render().el);
      })

    } else {
      $el.append('<p class="no-result">无订单记录！</p>');
    }
  },
  orderTypeTabEvent: function (e) {
    var $el = $(e.currentTarget);

    if (!$el.hasClass('active')) {
      var type = $el.attr('data-type');
      this.prepareOrders(type);
      return window.pollexmomApp.navigate("/personal-center/my-orders/" + type, {trigger: false});
    }
  }
});
