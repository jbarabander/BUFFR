var Buffer = require('../models/buffers');

var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
chai.should();
var expect = chai.expect;

describe('Buffer Model', function () {


  describe('Validations', function () {

    it('should err if no volume provided', function () {
      var buffer = new Buffer();
      return buffer.validate().should.be.rejected.then(function (error) {
        expect(error.errors).to.have.property('volume');
      });
    });
  });

  describe('Statics', function () {});

  describe('Methods', function () {});

  describe('Virtuals', function () {});

  describe('Hooks', function () {});

});