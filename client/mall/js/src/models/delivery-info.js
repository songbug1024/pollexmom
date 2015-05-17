/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'DeliveryInfo',
  plural: 'delivery-info',
  initialize: function () {
  },
  relations: {
    users: {
      foreignKey: 'userId',
      humpTypePlural: 'deliveryInfo'
    }
  }
});