'use strict';
const fs = require('fs');
const path = require('path');
const onerror = require('egg-web/config/onerror');
const envfileParser = require('egg-web/config/envfileParser');
const envfile = fs.readFileSync(path.resolve(__dirname, './envfile'), 'utf-8');


module.exports = appInfo => {
  const config = {};

  const props = envfileParser(envfile);
  config.props = props;
  config.webenv = props['web.env'];

  config.keys = 'default-dev-key';

  config.security = {
    csrf: false,
  };

  config.onerror =onerror;

  config.bodyParser = {
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml'],
    },
  };

  config.mq = {
    rabbitmq: `amqp://${props['rabbitmq.username']}:${encodeURIComponent(props['rabbitmq.password'])}@${props['rabbitmq.address']}:${props['rabbitmq.port']}`,
    producers: [
      {
        exchange: 'wechatpivot.exchange.messageIn',
        exchangeType: 'topic',
      },
    ],
    consumers: [
      {
        exchange: 'wechatpivot.exchange.messageOut',
        exchangeType: 'topic',
        queue: 'wechatpivot.queue.messageOutText',
        topic: 'text.*',
        consumer: 'messageOut.text',
      },
    ],
  };

  return config;
};
