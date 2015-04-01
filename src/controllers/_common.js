var _ = require('lodash');
var angular = require('angular');
var hljs = require('highlight.js');
var request = require('superagent');
/* jshint ignore:start */
var include_replace_directive = require('../directives/include_replace');
/* jshint ignore:end */


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
