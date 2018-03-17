
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
      const user = await ctx.model.User.findOne({ username });
      const userWechat = await ctx.model.UserWechat.findOne({ userId: user.id });

      await ctx.service.oauth.getAccessToken(code, userWechat.openId);

      ctx.body = { code: 0, message: 'ok' };
      ctx.status = 201;
    }
  }

  return ApiController;
};
