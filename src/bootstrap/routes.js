var app = require('./app');

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/message/text', {
      templateUrl: 'views/message/text.html',
      controller: 'MessageTextCtrl',
      controllerAs: 'ctrl'
    })
    .when('/message/event/scan_subscribe', {
      templateUrl: 'views/message/event/scan_subscribe.html',
      controller: 'MessageEventScanSubscribeCtrl',
      controllerAs: 'ctrl'
    })
    .otherwise({
      redirectTo: '/message/text'
    });
}]);
