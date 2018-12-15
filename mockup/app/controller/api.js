const Controller = require('egg').Controller;


module.exports = class ApiController extends Controller {
  async users() {
    const { ctx } = this;
    const users = await ctx.model.UserWechat.findAll();

    ctx.status = 200;
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
    const { openId } = await ctx.model.UserWechat.findOne({ where: { username } });

    await ctx.service.oauth.getAccessToken(code, openId);

    ctx.status = 201;
    ctx.body = { code: 0, message: 'ok' };
  }
}
