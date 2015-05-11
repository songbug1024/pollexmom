/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'ShoppingCart',
  defaults: {
    items: [],
    amountPrice: 0,
    checkedPrice: 0
  },
  urlRoot: function () {
    return this.baseUrl + 'shopping-carts';
  },
  initialize: function () {

  },
  url: function () {
    return this.urlRoot() + '/' + this.id;
  },
  userRelationUrl: function () {
    var userId = this.get('userId');
    if (!userId) {
      console.error('Model \'' + this.name + '\' userRelationUrl error: userId is invalid.');
    }

    return this.urlRoot() + '/with-items?userId=' + userId;
  },
  checkUrl: function () {
    var userId = this.get('userId');
    if (!userId) {
      console.error('Model \'' + this.name + '\' checkUrl error: userId is invalid.');
    }

    return this.baseUrl + 'users/' + userId + '/shoppingCart/';
  },
  resetAmountPrice: function () {
    var amount = 0;
    var items = this.get('items');
    if (items && items.length > 0) {
      for (var i in items) {
        amount += (items[i].price * items[i].count);
      }
    }
    this.set('amountPrice', amount);
  }
});