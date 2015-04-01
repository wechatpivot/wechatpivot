var _ = require('lodash');
var app = require('../bootstrap/app');
var common = require('./_common');
var generators = require('./_generators');

var fs = require('fs');
var tpl = fs.readFileSync(__dirname + '/../xmls/message_event_scan_subscribe.xml', 'utf8');


var MessageEventScanSubscribeCtrl = function () {
  this.id = 'message-event-scan-subscribe';
  this.tpl = tpl;

  this.prefill = {
    msg_type: 'event',
    event: 'subscribe',
  };

  this.url = this.load_url();
  this.model = this.load_model(this.prefill);
};

MessageEventScanSubscribeCtrl.$inject = ['$scope'];

_.extend(MessageEventScanSubscribeCtrl.prototype, common);
_.extend(MessageEventScanSubscribeCtrl.prototype, generators);

app.controller('MessageEventScanSubscribeCtrl', MessageEventScanSubscribeCtrl);


module.exports = {};
