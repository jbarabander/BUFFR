var Element = require('../models/elements');

var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
chai.should();
var expect = chai.expect;

describe('Element Model', function () {


  describe('Validations', function () {

    afterEach(function () {
      return Element.remove({});
    });

    it('should err if no formula or mW provided', function () {
      var element = new Element();
      return element.validate().should.be.rejected.then(function (error) {
        expect(error.errors).to.have.property('formula');
        expect(error.errors).to.have.property('mW');
      });
    });

    it('should err if provided incorrect mW (custom validator)', function () {
      var element = new Element({
        formula: "Na",
        mW: 40
      });
      return element.validate().should.be.rejected;
    });

    it('should correctly save to database', function () {
      return Element.create({
        formula: "Na",
      })
      .should.be.fulfilled.then(function (element) {
        expect(element.name).to.equal('Sodium');
        expect(element.formula).to.equal('Na');
        expect(element.mW).to.be.closeTo(23, 0.5);
      });
    });
    
  });

  describe('Statics', function () {});

  describe('Methods', function () {});

  describe('Virtuals', function () {});

  describe('Hooks', function () {

    it('should use pre-validation hook to generate mW from formula', function () {
      var element = new Element();
      element.formula = "Na";
      return element.validate().should.be.fulfilled;
    });

  });

});