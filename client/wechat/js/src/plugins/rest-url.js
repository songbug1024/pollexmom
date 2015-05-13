/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/10
 */
var _ = require('underscore');
var Settings = require('../settings.json');

module.exports = {
  baseUrl: Settings.apiRoot,
  plural: 'unknown',
  urlRoot: function () {
    return this.baseUrl + this.plural;
  },
  idUrl: function () {
    return this.urlRoot() + (this.id ? '/' + this.id : '');
  },
  url: function () {
    return this.idUrl();
  },
  relations: {
    /*
    users: {
      foreignKey: 'userId',
      humpTypePlural: 'personalInfo',
    }
    */
  },
  relationUrl: function (key) {
    var relation = this.relations[key];

    if (!relation) {
      return console.error('Model \'' + this.name + '\' relationUrl error: <' + key + '> not found.');
    }

    var foreignValue = this.get(relation.foreignKey) || this[relation.foreignKey];
    if (!foreignValue) {
      console.error('Model \'' + this.name + '\' relationUrl error: <' + relation.foreignKey + '> is invalid.');
    }

    return this.baseUrl + key + '/'+ foreignValue + '/' + relation.humpTypePlural;
  }
  /*
  humpTypePlural: function  (plural, separator) {
    separator = separator || '-';

    var str = '';
    var parts = plural.split('-');

    if (parts.length < 1) {

    } else
    for (var i in parts) {
    }
  }*/
};