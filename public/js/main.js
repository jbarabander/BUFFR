var app = angular.module('buffr', ['ui.router'])
.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
});
app.controller('SignupController', function ($scope, $state, UserFactory) {
  $scope.addUser = function (user) {
    UserFactory.addUser(user)
    .then(function () {
      $state.go('landing');
    });
  }
});
app.directive('bufferName', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/bufferName.html',
    scope: {
      buffer: '='
    }
  }
});
app.factory('Buffer', function($http, $state) {
  function Buffer (props) {
    angular.extend(this, props);
  }

  Buffer.url = '/api/buffers/';

  Buffer.prototype.getUrl = function () {
    return Buffer.url + this._id;
  };

  Buffer.prototype.isNew = function () {
    return !this._id;
  };

  var Buffer = {
    findAll: function () {
      return $http.get('/api/buffers')
      .then(function (response) {
        return response.data;
      });
    },
    findOne: function (id) {
      return $http.get('/api/buffers/' + id)
      .then(function (response) {
        return response.data;
      });
    }
  };

  return Buffer;
}).run(function (Buffer) {});
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
app.config(function ($stateProvider) {
  $stateProvider.state('buffer', {
    url: '/buffers/:bufferId',
    templateUrl: '/templates/bufferPage.html',
    controller: 'BufferCtrl',
    resolve: {
      buffer: function (Buffer, $stateParams) {
        return Buffer.findOne($stateParams.bufferId);
      }
    }
  });
});

app.controller('BufferCtrl', function ($scope, buffer) {
  $scope.buffer = buffer;
});
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

app.controller('BuffersCtrl', function ($scope, buffers) {
  console.log(buffers);
});