'use strict';
var $ = require('jquery');
var Hogan = require('hogan');
var HandleBars = require('node_modules/handlebars/dist/handlebars.min.js');

var conf = {
    serverHost: ''
};

var _mm = {
    /** 请求后端数据 **/
    request: function (param) {
        var self = this;
        $.ajax({
            type:     param.type     || 'GET',
            url:      param.url      || '',
            dataType: param.dataType || 'json',
            data:     param.data     || '',
            success: function (res) {
                // 登录成功
                if (res.status === 0 ) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，跳转到登录页
                else if (res.status === 10) {
                    self.doLogin();
                }
                // 请求数据错误
                else if (res.status === 1) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },

    /** 获取服务器地址 **/
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },

    /** 获取 URL 参数 **/
    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substring(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },

    /** 渲染 HTML 模板 **/
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },

    /** 成功提示 **/
    successTips: function (msg) {
        alert(msg || '操作成功');
    },

    /** 错误提示 **/
    errorTips: function (msg) {
        alert(msg || '哪里不对了');
    },

    /** 字段的验证，支持非空判断、手机、邮箱的判断 **/
    validate: function (value, type) {
        var value = $.trim(value);
        // 非空验证
        if (type === 'require') {
            return !!value;
        }
        // 手机号的验证
        if (type === 'phone') {
            return /^1\d{10}$/.test(value);
        }
        // 邮箱的验证
        if (type === 'email') {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },

    /** 统一登录处理 **/
    doLogin: function () {
        window.location.href = './user-login.html?redirect' + encodeURIComponent(window.location.href);
    },

    /** 跳回主页 **/
    goHome: function () {
        window.location.href = './index.html';
    }
};

module.exports = _mm;
