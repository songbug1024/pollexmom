/**
 * @Description: Main
 * @Author: fuwensong
 * @Date: 2015/5/4
 */
var Settings = require('./settings.json');
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

_.templateSettings = {
  evaluate    : /{{([\s\S]+?)}}/g,
  interpolate : /{{=([\s\S]+?)}}/g,
  escape      : /{{-([\s\S]+?)}}/g
};
Backbone.$ = $;

var IndexRoute = require('./routers/index');

window.pollexmomChatApp = new IndexRoute();
Backbone.history.start({pushState: false, root: "/chat/"});
