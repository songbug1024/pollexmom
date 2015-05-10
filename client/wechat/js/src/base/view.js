/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Backbone = require('backbone');
var Settings = require('../settings.json');

module.exports = Backbone.View.extend({
  name: '_unknown',
  role: '_default',
  attributes: function () {
    var attr = {};
    if (this.name && this.name !== '_unknown') {
      attr['data-name'] = this.name;
    }
    if (this.role && this.role !== '_default') {
      attr['data-role'] = this.role;
    }
    return attr;
  },
  constructor: function() {
    Backbone.View.apply(this, arguments);
  },
  initialize: function () {
    if (Settings.env === 'debug') {
      console.log('View initialize.');
    }
  }
});