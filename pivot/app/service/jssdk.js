const WechatAPI = require('promise-wechat-api');


module.exports = app => {
  let memoryCache = {};

  return class JsSDK extends app.Service {
    async getJsConfig(url) {
      const { ctx, config } = this;
      const appid = config.props['wechat.appid'];
      const appsecret = config.props['wechat.appsecret'];
      try {
        const client = new WechatAPI(appid, appsecret);
        const jsConfig = await client.getJsConfig({
          debug: false,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
          url,
        });
        ctx.logger.info(jsConfig);
        return jsConfig;
      } catch (err) {
        ctx.logger.error(err);
      }
    }
  };
}
