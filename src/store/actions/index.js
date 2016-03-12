import superagent from 'superagent';
import dispatcher from '../../dispatcher';
import { setup_types, nav_types, form_types, user_manager_types } from '../types';
import generate_query from './signature';
import * as cache from './cache';
import * as api from './api';


export const loadSetup = function ({ dispatch }) {
  Promise
    .all([
      cache.getAccounts(),
      cache.getCurrentAccountId(),
    ])
    .then(function ([accounts, current_account_id]) {
      dispatch(setup_types.LOAD_ACCOUNTS, accounts);
      dispatch(setup_types.CHANGE_ACCOUNT, current_account_id);
    })
    .catch(function (err) {
      console.error(err);
    });
};

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

export const validate = function ({ state, dispatch }, id, url, token, app_id) {
  dispatch(setup_types.ACCOUNT_EXPIRES);

  const query = generate_query(token);
  const echostr = Math.random().toString(36).substring(2);
  query.echostr = echostr;

  superagent
    .get(url)
    .query(query)
    .end(function (err, res) {
      if (err) {
        console.error(err);
        // FIXME
        dispatcher.$emit('INVALID_ACCOUNT', err.message);
      } else {
        if (res.text === echostr) {
          Promise
            .all([
              cache.saveAccount({ id, url, token, app_id }),
              cache.saveCurrentAccountId(id),
            ])
            .then(function () {
              loadSetup({ dispatch });
            })
            .catch(function (error) {
              console.error(error);
            });
        } else {
          console.error(res.text);
          // FIXME
          dispatcher.$emit('INVALID_ACCOUNT', res.text);
        }
      }
    });
};

export const removeAccount = function ({ dispatch }, id) {
  cache
    .removeAccount(id)
    .then(function () {
      dispatch(setup_types.REMOVE_ACCOUNT, id);
    })
    .catch(function (err) {
      console.error(err);
    });
};

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
