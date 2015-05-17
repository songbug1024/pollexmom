/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'ShoppingCart',
  plural: 'shopping-carts',
  defaults: {
    items: [],
    amountPrice: 0,
    checkedPrice: 0
  },
  initialize: function () {
  },
  relations: {
    users: {
      foreignKey: 'userId',
      humpTypePlural: 'shoppingCart'
    }
  },
  userRelationIncludeItemsUrl: function () {
    var userId = this.get('userId');

    return this.urlRoot() + '/findOne?' + this.qWhere({userId: userId}).qIncludes('items').qEnd();
  },
  idIncludeItemsUrl: function () {
    return this.idUrl() + '?' + this.qIncludes('items').qEnd();
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