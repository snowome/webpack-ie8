'use strict';
require('./index.css');
var $ = require('jquery');
var util = require('util/util.js');
var userService = require('service/user-service.js');
var cartService = require('service/cart-service.js');

var _nav = {
    init : function () {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCarCount();
        return this;
    },
    /** 事件 **/
    bindEvent: function () {
        // 登录
        $('#login').click(function () {
            util.doLogin();
        });
        // 注册
        $('#register').click(function () {
            window.location.href = "./user-register.html";
        });
        // 退出
        $('#logout').click(function () {
            userService.logout(function (res) {
                window.location.reload();
            }, function (errMsg) {
                util.errorTips(errMsg);
            });
        });
    },
    /** 加载用户信息 **/
    loadUserInfo: function () {
        userService.checkLogin(function (res) {
            $('#userInfo .notLogin').hide().siblings('.loginJS').show().find('.usernameJS').text(res.username);
        }, function (errMsg) {

        });
    },
    /** 加载购物车数量 **/
    loadCarCount: function () {
        cartService.getCartCount(function (res) {
            $('#navList .cartCount').text(res || 0);
        }, function (errMsg) {
            $('#navList .cartCount').text(0);
        });
    }
};
module.exports = _nav.init();
