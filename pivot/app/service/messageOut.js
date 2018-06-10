const WechatAPI = require('promise-wechat-api');


module.exports = app => {
  return class MessageOut extends app.Service {
    async text(topic, content) {
      const { ctx, config } = this;
      const appid = config.props['wechat.appid'];
      const appsecret = config.props['wechat.appsecret'];

      const openId = topic.substring(5); // text.*

      try {
        const client = new WechatAPI(appid, appsecret);
        const res = await client.sendText(openId, content);
        ctx.logger.info(res);
      } catch (err) {
        ctx.logger.error(err);
      }
    }
  };
}
