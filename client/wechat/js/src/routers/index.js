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

module.exports = Router.extend({
  routes: {
    "": "index",
    "product/:productId": "productDetail",
    "personal-center": "personalCenter",
    "personal-info": "personalInfo",
    "shopping-cart": "shoppingCart"

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
  $('body .active[data-role="page"]').removeClass('active');
  existedPage.addClass('active');
}