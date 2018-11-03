const Controller = require('egg').Controller;


module.exports = class ViewController extends Controller {
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

  async manager() {
    const { ctx } = this;
    await ctx.render('manager.html');
  }
};
