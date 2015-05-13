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
    users: {
      foreignKey: 'userId',

    }
  },
  relationUrl: function (key) {
    var relation = this.relations[key];

    if (!relation) {
      return console.error('Model \'' + this.name + '\' relationUrl error: <' + key + '> not found.');
    }

    var relationValue = this.get(relationKey);
    if (!userId) {
      console.error('Model \'' + this.name + '\' relationUrl error: <' + relationKey + '> is invalid.');
    }

    return this.baseUrl + plural + '/'+ userId + '/deliveryAddresses';
  },
  humpTypePlural: function  (plural, separator) {
    separator = separator || '-';

    var str = '';
    var parts = plural.split('-');
    for (var i in parts) {
    }
  }
};