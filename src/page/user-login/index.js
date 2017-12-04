'use strict';
var $ = require('jquery');
require('page/common/nav-simple/index.js');
require('./index.css');
var util = require('util/util.js');
var _user = require('service/user-service.js');

var formError = {
    show: function (errMsg) {
        $('#errItem').show().find('.errMsg').text(errMsg);
    },
    hide: function () {
        $('#errItem').hide().find('.errMsg').text('');
    }
};

var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $('#submit').click(function () {
            _this.submit();
        });
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }

        });
    },
    submit: function () {
        var formData = {
            username: $.trim($('#userName').val()),
            password: $.trim($('#password').val()),
        };
        var validateResult = this.formValidate(formData);
        if (validateResult.status) {
            _user.login(formData, function (res) {
                window.location.href = util.getUrlParam('redirect') || './index.html';
            }, function (errMsg) {
                formError.show(errMsg);
            });
        } else {
            formError.show(validateResult.msg);
        }
    },
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        }
        if (!util.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!util.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
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
