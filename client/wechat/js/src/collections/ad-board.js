/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Collection = require('../base/collection');
var Model = require('../models/ad-board');
var Settings = require('../settings.json');

module.exports = Collection.extend({
  name: 'AdBoard',
  model: Model,
  urlRoot: function () {
    return this.baseUrl + 'ad-boards';
  },
  url: function () {
    var queryString = this.qFields({
        status: false
      })
      .qOrder({priority: 'DESC'})
      .qLimit(Settings.adBoardSize)
      .qWhere({status: true})
      .qEnd();

    return this.urlRoot() + '?' + queryString;
  },
  comparator: function (m1, m2) {
    return m1.get('priority') < m2.get('priority');
  }
});