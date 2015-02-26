(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var angular = (typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./controllers/board":3}],2:[function(require,module,exports){
(function (global){
var angular = (typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null);
// var services = require('./services');

var app = angular.module('weixin-api-debug', []);


module.exports = app;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
var app = require('../bootstrap/app');



var xml = "<xml>\n  <ToUserName><![CDATA[toUser]]></ToUserName>\n  <FromUserName><![CDATA[fromUser]]></FromUserName>\n  <CreateTime>1348831860</CreateTime>\n  <MsgType><![CDATA[text]]></MsgType>\n  <Content><![CDATA[this is a test]]></Content>\n  <MsgId>1234567890123456</MsgId>\n</xml>\n";

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

},{"../bootstrap/app":2}]},{},[1])


//# sourceMappingURL=weixin-api-debug.js.map