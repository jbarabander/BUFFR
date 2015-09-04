var app = angular.module('buffr', ['js-data', 'ui.router'])
.config(function(DSProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');


  DSProvider.defaults.basePath = '/api';
  DSProvider.defaults.idAttribute = '_id';
  /*
  a method to the DSProvider defaults object that automatically
  checks if there is any data in the cache for a given service before 
  pinging the database
  */
  DSProvider.defaults.getOrFind = function(service){
    var data = this.getAll();
    if (data.length) return Promise.resolve(angular.copy(data));
    else {
      return this.findAll().then(function(data){
        return angular.copy(data);
      });
    }
  };
})
// .config(function(DSProvider) {
//   // Mongoose Relation Fix (fixes deserialization)
//   // From http://plnkr.co/edit/3z90PD9wwwhWdnVrZqkB?p=preview
//   // This was shown to us by @jmdobry, the idea here is that
//   // we fix the data coming from Mongoose models in js-data rather than outbound from Mongoose
//   function fixRelations(Resource, instance) {
//     function fixLocalKeys(i) {
//       JSData.DSUtils.forEach(Resource.relationList, function(def) {
//         var relationName = def.relation;
//         var relationDef = Resource.getResource(relationName);
//         if (def.type === 'hasMany') {
//           if (i.hasOwnProperty(def.localField)) {
//             if (i[def.localField].length && !JSData.DSUtils.isObject(i[def.localField][0])) {
//               // Case 1: array of _ids where array of populated objects should be
//               i[def.localKeys] = i[def.localField];
//               delete i[def.localField];
//             } else if (!i[def.localKeys]) {
//               // Case 2: array of populated objects, but missing array of _ids'
//               i[def.localKeys] = [];
//               JSData.DSUtils.forEach(i[def.localField], function(child) {
//                 i[def.localKeys].push(child[relationDef.idAttribute]);
//               });
//             }
//           }
//         } 
//         else if (def.type === 'belongsTo') {
//           if (i.hasOwnProperty(def.localField)) {
//             // if the localfIeld is a popualted object 
//             if (JSData.DSUtils.isObject(i[def.localField])) {
//               i[def.localKey] = i[def.localField]._id;
//             } 
//             // if the localfield is an object id 
//             else if (!JSData.DSUtils.isObject(i[def.localField])) {
//               i[def.localKey] = i[def.localField];
//               delete i[def.localField];
//             }
//           }
//         }
//       });
//     }
//     if (JSData.DSUtils.isArray(instance)) {
//       JSData.DSUtils.forEach(instance, fixLocalKeys);
//     } else {
//       fixLocalKeys(instance);
//     }
//   }


//   DSProvider.defaults.deserialize = function(Resource, data) {
//     console.log("resource", Resource);
//     console.log("data", data);
//     var instance = data.data;
//     fixRelations(Resource, instance);
//     return instance;
//   };
//   // End Mongoose Relation fix
// })
app.controller('SignupController', function ($scope, $state, User) {
  $scope.addUser = function (user) {
    User.create(user)
    .then(function () {
      $state.go('landing');
    });
  };
});
app.factory('Buffer', function(DS, $http, $state) {
  var Buffer = DS.defineResource({
    name: 'buffers',
    methods: {
      go: function () {
        $state.go('buffer', {bufferId: this._id});
      }
    }
  });

  return Buffer;
}).run(function (Buffer) {});
app.factory('User', function(DS, $http, $state) {
  var User = DS.defineResource({
    name: 'users',
    relations: {
      hasMany: {
        buffers: {
          localKeys: 'buffers',
          localField: '_buffers'
        }
      }
    },
    methods: {
      go: function () {
        $state.go('user', {postId: this._id});
      }
    }
  });

  return User;
}).run(function (User) {});
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
  $stateProvider.state('landing', {
    url: '/',
    templateUrl: '/templates/landing.html',
  });
});
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