app.config(function ($stateProvider) {
  $stateProvider.state('buffer', {
    url: '/buffers/:bufferId',
    templateUrl: '/templates/bufferPage.html',
    controller: 'BufferCtrl',
    resolve: {
      buffer: function (Buffer, $stateParams) {
        return Buffer.find($stateParams.bufferId);
      }
    }
  });
});

app.controller('BufferCtrl', function ($scope, buffer) {
  console.log(buffer);
})