const Controller = require('egg').Controller;


module.exports = class ViewController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      message: 'ok',
    };
    ctx.status = 200;
  }

  async oauth() {
    const { ctx, config } = this;
    const { code, r } = ctx.queries;

    if (!r) {
      throw new Error('INVALID R');
    }

    await ctx.service.oauth.getAccessToken(code);

    // FIXME:
    if (r.indexOf('?') > -1) {
      return ctx.redirect(r + '&code=' + code);
    } else {
      return ctx.redirect(r + '?code=' + code);
    }

    // ctx.body = `r: ${r}, code: ${code}, openId: ${openId}, accessToken: ${accessToken}`;
    // ctx.status = 200;
  }
}
