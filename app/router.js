'use strict';

module.exports = app => {
  app.get('/', 'view.index');
  app.get('/oauth', 'view.oauth');

  app.get('/api/message-in', 'api.messageInVerify');
  app.post('/api/message-in', 'api.messageIn');
  app.post('/api/pay-notify', 'api.payNotify');

  app.post('/private-api/oauth/snsapi-base:url', 'api.url');
  app.get('/private-api/oauth/snsapi-base', 'api.oauth');

  app.get('/private-api/jssdk/config', 'api.jsConfig');

  app.post('/private-api/create-jsapi-order', 'api.createJsapiOrder');
};
