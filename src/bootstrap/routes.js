var app = require('./app');

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/message/text', {
      templateUrl: 'views/message/text.html',
      controller: 'MessageTextCtrl',
      controllerAs: 'ctrl'
    })
    .when('/message/event', {
      templateUrl: 'views/message/event.html',
      controller: 'MessageEventCtrl',
      controllerAs: 'ctrl'
    })
    .otherwise({
      redirectTo: '/message/text'
    });
}]);
