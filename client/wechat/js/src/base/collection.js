/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var _ = require('underscore');
var Backbone = require('backbone');
var Settings = require('../settings.json');
var RestQueryString = require('../plugins/rest-querystring');
var UrlRelations = require('../plugins/rest-url');
var Collection = {};

_.extend(Collection, RestQueryString, UrlRelations, {
  name: 'unknown',
  baseUrl: Settings.apiRoot,
  constructor: function() {
    Backbone.Collection.apply(this, arguments);
  },
  initialize: function () {
    if (Settings.env === 'debug' === 'debug') {
      console.log('Collection initialize.');
    }
  },
  sync: function(method, collection, options) {
    if (Settings.env === 'debug' === 'debug') {
      console.log('Collection \'' + this.name + '\' sync: method is ' + method);
      console.log('Collection \'' + this.name + '\' sync: collection is ' + collection.toJSON());
      console.log('Collection \'' + this.name + '\' sync: options is ' + options);
    }
    return Backbone.sync(method, collection, options);
  }
});

module.exports = Backbone.Collection.extend(Collection);