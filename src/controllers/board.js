var app = require('../bootstrap/app');


var fs = require('fs');
var xml = fs.readFileSync(__dirname + '/../templates/xml.xml', 'utf8');

app.controller('boardCtrl', function ($scope, $rootScope, $http) {
  $scope.data = {};
  if (localStorage.data) {
    $scope.data = JSON.parse(localStorage.data);
  }

  $scope.validate = function () {
    console.log($scope.data);

    localStorage.data = JSON.stringify($scope.data);
  };

  $scope.send = function () {
    xml.replace('{to_user_name}', $scope.data.to_user_name);

    console.log(xml);

    $http({
        url: $scope.data.url,
        method: 'POST',
        data: xml,
        headers: {
          'Content-type': 'text/xml'
        }
      })
      .success(function (result) {
        console.log(result);
      })
      .error(function () {
        console.log(arguments);
      });

    localStorage.data = JSON.stringify($scope.data);
  };
});

module.exports = {};
