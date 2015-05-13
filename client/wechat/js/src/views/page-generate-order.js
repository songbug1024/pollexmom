/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
var $ = require('jquery');
var _ = require('underscore');
var async = require('async');
var Page = require('../base/page');
var template = require('../templates/generate-order.tpl');
var Settings = require('../settings.json');
var OrderModel = require('../models/order');
var ShoppingCartModel = require('../models/shopping-cart');
var ShoppingCartItemModel = require('../models/shopping-cart-item');
var DeliveryInfoModel = require('../models/delivery-info');
var DeliveryAddressCollection = require('../collections/delivery-address');
var DeliveryAddressModel = require('../models/delivery-address');
var OrderItemCollection = require('../collections/order-item');
var OrderDeliveryInfoView = require('../views/generate-order-delivery-info');
var OrderDetailsView = require('../views/generate-order-details');

module.exports = Page.extend({
  id: 'generate-order-page',
  template: _.template(template),
  events: {
    'click .order-submit-btn': 'submitBtnEvent',
    'click .payment input[type="radio"]': 'paymentRadioEvent'
  },
  initialize: function (options) {
    var ids = options.ids;
    if (!ids) {
      console.error('Generate order error: ids is invalid.');
      return window.pollexmomApp.navigate("/shopping-cart", {trigger: true});
    }
    this.ids = ids;

    // TODO test data
    this.order = new OrderModel({
      consumerId: window._currentUserId,
      dietitianId: Settings.order.dietitianId,
      dietitianName: Settings.order.dietitianName,
      dietitianTel: Settings.order.dietitianTel
    });
  },
  initDeliveryAddressInfo: function () {
    var self = this;

    this.on('deliveryAddressInfoReady', this.renderDeliveryAddressInfo);

    var storedUserDeliveryInfo = JSON.parse(localStorage.getItem(Settings.locals.userDeliveryInfo));
    var storedUserDeliveryAddress = JSON.parse(localStorage.getItem(Settings.locals.userDeliveryAddress));
    var deliveryAddressInfo;

    if (storedUserDeliveryInfo && storedUserDeliveryAddress && storedUserDeliveryAddress.length > 0) {
      var defaultAddressId = storedUserDeliveryInfo.defaultAddressId;
      deliveryAddressInfo = defaultAddressId
        ? _.findWhere(storedUserDeliveryAddress,{id: defaultAddressId})
        : storedUserDeliveryAddress[0];

      this.trigger('deliveryAddressInfoReady', deliveryAddressInfo || {});
    } else {

      async.parallel([
        function fetchUserDeliveryInfo(callback){
          var model = new DeliveryInfoModel({userId: window._currentUserId});

          model.url = model.relationUrl('users');
          model.fetch({
            success: function (model) {
              callback(null, model);
            },
            error: function (model, err) {
              if (err.status === 500) {
                return callback(err, model);
              }

              // not create delivery info before
              model.url = model.relationUrl('users');
              model.save(model.attributes, {
                success: function (model) {
                  callback(null, model);
                },
                error: function (model, err) {
                  callback(err);
                }
              });

            }
          });
        },
        function fetchUserDeliveryAddresses(callback) {
          var collection = new DeliveryAddressCollection();

          collection.userId = window._currentUserId;
          collection.url = collection.relationUrl('users');
          collection.fetch({
            success: function (collection) {
              callback(null, collection);
            },
            error: function (collection, err) {
              callback(err);
            }
          });
        }
      ], function (err, results) {
        if (err) {
          alert('初始化收货信息失败!');
          return console.error('Error: ' + err);
        }
        console.log('InitDeliveryAddressInfo success!' + results);

        var deliveryInfo = results[0];
        var deliveryAddress = results[1];

        if (deliveryInfo && deliveryAddress && deliveryAddress.length > 0) {
          localStorage.setItem(Settings.locals.userDeliveryInfo, JSON.stringify(deliveryInfo.toJSON()));
          localStorage.setItem(Settings.locals.userDeliveryAddress, JSON.stringify(deliveryAddress.toJSON()));

          var defaultAddressId = deliveryInfo.get('defaultAddressId');
          deliveryAddressInfo = defaultAddressId ? deliveryAddress.get(defaultAddressId) : deliveryAddress.at(0);
        }
        self.trigger('deliveryAddressInfoReady', deliveryAddressInfo ? deliveryAddressInfo.toJSON() : {});
      });
    }
  },
  initOrderInfo: function () {
    var self = this;
    this.on('orderInfoReady', this.renderOrderInfo);

    var storeShoppingCart = localStorage.getItem(Settings.locals.userShoppingCart);
    if (storeShoppingCart) {
      storeShoppingCart = JSON.parse(storeShoppingCart);
      this.trigger('orderInfoReady', this.parseOrderFromShoppingCart(storeShoppingCart));

    } else {
      var model = new ShoppingCartModel({userId: window._currentUserId});

      model.url = model.userRelationIncludeItemsUrl();
      model.fetch({
        success: function (model, res) {
          localStorage.setItem(Settings.locals.userShoppingCart, JSON.stringify(model.toJSON()));
          self.trigger('orderInfoReady', self.parseOrderFromShoppingCart(model.toJSON()));
        },
        error: function (model, res) {
          // TODO SHOW error message
        }
      });
    }
  },
  initOtherInfo: function () {
    var tempOrderInfo = JSON.parse(localStorage.getItem(Settings.locals.userTempOrder));

    if (!tempOrderInfo) {
      tempOrderInfo = {
        payment: 1,
        consumerName: '',
        deliveryDate: new Date().getTime() + Settings.defaults.orderDeliveryDuringDays * (24 * 60 * 60 * 1000)
      };
      localStorage.setItem(Settings.locals.userTempOrder, JSON.stringify(tempOrderInfo));
    }
    return tempOrderInfo;
  },
  parseOrderFromShoppingCart: function (shoppingCart) {
    var ids = this.ids.split(',');
    var items = shoppingCart.items;
    var orderItemsCollection = new OrderItemCollection();

    for (var i in ids) {
      var item = _.findWhere(items, {id: ids[i]});
      if (!item) {
        console.error('Generate order error: ids is invalid.');
        return window.pollexmomApp.navigate("/shopping-cart", {trigger: true});
      }
      orderItemsCollection.add({
        productId: item.productId,
        productName: item.productName,
        productPreviewImage: item.productPreviewImage,
        specificationId: item.specificationId,
        specificationName: item.specificationName,
        specificationUnit: item.specificationUnit,
        price: item.price,
        referencePrice: item.referencePrice,
        count: item.count
      });
    }
    this.orderItemsCollection = orderItemsCollection;
  },
  render: function () {
    var self = this;
    this.$el.empty();

    var tempOrderInfo = this.initOtherInfo();
    var locals = {};
    _.extend(locals, this.order.attributes, {
      consumerName: tempOrderInfo.consumerName,
      payment: tempOrderInfo.payment
    });

    this.$el.html(this.template(locals));
    this.$el.append('<div class="blank66"></div>');

    this.initDeliveryAddressInfo();
    this.initOrderInfo();


    this.$el.find('select.consumer').change(function (e) {
      self.consumerSelectChangeEvent(e);
    });
    this.$el.find('select.consumer').change(function (e) {
      self.consumerSelectChangeEvent(e);
    });
    return this;
  },
  renderDeliveryAddressInfo: function (deliveryAddressInfo) {
    var view = new OrderDeliveryInfoView({
      model: new DeliveryAddressModel(deliveryAddressInfo),
      ids: this.ids
    });
    view.setElement(this.$el.find('.delivery-info'));
    view.render();
  },
  renderOrderInfo: function () {
    var details = this.orderItemsCollection;

    var view = new OrderDetailsView({
      order: this.order,
      details: details,
      ids: this.ids
    });
    view.setElement(this.$el.find('.order-detail'));
    view.render();


    var count = details.amountCount();
    var amount = details.amountPrice();

    this.$el.find('.generate-submit .count').text(count);
    this.$el.find('.generate-submit .amount').text(amount);
  },
  consumerSelectChangeEvent: function (e) {
    var $el = $(e.currentTarget);
    var value = $el.val();
    $el.siblings('label').text(value);

    this.saveTempOrderInfo({consumerName: value});
  },
  paymentRadioEvent: function (e) {
    var value = parseInt($(e.currentTarget).val());
    this.saveTempOrderInfo({payment: value});
  },
  saveTempOrderInfo: function (data) {
    var tempOrderInfo = JSON.parse(localStorage.getItem(Settings.locals.userTempOrder));
    tempOrderInfo = tempOrderInfo || {};
    tempOrderInfo = _.extend(tempOrderInfo, data);
    localStorage.setItem(Settings.locals.userTempOrder, JSON.stringify(tempOrderInfo));
  },
  submitBtnEvent: function (e) {
    var self = this;
    var order = this.order;
    var orderItems = this.orderItemsCollection;
    var ids = this.ids.split(',');

    var attributes = {
      orderNumber: new Date().getTime(),
      status: Settings.defaults.orderState,
      shipperAddress: 'xxxx', // TODO need changed
      receiverAddress: this.$el.find('.delivery-info .receiver-address').text(),
      payment: parseInt(this.$el.find('.payment .sh_zffs input:checked').val()),
      deliveryDate: this.$el.find('.order-detail .delivery-time').text(),
      consumerName: this.$el.find('delect .consumer').val()
    };

    async.waterfall([
      function saveOrder(callback){
        order.save(attributes, {
          success: function (model) {
            callback(null, model);
          },
          error: function (model, res) {
            callback(err);
          }
        });
      },
      function saveOrderItems(order, callback) {

        var tasks = [];
        _.each(orderItems.models, function (model) {
          model.set('orderId', order.id);

          tasks.push(function (callback) {
            model.save(model.attributes, {
              success: function (model) {
                callback(null);
              },
              error: function (model, err) {
                callback(err);
              }
            });
          });
        });
        _.each(ids, function (itemId) {
          tasks.push(function (callback) {
            var model = new ShoppingCartItemModel({id: itemId});
            model.destroy({
              success: function (model) {
                callback(null);
              },
              error: function (model, err) {
                callback(err);
              }
            });
          });
        });

        async.parallel(tasks, function (err, results) {
          if (err) {
            return callback(err);
          }
          callback(null);
        });

      }
    ], function (err, results) {
      if (err) {
        alert('创建订单失败!');
        return console.error('Error: ' + err);
      }
      localStorage.removeItem(Settings.locals.userShoppingCart);
      localStorage.removeItem(Settings.locals.userTempOrder);
      window.pollexmomApp.navigate("/order-success", {trigger: true});
    });
  }
});