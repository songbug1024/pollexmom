/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Model = require('../base/model');

module.exports = Model.extend({
  name: 'AdBoard',
  urlRoot: function () {
    return this.baseUrl + 'ad-boards';
  }
});