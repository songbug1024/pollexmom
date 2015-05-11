/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var _ = require('underscore');
var Collection = require('../base/collection');
var Model = require('../models/order');
var Settings = require('../settings.json');

module.exports = Collection.extend({
  name: 'Order',
  model: Model,
  urlRoot: function () {
    return this.baseUrl + 'orders';
  },
  userRelationUrl: function () {
    var userId = this.userId;
    if (!userId) {
      console.error('Collection \'' + this.name + '\' userRelationUrl error: userId is invalid.');
    }

    return this.baseUrl + 'users/' + userId + '/orders';
  },
  allUrl: function () {
    var queryString = this.qIncludes({items: ''}).qLimit(Settings.pageSize).qEnd();

    return this.userRelationUrl() + '?' + queryString;
  },
  tobePaidUrl: function () {
    var queryString = this.qIncludes({items: ''})
      .qLimit(Settings.pageSize)
      .qWhere({status: 0}) // 待支付
      .qEnd();

    return this.userRelationUrl() + '?' + queryString;
  },
  receiptUrl: function () {
    var queryString = this.qIncludes({items: ''})
      .qLimit(Settings.pageSize)
      .qWhere({status: 3}) // 待收货
      .qEnd();

    return this.userRelationUrl() + '?' + queryString;
  }
});