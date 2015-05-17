/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Collection = require('../base/collection');
var Model = require('../models/user');

module.exports = Collection.extend({
  name: 'User',
  model: Model,
  urlRoot: function () {
    return this.baseUrl + 'users';
  }
});