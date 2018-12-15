const Controller = require('egg').Controller;
const rnd = require('vanilla.js/random/dummy');


module.exports = class PivotController extends Controller {
  async oauth() {
    const { ctx } = this;
    const { code, r } = ctx.queries;

    if (!r) {
      throw new Error('INVALID R');
    }

    if (!code) {
      throw new Error('INVALID CODE');
    }

    // await ctx.service.oauth.getAccessToken(code);

    let redirect = r;
    if (r.indexOf('?') > -1) {
      redirect += '&code=' + code;
    } else {
      redirect += '?code=' + code;
    }

    await ctx.render('oauth.html', { redirect, code });
  }

  async oauthUrl() {
    const { ctx, config } = this;
    const { r } = ctx.request.body;

    if (!r) {
      throw new Error('INVALID R');
    }

    const selfUrl = config.props['openurl.wechatmockup'];

    const code = rnd();
    const url = `${selfUrl}/oauth?r=${encodeURIComponent(r)}&code=${code}`;

    ctx.status = 201;
    ctx.body = { url };
  }

  async oauthInfo() {
    const { ctx } = this;
    const { code } = ctx.queries;

    const { openId } = ctx.service.oauth.get(code);

    ctx.status = 200;
    ctx.body = { openId };
  }

  async jssdkConfig() {
    const { ctx, config } = this;
    const { url } = ctx.queries;

    if (!url || url.length === 0) {
      throw new Error('INVALID URL');
    }

    const signature = url[0].toUpperCase().replace(/[://.-]/ig, rnd());

    const appId = config.props['wechat.appid']

    ctx.body = {
      appId,
      timestamp: parseInt(new Date().getTime() / 1000, 0) + '',
      nonceStr: rnd(),
      signature,
    };
    ctx.status = 201;
  }
}
