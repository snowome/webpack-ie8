'use strict';
var util = require('util/util.js');

var _order = {
    /** 获取商品列表 **/
    getProductList: function (resolve, reject) {
        util.request({
            url:     util.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error:   reject
        });
    },
    /** 提交订单 **/
    createOrder: function (orderInfo, resolve, reject) {
        util.request({
            url:     util.getServerUrl('/order/create.do'),
            data: orderInfo,
            success: resolve,
            error:   reject
        });
    },
    /** 加载订单列表**/
    getOrderList: function (lstParam, resolve, reject) {
        util.request({
            url:     util.getServerUrl('/order/list.do'),
            data: lstParam,
            success: resolve,
            error:   reject
        });
    },
    /** 获取订单详情**/
    getOrderDetail: function (orderNumber, resolve, reject) {
        util.request({
            url:     util.getServerUrl('/order/detail.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error:   reject
        });
    },
    /** 取消订单 **/
    cancelOrder: function (orderNumber, resolve, reject) {
        util.request({
            url:     util.getServerUrl('/order/cancel.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error:   reject
        });
    }
};

module.exports = _order;
