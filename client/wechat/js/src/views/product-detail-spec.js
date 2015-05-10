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
var template = require('../templates/product-detail-spec.tpl');

module.exports = View.extend({
  name: 'ProductDetailSpec',
  className: 'product-detail-spec',
  template: _.template(template),
  events: {
    'click .good_ggchioce>li': 'switchSpecEvent',
    'click .good_num .decrease': 'decreaseNumEvent',
    'click .good_num .increase': 'increaseNumEvent'
  },
  initialize: function () {
    this.listenTo(this.model.get('chooseSpecModel'), 'change', this.render);
  },
  render: function () {
    this.$el.empty();
    this.$el.html(this.template({
      product: this.model.attributes,
      chooseSpec: this.model.get('chooseSpecModel').attributes
    }));

    this.$el.find('.good_ggchioce>li.select').removeClass('select');

    var chooseSpecIndex = this.model.get('chooseSpecIndex');
    if (chooseSpecIndex >= 0) {
      this.$el.find('.good_ggchioce>li:eq(' + chooseSpecIndex + ')').addClass('select');
    }

    return this;
  },
  switchSpecEvent: function (e) {
    var el = $(e.currentTarget);
    if (el.hasClass('select')) {
      this.model.set('chooseSpecIndex', -1);
    } else {
      this.model.set('chooseSpecIndex', el.index());
    }
  },
  setPurchaseNum: function (e, plus) {
    var chooseSpecModel = this.model.get('chooseSpecModel');
    var el = $(e.currentTarget);
    var inputEl = el.siblings('input');
    var count = parseInt(inputEl.val());
    count = plus ? count + 1 : count - 1;
    if (chooseSpecModel.purchasable(count)) {
      inputEl.val(count);
    } else {
      // TODO

    }
  },
  decreaseNumEvent: function (e) {
    this.setPurchaseNum(e, false);
  },
  increaseNumEvent: function (e) {
    this.setPurchaseNum(e, true);
  }
});