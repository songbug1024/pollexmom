/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var _ = require('underscore');
var Collection = require('../base/collection');
var Model = require('../models/order-item');

module.exports = Collection.extend({
  name: 'OrderItem',
  model: Model,
  urlRoot: function () {
    return this.baseUrl + 'order-items';
  },
  amountPrice: function () {
    var amount = 0;

    _.each(this.models, function (model) {
      amount += (model.get('price') * model.get('count'));
    });

    return amount;
  },
  amountCount: function () {
    var count = 0;

    _.each(this.models, function (model) {
      count += model.get('count');
    });

    return count;
  }
});