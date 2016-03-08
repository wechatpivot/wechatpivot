import { setup_types, nav_types, form_types, user_manager_types } from '../types';


export default {
  [setupTypes.OPEN]: function (state) {
    state.setupDismissAfter = -1;
  },

  [setupTypes.CLOSE]: function (state, delay) {
    console.assert(delay >= 0, 'invalid delay');
    state.setupDismissAfter = delay;
  },

  [setupTypes.ERROR]: function (state, key, value) {
    if (value) {
      state.setupError.push(key + ':' + value);
    } else {
      state.setupError.push(key);
    }

    state.setupOpen = true;
  },

  [setupTypes.LOAD_ACCOUNTS]: function (state, accounts) {
    state.accounts = accounts;
  },

  [setupTypes.UPDATE_ACCOUNT]: function (state, account) {
    let notFound = true;
    state.accounts.forEach(function (a) {
      if (a.alias === account.alias) {
        notFound = false;
        Object.keys(account).forEach(k => Vue.set(a, k, account[k]));
      } else {
        a.isCurrent = false;
      }
    });

    if (notFound) {
      state.accounts.push(account);
    }

    state.setupError.splice(0, state.setupError.length);
    state.setupDismissAfter = 1000;
  },

  [setup_types.CHANGE_ACCOUNT]: function (state, id) {
    state.current_account_id = id;
  },

  [setup_types.REMOVE_ACCOUNT]: function (state, id) {
    if (state.current_account_id === id) {
      state.current_account_id = null;
    }
    let idx = state.accounts.findIndex(a => a.id === id);
    state.accounts.splice(idx, 1);
  },

  [nav_types.CHANGE_NAV]: function (state, id) {
    state.current_nav_id = id;
    state.current_subnav_id = id;
  },

  [nav_types.CHANGE_SUB_NAV]: function (state, id) {
    state.current_subnav_id = id;
  },

  [form_types.SEND_SUCCESS]: function (state, resp) {
    state.send_resp = resp;
  },

  [user_manager_types.LOAD_GROUPS]: function (state, groups) {
    state.user_groups = groups;
  },

  [user_manager_types.CREATE_GROUP]: function (state, group) {
    state.user_groups.push(group);
  },

  [user_manager_types.UPDATE_GROUP]: function (state, group) {
    let idx = state.user_groups.findIndex(g => g.id === group.id);
    state.user_groups.splice(idx, 1, group);
  },
};
