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

module.exports = Router.extend({
  routes: {
    "": "index",
    "product/:productId": "productDetail"
  },
  initialize: function (options) {

  },
  index: function() {
    changePage({
      selector: '#index-page',
      elCreator: function (options) {
        return new IndexPageView(options).render().el;
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
      selector: '#product-detail-page',
      elCreator: function (options) {
        return new ProductPageView(options).el;
      },
      elCreatorOptions: {model: new ProductModel(product)}
    });

  }
});

function changePage(options) {
  options = options || {};
  var selector = options.selector;
  var elCreator = options.elCreator;
  var existedPage = $(selector);
  if (!existedPage || existedPage.length <= 0) {
    var el = elCreator(options.elCreatorOptions);
    $('body').append(el);
    existedPage = $(el);
  }
  $('body .active[data-role="page"]').removeClass('active');
  existedPage.addClass('active');
}