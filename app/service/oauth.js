const OAuthClient = require('promise-wechat-oauth');


module.exports = app => {
  let memoryCache = {};

  return class OAuth extends app.Service {
    get(key) {
      const { ctx } = this;
      const data = Object.assign({}, memoryCache[key]);
      delete memoryCache[key];
      return data;
    }

    async getAccessToken(code) {
      const { ctx, config } = this;
      const appid = config.props['wechat.appid'];
      const appsecret = config.props['wechat.appsecret'];
      try {
        const client = new OAuthClient(appid, appsecret);
        const { access_token: accessToken, openid: openId } = await client.getAccessToken(code);
        memoryCache[code] = { accessToken, openId };
      } catch (err) {
        ctx.logger.error(err);
      }
    }
  };
}
