'use strict';
require('./index.css');
var $ = require('jquery');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide      = require('page/common/nav-side/index.js');
var util         = require('util/util.js');
var _order       = require('service/order-service.js');
var Pagination   = require('util/pagination/index.js');
var htmlTemplate = require('./index.string');

var page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        navSide.init({
            name: 'order-list'
        });
        this.loadOrderList();
    },
    loadOrderList: function () {
        var _this = this,
            orderListHTML = '',
            $listCon = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam, function (res) {
            orderListHTML = util.renderHtml(htmlTemplate, res);
            $listCon.html(orderListHTML);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function () {
            $listCon.html('<p class="error-tip">加载订单失败，请刷新后重试</p>');
        });
    },
    loadPagination: function (pageInfo) {
        var _this = this;
        if (this.pagination === undefined) {
            this.pagination = new Pagination();
        }
        this.pagination.render($.extend({}, pageInfo, {
            container: $('#pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};

$(function () {
    page.init();
});
