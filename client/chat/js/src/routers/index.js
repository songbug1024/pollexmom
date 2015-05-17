/**
 * @Description: Index Route
 * @Author: fuwensong
 * @Date: 2015/5/4
 */
var $ = require('jquery');
var _ = require('underscore');
var Router = require('../base/router');
var Settings = require('../settings.json');

module.exports = Router.extend({
  routes: {
    "": "index"
  },
  initialize: function (options) {

  },
  index: function() {
    var socket = io('http://localhost:3000');
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  }
});