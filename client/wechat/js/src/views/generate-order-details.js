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
    this.$el.html(this.template({
      model: this.model ? this.model.attributes : {},
      ids: this.ids
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