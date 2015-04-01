var _ = require('lodash');
var angular = require('angular');
var hljs = require('highlight.js');
var request = require('superagent');
var include_replace_directive = require('../directives/include_replace');


var LOREM_IPSUM = [
  '我能吞下玻璃而不伤身体',
  '学選上件飯要提会線本公唐。施朝保由殺来社機三成事催覧成社周描万。',
  '以績幕族施僚社政制度則欧。敦全済改員著文知待長底際問。失願選体索止西形乱成物明殺禁入財。低天駅支界韓線銅失仕点秘審職掲揺止確世文。',
  '望構質決芸転力来息位責囲野吸稿。学長母行山計好課東経多島。新増農覧等属食間買前聞諾初覚指報経。芳即吉天能続紙作民散政広創趣申界食。朝加仏球曜束楽法組楽商罪分色治。法泳目季生整内文供毎判松私無見削都覧優江。項論十地転子闘毎食紙止相。',
];


function _highlight(xml) {
  var code = document.getElementById('code');
  var $code = angular.element(code);

  $code.html(_.escape(xml));

  hljs.highlightBlock(code);
}


module.exports = {
  load_url: function () {
    return localStorage.url || '';
  },

  save_url: function () {
    localStorage.url = this.url || '';
  },

  load_model: function (options) {
    var model = {};
    if (localStorage[this.id]) {
      model = JSON.parse(localStorage[this.id]);
    }

    _.extend(model, options);

    return model;
  },

  save_model: function () {
    localStorage[this.id] = JSON.stringify(this.model);
  },

  reset: function () {
    this.model = _.extend({}, this.prefill);

    this.save_model();
  },

  validate: function () {
    // TODO: validation

    // ** _.template uses eval, which is not allowed in a chrome extension
    var xml = this.tpl;
    var placeholder;
    for (var k in this.model) {
      placeholder = '{' + k + '}';
      xml = xml.replace(placeholder, this.model[k]);
    }

    _highlight(xml);

    this.save_url();
    this.save_model();

    return xml;
  },

  send: function () {
    var xml = this.validate();

    request
      .post(this.url)
      .send(xml)
      .set('Content-type', 'text/xml')
      .end(function (err, res) {
        console.log(err);
        console.log(res);
      });
  }
};
