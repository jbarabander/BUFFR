app.factory('User', function($http) {
  function User(props) {
    angular.extend(this, props);
  }

  User.url = '/api/users'

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