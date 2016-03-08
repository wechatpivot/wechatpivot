import superagent from 'superagent';
import { setup_types, nav_types, form_types, user_manager_types } from '../types';
import generate_query from './signature';
import * as cache from './cache';
import * as api from './api';


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
  dispatch(nav_types.CHANGE_NAV, id);
};

export const changeSubNav = function ({ dispatch }, id) {
  dispatch(nav_types.CHANGE_SUB_NAV, id);
};

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
  let account = state.accounts.filter(a => a.id === state.current_account_id)[0];

  if (account) {
    const query = generate_query(account.token);
    superagent
      .post(account.url)
      .query(query)
      .send(xml)
      .set('Content-type', 'text/xml')
      .end(function (err, res) {
        if (err) {
          console.error(err);
        } else {
          dispatch(form_types.SEND_SUCCESS, res.text);
        }
      });
  } else {
    throw new Error('Select a validated account first!');
  }
};

export const loadUserGroups = function ({ state, dispatch }, app_secret) {
  let account = state.accounts.filter(a => a.id === state.current_account_id)[0];
  // if (account.access_token && account.access_token_expires_at > Date.now()) {
  //   //
  // } else {
  //   throw new Error('NotImplementedError');
  // }
  api
    .getGroups(account, app_secret)
    .then(function (results) {
      let [token, groups] = results;
      dispatch(user_manager_types.LOAD_GROUPS, groups);
      cache.saveAccessToken(account.id, token);
    })
    .catch(function (err) {
      console.error(err);
    });
};

export const createUserGroup = function ({ state, dispatch }, app_secret, new_group_name) {
  let account = state.accounts.filter(a => a.id === state.current_account_id)[0];

  api
    .createGroup(account, app_secret, new_group_name)
    .then(function (results) {
      let [token, group] = results;
      dispatch(user_manager_types.CREATE_GROUP, group);
      cache.saveAccessToken(account.id, token);
    })
    .catch(function (err) {
      console.error(err);
    });
};

export const updateUserGroup = function ({ state, dispatch }, app_secret, id, new_group_name) {
  let account = state.accounts.filter(a => a.id === state.current_account_id)[0];

  api
    .updateGroup(account, app_secret, id, new_group_name)
    .then(function (results) {
      let [token, group] = results;
      dispatch(user_manager_types.UPDATE_GROUP, group);
      cache.saveAccessToken(account.id, token);
    })
    .catch(function (err) {
      console.error(err);
    });
};
