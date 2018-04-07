const rnd = require('vanilla.js/random/dummy');


module.exports = app => {
  class PivotController extends app.Controller {
    async oauth() {
      const { ctx, config } = this;
      const env = config.props['egg.env'];
      const { code, r } = ctx.queries;

      if (!r) {
        throw new Error('INVALID R');
      }

      if (!code) {
        throw new Error('INVALID CODE');
      }

      await ctx.service.oauth.getAccessToken(code);

      let redirect = r;
      if (r.indexOf('?') > -1) {
        redirect += '&code=' + code;
      } else {
        redirect += '?code=' + code;
      }

      await ctx.render('oauth.html', { redirect, code, env });
    }

    async oauthUrl() {
      const { ctx, config } = this;
      const { r } = ctx.request.body;

      if (!r) {
        throw new Error('INVALID R');
      }

      const selfUrl = config.props['url.self'];

      const code = rnd();
      const url = `${selfUrl}/oauth?r=${encodeURIComponent(r)}&code=${code}`;

      ctx.body = { url };
      ctx.status = 201;
    }

    async oauthInfo() {
      const { ctx, config } = this;
      const { code } = ctx.queries;

      const { openId } = ctx.service.oauth.get(code);

      ctx.body = { openId };
      ctx.status = 201;
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

  return PivotController;
};
