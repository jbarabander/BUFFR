var MW = require('../models/mW');

var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
chai.should();
var expect = chai.expect;

describe('mW Model', function () {


  describe('Validations', function () {

    it('should err if no value or units provided', function () {
      var mW = new MW();
      return mW.validate().should.be.rejected.then(function (error) {
        expect(error.errors).to.have.property('value');
        expect(error.errors).to.have.property('units');
      });
    });

    it('should correctly save to database', function () {
      return MW.create({
        value: 58.44,
        units: 'g/mol'
      }).should.be.fulfilled.then(function (mW) {
        expect(mW.value).to.equal(5.44);
        expect(mW.units).to.equal('g/mol');
      })
    });
    
  });

  describe('Statics', function () {});

  describe('Methods', function () {});

  describe('Virtuals', function () {});

  describe('Hooks', function () {});

});