import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import INIT_NAV from './init_nav';
import { getInitialMenus } from '../models/menu';
import * as actions from './actions';
import mutations from './mutations';


let state = {
  accounts: [],

  setupIsValidating: false,
  setupIsSaving: false,
  setupDismissAfter: 0,
  setupError: [],

  notifications: [],

  send_resp: null,

  userGroups: [],
  customerServiceStaff: [],

  menus: getInitialMenus(),
};
Object.assign(state, INIT_NAV);

if (process.env.NODE_ENV !== 'production') {
  window._state = state;
}

const store = new Vuex.Store({
  state: state,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
});


export default store;
