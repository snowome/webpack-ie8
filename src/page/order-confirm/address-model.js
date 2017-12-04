'use strict';
var $ = require('jquery');
var util     = require('util/util.js');
var _address = require('service/address-service.js');
var _citys   = require('util/citys/index.js');
var addressModelTemplate = require('./address-model.string');

var addressModel = {
    option: null,
    $modelWrap: null,
    show: function (option) {
        this.option = option;
        this.option.data = option.data || {};
        this.$modelWrap = $('#modelWrap');
        this.loadModel();
        this.bindEvent();
    },
    loadModel: function () {
        var addressModelHTML = util.renderHtml(addressModelTemplate, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.$modelWrap.html(addressModelHTML);
        this.loadProvince();
    },
    bindEvent: function () {
        var _this = this;
        this.$modelWrap.find('#receiveProvince').change(function () {
            var selectProvince = $(this).val();
            _this.loadCity(selectProvince);
        });
        this.$modelWrap.find('#addressBtn').click(function () {
            var receiveInfo = _this.getReceiveInfo(),
                isUpdate = _this.option.isUpdate;           // 区分添加还是编辑
            if (!isUpdate && receiveInfo.status) {
                _address.save(receiveInfo.data, function (res) {
                    util.successTips('添加地址成功');
                    _this.hide();
                    (typeof _this.option.unSuccess === 'function') && _this.option.unSuccess(res);
                }, function (errMsg) {
                    util.errorTips(errMsg);
                });
            } else if (isUpdate && receiveInfo.status) {
                _address.update(receiveInfo.data, function (res) {
                    util.successTips('地址修改成功');
                    _this.hide();
                    (typeof _this.option.unSuccess === 'function') && _this.option.unSuccess(res);
                }, function (errMsg) {
                    util.errorTips(errMsg);
                });
            } else {
                util.errorTips(receiveInfo.errMsg || '好像哪里不对了');
            }
        });
        this.$modelWrap.find('.closeJS').click(function () {
            _this.hide();
        });
        this.$modelWrap.find('.modal-container').click(function (e) {
            e.stopPropagation();
        });
    },
    loadProvince: function () {
        var provinces       = _citys.getProvinces() || [],
            $provinceSelect = this.$modelWrap.find('#receiveProvince');
        $provinceSelect.html(this.getSelectOption(provinces));
        if (this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCity(this.option.data.receiverProvince);
        }
    },
    loadCity: function (provinceName) {
        var citys       = _citys.getCities(provinceName) || [],
            $citySelect = this.$modelWrap.find('#receiveCity');
        $citySelect.html(this.getSelectOption(citys));
        if (this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    getReceiveInfo: function () {
        var receiverInfo = {},
            result = {
                status: false
            };
        receiverInfo.receiverName     = $.trim(this.$modelWrap.find('#receiveName').val());
        receiverInfo.receiverProvince = $.trim(this.$modelWrap.find('#receiveProvince').val());
        receiverInfo.receiverCity     = $.trim(this.$modelWrap.find('#receiveCity').val());
        receiverInfo.receiverAddress  = $.trim(this.$modelWrap.find('#receiveAddress').val());
        receiverInfo.receiverPhone    = $.trim(this.$modelWrap.find('#receivePhone').val());
        receiverInfo.receiverZip      = $.trim(this.$modelWrap.find('#receiveZip').val());
        if (this.option.isUpdate) {
            receiverInfo.id = $.trim(this.$modelWrap.find('#receiveId').val());
        }
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请选择收件人所在省份';
        } else if (!receiverInfo.receiverCity) {
            result.errMsg = '请选择收件人所在城市';
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人详细地址';
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人手机号';
        } else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    },
    getSelectOption: function (optionArray) {
        var html = '<option value="">请选择</option>';
        for (var i=0, length=optionArray.length; i<length; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
        }
        return html;
    },
    hide: function () {
        this.$modelWrap.empty();
    }
};

module.exports = addressModel;
