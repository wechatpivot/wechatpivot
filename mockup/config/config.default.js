'use strict';
const fs = require('fs');
const path = require('path');
const nunjucks = require('egg-web/config/nunjucks');
const envfileParser = require('egg-web/config/envfile-parser');
const envfile = fs.readFileSync(path.resolve(__dirname, './envfile'), 'utf-8');


module.exports = app => {
  const config = {};

  const props = envfileParser(envfile);
  config.props = props;
  config.webenv = props['web.env'];

  config.keys = app.name + 'default-dev-key';

  config.security = {
    csrf: false,
  };

  config.onerror = {
    accepts: function (ctx) {
      if (ctx.req.url.indexOf('/api/') === 0) {
        return 'json';
      } else {
        return 'html';
      }
    },
  };

  config.view = nunjucks;

  config.sequelize = {
    dialect: 'postgres',
    database: props['postgres.database'],
    host: process.env.POSTGRES_ADDRESS || props['postgres.address'],
    port: '5432',
    username: props['postgres.username'],
    password: props['postgres.password'],
    define: {
      freezeTableName: true,
      underscored: true,
    },
  };


  return config;
};
