const WechatAPI = require('promise-wechat-api');


module.exports = app => {
  return class MessageOut extends app.Service {
    async text(topic, payload) {
      const { ctx, config } = this;
      const appid = config.props['wechat.appid'];
      const appsecret = config.props['wechat.appsecret'];

      // const app = topic.substring(5); // text.
      const openId = payload.ToUserName;

      try {
        const client = new WechatAPI(appid, appsecret);
        const res = await client.sendText(openId, payload.Content); // { MsgType: 'text', Content: 'blabla' }
        ctx.logger.info(res);
      } catch (err) {
        ctx.logger.error(err);
      }
    }
  };
}
