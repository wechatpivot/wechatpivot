var angular = require('angular');

// just require the controllers you want
// controllers will require their own dependencies
/* jshint ignore:start */
var message_text = require('./controllers/message_text');
var message_event_scan_subscribe = require('./controllers/message_event_scan_subscribe');
var message_event_scan = require('./controllers/message_event_scan');
var setup_register = require('./controllers/setup_register');
var routes = require('./bootstrap/routes');
/* jshint ignore:end */

angular.element(document).ready(function () {
  angular.bootstrap(document, ['weixin-api-debug']);
});
