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
var HeaderView = require('./header');
var FooterNavbarView = require('./footer-navbar');
var template = require('../templates/category.tpl');

module.exports = Page.extend({
  id: 'category-page',
  template: _.template(template),
  initialize: function () {
  },
  render: function () {
    this.$el.empty();
    this.$el.html(this.template());
    this.$el.prepend(new HeaderView().render().el);
    this.$el.append(new FooterNavbarView().render().el);
    return this;
  }
});