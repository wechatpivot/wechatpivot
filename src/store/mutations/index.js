import * as types from './types';


export default {
  [types.INIT]: function (state, init_state) {
    Object.assign(state, init_state);
  },

  [types.CHANGE_NAV]: function (state, id) {
    state.current_nav_id = id;
    state.current_subnav_id = id;
  },
};
