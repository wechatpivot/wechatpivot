import superagent from 'superagent';
import localforage from 'localforage';
import * as types from '../mutations/types';
import {generate_signature} from '../../utils/signature';


const CACHE_KEY_SETUP = 'setup-v1';


export const init = function ({dispatch}) {
  localforage.getItem(CACHE_KEY_SETUP, function (err, value) {
    if (!value) {
      value = {};
    }

    let {url, token} = value;
    dispatch(types.INIT, url, token);
  });
};

export const updateSetup = function ({dispatch}, url, token) {
  localforage.setItem(CACHE_KEY_SETUP, {url, token}, function (err) {
    dispatch(types.INIT, url, token);
  });
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
