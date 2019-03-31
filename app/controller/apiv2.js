const Controller = require('egg').Controller;


module.exports = class ApiV2Controller extends Controller {
  async base() {
    const { ctx, config } = this;
    const { alias } = ctx.params;
    const { redirect } = ctx.request.body;

    if (!alias) {
      throw new Error('INVALID ALIAS');
    }

    if (!redirect) {
      throw new Error('INVALID REDIRECT');
    }

    const conf = ctx.service.alias.conf(alias);
    // ctx.logger.info(conf);
    const { appid } = conf;

    ctx.logger.info(alias, redirect, appid);
    const selfUrl = config.props['url.self'];

    const callback = `${selfUrl}/apps/${alias}/oauth?redirect=${encodeURIComponent(redirect)}`;
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(callback)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`

    ctx.body = { url };
    ctx.status = 201;
  }

  async oauth() {
    const { ctx } = this;
    const { alias } = ctx.params;
    const { code } = ctx.queries;

    const { openId } = ctx.service.oauth.get(alias, code);

    ctx.body = { openId };
    ctx.status = 201;
  }
}
