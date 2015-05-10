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
var Page = require('../base/page');
var FooterNavbarView = require('./footer-navbar');
var template = require('../templates/product-detail.tpl');
var ProductDetailSpecView = require('./product-detail-spec');

module.exports = Page.extend({
  id: 'product-detail-page',
  template: _.template(template),
  events: {
    'click .good_tabT>li': 'switchTabEvent'
  },
  initialize: function () {
    this.model.fetch({url: this.model.detailUrl()});

    this.listenToOnce(this.model, 'change', this.render);
  },
  render: function (model) {
    model = model || this.model;
    var sliderId = 'product-detail-preview-slider';
    this.$el.empty();
    this.$el.attr('data-product-id', model.id);
    this.$el.html(this.template({
      sliderId: sliderId,
      product: model.attributes
    }));
    var specDetailEl = this.$el.find('.spec-detail');
    specDetailEl.before(new ProductDetailSpecView({model: model}).el);
    specDetailEl.after(new FooterNavbarView().render().el);

    var previewImagesJson = model.get('previewImagesJson');
    if (previewImagesJson && previewImagesJson.length > 0) {
      TouchSlide({
        slideCell: "#" + sliderId,
        titCell: ".hd ul",
        mainCell: ".bd ul",
        effect: "leftLoop",
        autoPage: true,
        autoPlay: true
      });
    }

    this.model.set('chooseSpecIndex', 0);
    return this;
  },
  switchTabEvent: function (e) {
    var el = $(e.currentTarget);
    var selector = '';

    if (!el.hasClass('active')) {
      if (el.hasClass('btn-spec')) {
        selector = '.tab-spec';
      } else if (el.hasClass('btn-images')) {

        if (!this.isInitDetailImages) {
          $('.spec-detail .tab-images .good_cont img').each(function () {
            $(this).attr('src', $(this).attr('data-src'));
          });
          this.isInitDetailImages = true;
        }
        selector = '.tab-images';
      }

      el.siblings('.active').removeClass('active').addClass('normal');
      el.removeClass('normal').addClass('active');
      $('.spec-detail .good_cs').addClass('none');
      $('.spec-detail .good_cs' + selector).removeClass('none');
    }

  }
});