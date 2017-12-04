'use strict';
var $ = require('jquery');
require('page/user-center/index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var util = require('util/util.js');
var _user = require('service/user-service.js');

var htmlTemplate = require('./index.string');

var page = {
    init: function () {
        this.onLoad();
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
};

$(function () {
    page.init();
});
