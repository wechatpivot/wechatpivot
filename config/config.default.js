'use strict';
const fs = require('fs');
const path = require('path');
const onerror = require('egg-web/config/onerror');
const envfileParser = require('egg-web/config/envfileParser');
const envfile = fs.readFileSync(path.resolve(__dirname, './envfile'), 'utf-8');
const mq = require('./mq.json');


module.exports = app => {
  const config = {};

  const props = envfileParser(envfile);
  config.props = props;
  config.webenv = props['web.env'];

  const ALIAS = /^wechatpivot\.alias\.([0-9a-z]+)$/;
  const VALUES = /^wechatpivot\.([0-9a-z]+)\.([a-z]+)$/;
  const wechatpivot = { alias: {} };
  Object.keys(props).forEach(key => {
    const value = props[key];
    const amatches = key.match(ALIAS);
    if (amatches) {
      const app = amatches[1];
      wechatpivot.alias[app] = value;
    } else {
      const vmatches = key.match(VALUES);
      if (vmatches) {
        const alias = vmatches[1];
        const field = vmatches[2];
        wechatpivot[alias] = wechatpivot[alias] || {};
        wechatpivot[alias][field] = value;
      }
    }
  });
  config.wechatpivot = wechatpivot;

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

  config.sequelize = {
    dialect: 'mysql',
    database: props['mysql.database'],
    host: props['mysql.address'],
    port: '3306',
    username: props['mysql.username'],
    password: props['mysql.password'],
    define: {
      freezeTableName: true,
      underscored: true,
    },
  };

  config.mq = {
    rabbitmq: {
      address: props['rabbitmq.address'],
      port: props['rabbitmq.port'],
      username: props['rabbitmq.username'],
      password: props['rabbitmq.password'],
    },
    ...mq,
  };

  return config;
};
