const CACHE_KEY = 'setup-v1';


export const getSetup = function () {
  if (CACHE_KEY in localStorage) {
    return JSON.parse(localStorage[CACHE_KEY] || '{}');
  } else {
    return {}
  }
};


export const setSetup = function(url, token) {
  localStorage[CACHE_KEY] = JSON.stringify({
    url: url,
    token: token,
  });
};
