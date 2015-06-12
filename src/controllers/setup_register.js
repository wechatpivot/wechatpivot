var crypto = require('crypto');
var _ = require('lodash');
var request = require('superagent');
var app = require('../bootstrap/app');
var common = require('./_common');
var generators = require('./_generators');

var fs = require('fs');
var tpl = fs.readFileSync(__dirname + '/../xmls/setup_register.xml', 'utf8');


var SetupRegisterCtrl = function () {
  this.id = 'setup-register';
  this.tpl = tpl;

  this.url = this.load_url();
  this.model = this.load_model();
};


SetupRegisterCtrl.$inject = ['$scope'];

_.extend(SetupRegisterCtrl.prototype, common);
_.extend(SetupRegisterCtrl.prototype, generators);

SetupRegisterCtrl.prototype._validate = SetupRegisterCtrl.prototype.validate;
SetupRegisterCtrl.prototype.validate = function () {
  var source = [this.model.token.toString(), this.model.timestamp.toString(), this.model.nonce.toString()].sort().join('');
  var signature = crypto.createHash('sha1').update(source).digest('hex');
  this.model.signature = signature;

  this._validate();
};

SetupRegisterCtrl.prototype.send = function () {
  /* jshint ignore:start */
  var xml = this.validate();
  /* jshint ignore:end */

  request
    .get(this.url)
    .query(_.pick(this.model, ['signature', 'timestamp', 'nonce', 'echostr']))
    .end(function (err, res) {
      console.log(err);
      console.log(res);
    });
};

app.controller('SetupRegisterCtrl', SetupRegisterCtrl);


module.exports = {};
