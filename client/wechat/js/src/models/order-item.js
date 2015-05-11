/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'OrderItem',
  defaults: {
  },
  urlRoot: function () {
    return this.baseUrl + 'order-items';
  },
  initialize: function () {
  },
  url: function () {
    return this.urlRoot() + (this.id ? ('/' + this.id) : '');
  },
  orderRelationUrl: function () {
    var orderId = this.get('orderId');
    if (!orderId) {
      console.error('Model \'' + this.name + '\' orderRelationUrl error: orderId is invalid.');
    }
    return this.baseUrl + 'orders/'+ orderId + '/items';
  }
});