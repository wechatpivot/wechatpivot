import { Message } from 'element-ui';
import API from '../services/api';
import * as MenuModel from '../models/menu';
import * as cache from '../services/cache';
import * as types from './mutation-types';
import * as utils from '../services/utils';


function handleAccessTokenUpdated({ state, commit }) {
  return function ({ alias, accessToken, accessTokenExpiredAt }) {
    commit(types.ACCOUNT_UPDATE, { alias, accessToken, accessTokenExpiredAt });
    cache.setAccounts(utils.getAccounts(state));
  };
}

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
  cache.setAccounts(utils.getAccounts(state));
  Message({
    message: '微信帐号保存成功',
    type: 'success',
    duration: 1000,
  });
}

export function downloanMenu({ state, commit }) {
  let account = utils.getCurrentAccount(state);
  let api = new API(account);
  api.onAccessTokenUpdated = handleAccessTokenUpdated({ state, commit });

  api
    .getLatestToken()
    .then(function () {
      return api.getMenu();
    })
    .then(function (res) {
      let formatted = MenuModel.fromWeixin(res.menu);
      commit(types.TOOKIT_MENU_UPDATE, formatted);
    })
    .catch(function (err) {
      if (err.name === 'ACCOUNT_HAS_NO_VALUE') {
        Message({
          message: `Account has no value: ${err.message}`,
          type: 'error',
        });
      } else {
        let errCode = API.parseWechatErrorCode(err);
        if (errCode === '46003') {
          let formatted = MenuModel.fromScratch();
          commit(types.TOOKIT_MENU_UPDATE, formatted);
        } else {
          console.warn(err);
          flashError({ dispatch }, err);
        }
      }
    });
}

export function selectMenu({ state, commit }, { x, y }) {
  let prev = state.toolkitMenu.menus.filter(m => m.isSelected)[0];
  let next = state.toolkitMenu.menus.filter(m => m.x === x && m.y === y)[0];
  let formatted = MenuModel.changeSelect(prev, next);
  commit(types.TOOKIT_MENU_UPDATE, formatted);
}

export function updateMenu({ state, commit }, updates) {
  let formatted = MenuModel.updateByXY(updates);
  commit(types.TOOKIT_MENU_UPDATE, formatted);
}

export function exchangeMenu({ state, commit }, { x1, y1, x2, y2}) {
  if (y1 === 0) {
    // ** level 1 menu
    let group1 = state.toolkitMenu.menus.filter(m => m.x === x1);
    let formatted = MenuModel.translate(group1, x2);
    let group2 = state.toolkitMenu.menus.filter(m => m.x === x2);
    formatted = formatted.concat(MenuModel.translate(group2, x1));
    commit(types.TOOKIT_MENU_UPDATE, formatted);
  } else {
    let menu1 = state.toolkitMenu.menus.filter(m => m.x === x1 && m.y === y1)[0];
    let menu2 = state.toolkitMenu.menus.filter(m => m.x === x2 && m.y === y2)[0];
    let formatted = MenuModel.exchange(menu1, menu2);
    commit(types.TOOKIT_MENU_UPDATE, formatted);
  }
}

export function removeMenu({ state, commit }, { x, y }) {
  if (y === 0) {
    // ** level 1 menu
    let formatted = [];
    for (let i = x + 1; i < 3; i++) {
      let group = state.toolkitMenu.menus.filter(m => m.x === i);
      formatted = formatted.concat(MenuModel.translate(group, i - 1));
    }
    formatted = formatted.concat(MenuModel.getInitialMenus(2));
    commit(types.TOOKIT_MENU_UPDATE, formatted);
  } else {
    let uppers = state.toolkitMenu.menus.filter(m => m.x === x && m.y > y);
    let formatted = MenuModel.moveDown(uppers);
    commit(types.TOOKIT_MENU_UPDATE, formatted);
  }
}

export function uploadMenu({ state, commit }) {
  let account = utils.getCurrentAccount(state);
  let api = new API(account);

  let menu = MenuModel.toWeixin(state.toolkitMenu.menus, account.appId);

  api.createMenu(menu)
    .then(function () {
      let formatted = MenuModel.cleanup(state.toolkitMenu.menus);
      commit(types.TOOKIT_MENU_UPDATE, formatted);
      Message({
        message: '自定义菜单更新成功',
        type: 'success',
        duration: 1000,
      });
    })
    .catch(function (err) {
      console.error(err);
    });
}
