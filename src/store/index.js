import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import INIT_NAV from './init_nav';
import * as actions from './actions';
import mutations from './mutations';


let state = {
  accounts: [],
  current_account_id: null,

  notifications: [],

  send_resp: null,

  user_groups: [],

  menus: getInitialMenus(),
};
Object.assign(state, INIT_NAV);
window._state = state;


const store = new Vuex.Store({
  state: state,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
});


export default store;
