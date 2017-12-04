'use strict';
require('./index.css');
var $ = require('jquery');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var util         = require('util/util.js');
var _payment     = require('service/payment-service.js');
var htmlTemplate = require('./index.string');

var page = {
    data: {
        orderNumber: util.getUrlParam('orderNum')
    },
    init: function () {
        this.onLoad();

    },
    onLoad: function () {
        this.loadPaymentInfo();
    },

    loadPaymentInfo: function () {
        var _this           = this,
            paymentHTML = '',
            $pageWrap        = $('#pageWrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function (res) {
            paymentHTML = util.renderHtml(htmlTemplate, res);
            $pageWrap.html(paymentHTML);
            _this.listenOrderStatus();
        }, function (errMsg) {
            $pageWrap.html('<p class="error-tip">' + errMsg + '</p>');
        });
    },
    /** 监听订单状态 **/
    listenOrderStatus: function () {
        var _this = this;
        this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber, function (res) {
                if (res === true) {
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            }, function (errMsg) {

            });
        }, 5e3);
    }

};

$(function () {
    page.init();
});
