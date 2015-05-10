/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var _ = require('underscore');
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'User',
  defaults: {
  },
  urlRoot: function () {
    return this.baseUrl + 'users';
  },
  initialize: function () {

  },
  url: function () {
    return this.urlRoot() + '/' + this.id;
  },
  personalInfoUrl: function() {
    return this.urlRoot() + '/personal-info?id=' + this.id;
  }
});