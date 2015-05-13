/**
 * @Description:
 * @Author: fuwensong
 * @Date: 2015/5/9
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
var _ = require('underscore');
var $ = require('jquery');
var Page = require('../base/page');
var template = require('../templates/edit-delivery-address.tpl');
var Settings = require('../settings.json');
var DeliveryAddressModel = require('../models/delivery-address');
var DeliveryAddresses = require('../delivery-addresses.json');

module.exports = Page.extend({
  id: 'delivery-address-page',
  template: _.template(template),
  events: {
    'click .btn_shedit a': 'saveBtnEvent'
  },
  initialize: function (options) {
    var ids = options.ids;
    if (!ids) {
      console.error('Generate order error: ids is invalid.');
      return window.pollexmomApp.navigate("/shopping-cart", {trigger: true});
    }
    this.ids = ids;

    var itemId = options.addressId;
    var storedDeliveryAddress = localStorage.getItem(Settings.locals.userDeliveryAddress);
    var deliveryAddress = {
      userId: window._currentUserId
    };
    if (itemId && storedDeliveryAddress) {
      storedDeliveryAddress = JSON.parse(storedDeliveryAddress);
      deliveryAddress = _.findWhere(storedDeliveryAddress);
    }

    var deliveryAddress = new DeliveryAddressModel(deliveryAddress);
    this.model = deliveryAddress;
  },
  render: function () {
    var self = this;
    this.$el.empty();

    var locals = {
      provinces: _.pluck(DeliveryAddresses, 'name'),
      model: this.model ? this.model.attributes : {}
    };
    if (this.model.id) {
      var cities = _.findWhere(DeliveryAddresses, {name: this.model.get('provinceName')}).cities;
      locals.cities = _.pluck(cities, 'name');
      var regions = _.findWhere(cities, {name: this.model.get('cityName')}).regions;
      locals.regions = _.pluck(regions, 'name');
    }

    this.$el.html(this.template(locals));
    this.$el.append('<div class="blank66"></div>');

    this.$el.find('select').change(function (e) {
      self.selectChangeEvent(e);
    });
    return this;
  },
  selectChangeEvent: function (e) {
    var el = $(e.currentTarget);
    var value = el.val();
    var label = '-请选择-';

    if (value) {
      label = value;
    }
    el.prev('label').text(label);

    if (el.hasClass('address_province')) {

      this.resetCitySelect(value);
      this.resetAreaSelect(value);

    } else if (el.hasClass('address_city')) {

      this.resetAreaSelect(this.$el.find('select.address_province').val(), value);

    } else if (el.hasClass('address_area')) {
      // DO Noting
    }
  },
  resetCitySelect: function (province) {
    var cityEl = this.$el.find('select.address_city');
    cityEl.html('<option value="">-请选择-</option>');
    cityEl.prev('label').text('-请选择-');

    if (province) {
      var cities = _.findWhere(DeliveryAddresses, {name: province}).cities;
      if (cities && cities.length > 0) {
        cities = _.pluck(cities, 'name');
        _.each(cities, function (city) {
          cityEl.append('<option value="' + city + '">' + city + '</option>');
        });
      }
    }
  },
  resetAreaSelect: function (province, city) {
    var areaEl = this.$el.find('select.address_area');
    areaEl.html('<option value="">-请选择-</option>');
    areaEl.prev('label').text('-请选择-');

    if (province && city) {
      var cities = _.findWhere(DeliveryAddresses, {name: province}).cities;
      if (cities && cities.length > 0) {
        var areas = _.findWhere(cities, {name: city}).regions;

        areas = _.pluck(areas, 'name');
        _.each(areas, function (area) {
          areaEl.append('<option value="' + area + '">' + area + '</option>');
        });
      }
    }
  },
  saveBtnEvent: function (e) {
    var self = this;
    var ids = this.ids;
    var consigneeName = this.$el.find('input.consigneeName').val();
    var consigneeTel = this.$el.find('input.consigneeTel').val();
    var provinceName = this.$el.find('select.address_province').val();
    var cityName = this.$el.find('select.address_city').val();
    var regionName = this.$el.find('select.address_area').val();
    var detailAddress = this.$el.find('textarea.detailAddress').val();

    if (consigneeName
      && consigneeTel
      && provinceName
      && cityName
      && regionName
      && detailAddress && detailAddress.length > 6) {

      var isEdit = this.model && this.model.id;

      this.model.url = isEdit
        ? this.model.idUrl()
        : this.model.relationUrl('users');

      this.model.save({
        consigneeName: consigneeName,
        consigneeTel: consigneeTel,
        provinceName: provinceName,
        cityName: cityName,
        regionName: regionName,
        detailAddress: detailAddress
      }, {
        success: function (model, err) {
          self.insertOrUpdateCache(isEdit, model.toJSON());

          alert(isEdit ? '编辑成功' : '新增成功');
          window.pollexmomApp.navigate("/generate-order/" + ids, {trigger: true});
        },
        error: function (model, err) {
          alert(isEdit ? '编辑失败' : '新增失败');
          window.pollexmomApp.navigate("/generate-order/" + ids, {trigger: true});
        }
      });
    }
  },
  insertOrUpdateCache: function (isEdit, address) {
    var storedAddress = JSON.parse(localStorage.getItem(Settings.locals.userDeliveryAddress));
    storedAddress = storedAddress || [];

    if (isEdit) {
      _.extend(_.findWhere(storedAddress, {id: address.id}), address);
    } else {
      storedAddress.push[address];
    }
    localStorage.setItem(Settings.locals.userDeliveryAddress, JSON.stringify(storedAddress));
  }
});