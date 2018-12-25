const wechatMessage = require('promise-wechat-message');
const { Payment } = require('promise-wechat-pay');

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

    async messageInVerify() {
      const { ctx, config } = this;
      const { signature, timestamp, nonce, echostr } = ctx.query;
      const token = config.props['wechat.token'];
      // console.log(signature, timestamp, nonce, token, echostr);

      if (wechatMessage.verify(signature, timestamp, nonce, token)) {
        ctx.body = echostr;
        ctx.status = 200;
      } else {
        ctx.body = 'INVALID SIGNATURE';
        ctx.status = 400;
      }
    }

    async messageIn() {
      const { ctx, app: { messenger } } = this;

      const msg = await wechatMessage.receive(ctx.request.body);
      // console.log(msg);

      const action = {
        topic: `${msg.MsgType}.${msg.FromUserName}`,
        payload: msg,
      };
      messenger.send('@@egg-mq/producer/wechatpivot.exchange.messageIn', action);

      ctx.body = 'success';
      ctx.status = 200;
    }

    async createJsapiOrder() {
      const { ctx } = this;
      const { productCode, description, orderNo, price, openId } = ctx.request.body;
      ctx.logger.info(productCode, description, orderNo, price);
      // TODO: validation
      const priceFen = parseInt(price, 10);

      const command = await ctx.service.fastpay.createJsapiOrder(productCode, description, orderNo, priceFen, openId);

      ctx.status = 201;
      ctx.body = command;
    }

    async payNotify() {
      const { ctx } = this;
      ctx.logger.info(ctx.request.body);
      ctx.body = '<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>';
      ctx.status = 201;
    }
  }

  return ApiController;
};
