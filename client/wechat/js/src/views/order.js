/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
var $ = require('jquery');
var _ = require('underscore');
var View = require('../base/view');
var template = require('../templates/order.tpl');
var OrderItemView = require('../views/order-item');
var OrderItemModel = require('../models/order-item');

module.exports = View.extend({
  className: 'user-order',
  template: _.template(template),
  events: {
    'click .btn_ddfk.cancel': 'cancelOrder'
  },
  initialize: function () {

  },
  render: function () {
    this.$el.empty();

    var locals = _.extend({
      amountCount: this.model.amountItemsCount(),
      amountPrice: this.model.amountItemsPrice()
    }, this.model.attributes);
    this.$el.html(this.template(locals));

    var items = this.model.get('items');
    var $el = this.$el.find('.order-title');
    _.each(items, function (item) {
      $el.after(new OrderItemView({model: new OrderItemModel(item)}).render().el);
    });
    return this;
  },
  cancelOrder: function (e) {
    // TODO add confirm dialog
    var $el = $(e.currentTarget);
    this.model.save({status: 1}, {
      success: function (model) {
        $el.siblings('.btn_ddfk').remove();
        $el.removeClass('cancel').addClass('canceled').text('已取消');
      },
      error: function (model, err) {
        alert('取消订单失败');
        console.log('Cancel order error' + err);
      }
    });
  }
});