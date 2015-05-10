/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Collection = require('../base/collection');
var Model = require('../models/shopping-cart-item');

module.exports = Collection.extend({
  name: 'ShoppingCartItem',
  model: Model,
  urlRoot: function () {
    return this.baseUrl + 'shopping-cart-items';
  }
});