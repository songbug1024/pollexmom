/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'DeliveryInfo',
  defaults: {
  },
  urlRoot: function () {
    return this.baseUrl + 'delivery-info';
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

    return this.baseUrl + 'users/' + userId + '/deliveryInfo';
  }
});