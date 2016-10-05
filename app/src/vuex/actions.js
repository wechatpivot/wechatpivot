import { Message } from 'element-ui';
import API from '../services/api';
import * as cache from '../services/cache';
import * as utils from '../services/utils';
import * as types from './mutation-types';


export function loadAccount({ commit }) {
  cache
    .getAccounts()
    .then(function (accounts) {
      commit(types.ACCOUNT_LOAD, accounts);
    })
    .catch(function (err) {
      console.error(err);
    });
}

export function openAccount({ commit }) {
  commit(types.ACCOUNT_OPEN);
}

export function updateAccount({ state, commit }, account) {
  commit(types.ACCOUNT_UPDATE, { isCurrent: true, ...account });
  Message({
    message: '微信帐号保存成功',
    type: 'success',
    duration: 1000,
  });
}
