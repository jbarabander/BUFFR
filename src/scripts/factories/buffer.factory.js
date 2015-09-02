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