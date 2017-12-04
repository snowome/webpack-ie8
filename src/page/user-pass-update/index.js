'use strict';
var $ = require('jquery');
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var util = require('util/util.js');
var _user = require('service/user-service.js');

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '#btnSubmit', function () {
            var userInfo = {
                password:        $.trim($('#oldPass').val()),
                passwordNew:     $.trim($('#newPass').val()),
                passwordConfirm: $.trim($('#confirmPass').val())
            };
            var validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function (data, msg) {
                    util.successTips(msg);
                }, function (errMsg) {
                    util.errorTips(errMsg);
                });
            } else {
                util.errorTips(validateResult.msg);
            }
        });
    },
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        }
        if (!util.validate(formData.password, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        if (!formData.passwordNew || formData.passwordNew.length<6) {
            result.msg = '密码长度不能少于6位';
            return result;
        }
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

$(function () {
    page.init();
});
