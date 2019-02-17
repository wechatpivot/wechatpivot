const Service = require('egg').Service;
const WechatAPI = require('promise-wechat-api');


module.exports = class MessageOut extends Service {
  async broadcast(message) {
    const { ctx } = this;

    // TODO: normalize
    if (message.MsgType === 'text') {
      const apps = await ctx.model.Weapp.listAppByGhId(message.ToUserName);
      if (apps.length > 0) {
        const topic = 'text..' + apps.join('.') + '.';
        ctx.service.mq.producer('wechatpivot.exchange.messageIn', topic, message);
      }
    }
  }
}
