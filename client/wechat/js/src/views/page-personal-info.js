/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
var _ = require('underscore');
var Page = require('../base/page');
var template = require('../templates/personal-info.tpl');
var FooterNavbarView = require('./footer-navbar');
var Settings = require('../settings.json');
var UserModel = require('../models/user');

module.exports = Page.extend({
  id: 'personal-info-page',
  template: _.template(template),
  initialize: function () {
    var model = new UserModel({id: Settings.userId});
    model.fetch({url: model.personalInfoUrl()});

    this.listenToOnce(model, 'change', this.render);
  },
  render: function (model) {
    if (model) {
      localStorage.setItem(Settings.locals.userInfo, JSON.stringify(model.toJSON()));
    }

    this.$el.empty();
    this.$el.html(this.template(model.attributes));
    this.$el.append(new FooterNavbarView().render().el);
    return this;
  }
});