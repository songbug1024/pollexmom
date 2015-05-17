/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var _ = require('underscore');
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'Order',
  plural: 'orders',
  defaults: {
    items: [],
    payment: 0
  },
  initialize: function () {
  },
  amountItemsCount: function() {
    return _.reduce(this.get('items'), function(memo, item){
      return memo + item.count;
    }, 0);
  },
  amountItemsPrice: function() {
    return _.reduce(this.get('items'), function(memo, item){
      return memo + item.price * item.count;
    }, 0);
  }
});