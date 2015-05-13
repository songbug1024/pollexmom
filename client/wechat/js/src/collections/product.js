/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var Collection = require('../base/collection');
var Model = require('../models/product');

module.exports = Collection.extend({
  name: 'Product',
  model: Model,
  urlRoot: function () {
    return this.baseUrl + 'products';
  },
  url: function () {
    return this.indexUrl();
  },
  indexUrl: function () {
    var queryString = this.qFields({
      id: 1,
      name: 1,
      price: 1,
      previewImages: 1
    })
      .qLimit(20)
      .qWhere({status: 1})
      .qEnd();
    return this.urlRoot() + '?' + queryString;
  },
  searchUrl: function (keywords) {
    if (!keywords) {
      return console.error('Collection \'' + this.name + '\' searchUrl keywords is invalid.');
    }

    var queryString = this.qFields({
      id: 1,
      name: 1,
      price: 1,
      previewImages: 1
    })
      .qLimit(20)
      .qWhere({
          status: 1,
          name: [{'like': '%' + keywords + '%'}]
        })
      .qEnd();
    return this.urlRoot() + '?' + queryString;
  }
});