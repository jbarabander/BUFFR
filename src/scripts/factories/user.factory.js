app.factory('User', function(DS, $http, $state) {
  var User = DS.defineResource({
    name: 'users',
    relations: {
      hasMany: {
        buffers: {
          localKey: 'bufferIds',
          localField: 'buffers'
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