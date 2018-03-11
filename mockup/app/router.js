'use strict';

module.exports = app => {
  app.get('/oauth', 'pivot.oauth');
  app.post('/private-api/oauth/snsapi-base:url', 'pivot.oauthUrl');
  app.get('/private-api/oauth/snsapi-base', 'pivot.oauthInfo');
  app.get('/private-api/jssdk/config', 'pivot.jssdkConfig');

  app.get('/', 'view.index');

  app.post('/api/login', 'api.login');
  app.get('/api/users', 'api.users');
};
