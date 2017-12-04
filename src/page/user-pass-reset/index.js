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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadStepUserName();
    },
    bindEvent: function () {
        var _this = this;
        $('#submitUserName').click(function () {
            var username = $.trim($('#userName').val());
            if (username) {
                _user.getQuestion(username, function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入用户名');
            }
        });
        $('#submitQuestion').click(function () {
            var answer = $.trim($('#answer').val());
            if (answer) {
                var data = {
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                };
                _user.checkAnswer(data, function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入密码提示问题答案');
            }
        });
        $('#submitPassword').click(function () {
            var password = $.trim($('#password').val());
            if (password && password.length>=6) {
                var data = {
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                };
                _user.resetPassword(data, function (res) {
                    window.location.href = './result.html?type=pass-reset';
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入6位以上的新密码');
            }
        });
    },
    loadStepUserName: function () {
        $('#stepUsername').show();
    },
    loadStepQuestion: function () {
        formError.hide();
        $('#stepUsername').hide().siblings('#stepQuestion').show().find('.question').text(this.data.question);
    },
    loadStepPassword: function () {
        formError.hide();
        $('#stepQuestion').hide().siblings('#stepPassword').show();
    },
};

$(function () {
    page.init();
});
