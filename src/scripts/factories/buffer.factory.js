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