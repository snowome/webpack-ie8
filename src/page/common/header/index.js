'use strict';
require('./index.css');
var $ = require('jquery');
var util = require('util/util.js');

/** 通用页面头部 **/
var _header = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        var keyword = util.getUrlParam('keyword');
        if (keyword) {
            $('#searchInput').val(keyword);
        }
    },
    bindEvent: function () {
        var self = this;
        $('#searchBtn').click(function () {
            self.searchSubmit();
        });
        $('#searchInput').keyup(function (e) {
            if (e.keyCode === 13) {
                self.searchSubmit();
            }
        });
    },
    searchSubmit: function () {
        var keyword = $.trim($('#searchInput').val());
        if (keyword) {
            window.location.href="./list.html?keyword=" + keyword;
        } else {
            util.goHome()
        }
    }
};

_header.init();
