chrome.app.runtime.onLaunched.addListener(function () {
  chrome.app.window.create(
    'index.html',
    function (createdWindow) {
      createdWindow.onClosed.addListener(function () {
        // ** LocalForage defaults
        var DATABASE_NAME = 'localforage';
        var DATABASE_VERSION = 2;
        var STORE_NAME = 'keyvaluepairs';

        var CACHE_KEY_ACCOUNTS_SENSITIVE = 'accounts-sensitive-v2';

        var dbOpenRequest = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

        dbOpenRequest.onsuccess = function () {
          var db = dbOpenRequest.result;
          var transaction = db.transaction([STORE_NAME], 'readwrite');
          var store = transaction.objectStore(STORE_NAME);
          var req = store.delete(CACHE_KEY_ACCOUNTS_SENSITIVE);

          transaction.oncomplete = function (event) {
            console.log(event);
          };

          transaction.onerror = function (event) {
            console.error(event);
          };
        };
      });
    });
});
