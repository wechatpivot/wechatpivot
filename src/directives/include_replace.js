var app = require('../bootstrap/app');


app.directive('includeReplace', function () {
  return {
    replace: true, // !!deprecated: http://stackoverflow.com/a/20912566/707580
    restrict: 'A',
    templateUrl: function (element, attrs) {
      if (!attrs.includeReplace) {
        throw new Error('invalid template url');
      }

      return attrs.includeReplace;
    }
  };
});


module.exports = {};
