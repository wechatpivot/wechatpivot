const Service = require('egg').Service;
const OAuthClient = require('promise-wechat-oauth');


let memoryCache = {};


module.exports = class OAuth extends Service {
  get(alias, code) {
    const { ctx } = this;
    const data = Object.assign({}, memoryCache[code]);
    if (data.alias === alias) {
      delete memoryCache[code];
      return data;
    } else {
      return {};
    }
  }

  async getAccessToken(alias, code) {
    const { ctx } = this;
    const { appid, secret } = ctx.service.alias.conf(alias);
    try {
      const client = new OAuthClient(appid, secret);
      const { access_token: accessToken, openid: openId } = await client.getAccessToken(code);
      memoryCache[code] = { alias, accessToken, openId };
    } catch (err) {
      ctx.logger.error(err);
    }
  }
};
