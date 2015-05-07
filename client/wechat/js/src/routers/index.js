/**
 * @Description: Index Route
 * @Author: fuwensong
 * @Date: 2015/5/4
 */
var Backbone = require('backbone');

module.exports = Backbone.Router.extend({
  routes: {
    "index": "index"
  },
  initialize: function (options) {

  },
  index: function() {
    alert('index');
  }
});