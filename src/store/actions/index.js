import superagent from 'superagent';
import localforage from 'localforage';
import * as types from '../mutations/types';
import generate_query from './signature';


const CACHE_KEY_SETUP = 'setup-v1';


export const init = function ({ dispatch }) {
  localforage.getItem(CACHE_KEY_SETUP, function (err, value) {
    dispatch(types.INIT, value || {});
  });
};

export const updateSetup = function ({ dispatch }, url, token) {
  localforage.setItem(CACHE_KEY_SETUP, { url, token }, function () {
    dispatch(types.INIT, { url, token });
  });
};

export const changeNav = function ({ dispatch }, id) {
  dispatch(types.CHANGE_NAV, id);
};

export const validate = function ({ state }) {
  const query = generate_query(state.token);
  const echostr = Math.random().toString(36).substring(2);
  query.echostr = echostr;

  superagent
    .get(state.url)
    .query(query)
    .end(function (err, res) {
      if (err) {
        console.error(err);
      } else {
        if (res.text === echostr) {
          console.log(res.text);
        } else {
          console.error(res.text);
        }
      }
    });
};

export const send = function ({ state }, xml) {
  const query = generate_query(state.token);

  superagent
    .post(state.url)
    .query(query)
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
