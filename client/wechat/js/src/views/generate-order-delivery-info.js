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
var template = require('../templates/generate-order-delivery-info.tpl');

module.exports = View.extend({
  template: _.template(template),
  events: {
    'click .edit-btn': 'editBtnEvent'
  },
  initialize: function (options) {
    this.ids = options.ids;
  },
  render: function () {
    this.$el.empty();
    this.$el.html(this.template(this.model ? this.model.attributes : {}));
    return this;
  },
  editBtnEvent: function (e) {
    window.pollexmomApp.navigate("/generate-order/" + this.ids + "/delivery-address" + (this.model && this.model.id ? '/' + this.model.id : ''), {trigger: true});
  }
});