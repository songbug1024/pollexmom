/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
var _ = require('underscore');
var View = require('../base/view');
var template = require('../templates/categoriy-lev1.tpl');

module.exports = View.extend({
  className: 'first-level-cat index_pbig',
  template: _.template(template),
  initialize: function () {

  },
  render: function () {
    this.$el.empty();
    this.$el.html(this.template({}));
    return this;
  }
});