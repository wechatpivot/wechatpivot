import superagent from 'superagent';
import dispatcher from '../../dispatcher';
import { setup_types, nav_types, form_types } from '../types';
import generate_query from './signature';
import * as cache from './cache';


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

export const validate = function ({ state, dispatch }, id, url, token) {
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
              cache.saveAccount({ id, url, token }),
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
