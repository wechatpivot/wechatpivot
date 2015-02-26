var angular = require('angular');

// just require the controllers you want
// controllers will require their own dependencies
var board_controller = require('./controllers/board');
// var guest_controller = require('./controllers/guest');
// var connection_controller = require('./controllers/connection');
// var qrcode_controller = require('./controllers/qrcode');
// var anim_controller = require('./controllers/anim');


angular.element(document).ready(function () {
  angular.bootstrap(document, ['weixin-api-debug']);
});
