'use strict';
var util = require('util/util.js');

var _user = {
    /** 检查用户名是否存在 **/
    checkUserName: function (userName, resolve, reject) {
        util.request({
            type: 'POST',
            url: util.getServerUrl('/user/check_valid.do'),
            data: {
                type: 'username',
                str: userName
            },
            success: resolve,
            error: reject
        });
    },

    /** 注册 **/
    register: function (userInfo, resolve, reject) {
        util.request({
            type: 'POST',
            url: util.getServerUrl('/user/register.do'),
            data: userInfo,
            success: resolve,
            error: reject
        });
    },

    /** 登录 **/
    login: function (userInfo, resolve, reject) {
        util.request({
            type: 'POST',
            url: util.getServerUrl('/user/login.do'),
            data: userInfo,
            success: resolve,
            error: reject
        });
    },
    /** 获取用户密码提示问题 **/
    getQuestion: function (username, resolve, reject) {
        util.request({
            type: 'POST',
            url: util.getServerUrl('/user/forget_get_question.do'),
            data: {
                username: username
            },
            success: resolve,
            error: reject
        });
    },

    /** 检查密码提示问题答案 **/
    checkAnswer: function (userInfo, resolve, reject) {
        util.request({
            type: 'POST',
            url: util.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            success: resolve,
            error: reject
        });
    },

    /** 重置密码 **/
    resetPassword: function (userInfo, resolve, reject) {
        util.request({
            type: 'POST',
            url: util.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
            success: resolve,
            error: reject
        });
    },

    /** 获得个人信息 **/
    getUserInfo: function (resolve, reject) {
        util.request({
            type: 'POST',
            url: util.getServerUrl('/user/get_information.do'),
            success: resolve,
            error: reject
        });
    },

    /** 更新个人信息 **/
    updateUserInfo: function (userInfo, resolve, reject) {
        util.request({
            type: 'POST',
            url: util.getServerUrl('/user/update_information.do'),
            data: userInfo,
            success: resolve,
            error: reject
        });
    },

    /** 登录状态下更新密码 **/
    updatePassword: function (userPass, resolve, reject) {
        util.request({
            type: 'POST',
            url: util.getServerUrl('/user/reset_password.do'),
            data: userPass,
            success: resolve,
            error: reject
        });
    },

    /** 退出登录 **/
    logout: function (resolve, reject) {
        util.request({
            type: 'POST',
            url: util.getServerUrl('/user/logout.do'),
            success: resolve,
            error: reject,
        });
    },

    /** 检查登录状态 **/
    checkLogin: function (resolve, reject) {
        util.request({
            type: 'POST',
            url: util.getServerUrl('/user/get_user_info.do'),
            success: resolve,
            error: reject,
        });
    },
};

module.exports = _user;
