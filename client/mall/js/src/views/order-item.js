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
var template = require('../templates/order-item.tpl');

module.exports = View.extend({
  role: 'list-item',
  className: 'user_dd_item clearfix',
  tagName: 'ul',
  template: _.template(template),

  initialize: function () {

  },
  render: function () {
    this.$el.empty();
    this.$el.html(this.template(this.model ? this.model.attributes : {}));
    return this;
  }
});