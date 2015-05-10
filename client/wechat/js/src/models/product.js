/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var _ = require('underscore');
var Model = require('../base/model');
var ProductSpecModel = require('./product-spec');

module.exports = Model.extend({
  name: 'Product',
  defaults: {
    chooseSpecIndex: -1,
    previewImages: "[]",
    detailImages: "[]",
    previewImagesJson: [],
    detailImagesJson: []
  },
  urlRoot: function () {
    return this.baseUrl + 'products';
  },
  initialize: function () {
    this.on('change:previewImages change:detailImages', this.parseJsonProperties);
    this.parseJsonProperties(this);

    this.on('change:chooseSpecIndex', this.resetChooseSpecModel);
    this.set('chooseSpecModel', new ProductSpecModel());
  },
  parseJsonProperties: function(model) {
    var value;

    value = model.get('previewImages');
    if (value) {
      model.set('previewImagesJson', JSON.parse(value));
    }

    value = model.get('detailImages');
    if (value) {
      model.set('detailImagesJson', JSON.parse(value));
    }
  },
  detailUrl: function() {
    return this.urlRoot() + '/detail?id=' + this.id;
  },
  resetChooseSpecModel: function (model, value) {
    var specifications = model.get('specifications');
    var chooseSpecModel = model.get('chooseSpecModel');

    if (value >= 0 && specifications && !_.isEmpty(specifications)) {
      chooseSpecModel.set(specifications[value]);
    } else {
      chooseSpecModel.clear();
    }
  }
});