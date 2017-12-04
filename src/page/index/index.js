'use strict';
var $ = require('jquery');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var Swiper = require('util/swiper/index.js');
var bannerTemplate = require('./banner.string');
var util = require('util/util.js');

$(function() {
    var bannerHtml = util.renderHtml(bannerTemplate, {});
    $('#swiperContainer').html(bannerHtml);
    new Swiper('#swiperContainer',{
        loop: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        pagination: '.pagination',
        paginationClickable: true
    });
});


