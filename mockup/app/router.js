'use strict';

module.exports = app => {
  app.get('/', 'home.index');

  app.get('/oauth', 'pivot.oauth');
  app.post('/private-api/oauth/snsapi-base:url', 'pivot.oauthUrl');
  app.get('/private-api/oauth/snsapi-base', 'pivot.oauthInfo');
  app.get('/private-api/jssdk/config', 'pivot.jssdkConfig');

  app.post('/api/login', 'api.login');
  app.get('/api/users', 'api.users');
};
