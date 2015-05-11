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
var template = require('../templates/shopping-cart-item.tpl');

module.exports = View.extend({
  role: 'list-item',
  tagName: 'ul',
  className: 'gwc_list',
  template: _.template(template),
  events: {
    'click .good_num .increase': 'increaseNumEvent',
    'click .good_num .decrease': 'decreaseNumEvent',
    'click .select-item': 'itemSelectEvent'
  },
  initialize: function () {
    this.listenTo(this.model, 'change:checked', this.checkedChangeHandler);
  },
  render: function () {
    this.$el.empty();
    this.$el.html(this.template(this.model.attributes));
    return this;
  },
  increaseNumEvent: function(e) {
    this.setPurchaseNum(e, true);
  },
  decreaseNumEvent: function(e) {
    this.setPurchaseNum(e, false);
  },
  setPurchaseNum: function (e, plus) {
    var model = this.model;
    var chooseSpecModel = model.get('chooseSpecModel');
    var el = $(e.currentTarget);
    var inputEl = el.siblings('input');
    var count = parseInt(inputEl.val());
    count = plus ? count + 1 : count - 1;

    if (count > 0 && count !== model.get('count')) {
      model.save({count: count}, {
        success: function (model) {
          inputEl.val(model.get('count'));
        }
      });
    }
  },
  itemSelectEvent: function(e) {
    this.model.set('checked', !this.model.get('checked'));
  },
  checkedChangeHandler: function (model, checked) {
    if (checked) {
      this.$el.find('.select-item').removeClass('dx_sel').addClass('dx_sel_active');
    } else {
      this.$el.find('.select-item').removeClass('dx_sel_active').addClass('dx_sel');
    }
  }
});