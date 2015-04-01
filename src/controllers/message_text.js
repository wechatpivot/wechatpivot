var _ = require('lodash');
var app = require('../bootstrap/app');
var common = require('./_common');
var generators = require('./_generators');

var fs = require('fs');
var tpl = fs.readFileSync(__dirname + '/../xmls/message_text.xml', 'utf8');


var MessageTextCtrl = function () {
  this.id = 'message-text';
  this.tpl = tpl;

  this.url = this.load_url();
  this.model = this.load_model({msg_type: 'text'});
};

MessageTextCtrl.$inject = ['$scope'];

_.extend(MessageTextCtrl.prototype, common);
_.extend(MessageTextCtrl.prototype, generators);

app.controller('MessageTextCtrl', MessageTextCtrl);


module.exports = {};
