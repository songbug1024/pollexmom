/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 */
var _ = require('underscore');
var Backbone = require('backbone');
var Settings = require('../settings.json');
var RestQueryString = require('./rest-querystring');
var Model = {};

_.extend(Model, RestQueryString, {
  name: 'unknown',
  baseUrl: Settings.apiRoot,
  idUrl: function () {
    return this.urlRoot() + '/' + this.id;
  },
  constructor: function() {
    Backbone.Model.apply(this, arguments);
  },
  initialize: function () {
    if (Settings.env === 'debug') {
      console.log('Model initialize.');
    }
  },
  sync: function(method, model, options) {
    if (Settings.env === 'debug') {
      console.log('Model \'' + this.name + '\' sync: method is ' + method);
      console.log('Model \'' + this.name + '\' sync: model is ' + model.toJSON());
      console.log('Model \'' + this.name + '\' sync: options is ' + options);
    }
    return Backbone.sync(method, model, options);
  }
});

module.exports = Backbone.Model.extend(Model);