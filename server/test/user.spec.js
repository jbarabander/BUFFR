var User = require('../models/users');

var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
chai.should();
var expect = chai.expect;

var Buffer = require('../models/buffers');

describe('User Model', function () {


  describe('Validations', function () {

    it('should err if no username, name, or email provided', function () {
      var user = new User();
      return user.validate().should.be.rejected.then(function (error) {
        expect(error.errors).to.have.property('username');
        expect(error.errors).to.have.property('name');
      });
    });
    
  });

  describe('Statics', function () {});

  describe('Methods', function () {

    afterEach(function () {
      return User.remove({});
    })

    describe('addBuffer', function () {

      it('should add a buffer to the buffer array', function () {
        var user = new User({
          name: {first: "sean", last: "johnston"},
          username: "seanjddfadafohn",
          email: "seanjo@nfdadfadfadew"
        });
        var buffer = new Buffer();
        buffer.volume = '5 L';
        return buffer.save()
        .then(function (buff) {
          buffer = buff;
          return buffer.addCompound('NaCl', '3 M');
        })
        .then(function (buffer) {
          return user.addBuffer(buffer);  
        })
        .then(function () {
          return user.save();
        })
        .then(function (user) {
          expect(user.buffers).to.have.length(1);
          return user.populateBuffers();
        })
        .then(function (user) {
          var bufferProms = user.buffers.map(function (buffer) {
            return buffer.populateCompounds();
          });
          return Promise.all(bufferProms);
        })
        .then(function (buffers) {
          expect(buffers[0].compounds[0].value.formula).to.equal('NaCl');
        });
      });

    });

  });

  describe('Virtuals', function () {});

  describe('Hooks', function () {});

});