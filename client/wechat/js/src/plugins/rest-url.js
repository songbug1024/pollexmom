/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/10
 */
var _ = require('underscore');
var Settings = require('../settings.json');

module.exports = {
  relations: [],
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
};