import Vue from 'vue';
import superagent from 'superagent';
import InputNumber from '../common/input_number';
import InputString from '../common/input_string';
import InputTimestamp from '../common/input_timestamp';
import {generate_signature} from '../utils/signature';
import './style';


const CACHE_KEY = 'setup-v1';


function _getSetup() {
  if (CACHE_KEY in localStorage) {
    return JSON.parse(localStorage[CACHE_KEY] || '{}');
  } else {
    return {}
  }
}


function _setSetup(url, token) {
  localStorage[CACHE_KEY] = JSON.stringify({
    url: url,
    token: token,
  });
}


new Vue({
  el: '.js-setup',

  components: {
    'input-number': InputNumber,
    'input-string': InputString,
    'input-timestamp': InputTimestamp,
  },

  data: {
    isActive: false,
    isValidating: false,
    msgError: null,
    msgSuccess: null,
    url: null,
    token: null,
    timestamp: null,
    nonce: null,
    echo_str: null,
  },

  methods: {
    close: function () {
      this.isActive = false;
      this.isValidating = false;
      this.msgError = null;
      this.msgSuccess = null;
    },

    validate: function () {
      let that = this;

      this.isValidating = true;
      this.msgError = null;
      this.msgSuccess = null;

      const signature = generate_signature(this.token, this.timestamp, this.nonce);

      superagent
        .get(this.url)
        .query({
          signature: signature,
          timestamp: this.timestamp,
          nonce: this.nonce,
          echostr: this.echo_str,
        })
        .end(function (err, res) {
          if (err) {
            console.error(err)
          } else {
            that.isValidating = false;

            if (res.text === that.echo_str) {
              that.msgSuccess = '验证通过！';
              _setSetup(that.url, that.token);
              setTimeout(that.close, 1000);
            } else {
              that.msgError = '验证失败！';
            }
          }
        });
    },
  },

  ready: function () {
    const {url, token} = _getSetup();
    this.url = url;
    this.token = token;
  },
});
