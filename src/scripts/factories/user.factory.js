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