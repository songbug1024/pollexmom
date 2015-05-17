/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Collection = require('../base/collection');
var Model = require('../models/product-spec');

module.exports = Collection.extend({
  name: 'ProductSpec',
  model: Model
});