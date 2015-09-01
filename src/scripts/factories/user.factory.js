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