var Compound = require('../models/compounds');
var Element = require('../models/elements');

var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
chai.should();
var expect = chai.expect;

describe('Compound Model', function () {

  describe('Validations', function () {

    it('should err if no formula, mW, or elements provided', function () {
      var compound = new Compound();
      return compound.validate().should.be.rejected.then(function (error) {
        expect(error.errors).to.have.property('formula');
        expect(error.errors).to.have.property('mW');
        expect(error.errors).to.have.property('elements');
      });
    });

    it('should err if provided incorrect mW (custom validator)', function () {

      var element = new Element({
        formula: "Na",
        mW: 40
      });
      return element.validate().should.be.rejected;
    });

  });

  describe('Statics', function () {

    xit('should correctly add elements from a formula', function () {

      var naCl = new Compound({formula: 'NaCl'});
      return naCl.validate().should.be.fulfilled;
    });

  });

  describe('Methods', function () {

    beforeEach(function() {
      var x = new Compound({formula: 'NaCl'});
    });

    describe('getElements', function() {
      it('should properly create the elements array', function() {

      });
    });

    describe('measureAmount', function () {

      it('should return correct quantity in grams', function () {
        var cpd = new Compound({mW: 58.44});
        cpd.measureAmount(1, 1).should.equal(58.44);
      });

      it('should err without arguments', function () {
        var cpd = new Compound({mW: 58.44});
        expect(cpd.measureAmount).to.throw;
      });


    });
  });

  describe('Virtuals', function () {});

  describe('Hooks', function () {

    // it('should use pre-validation hook to generate mW from formula', function () {
    //   var element = new Element();
    //   element.formula = "Na";
    //   return element.validate().should.be.fulfilled;
    // });

  });

});
