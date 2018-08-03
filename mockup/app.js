const LogentriesTransport = require('egg-web/transports/logentries.js');


module.exports = app => {
  app.getLogger('logger').set('logentries', new LogentriesTransport({ level: 'INFO', app }));
  app.getLogger('errorLogger').set('logentries', new LogentriesTransport({ level: 'ERROR', app }));
};
