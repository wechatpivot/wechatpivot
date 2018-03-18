
module.exports = app => {
  class ViewController extends app.Controller {
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

  return ViewController;
};
