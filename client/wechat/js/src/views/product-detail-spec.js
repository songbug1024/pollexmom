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
var View = require('../base/view');
var template = require('../templates/product-detail-spec.tpl');
var ShoppingCartModel = require('../models/shopping-cart');
var ShoppingCartItemModel = require('../models/shopping-cart-item');
var Settings = require('../settings.json');
var async = require('async');

module.exports = View.extend({
  name: 'ProductDetailSpec',
  className: 'product-detail-spec',
  template: _.template(template),
  events: {
    'click .good_ggchioce>li': 'switchSpecEvent',
    'click .good_num .decrease': 'decreaseNumEvent',
    'click .good_num .increase': 'increaseNumEvent',
    'click .good_btn_go': 'addIntoShoppingCartEvent',
    'click .good_btn_buy': 'goToOrderEvent'
  },
  initialize: function () {
    this.listenTo(this.model.get('chooseSpecModel'), 'change', this.render);
  },
  render: function () {
    this.$el.empty();
    this.$el.html(this.template({
      product: this.model.attributes,
      chooseSpec: this.model.get('chooseSpecModel').attributes
    }));

    this.$el.find('.good_ggchioce>li.select').removeClass('select');

    var chooseSpecIndex = this.model.get('chooseSpecIndex');
    if (chooseSpecIndex >= 0) {
      this.$el.find('.good_ggchioce>li:eq(' + chooseSpecIndex + ')').addClass('select');
    }

    return this;
  },
  switchSpecEvent: function (e) {
    var el = $(e.currentTarget);
    if (el.hasClass('select')) {
      this.model.set('chooseSpecIndex', -1);
    } else {
      this.model.set('chooseSpecIndex', el.index());
    }
  },
  setPurchaseNum: function (e, plus) {
    var chooseSpecModel = this.model.get('chooseSpecModel');
    var el = $(e.currentTarget);
    var inputEl = el.siblings('input');
    var count = parseInt(inputEl.val());
    count = plus ? count + 1 : count - 1;
    if (chooseSpecModel.purchasable(count)) {
      inputEl.val(count);
    } else {
      // TODO

    }
  },
  decreaseNumEvent: function (e) {
    this.setPurchaseNum(e, false);
  },
  increaseNumEvent: function (e) {
    this.setPurchaseNum(e, true);
  },
  addIntoShoppingCartEvent: function (e, success, error) {
    var self = this;
    var chooseSpecIndex = this.model.get('chooseSpecIndex');
    var chooseSpecModel = this.model.get('chooseSpecModel');
    var selected = chooseSpecIndex >= 0 && chooseSpecModel.id && !_.isEmpty(chooseSpecModel.attributes);

    success = success || function () {
      alert('添加成功!');
    };
    error = error || function () {
      alert('添加失败!');
    };

    if (!selected) {
      // TODO show waring
      console.warn('Not selected!!!')
    } else {
      var count = parseInt(this.$el.find('.good_num>input').val());
      if (!chooseSpecModel.purchasable(count)) {
        return console.error('Count is invalid!');
      }

      var shoppingCartItemModel = new ShoppingCartItemModel({
        productId: this.model.id,
        productName: this.model.get('name'),
        productPreviewImage: this.model.get('previewImagesJson')[0] || '',
        specificationId: chooseSpecModel.id,
        specificationName: chooseSpecModel.get('name'),
        specificationUnit: chooseSpecModel.get('unit'),
        price: chooseSpecModel.get('price'),
        referencePrice: chooseSpecModel.get('referencePrice'),
        count: count
      });

      var storedShoppingCart = localStorage.getItem(Settings.locals.userShoppingCart);
      storedShoppingCart = JSON.parse(storedShoppingCart);
      if (storedShoppingCart && storedShoppingCart.id) {
        var productId = shoppingCartItemModel.get('productId');
        var specificationId = shoppingCartItemModel.get('specificationId');
        var items = storedShoppingCart.items;
        var existedItem = _.findWhere(items, {productId: productId, specificationId: specificationId});

        if (existedItem) {
          existedItem.count += shoppingCartItemModel.get('count');
          shoppingCartItemModel.set(existedItem);
        } else {
          shoppingCartItemModel.set('shoppingCartId', storedShoppingCart.id);
        }

        shoppingCartItemModel.save(shoppingCartItemModel.attributes, {
          success: function (model) {
            if (!existedItem) {
              storedShoppingCart.items.push(model.attributes);
            }
            success(model.attributes);
            console.log('Added into shopping cart success!', model);
            localStorage.setItem(Settings.locals.userShoppingCart, JSON.stringify(storedShoppingCart));

            self.resetProductStatus();
          },
          error: function (model, err) {
            console.error('Error: ' + err);
            error();
          }
        });

      } else {

        async.waterfall([
          function checkShoppingCart(callback){
            var shoppingCartModel = new ShoppingCartModel({userId: Settings.userId});

            shoppingCartModel.url = shoppingCartModel.checkUrl();
            shoppingCartModel.fetch({
              success: function (model) {
                callback(null, model);
              },
              error: function (model, err) {
                if (err.status === 500) {
                  return callback(err, model);
                }

                // not create shopping cart before
                model.url = model.checkUrl();
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
          function loadItems(shoppingCart, callback) {
            shoppingCart.url = shoppingCart.userRelationUrl();
            shoppingCart.fetch({
              success: function (model) {
                callback(null, model);
              },
              error: function (model, err) {
                callback(err);
              }
            });
          },
          function saveItem(shoppingCart, callback) {
            var productId = shoppingCartItemModel.get('productId');
            var specificationId = shoppingCartItemModel.get('specificationId');
            var items = shoppingCart.get('items');
            var existedItem = _.findWhere(items, {productId: productId, specificationId: specificationId});

            if (existedItem) {
              existedItem.count += shoppingCartItemModel.get('count');
              shoppingCartItemModel.set(existedItem);
            } else {
              shoppingCartItemModel.set('shoppingCartId', shoppingCart.id);
            }

            shoppingCartItemModel.save(shoppingCartItemModel.attributes, {
              patch: true,
              success: function (model) {
                callback(null, model, shoppingCart, !existedItem);
              },
              error: function (model, err) {
                callback(err);
              }
            });
          }
        ], function (err, model, shoppingCart, append) {
          if (err) {
            error();
            return console.error('Error: ' + err);
          }
          console.log('Added into shopping cart success!', model);

          if (append) {
            shoppingCart.get('items').push(model.attributes);
          }
          localStorage.setItem(Settings.locals.userShoppingCart, JSON.stringify(shoppingCart.toJSON()));
          success(model.attributes);

          self.resetProductStatus();
        });

      }
    }
  },
  goToOrderEvent: function (e) {
    this.addIntoShoppingCartEvent(e, function(item) {
      var storedShoppingCart = JSON.parse(localStorage.getItem(Settings.locals.userShoppingCart));

      if (storedShoppingCart) {
        storedShoppingCart.items.push[item];
        localStorage.setItem(Settings.locals.userShoppingCart, JSON.stringify(storedShoppingCart));
      }

      window.pollexmomApp.navigate("/generate-order/" + item.id, {trigger: true});
    }, function () {
      alert('下单失败！');
    })
  },
  resetProductStatus: function () {
    this.model.set('chooseSpecIndex', 0);
    this.$el.find('.good_num>input').val(1);
  }
});