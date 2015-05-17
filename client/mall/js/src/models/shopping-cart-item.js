/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'ShoppingCartItem',
  plural: 'shopping-cart-items',
  defaults: {
    checked: false
  },
  initialize: function () {
  },
  relations: {
    'shopping-carts': {
      foreignKey: 'shoppingCartId',
      humpTypePlural: 'items'
    }
  }
});