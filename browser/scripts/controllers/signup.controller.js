app.controller('SignupController', function ($scope, $state, UserFactory) {
  $scope.addUser = function (user) {
    UserFactory.addUser(user)
    .then(function () {
      $state.go('landing');
    });
  }
});