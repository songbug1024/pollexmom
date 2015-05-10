/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'ShoppingCart',
  urlRoot: function () {
    return this.baseUrl + 'shopping-cart-items';
  },
  initialize: function () {
  },
  url: function () {
    return this.urlRoot() + (this.id ? ('/' + this.id) : '');
  },
  shoppingCartRelationUrl: function () {
    var shoppingCartId = this.get('shoppingCartId');
    if (!shoppingCartId) {
      console.error('Model \'' + this.name + '\' shoppingCartRelationUrl error: shoppingCartId is invalid.');
    }
    return this.baseUrl + 'shopping-carts/'+ shoppingCartId + '/items';
  }
});