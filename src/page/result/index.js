'use strict';
var $ = require('jquery');
require('page/common/nav-simple/index.js');
require('./index.css');
var util = require('util/util.js');


$(function () {
    var type = util.getUrlParam('type') || 'default';
    var $ele = $('.' + type + '-success');
    if (type === 'payment') {
        var orderNum = util.getUrlParam('orderNumber'),
            $orderNum = $ele.find('.orderNum');
        $orderNum.attr('href', $orderNum.attr('href') + orderNum);
    }
    $ele.show();
});
