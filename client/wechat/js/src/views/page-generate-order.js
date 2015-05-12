/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
var _ = require('underscore');
var async = require('async');
var Page = require('../base/page');
var template = require('../templates/generate-order.tpl');
var FooterNavbarView = require('./footer-navbar');
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
    'click .order-submit-btn': 'submitBtnEvent'
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
      consumerId: Settings.userId,
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

      this.trigger('deliveryAddressInfoReady', deliveryAddressInfo);
    } else {

      async.parallel([
        function fetchUserDeliveryInfo(callback){
          var model = new DeliveryInfoModel({userId: Settings.userId});

          model.url = model.userRelationUrl();
          model.fetch({
            success: function (model) {
              callback(null, model);
            },
            error: function (model, err) {
              if (err.status === 500) {
                return callback(err, model);
              }

              // not create delivery info before
              model.url = model.userRelationUrl();
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

          collection.userId = Settings.userId;
          collection.url = collection.userRelationUrl();
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
        self.trigger('deliveryAddressInfoReady', deliveryAddressInfo.toJSON());
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
      var model = new ShoppingCartModel({userId: Settings.userId});

      model.url = model.userRelationUrl();
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
  parseOrderFromShoppingCart: function (shoppingCart) {
    var ids = this.ids.split(',');
    var items = shoppingCart.items;
    var orderItemsCollection = new OrderItemCollection();

    for (var i in ids) {
      var item = _.findWhere(items, {id: ids[i]});
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
    this.$el.empty();
    this.$el.html(this.template(this.order.attributes));
    this.$el.append(new FooterNavbarView().render().el);

    this.initDeliveryAddressInfo();
    this.initOrderInfo();
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
      payment: parseInt(this.$el.find('.payment .sh_zffs input:checked').val())
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
      window.pollexmomApp.navigate("/order-success", {trigger: true});
    });
  }
});