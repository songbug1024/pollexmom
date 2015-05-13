/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'DeliveryAddresses',
  plural: 'user-delivery-addresses',
  initialize: function () {
  },
  userRelationUrl: function () {
    var userId = this.get('userId');
    if (!userId) {
      console.error('Model \'' + this.name + '\' userRelationUrl error: userId is invalid.');
    }

    return this.baseUrl + 'users/'+ userId + '/deliveryAddresses';
  }
});