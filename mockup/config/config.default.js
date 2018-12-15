const fs = require('fs');
const path = require('path');
const nunjucks = require('egg-web/config/nunjucks');
const onerror = require('egg-web/config/onerror');
const envfileParser = require('egg-web/config/envfileParser');
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

  config.onerror = onerror;

  config.view = nunjucks;

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


  return config;
};
