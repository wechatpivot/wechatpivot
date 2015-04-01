var _ = require('lodash');
var app = require('../bootstrap/app');
var common = require('./_common');
var generators = require('./_generators');

var fs = require('fs');
var tpl = fs.readFileSync(__dirname + '/../xmls/message_event_scan.xml', 'utf8');


var MessageEventScanCtrl = function () {
  this.id = 'message-event-scan';
  this.tpl = tpl;

  this.prefill = {
    msg_type: 'event',
    event: 'SCAN',
  };

  this.url = this.load_url();
  this.model = this.load_model(this.prefill);
};

MessageEventScanCtrl.$inject = ['$scope'];

_.extend(MessageEventScanCtrl.prototype, common);
_.extend(MessageEventScanCtrl.prototype, generators);

app.controller('MessageEventScanCtrl', MessageEventScanCtrl);


module.exports = {};
