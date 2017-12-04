'use strict';
require('./index.css');
var $ = require('jquery');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide      = require('page/common/nav-side/index.js');
var util         = require('util/util.js');
var _order       = require('service/order-service.js');
var htmlTemplate = require('./index.string');

var page = {
    data: {
       orderNumber: util.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        navSide.init({
            name: 'order-list'
        });
        this.loadDetail();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.order-cancel', function () {
            if (window.confirm('确实要取消该订单吗？')) {
                _order.cancelOrder(_this.data.orderNumber, function () {
                    util.successTips('该订单取消成功');
                    _this.loadDetail();
                }, function (errMsg) {
                    util.errorTips(errMsg);
                });
            }
        });
    },
    loadDetail: function () {
        var _this           = this,
            orderDetailHTML = '',
            $content        = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function (res) {
            _this.dataFilter(res);
            orderDetailHTML = util.renderHtml(htmlTemplate, res);
            $content.html(orderDetailHTML);
        }, function (errMsg) {
            $content.html('<p class="error-tip">' + errMsg + '</p>');
        });
    },
    dataFilter: function (data) {
        data.needPay      = data.status === 10;
        data.isCancelable = data.status === 10;
    }
};

$(function () {
    page.init();
});
