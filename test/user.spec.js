var User = require('../models/users');

var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
chai.should();
var expect = chai.expect;

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

  describe('Methods', function () {});

  describe('Virtuals', function () {});

  describe('Hooks', function () {});

});