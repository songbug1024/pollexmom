/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'Order',
  defaults: {
    items: [],
    payment: 0
  },
  urlRoot: function () {
    return this.baseUrl + 'orders';
  },
  initialize: function () {

  },
  url: function () {
    return this.urlRoot() + (this.id ? ('/' + this.id) : '');
  }
});