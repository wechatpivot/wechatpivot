import superagent from 'superagent';
import * as types from '../mutations/types';
import * as cache from './cache';
import {generate_signature} from '../../utils/signature';


export const init = function ({dispatch}) {
  let {url, token} = cache.getSetup();
  dispatch(types.INIT, url, token);
};

export const updateSetup = function ({dispatch}, url, token) {
  cache.setSetup(url, token);
  dispatch(types.INIT, url, token);
};

export const send =function ({state, dispatch}, xml) {
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
};
