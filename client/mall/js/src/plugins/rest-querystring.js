/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/10
 */
var _ = require('underscore');
var Settings = require('../settings.json');

module.exports = {
  qEnd: function() {
    this.queryString = this.queryString || '';

    if (this.queryString !== '') {
      this.queryString = this.queryString.substring(0, this.queryString.length - 1);
    }

    if (Settings.env === 'debug') {
      console.log('Collection \'' + this.name + '\' qEnd: queryString is ' + this.queryString);
    }

    var str = this.queryString;
    delete this.queryString;
    return str;
  },
  qFields: function (fields) {
    var queryString = '';
    for (var key in fields) {
      queryString += 'filter[fields][' + key + ']=' + fields[key] + '&';
    }

    if (Settings.env === 'debug') {
      console.log('Collection \'' + this.name + '\' qFields: queryString is ' + queryString);
    }

    this.queryString = this.queryString || '';
    this.queryString += queryString;
    return this;
  },
  qIncludes: function (includes) {
    var queryString = '';
    var include;

    if (typeof includes === 'string') {
      includes = [includes];
    }

    for (var key in includes) {
      include = includes[key];
      if (typeof include === 'string') {
        queryString += 'filter[include]=' + include + '&';
      } else if (_.isArray(include)) {
        for (var index in include) {
          queryString += 'filter[include][' + key + ']=' + include[index] + '&';
        }
      } else {
        // TODO
      }
    }

    if (Settings.env === 'debug') {
      console.log('Collection \'' + this.name + '\' qIncludes: queryString is ' + queryString);
    }

    this.queryString = this.queryString || '';
    this.queryString += queryString;
    return this;
  },
  qLimit: function (limit) {
    var queryString = '';

    queryString += 'filter[limit]=' + limit + '&';

    if (Settings.env === 'debug') {
      console.log('Collection \'' + this.name + '\' qLimit: queryString is ' + queryString);
    }

    this.queryString = this.queryString || '';
    this.queryString += queryString;
    return this;
  },
  qSkip: function (skip) {
    var queryString = '';

    queryString += 'filter[skip]=' + skip + '&';

    if (Settings.env === 'debug') {
      console.log('Collection \'' + this.name + '\' qSkip: queryString is ' + queryString);
    }

    this.queryString = this.queryString || '';
    this.queryString += queryString;
    return this;
  },
  qOrder: function (orders) {
    var queryString = '';
    var keyName;
    if (_.isArray(orders)) {
      var order;

      for (var i in orders) {
        order = orders[i];
        keyName = _.keys(order)[0];
        queryString += 'filter[order][' + i + ']=' + keyName + ' ' + order[keyName] + '&';
      }
    } else {
      keyName = _.keys(orders)[0];
      queryString += 'filter[order]=' + keyName + ' ' + orders[keyName] + '&';
    }

    if (Settings.env === 'debug') {
      console.log('Collection \'' + this.name + '\' qOrder: queryString is ' + queryString);
    }

    this.queryString = this.queryString || '';
    this.queryString += queryString;
    return this;
  },
  qWhere: function (wheres) {
    var queryString = '';
    var where;
    for (var key in wheres) {
      where = wheres[key];
      if (!_.isObject(where)) {

        queryString += 'filter[where][' + key + ']' + '=' + where + '&';

      } else if (key === 'and' || key === 'or') {

        var andOrValue;
        if (_.isArray(where)) {
          for (var index in where) {
            andOrValue = where[index];
            var keyName = _.keys(andOrValue)[0];
            queryString += 'filter[where][' + key + '][' + index + '][' + keyName + ']=' + andOrValue[keyName] + '&';
          }
        } else {
          // TODO
        }

      } else {

        var opValue;
        for (var op in where) {
          opValue = where[op];
          switch (op) {
            case 'neq':
            case 'gt':
            case 'gte':
            case 'lt':
            case 'lte':
            case 'like':
            case 'nlike':
              queryString += 'filter[where][' + key + '][' + op + ']=' + opValue + '&';
              break;
            case 'inq':
            case 'nin':
              if (_.isArray(opValue)) {
                for (var index in opValue) {
                  queryString += 'filter[where][' + key + '][' + op + ']=' + opValue[index] + '&';
                }
              }
              break;
            case 'between':
              if (_.isArray(opValue) && opValue.length === 2) {
                queryString += 'filter[where][' + key + '][' + op + '][0]=' + opValue[0] + '&';
                queryString += 'filter[where][' + key + '][' + op + '][1]=' + opValue[1] + '&';
              }
              break;
          }
        }
      }

    }

    if (Settings.env === 'debug') {
      console.log('Collection \'' + this.name + '\' qWhere: queryString is ' + queryString);
    }

    this.queryString = this.queryString || '';
    this.queryString += queryString;
    return this;
  }
};