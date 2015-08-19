var angular = require('angular');


// just require the controllers you want
// controllers will require their own dependencies
require('./controllers/message_text');
require('./controllers/message_event_scan_subscribe');
require('./controllers/message_event_scan');
require('./controllers/tools_oauth2');
require('./controllers/setup_register');
require('./bootstrap/routes');


angular.element(document).ready(function () {
  angular.bootstrap(document, ['weixin-api-debug']);
});
