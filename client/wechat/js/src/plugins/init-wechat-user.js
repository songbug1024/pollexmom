/**
 * Created by fuwensong on 15-5-13.
 */
var async = require('async');
var Settings = require('../settings.json');
var UserModel = require('../models/user');
var UserPersonalInfoModel = require('../models/user-personal-info');
//var DeliveryAddressModel = require('../models/delivery-address');

function initWeChatUserInfo(weChatData, callback) {
    if (Settings.env === 'debug') {
        console.log('initWeChatUserInfo: weChatData is ' + weChatData.toString());
    }

    var weChatId = weChatData.openid;
    var username = weChatData.nickname;
    var gender = !!weChatData.sex;
    var country = weChatData.country;
    var language = weChatData.language;
    var province = weChatData.province;
    var city = weChatData.city;
    var avatar = weChatData.headimgurl;
    var desc = weChatData.remark;

    async.waterfall([
        function loadUserInfo(callback) {
            var userModel = new UserModel({weChatId: weChatId});
            userModel.url = userModel.weChatUrl(weChatId, []);
            userModel.fetch({
                success: function (model) {
                    callback(null, model);
                },
                error: function (model, err) {
                    if (err.status == '404') {
                        callback(null, model);
                    } else {
                        callback(err);
                    }
                }
            });
        },
        function verifyRegisterWeChatUser(user, callback) {
            if (user.id) {
                callback(null, user);
            } else {
                async.waterfall([
                    function saveUser(callback) {
                        user.url = user.weChatRegisterUrl();
                        user.save({
                            userNumber: weChatId,
                            username: username,
                            avatar: avatar,
                            desc: desc,
                            status: 1
                        }, {
                            success: function (model) {
                                callback(null, model);
                            },
                            error: function (model, err) {
                                callback(err);
                            }
                        });
                    },
                    function saveUserPersonalInfo(user) {
                      var personalInfoModel = new UserPersonalInfoModel({
                        userId: user.id,
                        gender: gender,
                        country: country,
                        language: language,
                        province: province,
                        city: city
                      });
                      personalInfoModel.save(personalInfoModel.attributes, {
                        success: function (model) {
                          user.set({
                            personalInfo: model.attributes
                          });

                          callback(null, user);
                        },
                        error: function (model, err) {
                          callback(err);
                        }
                      });
                        /*
                        async.parallel([
                            function savePersonalInfo(callback) {
                                var personalInfoModel = new UserPersonalInfoModel({
                                    userId: model.id,
                                    gender: gender
                                });
                                personalInfoModel.save(personalInfoModel.attributes, {
                                    success: function (model) {
                                        callback(null, model);
                                    },
                                    error: function (model, err) {
                                        callback(err);
                                    }
                                });
                            },
                            function saveDeliveryAddress(callback) {
                                var deliveryAddressModel = new DeliveryAddressModel({
                                    userId: model.id,
                                    provinceName: province,
                                    cityName: city
                                });
                                deliveryAddressModel.save(deliveryAddressModel.attributes, {
                                    success: function (model) {
                                        callback(null, model);
                                    },
                                    error: function (model, err) {
                                        callback(err);
                                    }
                                });
                            }
                        ], function (err, results) {
                            if (err) {
                                return console.error('saveUserOtherInfo error ' + err);
                            }
                            var personalInfo = results[0];
                            var deliveryAddress = results[1];
                            model.set({
                                personalInfo: personalInfo.attributes,
                                deliveryAddresses: [deliveryAddress.attributes]
                            });
                            callback(null, model)
                        });
                        */
                    },
                ], function (err, user) {
                    if (err) {
                        console.error('verifyRegisterWeChatUser error ' + err);
                        return callback(err);
                    }
                    callback(null, user);
                });
            }
        }
    ], function (err, user) {
        if (err) {
            console.error('initWeChatUserInfo error ' + err);
            return callback(err);
        }

        sessionStorage.setItem(Settings.locals.userInfo, JSON.stringify(user.toJSON()));
        callback(null, user.toJSON());
    });
}

module.exports = initWeChatUserInfo;
