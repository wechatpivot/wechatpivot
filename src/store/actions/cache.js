import localforage from 'localforage';
import { pick } from '../../common/sugar';
import { INSENSITIVE_FIELDS } from '../../models/account';


const CACHE_KEY_ACCOUNTS = 'accounts-v2';

export function getAccounts() {
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

export function setAccounts(accounts) {
  console.assert(!accounts.__ob__, 'it should not be a vue object');

  let insensitiveAccounts = accounts.map(a => pick(a, INSENSITIVE_FIELDS));

  let promise = new Promise(function (resolve, reject) {
    localforage.setItem(CACHE_KEY_ACCOUNTS, insensitiveAccounts, function (err) {
      if (err) {
        reject(err);
      }

      resolve(true);
    });
  });

  return promise;
}
