/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
var Settings = require('../settings.json');
var _ = require('underscore');
var View = require('../base/view');
var template = require('../templates/ad-board.tpl');
var AdBoardCollection = require('../collections/ad-board');

module.exports = View.extend({
  name: 'AdBoard',
  role: 'slider',
  className: 'banner',
  template: _.template(template),
  initialize: function (options) {
    options = options || {};
    if (!options.sliderId) console.error('Not set sliderId');
    this.sliderId = options.sliderId;

    var collection = new AdBoardCollection();
    collection.fetch({reset: true});

    this.listenTo(collection, 'reset', this.render);
  },
  render: function (collection) {
    this.$el.empty();

    var items = [];
    if (collection) {
      items = _.first(collection.toJSON(), Settings.adBoardSize);
    }
    this.$el.html(this.template({items: items, sliderId: this.sliderId}));

    if (collection) {
      TouchSlide({
        slideCell: "#" + this.sliderId,
        titCell: ".hd ul",
        mainCell: ".bd ul",
        effect: "leftLoop",
        autoPage: true,
        autoPlay: true
      });
    }
    return this;
  }
});