'use strict';

module.exports = app => {
  app.get('/oauth', 'view.oauth');

  app.post('/private-api/oauth/snsapi-base:url', 'api.url');
  app.get('/private-api/oauth/snsapi-base', 'api.oauth');

  app.get('/private-api/jssdk/config', 'api.jsConfig');
};
