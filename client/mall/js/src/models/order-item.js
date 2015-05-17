/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'OrderItem',
  plural: 'order-items',
  defaults: {
  },
  initialize: function () {
  },
  relations: {
    orders: {
      foreignKey: 'orderId',
      humpTypePlural: 'items'
    }
  }
});