import superagent from 'superagent';
import {generate_signature} from '../utils/signature';


let state = {
  url: null,
  token: null,
  navs: [
    {id: 'message/text', text: '接收普通消息', active: true,},
  ],
};


const actions = {
  init: function (url, token) {
    state.url = url;
    state.token = token;
  },

  send: function (xml) {
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = Math.random().toString(36).substring(2);
    const signature = generate_signature(state.token, timestamp, nonce);

    superagent
      .post(state.url)
      .query({
        signature: signature,
        timestamp: timestamp,
        nonce: nonce,
      })
      .send(xml)
      .set('Content-type', 'text/xml')
      .end(function (err, res) {
        if (err) {
          console.error(err);
        } else {
          console.log(res.text);
        }
      });
  },
};


export {state, actions};
