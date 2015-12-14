import * as types from './types';


export default {
  [types.INIT]: function (state, url, token) {
    state.url = url;
    state.token = token;
  },
};
