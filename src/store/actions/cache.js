import localforage from 'localforage';


const CACHE_KEY_ACCOUNTS = 'accounts-v1';
const CACHE_KEY_CURRENT_ACCOUNT_ID = 'current-account-id-v1';


let _accounts = [];
let _current_account_id = null;


function _plainAccounts() {
  return _accounts.filter(() => true);
}


export function getAccounts() {
  let promise = new Promise(function (resolve, reject) {
    if (_accounts.length > 0) {
      resolve(_plainAccounts());
    } else {
      localforage.getItem(CACHE_KEY_ACCOUNTS, function (err, accounts) {
        if (err) {
          reject(err);
        }

        if (accounts) {
          _accounts = accounts;
        }

        resolve(_plainAccounts());
      });
    }
  });

  return promise;
}

// create or update
export function saveAccount(account) {
  let promise = new Promise(function (resolve, reject) {
    let idx = _accounts.findIndex(a => a.id === account.id);
    if (idx > -1) {
      _accounts.splice(idx, 1, account);
    } else {
      _accounts.push(account);
    }

    localforage.setItem(CACHE_KEY_ACCOUNTS, _accounts, function (err) {
      if (err) {
        reject(err);
      }

      resolve(true);
    });
  });

  return promise;
}

export function getCurrentAccountId() {
  let promise = new Promise(function (resolve, reject) {
    if (_current_account_id) {
      resolve(_current_account_id);
    } else {
      localforage.getItem(CACHE_KEY_CURRENT_ACCOUNT_ID, function (err, id) {
        if (err) {
          reject(err);
        }

        if (id) {
          _current_account_id = id;
        }

        resolve(_current_account_id);
      });
    }
  });

  return promise;
}

export function saveCurrentAccountId(id) {
  let promise = new Promise(function (resolve, reject) {
    _current_account_id = id;

    localforage.setItem(CACHE_KEY_CURRENT_ACCOUNT_ID, _current_account_id, function (err) {
      if (err) {
        reject(err);
      }

      resolve(true);
    });
  });

  return promise;
}

export function removeAccount(id) {
  let promise = new Promise(function (resolve, reject) {
    let idx = _accounts.findIndex(a => a.id === id);
    _accounts.splice(idx, 1);

    localforage.setItem(CACHE_KEY_ACCOUNTS, _accounts, function (err) {
      if (err) {
        reject(err);
      }

      localforage.setItem(CACHE_KEY_CURRENT_ACCOUNT_ID, null, function (err2) {
        if (err2) {
          reject(err2);
        }

        resolve(true);
      });
    });
  });

  return promise;
}
