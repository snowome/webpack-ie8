'use strict';
require('./index.css');
var $ = require('jquery');
var util = require('util/util.js');
var template = require('./index.string');

/** 侧边导航 **/
var _navSide = {
    option: {
        name: '',
        navList: [
            { name: 'user-center', desc: '个人中心', href: './user-center.html' },
            { name: 'order-list', desc: '我的订单', href: './order-list.html' },
            { name: 'user-pass-update', desc: '修改密码', href: './user-pass-update.html' },
            { name: 'about', desc: '关于MMail', href: './about.html' }
        ]
    },
    init : function (option) {
        $.extend(this.option, option);
        this.renderNav();
    },
    /** 渲染导航菜单 **/
    renderNav: function () {
        for ( var i=0, iLength = this.option.navList.length; i<iLength; i++ ) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        }
        var navHTML = util.renderHtml(template, {
            navList: this.option.navList
        });

        $('#navSideList').html(navHTML);
    }

};
module.exports = _navSide;


