'use strict';
var util = require('util/util.js');

var _address = {
    /** 获取地址列表 **/
    getAddressList: function (resolve, reject) {
        util.request({
            url:     util.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },
            success: resolve,
            error:   reject
        });
    },
    /** 添加地址 **/
    save: function (receiveInfo, resolve, reject) {
        util.request({
            url:     util.getServerUrl('/shipping/add.do'),
            data: receiveInfo,
            success: resolve,
            error:   reject
        });
    },
    /** 修改地址 **/
    update: function (receiveInfo, resolve, reject) {
        util.request({
            url:     util.getServerUrl('/shipping/update.do'),
            data: receiveInfo,
            success: resolve,
            error:   reject
        });
    },
    /** 删除地址 **/
    deleteAddress: function (shippingId, resolve, reject) {
        util.request({
            url:     util.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error:   reject
        });
    },
    /** 获取单条收件人地址信息 **/
    getAddress: function (shippingId, resolve, reject) {
        util.request({
            url:     util.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error:   reject
        });
    }
};

module.exports = _address;
