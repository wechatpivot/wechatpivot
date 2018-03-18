'use strict';
const fs = require('fs');
const path = require('path');
const envfile = fs.readFileSync(path.resolve(__dirname, './envfile'), 'utf-8').split('\n');


module.exports = appInfo => {
  const config = {};

  config.keys = 'default-dev-key';

  config.security = {
    csrf: false,
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  const props = {};
  envfile.forEach(p => {
    if (p) {
      const idx = p.indexOf('=');
      const k = p.substring(0, idx);
      const v = p.substring(idx + 1);
      if (k && v) {
        props[k] = v;
      }
    }
  });
  config.props = props;


  return config;
};
