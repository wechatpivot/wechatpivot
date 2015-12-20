import localforage from 'localforage';


const CACHE_KEY_ACCOUNTS = 'accounts-v1';
const CACHE_KEY_CURRENT_ACCOUNT_ID = 'current-account-id-v1';


const ACCOUNT_EXAMPLE = {
  id: 'EXAMPLE',
  url: 'http://127.0.0.1:5000/wechat/',
  token: 'FAKE_WECHAT_TOKEN',
};


export function getAccounts() {
  let promise = new Promise(function (resolve, reject) {
    localforage.getItem(CACHE_KEY_ACCOUNTS, function (err, accounts) {
      if (err) {
        reject(err);
      }

      if (accounts) {
        resolve(accounts);
      } else {
        resolve([ACCOUNT_EXAMPLE]);
      }
    });
  });

  return promise;
}


// create or update
export function saveAccount(account) {
  let promise = new Promise(function (resolve, reject) {
    getAccounts()
      .then(function (accounts) {
        let idx = accounts.findIndex(a => a.id === account.id);
        if (idx > -1) {
          accounts.splice(idx, 1, account);
        } else {
          accounts.push(account);
        }

        localforage.setItem(CACHE_KEY_ACCOUNTS, accounts, function (err_set) {
          if (err_set) {
            reject(err_set);
          }

          resolve(true);
        });
      })
      .catch(function (err_get) {
        reject(err_get);
      });
  });

  return promise;
}

export function getCurrentAccountId() {
  let promise = new Promise(function (resolve, reject) {
    localforage.getItem(CACHE_KEY_CURRENT_ACCOUNT_ID, function (err, id) {
      if (err) {
        reject(err);
      }

      resolve(id || null);
    });
  });

  return promise;
}

export function saveCurrentAccountId(id) {
  let promise = new Promise(function (resolve, reject) {
    localforage.setItem(CACHE_KEY_CURRENT_ACCOUNT_ID, id, function (err) {
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
    getAccounts()
      .then(function (accounts) {
        let idx = accounts.findIndex(a => a.id === id);
        accounts.splice(idx, 1);

        localforage.setItem(CACHE_KEY_ACCOUNTS, accounts, function (err) {
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
      })
      .catch(function (err) {
        reject(err);
      });
  });

  return promise;
}
