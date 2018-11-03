const Service = require('egg').Service;
const { Payment } = require('promise-wechat-pay');


module.exports = class Fastpay extends Service {
  start(productCode, description, orderNo, price, tradeType) {
    const { config } = this;

    const init = {
      partnerKey: config.props['wechat.merchant.secret'],
      appId: config.props['wechat.appid'],
      mchId: config.props['wechat.merchant.id'],
      notifyUrl: config.props['wechat.merchant.notify'],
    };

    const params = {
      product_id: productCode,
      body: description,
      out_trade_no: orderNo,
      total_fee: price,
      device_info: 'WEB',
      trade_type: tradeType,
      spbill_create_ip: '127.0.0.1', // FIXME:
    };

    return { payment: new Payment(init), params };
  }

  async qrcode(productCode, description, orderNo, price) {
    const { ctx } = this;
    const { payment, params } = this.start(productCode, description, orderNo, price, 'NATIVE');

    try {
      const resp = await payment.unifiedOrder(params);
      ctx.logger.info(resp);
      return resp.code_url;
    } catch (e) {
      ctx.logger.error(e);
      throw e;
    }
  }
};
