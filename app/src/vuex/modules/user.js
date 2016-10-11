import * as types from '../mutation-types'

const state = {
  users: [],
};

const mutations = {
  [types.USER_INFO_PUSH] (state, user) {
    state.users.push(user);
  },
};

export default {
  state,
  mutations,
};
