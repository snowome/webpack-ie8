'use strict';
require('./index.css');
var paginationTemplate = require('./index.string');

var jQuery = require('jquery'),
    $      = jQuery;
var util   = require('util/util.js');

var Pagination = function () {
    var _this = this;
    this.defaultOption = {
        container   : null,
        pageNum     : 1,
        pageRange   : 3,
        onSelectPage: null
    };
    $(document).on('click', '.pg-item', function () {
        var $this = $(this);
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return false;
        }
        typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null;
    });
};
/** 渲染分页 **/
Pagination.prototype.render = function (pageOption) {
    this.option = $.extend({}, this.defaultOption, pageOption);
    // 判断容器是否 是 jquery对象
    if ( !(this.option.container instanceof jQuery) ) {
        console.error('未传入分页容器，或者分页容器不是jQuery对象');
        return;
    }
    // 判断是否只有一页
    if (this.option.pages <= 1) {
        return;
    }
    this.option.container.html(this.getPaginationHTML());

};
/** 获取分页的HTML **/
Pagination.prototype.getPaginationHTML = function () {
    var pageHTML  = '',
        option    = this.option,
        pageArray = [],
        start     = ((option.pageNum-option.pageRange) > 0) ? (option.pageNum-option.pageRange) : 1,
        end       = ((option.pageNum+option.pageRange) < option.pages) ? (option.pageNum+option.pageRange) : option.pages;
    pageArray.push({
        name     : '上一页',
        value    : option.prePage,
        disabled : !option.hasPreviousPage
    });
    for (var i=start; i<=end; i++) {
        pageArray.push({
            name    : i,
            value   : i,
            active  : (i === option.pageNum)
        });
    }
    pageArray.push({
        name     : '下一页',
        value    : option.nextPage,
        disabled : !option.hasNextPage
    });

    pageHTML = util.renderHtml(paginationTemplate, {
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.pages
    });

    return pageHTML;
};

module.exports = Pagination;
