import Vue from 'vue';
import { setupTypes, navTypes, notificationTypes, formTypes, userManagerTypes, toolkitMenuTypes } from '../types';

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

    state.setupDismissAfter = -1;
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

  [setupTypes.CHANGE_ACCOUNT]: function (state, alias) {
    state.currentAccountAlias = alias;
  },

  [setupTypes.REMOVE_ACCOUNT]: function (state, alias) {
    if (state.currentAccountAlias === alias) {
      state.currentAccountAlias = null;
    }
    let idx = state.accounts.findIndex(a => a.alias === alias);
    state.accounts.splice(idx, 1);
  },

  [notificationTypes.SHOW]: function (state, notification) {
    state.notifications.push(notification);
  },

  [notificationTypes.DISMISS]: function (state, id) {
    let idx = state.notifications.findIndex(n => n.id === id);
    if (idx > -1) {
      state.notifications.splice(idx, 1);
    }
  },

  [navTypes.CHANGE_NAV]: function (state, id) {
    state.currentNavId = id;
    state.currentSubnavId = id;
  },

  [navTypes.CHANGE_SUB_NAV]: function (state, id) {
    state.currentSubnavId = id;
  },

  [formTypes.SEND_SUCCESS]: function (state, resp) {
    state.send_resp = resp;
  },

  [userManagerTypes.LOAD_GROUPS]: function (state, groups) {
    state.userGroups = groups;
  },

  [userManagerTypes.LOAD_CUSTOMER_SERVICE_STARFF]: function (state, staff) {
    state.customerServiceStaff = staff;
  },

  [userManagerTypes.CREATE_GROUP]: function (state, group) {
    state.userGroups.push(group);
  },

  [userManagerTypes.UPDATE_GROUP]: function (state, group) {
    let idx = state.userGroups.findIndex(g => g.id === group.id);
    state.userGroups.splice(idx, 1, group);
  },

  [toolkitMenuTypes.UPDATE_MENUS]: function (state, formatted) {
    formatted.forEach(function (m) {
      let idx = state.menus.findIndex(menu => menu.x === m.x && menu.y === m.y);
      state.menus.splice(idx, 1, m);
    });
  },
};
