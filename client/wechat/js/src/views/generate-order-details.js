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
var View = require('../base/view');
var template = require('../templates/generate-order-details.tpl');
var OrderDetailsItemView = require('./generate-order-details-item');

module.exports = View.extend({
  role: 'list-item',
  template: _.template(template),
  initialize: function (options) {
    this.order = options.order;
    this.details = options.details;
    this.ids = options.ids;
  },
  render: function () {
    this.$el.empty();

    var tempOrderInfo = JSON.parse(localStorage.getItem(Settings.locals.userTempOrder));
    var date = new Date(tempOrderInfo.deliveryDate);
    var y = date.getFullYear();
    var m = (date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
    var d = date.getDate() > 10 ? date.getDate() : ('0' + date.getDate())
    var deliveryTimeStr = y + "年" + m + "月" + d + "日";

    this.$el.html(this.template({
      model: this.model ? this.model.attributes : {},
      ids: this.ids,
      deliveryTimeStr: deliveryTimeStr
    }));

    var collection = this.details;
    if (collection && collection.length > 0) {
      var mainEl = this.$el.find('.items-container');

      _.each(collection.models, function (model) {
        mainEl.append(new OrderDetailsItemView({model: model}).render().el);
      });

    }
    return this;
  }
});