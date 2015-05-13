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
    return this.urlRoot() + (this.id ? '/' + this.id : '');
  },
  weChatRegisterUrl: function () {
    return this.urlRoot() + (this.id ? '/' + this.id : '');
  },
  weChatUrl: function (weChatId, relations) {
    weChatId = weChatId || this.get('weChatId');

    if (!weChatId) {
      return console.error('Model \'' + this.name + '\' weChatUrl weChatId is invalid.');
    }

    relations = relations || ['personalInfo', 'deliveryInfo', 'deliveryAddresses', 'shoppingCart'];

    var queryString = this.qFields({
      status: 0
    }).qWhere({status: 1, weChatId: weChatId})
      .qIncludes(relations)
      .qEnd();
    return this.urlRoot() + '/findOne?' + queryString;
  },
  personalInfoUrl: function() {
    return this.urlRoot() + '/personal-info?id=' + this.id;
  }
});