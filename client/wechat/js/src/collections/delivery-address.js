/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Collection = require('../base/collection');
var Model = require('../models/delivery-address');

module.exports = Collection.extend({
  name: 'DeliveryAddresses',
  model: Model,
  urlRoot: function () {
    return this.baseUrl + 'delivery-addresses';
  },
  userRelationUrl: function () {
    var userId = this.userId;
    if (!userId) {
      console.error('Collection \'' + this.name + '\' userRelationUrl error: userId is invalid.');
    }

    return this.baseUrl + 'users/' + userId + '/deliveryAddresses';
  }
});