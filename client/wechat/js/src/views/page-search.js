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
var template = require('../templates/search.tpl');

module.exports = Page.extend({
  id: 'search-page',
  template: _.template(template),
  initialize: function () {

  },
  render: function () {
    this.$el.empty();
    this.$el.html(this.template());
    this.$el.append('<div class="blank66"></div>');
    return this;
  }
});