<<<<<<< HEAD
app.factory('UserFactory', function($http) {
  function addUser(user) {
    console.log(user);
    return $http.post('/users', user)
    .then(function (response) {
      return response.data;
    });
  }
=======
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
>>>>>>> 6462ef6... commenting out seems to work



  return {
    addUser: addUser
  };
});