import Vue from 'vue';
import * as types from '../mutation-types'
import * as cache from '../../services/cache';
import * as utils from '../../services/utils';

const state = {
  accounts: [],
  accountDismissAfter: 0,
};

const mutations = {
  [types.ACCOUNT_LOAD] (state, accounts) {
    state.accounts = accounts;
  },

  [types.ACCOUNT_OPEN] (state) {
    state.accountDismissAfter = -1;
  },

  [types.ACCOUNT_UPDATE] (state, account) {
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

    // state.setupError.splice(0, state.setupError.length);
    state.accountDismissAfter = 1000;
  },
};

export default {
  state,
  mutations,
}
