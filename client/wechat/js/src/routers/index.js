/**
 * @Description: Index Route
 * @Author: fuwensong
 * @Date: 2015/5/4
 */
var $ = require('jquery');
var _ = require('underscore');
var Router = require('../base/router');
var Settings = require('../settings.json');
var ProductModel = require('../models/product');
var IndexPageView = require('../views/page-index');
var ProductPageView = require('../views/page-product');
var PersonalCenterView = require('../views/page-personal-center');
var PersonalInfoView = require('../views/page-personal-info');
var ShoppingCartView = require('../views/page-shopping-cart');
var GenerateOrderView = require('../views/page-generate-order');
var DeliveryAddressView = require('../views/page-edit-delivery-address');
var OrderSuccessView = require('../views/page-order-success');

module.exports = Router.extend({
  routes: {
    "": "index",
    "product/:productId": "productDetail",
    "personal-center": "personalCenter",
    "personal-info": "personalInfo",
    "shopping-cart": "shoppingCart",
    "generate-order/:ids": "generateOrder",
    "generate-order/:ids/delivery-address/:addressId": "deliveryAddress",
    "generate-order/:ids/delivery-time": "deliveryTime",
    "order-success": "orderSuccess"
  },
  initialize: function (options) {
  },
  index: function() {
    changePage({
      id: 'index-page',
      viewCreator: function (options) {
        return new IndexPageView(options).render();
      }
    });
  },
  productDetail: function (productId) {
    var storedProducts = localStorage.getItem(Settings.locals.indexProducts);
    storedProducts = storedProducts ? JSON.parse(storedProducts) : [];
    var product = _.findWhere(storedProducts, {id: productId});
    product = product || {id: productId};

    var existedPageEl = $('#product-detail-page');
    if (existedPageEl && existedPageEl.length > 0 && existedPageEl.attr('data-product-id') !== productId) {
      existedPageEl.remove();
    }
    changePage({
      id: 'product-detail-page',
      viewCreator: function (options) {
        return new ProductPageView(options);
      },
      viewCreatorOptions: {model: new ProductModel(product)}
    });
  },
  personalCenter: function() {
    changePage({
      id: 'persnal-center-page',
      viewCreator: function (options) {
        return new PersonalCenterView(options);
      }
    });
  },
  personalInfo: function() {
    changePage({
      id: 'personal-info-page',
      viewCreator: function (options) {
        return new PersonalInfoView(options);
      }
    });
  },
  shoppingCart: function() {
    changePage({
      id: 'shopping-cart-page',
      viewCreator: function (options) {
        return new ShoppingCartView(options);
      },
      cache: true,
      refresh: true
    });
  },
  generateOrder: function(ids) {
    changePage({
      id: 'generate-order-page',
      viewCreator: function (options) {
        return new GenerateOrderView(options).render();
      },
      removeWhenHide: true,
      viewCreatorOptions: {
        ids: ids
      }
    });
  },
  deliveryAddress: function(ids, addressId) {
    if (addressId === 'null') addressId = null;

    changePage({
      id: 'delivery-address-page',
      viewCreator: function (options) {
        return new DeliveryAddressView(options).render();
      },
      removeWhenHide: true,
      viewCreatorOptions: {
        ids: ids,
        id: addressId
      }
    });
  },
  deliveryTime: function () {
    // TODO
  },
  orderSuccess: function () {
    changePage({
      id: 'order-success-page',
      viewCreator: function (options) {
        return new OrderSuccessView(options).render();
      }
    });
  }
});

var allPages = {};

function changePage(options) {
  options = options || {};
  var id = options.id;
  var viewCreator = options.viewCreator;
  var existedPage = $('#' + id);
  var view;

  if (!existedPage || existedPage.length <= 0) {
    view = viewCreator(options.viewCreatorOptions);
    $('body').attr('data-page', id).append(view.el);
    existedPage = view.$el;

    if (options.cache) {
      allPages[id] = view;
    }

  } else {
    if (options.refresh && allPages[id]) {
      allPages[id].trigger('refresh');
    }
  }

  var activePageEl = $('body .active[data-role="page"]');
  activePageEl.removeClass('active');

  if (options.removeWhenHide) activePageEl.remove();

  existedPage.addClass('active');
}