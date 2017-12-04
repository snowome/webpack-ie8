'use strict';
require('./index.css');
var $ = require('jquery');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var util          = require('util/util.js');
var _order        = require('service/order-service.js');
var _address      = require('service/address-service.js');
var addressListTemplate = require('./address-list.string');
var productListTemplate = require('./product-list.string');
var addressModel = require('./address-model.js');


var page = {
    data: {
        selectAddressId: null
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.address-item', function () {
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectAddressId = $(this).data('id');
        });
        $(document).on('click', '#orderSubmit', function () {
            var shippingId = _this.data.selectAddressId;
            if (shippingId) {
                _order.createOrder({
                    shippingId: shippingId
                }, function (res) {
                    window.location.href = './payment.html?orderNum=' + res.orderNo;
                }, function (errMsg) {
                    util.errorTips(errMsg);
                });
            } else {
                util.errorTips('请选择地址后再提交');
            }
        });
        $(document).on('click', '#addressAdd', function () {
            addressModel.show({
                isUpdate: false,            // 区分添加还是编辑
                unSuccess: function () {
                    _this.loadAddressList();
                }
            });
        });
        $(document).on('click', '.address-update', function (e) {
            e.stopPropagation();
            var shippingId = $(this).closest('.address-item').data('id');
            _address.getAddress(shippingId, function (res) {
                addressModel.show({
                    isUpdate: true,            // 区分添加还是编辑
                    data: res,
                    unSuccess: function () {
                        _this.loadAddressList();
                    }
                });
            }, function (errMsg) {
                util.errorTips(errMsg);
            });
        });
        $(document).on('click', '.address-delete', function (e) {
            e.stopPropagation();
            var shippingId = $(this).closest('.address-item').data('id');
            if (window.confirm('确认要删除该地址吗？')) {
                _address.deleteAddress(shippingId, function () {
                    _this.loadAddressList();
                }, function (errMsg) {
                    util.errorTips(errMsg);
                });
            }
        });
    },
    loadAddressList: function () {
        var _this = this;
        var $addressCon = $('#addressCon');
        $addressCon.html('<div class="loading"></div>');
        _address.getAddressList(function (res) {
            _this.addressFilter(res);
            var addressListHTML = util.renderHtml(addressListTemplate, res);
            $addressCon.html(addressListHTML);
        }, function () {
            $addressCon.html('<div class="error-tip">地址加载失败，请刷新后重试</div>');
        })
    },
    addressFilter: function (data) {
        if (this.data.selectAddressId) {
            var selectAddressIdFlag = false;
            for (var i=0,len=data.list.length; i<len; i++) {
                if (data.list[i].id === this.data.selectAddressId) {
                    data.list[i].isActive = true;
                    selectAddressIdFlag = true;
                }
            }
            if (!selectAddressIdFlag) {
                this.data.selectAddressId = null;
            }
        }
    },
    loadProductList: function () {
        var $productCon = $('#productCon');
        $productCon.html('<div class="loading"></div>');
        _order.getProductList(function (res) {
            var productListHTML = util.renderHtml(productListTemplate, res);
            $productCon.html(productListHTML);
        }, function () {
            $productCon.html('<div class="error-tip">商品信息加载失败，请刷新后重试</div>');
        })
    }
};

$(function () {
    page.init();
});
