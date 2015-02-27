var _ = require('lodash');
var app = require('../bootstrap/app');
var common = require('./_common');
var generators = require('./_generators');

var fs = require('fs');
var tpl = fs.readFileSync(__dirname + '/../xmls/message_event.xml', 'utf8');


var MessageEventCtrl = function ($scope) {
  var vm = this;

  this.id = 'message-event';
  this.tpl = tpl;

  this.url = this.load_url();
  this.model = this.load_model({ msg_type: 'event' });
};

MessageEventCtrl.$inject = ['$scope'];

_.extend(MessageEventCtrl.prototype, common);
_.extend(MessageEventCtrl.prototype, generators);

app.controller('MessageEventCtrl', MessageEventCtrl);


module.exports = {};
