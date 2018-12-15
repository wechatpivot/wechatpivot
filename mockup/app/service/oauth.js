const rnd = require('vanilla.js/random/dummy');


module.exports = app => {
  let memoryCache = {};

  return class OAuth extends app.Service {
    get(key) {
      const data = Object.assign({}, memoryCache[key]);
      delete memoryCache[key];
      return data;
    }

    async getAccessToken(code, openId) {
      const accessToken = rnd();
      memoryCache[code] = { accessToken, openId };
    }
  };
}
