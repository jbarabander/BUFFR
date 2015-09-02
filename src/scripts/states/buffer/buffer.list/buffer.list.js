app.config(function ($stateProvider) {
  $stateProvider.state('buffers', {
    url: '/buffers',
    templateUrl: '/templates/bufferList.html',
    controller: 'BuffersCtrl',
    resolve: {
      buffers: function (Buffer) {
        console.log("got here")
        return Buffer.findAll();
      }
    }
  });
});

app.controller('BuffersCtrl', function ($scope, buffers, Buffer) {
  $scope.newBuffer = {
    compound: null,
    concentration: null
  }
  $scope.createBuffer = function(bufferObj) {
    Buffer.createBuffer(bufferObj).then(function(element) {
      $state.go('buffer', {id: element._id});
    })
  }
 });
