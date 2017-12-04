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
        $('#userName').blur(function () {
            var userName = $.trim($(this).val());
            if (!userName) {
                return;
            }
            _user.checkUserName(userName, function (msg) {
                formError.hide();
            }, function (err) {
                formError.show(err);
            });
        });
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
            username:        $.trim($('#userName').val()),
            password:        $.trim($('#password').val()),
            passwordConfirm: $.trim($('#rePassword').val()),
            phone:           $.trim($('#phone').val()),
            email:           $.trim($('#email').val()),
            question:        $.trim($('#question').val()),
            answer:          $.trim($('#answer').val()),
        };
        var validateResult = this.formValidate(formData);
        if (validateResult.status) {
            _user.register(formData, function (res) {
                //window.location.href = './result.html?type=register';
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
        if (formData.password.length < 6) {
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
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
