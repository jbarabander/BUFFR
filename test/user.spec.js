var User = require('../models/users');

var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
chai.should();
var expect = chai.expect;

var Buffer = require('../models/buffers')

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

    describe('addBuffer', function () {

      it('should add an embedded buffer to the buffer array', function () {
        var user = new User();
        var buffer = new Buffer();
        buffer.volume = '5 L';
        return buffer.addCompound('NaCl', '3 M')
        .then(function () {
          return user.addBuffer(buffer);  
        })
        .then(function () {
          expect(user.buffers).to.have.length(1);
          expect(user.buffers[0].compounds[0].value[0].formula).to.equal('NaCl');
        });
      });

    });

  });

  describe('Virtuals', function () {});

  describe('Hooks', function () {});

});