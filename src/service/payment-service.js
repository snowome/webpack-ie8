'use strict';
var util = require('util/util.js');

var _payment = {
    getPaymentInfo: function (orderNumber, resolve, reject) {
        util.request({
            url:     util.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error:   reject
        });
    },
    /** 监听订单状态 **/
    getPaymentStatus: function (orderNumber, resolve, reject) {
        util.request({
            url:     util.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error:   reject
        });
    }
};

module.exports = _payment;
