/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var _ = require('underscore');
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'UserPersonalInfo',
  defaults: {
  },
  urlRoot: function () {
    var userId = this.get('userId');

    if (!userId) {
      console.error('Model \'' + this.name + '\' urlRoot error: userId is invalid.');
    }

    return this.baseUrl + 'users/' + userId + '/personalInfo';
  },
  initialize: function () {
  }
});