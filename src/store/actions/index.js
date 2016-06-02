import { setupTypes, navTypes, notificationTypes, formTypes, userManagerTypes, toolkitMenuTypes } from '../types';
import * as signature from './signature';
import * as cache from './cache';
import API from './api';
import * as utils from './utils';
import * as MenuModel from '../../models/menu';


export function flashError({ dispatch }, message, dismissAfter = 2000) {
  let id = Math.random().toString(36).substring(2);
  dispatch(notificationTypes.SHOW, { id, message, type: 'error' });

  if (dismissAfter >= 0) {
    setTimeout(function () {
      dispatch(notificationTypes.DISMISS, id);
    }, dismissAfter);
  }
}

export function flashSuccess({ dispatch }, message, dismissAfter = 2000) {
  let id = Math.random().toString(36).substring(2);
  dispatch(notificationTypes.SHOW, { id, message, type: 'success' });

  if (dismissAfter >= 0) {
    setTimeout(function () {
      dispatch(notificationTypes.DISMISS, id);
    }, dismissAfter);
  }
}

export function flashDismiss({ dispatch }, id) {
  dispatch(notificationTypes.DISMISS, id);
}

function handleAccessTokenUpdated({ state, dispatch }) {
  return function ({ alias, accessToken, accessTokenExpiredAt }) {
    dispatch(setupTypes.UPDATE_ACCOUNT, { alias, accessToken, accessTokenExpiredAt });
    let accounts = utils.getAccounts(state);
    cache.setAccounts(accounts);
  };
}

function handleError({ state, dispatch }) {
  return function (err) {
    if (err.name === 'ACCOUNT_HAS_NO_VALUE') {
      dispatch(setupTypes.ERROR, err.message);
    } else {
      console.warn(err);
      flashError({ state, dispatch }, err);
    }
  };
}

export function loadSetup({ dispatch }) {
  cache
    .getAccounts()
    .then(function (accounts) {
      dispatch(setupTypes.LOAD_ACCOUNTS, accounts);
    })
    .catch(function (err) {
      console.error(err);
    });
}

export function openSetup({ dispatch }) {
  dispatch(setupTypes.OPEN);
}

export function closeSetup({ dispatch }) {
  dispatch(setupTypes.CLOSE, 0);
}

export const changeNav = function ({ dispatch }, id) {
  dispatch(navTypes.CHANGE_NAV, id);
};

export const changeSubNav = function ({ dispatch }, id) {
  dispatch(navTypes.CHANGE_SUB_NAV, id);
};

export function validate({ state, dispatch }, { alias, appId, url, token }) {
  signature
    .validate(appId, url, token)
    .then(function () {
      dispatch(setupTypes.UPDATE_ACCOUNT, { alias, appId, url, token });

      flashSuccess({ dispatch }, '验证通过！');

      let accounts = utils.getAccounts(state);
      cache.setAccounts(accounts);
    })
    .catch(function (err) {
      dispatch(setupTypes.ERROR, 'validate', err);
    });
}

export function updateAccount({ state, dispatch }, { alias, appId, appSecret, url, token, id, userOpenId }) {
  dispatch(setupTypes.UPDATE_ACCOUNT, { alias, isCurrent: true, appId, appSecret, url, token, id, userOpenId });

  let accounts = utils.getAccounts(state);
  cache.setAccounts(accounts);
}

export function removeAccount({ state, dispatch }, alias) {
  dispatch(setupTypes.REMOVE_ACCOUNT, alias);

  let accounts = utils.getAccounts(state);
  cache.setAccounts(accounts);
}

export const send = function ({ state, dispatch }, xml) {
  let account = utils.getCurrentAccount(state);
  signature
    .send(account, xml)
    .then(function (res) {
      dispatch(formTypes.SEND_SUCCESS, res);
    })
    .catch(handleError({ state, dispatch }));
};

export const loadUserGroups = function ({ state, dispatch }) {
  let account = utils.getCurrentAccount(state);
  let api = new API(account);
  api.onAccessTokenUpdated = handleAccessTokenUpdated({ state, dispatch });

  api.getGroups()
    .then(function ({ groups }) {
      dispatch(userManagerTypes.LOAD_GROUPS, groups);
    })
    .catch(handleError);
};

export const createUserGroup = function ({ state, dispatch }, name) {
  let account = utils.getCurrentAccount(state);
  let api = new API(account);
  api.onAccessTokenUpdated = handleAccessTokenUpdated({ state, dispatch });

  api.createGroup(name)
    .then(function ({ group }) {
      dispatch(userManagerTypes.CREATE_GROUP, group);
    })
    .catch(handleError);
};

export const updateUserGroup = function ({ state, dispatch }, id, name) {
  let account = utils.getCurrentAccount(state);
  let api = new API(account);
  api.onAccessTokenUpdated = handleAccessTokenUpdated({ state, dispatch });

  api.updateGroup(id, name)
    .then(function (res) {
      console.log(res);
      dispatch(userManagerTypes.UPDATE_GROUP, { id, name });
    })
    .catch(handleError);
};

export function downloadMenu({ state, dispatch }) {
  let account = utils.getCurrentAccount(state);
  let api = new API(account);
  api.onAccessTokenUpdated = handleAccessTokenUpdated({ state, dispatch });

  api
    .getLatestToken()
    .then(function () {
      return api.getMenu();
    })
    .then(function (res) {
      let formatted = MenuModel.fromWeixin(res.menu);
      dispatch(toolkitMenuTypes.UPDATE_MENUS, formatted);
    })
    .catch(function (err) {
      if (err.name === 'ACCOUNT_HAS_NO_VALUE') {
        dispatch(setupTypes.ERROR, err.message);
      } else {
        let errCode = API.parseWechatErrorCode(err);
        if (errCode === '46003') {
          let formatted = MenuModel.fromScratch();
          dispatch(toolkitMenuTypes.UPDATE_MENUS, formatted);
        } else {
          console.warn(err);
          flashError({ dispatch }, err);
        }
      }
    });
}

export function selectMenu({ state, dispatch }, x, y) {
  let prev = state.menus.filter(m => m.isSelected)[0];
  let next = state.menus.filter(m => m.x === x && m.y === y)[0];
  let formatted = MenuModel.changeSelect(prev, next);
  dispatch(toolkitMenuTypes.UPDATE_MENUS, formatted);
}

export function updateMenu({ state, dispatch }, updates) {
  let formatted = MenuModel.updateByXY(updates);
  dispatch(toolkitMenuTypes.UPDATE_MENUS, formatted);
}

export function exchangeMenu({ state, dispatch }, p1, p2) {
  if (p1.y === 0) {
    // ** level 1 menu
    let group1 = state.menus.filter(m => m.x === p1.x);
    let formatted = MenuModel.translate(group1, p2.x);
    let group2 = state.menus.filter(m => m.x === p2.x);
    formatted = formatted.concat(MenuModel.translate(group2, p1.x));
    dispatch(toolkitMenuTypes.UPDATE_MENUS, formatted);
  } else {
    let menu1 = state.menus.filter(m => m.x === p1.x && m.y === p1.y)[0];
    let menu2 = state.menus.filter(m => m.x === p2.x && m.y === p2.y)[0];
    let formatted = MenuModel.exchange(menu1, menu2);
    dispatch(toolkitMenuTypes.UPDATE_MENUS, formatted);
  }
}

export function removeMenu({ state, dispatch }, x, y) {
  if (y === 0) {
    // ** level 1 menu
    let formatted = [];
    for (let i = x + 1; i < 3; i++) {
      let group = state.menus.filter(m => m.x === i);
      formatted = formatted.concat(MenuModel.translate(group, i - 1));
    }
    formatted = formatted.concat(MenuModel.getInitialMenus(2));
    dispatch(toolkitMenuTypes.UPDATE_MENUS, formatted);
  } else {
    let uppers = state.menus.filter(m => m.x === x && m.y > y);
    let formatted = MenuModel.moveDown(uppers);
    dispatch(toolkitMenuTypes.UPDATE_MENUS, formatted);
  }
}

export function uploadMenu({ state, dispatch }) {
  let account = utils.getCurrentAccount(state);
  let api = new API(account);

  let menu = MenuModel.toWeixin(state.menus, account.appId);

  api.createMenu(menu)
    .then(function () {
      let formatted = MenuModel.cleanup(state.menus);
      dispatch(toolkitMenuTypes.UPDATE_MENUS, formatted);
      flashSuccess({ state, dispatch }, '自定义菜单更新成功！');
    })
    .catch(handleError({ state, dispatch }));
}
