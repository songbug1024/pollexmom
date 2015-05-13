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
var InitWeChatUserPlugin = require('./plugins/init-wechat-user');

InitWeChatUserPlugin({
  subscribe: 1,
  openid: 'oGyODtxoJ8Em0eXhFzY9ccOLnhV8',
  nickname: '宝宝妈妈',
  sex: 1,
  city: 'Ganzhou',
  province: 'Jiangxi',
  country: 'China',
  language: 'zh_CN',
  headimgurl: 'http://106.39.231.44:3000/uploads/lr3vxkGZF6RjKdQatkNRJ4ls.jpg',
  remark: '帅的一塌糊涂...'
}, function (err, user) {
  if (err) {
    return alert('初始化用户信息失败！');
  }

  console.log('初始化用户信息成功: ' + user);
  window._currentUser = user;
  window._currentUserId = user.id;

  window.pollexmomApp = new IndexRoute();
  Backbone.history.start({pushState: false, root: "/wechat/"});
});
