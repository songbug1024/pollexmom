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
var template = require('../templates/order-success.tpl');
var HeaderView = require('./header');

module.exports = Page.extend({
  id: 'order-success-page',
  template: _.template(template),
  initialize: function () {
  },
  render: function () {
    this.$el.empty();
    this.$el.html(this.template());
    this.$el.find('.success-main').before(new HeaderView().render().el);
    this.$el.append('<div class="blank66"></div>');
    return this;
  }
});