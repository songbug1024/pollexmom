/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'ProductSpec',
  defaults: {
    name: '...',
    price: 0,
    referencePrice: 0,
    inventoryCount: 0,
    saleCount: 0,
    transportationCost: 0,
    unit: '...',
    limitPurchaseCount: 10
  },
  purchasable: function (count) {
    return count > 0
//      && count <= this.get('limitPurchaseCount') // TODO
      && (this.get('inventoryCount') - count) >= 0;
  }
});