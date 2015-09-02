app.config(function ($stateProvider) {
  $stateProvider.state('buffers', {
    url: '/buffers',
    templateUrl: '/templates/bufferList.html',
    controller: 'BuffersCtrl',
    resolve: {
      buffers: function (Buffer, $stateParams) {
        console.log("got here")
        return Buffer.findAll();
      }
    }
  });
});

app.controller('BuffersCtrl', function ($scope, buffers) {
  console.log(buffers);
});