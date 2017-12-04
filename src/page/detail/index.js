'use strict';
require('./index.css');
var $ = require('jquery');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var util          = require('util/util.js');
var _product      = require('service/product-service.js');
var _cart         = require('service/cart-service.js');
var indexTemplate = require('./index.string');

var page = {
    data: {
        productId: util.getUrlParam('productId') || '',
        detailInfo: null
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        if (!this.data.productId) {
            util.goHome();
        }
        this.loadDetail();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('mouseenter', '#pageWrap .pImgItem', function () {
            var imgUrl = $(this).find('.pImg').attr('src');
            $(this).closest('.pImgCon').find('.mainImg').attr('src', imgUrl);
        });
        $(document).on('click', '#pageWrap .pCountBtn', function () {
            var type      = $(this).hasClass('plusJS') ? 'plus' : 'minus',
                $pCount   = $('#pCount'),
                currCount = parseInt($pCount.val()),
                minCount  = 1,
                maxCount  = _this.data.detailInfo.stock || 1;
            if (type === 'plus') {
                $pCount.val( (currCount < maxCount) ? currCount+1 : maxCount );
            } else if(type === 'minus') {
                $pCount.val( (currCount > minCount) ? currCount-1 : minCount );
            }

        });
        $(document).on('click', '#cartAdd', function () {
            var addCartOption = {
                productId: _this.data.productId,
                count    : $('#pCount').val()
            };
            _cart.addToCart(addCartOption, function (res) {
                window.location.href = './result.html?type=cart-add';
            }, function (errMsg) {
                util.errorTips(errMsg);
            });
        });
    },
    loadDetail: function () {
        var _this      = this,
            detailHtml = '',
            $pageWrap  = $('#pageWrap');

        $pageWrap.html('<div class="loading"></div>');

        _product.getProductDetail(this.data.productId, function (res) {
            _this.filter(res);
            _this.data.detailInfo = res;
            detailHtml = util.renderHtml(indexTemplate, res);
            $pageWrap.html(detailHtml);
        }, function (err) {
            $pageWrap.html('<p class="error-tip">此商品不存在</p>');
        })

    },
    filter: function (data) {
        data.subImages = data.subImages.split(',');
    }

};

$(function () {
    page.init();
});
