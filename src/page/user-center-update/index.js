'use strict';
var $ = require('jquery');
require('page/user-center-update/index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var util = require('util/util.js');
var _user = require('service/user-service.js');
var htmlTemplate = require('./index.art');

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    loadUserInfo: function () {
        var userHtml = '';
        _user.getUserInfo(function (res) {
            userHtml = util.renderHtml(htmlTemplate, res);
            $('#panelBody').html(userHtml);
        }, function (errMsg) {
            util.errorTips(errMsg);
        });
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '#btnSubmit', function () {
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            };
            var validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                _user.updateUserInfo(userInfo, function (data, msg) {
                    util.successTips(msg);
                    window.location.href = './user-center.html';
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
        if (!util.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!util.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }

        if (!util.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!util.validate(formData.answer, 'require')) {
            result.msg = '密码提示问题的答案不能为空';
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
