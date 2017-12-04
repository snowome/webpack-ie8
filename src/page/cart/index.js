'use strict';
require('./index.css');
var $ = require('jquery');
require('page/common/header/index.js');
var nav           = require('page/common/nav/index.js');
var util          = require('util/util.js');
var _cart         = require('service/cart-service.js');
var indexTemplate = require('./index.string');

var page = {
    data: {
        cartInfo: null
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadCart();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.cart-select', function () {
            var $this = $(this),
                productId = $(this).closest('.cart-table').data('product-id');
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError(errMsg);
                });
            } else {
                _cart.unselectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError(errMsg);
                });
            }
        });
        $(document).on('click', '.cart-select-all', function () {
            var $this = $(this);
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError(errMsg);
                });
            } else {
                _cart.unselectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError(errMsg);
                });
            }
        });
        $(document).on('click', '.count-btn', function () {
            var $this     = $(this),
                $pCount   = $this.siblings('.count-input'),
                currCount = parseInt($pCount.val()),
                type      = $this.hasClass('minus') ? 'minus' : 'plus',
                productId =  $(this).closest('.cart-table').data('product-id'),
                minCount  = 1,
                maxCount  = $pCount.data('max'),
                newCount  = 0;
            if (type === 'plus') {
                if (currCount >= maxCount) {
                    util.errorTips('该商品数量达到上限');
                    return false;
                }
                newCount = currCount + 1;
            } else if (type === 'minus') {
                if (currCount <= minCount ) {
                    return false;
                }
                newCount = currCount - 1;
            }
            _cart.updateProduct({
                productId: productId,
                count    : newCount
            }, function (res) {
                _this.renderCart(res);
            }, function (errMsg) {
                _this.showCartError(errMsg);
            });
        });
        $(document).on('click', '.cart-delete', function () {
            if (window.confirm('确认删除该商品？')) {
                var productId =  $(this).closest('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        $(document).on('click', '.delete-selected', function () {
            if (window.confirm('确认删除选中的商品吗？')) {
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');
                for (var i=0, iLength = $selectedItem.length; i<iLength; i++) {
                    arrProductIds.push($selectedItem.eq(i).closest('.cart-table').data('product-id'));
                }
                if (arrProductIds.length) {
                    _this.deleteCartProduct(arrProductIds.join(','));
                } else {
                    util.errorTips('您还没有选中商品');
                }
            }
        });
        $(document).on('click', '.submit-btn', function () {
            console.log(_this.data.cartInfo);
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = './order-confirm.html';
            } else {
                util.errorTips('请选择商品后再提交');
            }
        });
    },
    loadCart: function () {
        var _this = this;
        _cart.getCartList(function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError(errMsg);
        })
    },
    renderCart: function (data) {
        var data = this.filter(data);
        this.data.cartInfo = data;
        var cartHtml = util.renderHtml(indexTemplate, this.data.cartInfo);
        $('#pageWrap').html(cartHtml);
        nav.loadCarCount();
    },
    deleteCartProduct: function (productIds) {
        var _this = this;
        _cart.deleteProduct(productIds, function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError(errMsg);
        });
    },
    filter: function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
        return data;
    },
    showCartError: function (errMsg) {
        $('#pageWrap').html('<p class="error-tip">' + errMsg + '</p>');
    }
};

$(function () {
    page.init();
});
