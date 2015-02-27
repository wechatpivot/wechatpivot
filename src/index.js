var angular = require('angular');

// just require the controllers you want
// controllers will require their own dependencies
var message_text = require('./controllers/message_text');
var message_event = require('./controllers/message_event');
var routes = require('./bootstrap/routes');


angular.element(document).ready(function () {
  angular.bootstrap(document, ['weixin-api-debug']);
});
