var app = angular.module('buffr', ['ui.router'])
// .config(function ($locationProvider) {
//   $locationProvider.html5Mode(true);
// });
app.controller('SignupController', function ($scope, $state, UserFactory) {
  $scope.addUser = function (user) {
    UserFactory.addUser(user)
    .then(function () {
      $state.go('landing');
    });
  }
});
app.factory('UserFactory', function($http) {
  function addUser(user) {
    console.log(user);
    return $http.post('/users', user)
    .then(function (response) {
      return response.data;
    });
  }



  return {
    addUser: addUser
  };
});
app.config(function ($stateProvider) {
  $stateProvider.state('landing', {
    url: '/',
    templateUrl: '/templates/landing.html',
  });
});
app.config(function ($stateProvider) {
  $stateProvider.state('signin', {
    url: '/signin',
    templateUrl: '/templates/signin.html'
  })
  .state('signin.signup', {
    url: '/new',
    templateUrl: '/templates/signup.html',
    controller: 'SignupController'
  })
  .state('signin.login', {
    url: '/login',
    templateUrl: '/templates/login.html'
  });
});