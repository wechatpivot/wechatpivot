const Service = require('egg').Service;
const { Payment } = require('promise-wechat-pay');


module.exports = class Fastpay extends Service {
  start(tradeType, productCode, description, orderNo, price, openId) {
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

    if (openId) {
      params.openid = openId;
    }

    return { payment: new Payment(init), params };
  }

  async createJsapiOrder(productCode, description, orderNo, price, openId) {
    const { ctx } = this;
    const { payment, params } = this.start('JSAPI', productCode, description, orderNo, price, openId);

    try {
      const {
        return_code: returnCode,
        return_msg: returnMsg,
        result_code: resultCode,
        appid: appId,
        mch_id: mchId,
        trade_type: tradeType,
        device_info: deviceInfo,
        nonce_str: nonceStr,
        sign,
        prepay_id: prepayId,
      } = await payment.unifiedOrder(params);
      ctx.logger.info(payment);

      const timeStamp = Math.floor(Date.now() / 1000) + '';
      const pkg = 'prepay_id=' + prepayId;
      const signType = 'MD5';
      const toSign = { appId, timeStamp, nonceStr, package: pkg, signType };

      const paySign = payment._getSign(toSign);

      return { appId, timestamp: timeStamp, nonceStr, package: pkg, signType, paySign }; // 实际上 jssdk 并不需要这个 appId
      // return { returnCode, returnMsg, resultCode, appId, mchId, tradeType, deviceInfo, nonceStr, sign, prepayId };
    } catch (e) {
      ctx.logger.error(e);
      throw e;
    }
  }
};
