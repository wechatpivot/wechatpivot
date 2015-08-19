var _ = require('lodash');
var app = require('../bootstrap/app');
var common = require('./_common');
var generators = require('./_generators');


var ToolsOAuth2Ctrl = function () {
  this.id = 'tools-oauth2';
  this.tpl = [
    'https://open.weixin.qq.com/connect/oauth2/authorize',
    '?appid={appid}',
    '&redirect_uri={redirect_uri}',
    '&response_type={response_type}',
    '&scope={scope}',
    '&state={state}',
    '#wechat_redirect',
  ].join('');

  this.prefill = {
    response_type: 'code',
    scope: 'snsapi_base',
  };

  this.url = this.load_url();
  this.model = this.load_model(this.prefill);
};

ToolsOAuth2Ctrl.$inject = ['$scope'];
_.extend(ToolsOAuth2Ctrl.prototype, common);
_.extend(ToolsOAuth2Ctrl.prototype, generators);


ToolsOAuth2Ctrl.prototype._validate = ToolsOAuth2Ctrl.prototype.validate;
ToolsOAuth2Ctrl.prototype.validate = function () {
  this.model.redirect_uri = encodeURIComponent(this.model.raw_url);
  this._validate();
};

ToolsOAuth2Ctrl.prototype.send = function () {};


app.controller('ToolsOAuth2Ctrl', ToolsOAuth2Ctrl);


module.exports = {};
