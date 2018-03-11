
module.exports = app => {
  class ApiController extends app.Controller {
    * users() {
      const { ctx } = this;
      const users = yield ctx.model.User.findAll();

      ctx.status = 201;
      ctx.body = {
        code: 0,
        message: 'ok',
        data: {
          users,
        },
      };
    }

    * login() {
      const { ctx } = this;

      const { username, code } = ctx.request.body;
      const user = yield ctx.model.User.findOne({ username });
      const userWechat = yield ctx.model.UserWechat.findOne({ userId: user.id });

      yield ctx.service.oauth.getAccessToken(code, userWechat.openId);

      ctx.body = { code: 0, message: 'ok' };
      ctx.status = 201;
    }
  }

  return ApiController;
};
