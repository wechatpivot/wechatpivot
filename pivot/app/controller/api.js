const wechatMessage = require('promise-wechat-message');
const rnd = require('vanilla.js/random/dummy');


module.exports = app => {
  class ApiController extends app.Controller {
    async url() {
      const { ctx, config } = this;
      const { r } = ctx.request.body;

      if (!r) {
        throw new Error('INVALID R');
      }

      const selfUrl = config.props['url.self'];
      const appid = config.props['wechat.appid'];

      const callback = `${selfUrl}/oauth?r=${encodeURIComponent(r)}`;
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(callback)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`

      ctx.body = { url };
      ctx.status = 201;
    }

    async oauth() {
      const { ctx, config } = this;
      const { code } = ctx.queries;

      const { openId } = ctx.service.oauth.get(code);

      ctx.body = { openId };
      ctx.status = 201;
    }

    async jsConfig() {
      const { ctx, config } = this;
      const { url } = ctx.query;

      if (!url || url.length === 0) {
        throw new Error('INVALID URL');
      }

      const jsConfig = await ctx.service.jssdk.getJsConfig(decodeURIComponent(url));

      ctx.body = jsConfig;
      ctx.status = 201;
    }

    async messageIn() {
      const { ctx, app: { messenger } } = this;

      const msg = await wechatMessage.xml2json(ctx.request.body);
      // console.log(msg);

      const action = {
        type: `${msg.MsgType}.${msg.FromUserName}`,
        payload: msg,
      };
      messenger.send('wechatpivot.exchange.messageIn', action);

      ctx.body = 'success';
      ctx.status = 200;
    }
  }

  return ApiController;
};
