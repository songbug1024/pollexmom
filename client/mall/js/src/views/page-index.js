/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
var Page = require('../base/page');
var HeaderView = require('./header');
var FirstLevelCatView = require('./first-level-cat');
var AdBoardView = require('./ad-board');
var ProductListIndexView = require('./product-list-index');

module.exports = Page.extend({
  id: 'index-page',
  initialize: function () {
  },
  render: function () {
    this.$el.empty();
    this.$el.append(new HeaderView().render().el);
    this.$el.append(new FirstLevelCatView().render().el);
    this.$el.append(new AdBoardView({sliderId: 'index-page-slider'}).el);
    this.$el.append(new ProductListIndexView().el);
    this.$el.append('<div class="blank66"></div>');
    return this;
  }
});