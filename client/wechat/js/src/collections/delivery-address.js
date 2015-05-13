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
  plural: 'user-delivery-addresses',
  relations: {
    users: {
      foreignKey: 'userId',
      humpTypePlural: 'deliveryAddresses'
    }
  }
});