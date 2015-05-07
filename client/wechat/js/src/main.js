/**
 * @Description: Main
 * @Author: fuwensong
 * @Date: 2015/5/4
 */
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var IndexRoute = require('./routers/index');

new IndexRoute();
Backbone.history.start({pushState: true, root: "/wechat/"});