'use strict';
var util = require('util/util.js');

var _product = {
    /** 加载购物车数量 **/
    getProductList: function (listParam, resolve, reject) {
        util.request({
            // type:    'POST',
            url:     util.getServerUrl('/product/list.do'),
            data:    listParam,
            success: resolve,
            error:   reject,
        });
    },
    /** 加载购物车数量 **/
    getProductDetail: function (productId, resolve, reject) {
        util.request({
            // type:    'POST',
            url: util.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject,
        });
    },
};

module.exports = _product;
