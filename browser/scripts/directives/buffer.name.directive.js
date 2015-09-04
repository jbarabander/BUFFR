app.directive('bufferName', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/bufferName.html',
    scope: {
      buffer: '='
    }
  }
});