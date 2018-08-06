
module.exports = app => {
  class ApiController extends app.Controller {
    async users() {
      const { ctx } = this;
      const users = await ctx.model.User.findAll();

      ctx.status = 201;
      ctx.body = {
        code: 0,
        message: 'ok',
        data: {
          users,
        },
      };
    }

    async login() {
      const { ctx } = this;

      const { username, code } = ctx.request.body;
      const user = await ctx.model.User.findOne({ where: { username } });
      const { openId } = await ctx.model.UserWechat.findOne({ where: { userId: user.id } });

      await ctx.service.oauth.getAccessToken(code, openId);
      // const dbg = JSON.stringify({ code, openId });
      // ctx.logger.info(dbg);

      ctx.body = { code: 0, message: 'ok' };
      ctx.status = 201;
    }
  }

  return ApiController;
};
