'use strict';
var $ = require('jquery');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var util         = require('util/util.js');
var _product     = require('service/product-service.js');
var Pagination   = require('util/pagination/index.js');
var indexTemplate = require('./index.string');

var page = {
    data: {
        listParam: {
            keyword:    util.getUrlParam('keyword') || '',
            categoryId: util.getUrlParam('categoryId') || '',
            orderBy:    util.getUrlParam('orderBy') || 'default',
            pageNum:    util.getUrlParam('pageNum') || 1,
            pageSize:   util.getUrlParam('pageSize') || 20
        }
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadList();
    },
    bindEvent: function () {
        var _this = this;
        $('.sort-item').click(function () {
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            if ($this.data('type') === 'default') {
                if ($this.hasClass('active')) {
                    return false;
                } else {
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            } else if ($this.data('type') === 'price') {
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                if (!$this.hasClass('asc')) {
                    $(this).addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    $(this).addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            _this.loadList();
        });
    },
    loadList: function () {
        var _this = this;
        var listHtml = '';
        var listParam = this.data.listParam;
        var $pListCon = $('#pListCon');
        $pListCon.html('<div class="loading"></div>');
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        _product.getProductList(listParam, function (res) {
            listHtml = util.renderHtml(indexTemplate, {list: res.list});
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function (erorMsg) {
            util.errorTips(erorMsg);
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
                _this.loadList();
            }
        }));
    }
};

$(function () {
    page.init();
});
