const Service = require('egg').Service;


module.exports = class Alias extends Service {
  conf(alias) {
    const { config } = this;
    const { wechatpivot } = config;
    // ctx.logger.info(wechatpivot);

    if (wechatpivot[alias]) {
      return wechatpivot[alias];
    } else if (wechatpivot.alias[alias]) {
      return wechatpivot[wechatpivot.alias[alias]];
    } else {
      // FIXME: throw
      return {};
    }
  }
}
