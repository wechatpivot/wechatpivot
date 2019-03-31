const Controller = require('egg').Controller;


module.exports = class ViewV2Controller extends Controller {
  async oauth() {
    const { ctx, config } = this;
    const { alias } = ctx.params;
    const { redirect, code } = ctx.queries;

    if (!alias) {
      throw new Error('INVALID ALIAS');
    }

    if (!redirect) {
      throw new Error('INVALID REDIRECT');
    }

    if (!code) {
      throw new Error('INVALID CODE');
    }

    await ctx.service.oauth.getAccessToken(alias, code);

    // FIXME:
    if (redirect.indexOf('?') > -1) {
      return ctx.redirect(redirect + '&code=' + code);
    } else {
      return ctx.redirect(redirect + '?code=' + code);
    }
  }
}
