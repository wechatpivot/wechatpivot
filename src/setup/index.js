import superagent from 'superagent';
import {generate_signature} from '../utils/signature';
import {state, actions} from '../store';
import './style';


const Setup = {
  el: '.js-setup',

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
              actions.updateSetup(that.url, that.token);
              setTimeout(that.close, 1000);
            } else {
              that.msgError = '验证失败！';
            }
          }
        });
    },
  },

  ready: function () {
    actions.init();
    this.url = state.url;
    this.token = state.token;
  },
};


export default Setup;
