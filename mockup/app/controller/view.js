
module.exports = app => {
  class ViewController extends app.Controller {
    async index() {
      const { ctx, config } = this;
      await ctx.render('index.html', { env: config.props['egg.env'] });
    }

    async debugger() {
      const { ctx, config } = this;
      await ctx.render('debugger.html', { env: config.props['egg.env'] });
    }
  }

  return ViewController;
};
