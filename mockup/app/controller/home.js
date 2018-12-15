const Controller = require('egg').Controller;


module.exports = class HomeController extends Controller {
  async index() {
    const { ctx, config } = this;
    await ctx.render('index.html', { env: config.props['egg.env'] });
  }
}
