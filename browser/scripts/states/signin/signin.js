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