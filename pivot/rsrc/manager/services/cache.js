import localforage from 'localforage';
import { pick } from '../services/sugar';
import { SENSITIVE_FIELDS, INSENSITIVE_FIELDS } from '../models/account';


const CACHE_KEY_ACCOUNTS = 'accounts-v2';
const CACHE_KEY_ACCOUNTS_SENSITIVE = 'accounts-sensitive-v2';

function getInsensitiveAccounts() {
  let promise = new Promise(function (resolve, reject) {
    localforage.getItem(CACHE_KEY_ACCOUNTS, function (err, accounts) {
      if (err) {
        reject(err);
      }

      if (accounts) {
        resolve(accounts);
      } else {
        resolve([]);
      }
    });
  });

  return promise;
}

function getSensitiveAccounts() {
  let promise = new Promise(function (resolve, reject) {
    localforage.getItem(CACHE_KEY_ACCOUNTS_SENSITIVE, function (err, accounts) {
      if (err) {
        reject(err);
      }

      if (accounts) {
        resolve(accounts);
      } else {
        resolve([]);
      }
    });
  });

  return promise;
}

export function getAccounts() {
  return Promise
    .all([
      getInsensitiveAccounts(),
      getSensitiveAccounts(),
    ])
    .then(function (results) {
      let [insensitive, sensitive] = results;

      let promise = new Promise(function (resolve) {
        if (sensitive.length > 0) {
          sensitive.forEach(function (s) {
            insensitive.forEach(function (a) {
              if (a.appId === s.appId) {
                Object.assign(a, s);
              }
            });
          });
        }

        resolve(insensitive);
      });

      return promise;
    });
}

function setInsensitiveAccounts(accounts) {
  let insensitive = accounts.map(a => pick(a, INSENSITIVE_FIELDS));

  let promise = new Promise(function (resolve, reject) {
    localforage.setItem(CACHE_KEY_ACCOUNTS, insensitive, function (err) {
      if (err) {
        reject(err);
      }

      resolve(true);
    });
  });

  return promise;
}

function setSensitiveAccounts(accounts) {
  let fields = ['appId'].concat(SENSITIVE_FIELDS);
  let sensitive = accounts.map(a => pick(a, fields));

  let promise = new Promise(function (resolve, reject) {
    localforage.setItem(CACHE_KEY_ACCOUNTS_SENSITIVE, sensitive, function (err) {
      if (err) {
        reject(err);
      }

      resolve(true);
    });
  });

  return promise;
}

export function setAccounts(accounts) {
  console.assert(!accounts.__ob__, 'it should not be a vue object');

  return Promise
    .all([
      setInsensitiveAccounts(accounts),
      setSensitiveAccounts(accounts),
    ]);
}
