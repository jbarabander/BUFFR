app.controller('SignupController', function ($scope, $state, User) {
  $scope.addUser = function (user) {
    User.create(user)
    .then(function () {
      $state.go('landing');
    });
  };
});