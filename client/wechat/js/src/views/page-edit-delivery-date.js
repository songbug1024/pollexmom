/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
var _ = require('underscore');
var Settings = require('../settings.json');
var Page = require('../base/page');
var template = require('../templates/edit-delivery-date.tpl');

module.exports = Page.extend({
  id: 'delivery-date-page',
  template: _.template(template),
  events: {
    'click .btn_shedit': 'confirmBtnEvent'
  },
  initialize: function (options) {
    var ids = options.ids;
    if (!ids) {
      console.error('Generate order error: ids is invalid.');
      return window.pollexmomApp.navigate("/shopping-cart", {trigger: true});
    }
    this.ids = ids;
  },
  render: function () {
    this.$el.empty();

    var deliveryTimeStr = '';
    var tempOrderInfo = JSON.parse(localStorage.getItem(Settings.locals.userTempOrder));
    tempOrderInfo = tempOrderInfo || {};
    if (tempOrderInfo.deliveryDate) {
      var date = new Date(tempOrderInfo.deliveryDate);
      var y = date.getFullYear();
      var m = (date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
      var d = date.getDate() > 10 ? date.getDate() : ('0' + date.getDate())
      var deliveryTimeStr = y + "-" + m + "-" + d;
    }

    this.$el.html(this.template({deliveryTimeStr: deliveryTimeStr}));
    return this;
  },
  confirmBtnEvent: function (e) {
    var date = this.$el.find('.data-input').val();
    if (date) {
      var parts = date.split('-');
      var date = new Date();
      date.setFullYear(parts[0]);
      date.setMonth(parts[1] - 1);
      date.setDate(parts[2]);
      var tempOrderInfo = JSON.parse(localStorage.getItem(Settings.locals.userTempOrder));
      tempOrderInfo = tempOrderInfo || {};
      tempOrderInfo = _.extend(tempOrderInfo, {deliveryDate: date.getTime()});
      localStorage.setItem(Settings.locals.userTempOrder, JSON.stringify(tempOrderInfo));
      window.pollexmomApp.navigate("/generate-order/" + this.ids, {trigger: true});
    }
  }
});