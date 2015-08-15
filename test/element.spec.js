var Element = require('../models/elements');
var MW = require('../models/mW');

var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
chai.should();
var expect = chai.expect;

describe('Element Model', function () {


  describe('Validations', function () {

    afterEach(function () {
      return Element.remove({})
      .then(MW.remove({}));
    });

    it('should err if no formula, mW, or name provided', function () {
      var element = new Element();
      return element.validate().should.be.rejected.then(function (error) {
        expect(error.errors).to.have.property('formula');
        expect(error.errors).to.have.property('mW');
        expect(error.errors).to.have.property('name');
      });
    });

    it('should correctly save to database', function () {
      return Element.create({
        name: "Sodium",
        formula: "Na",
      })
      .should.be.fulfilled.then(function (element) {
        expect(element.name).to.equal('Sodium');
        expect(element.formula).to.equal('Na');
        expect(element.mW).to.be.closeTo(23, 0.5);
      });
    });

    it('should use pre-validation hook to generate name and mW from formula', function () {
      var element = new Element();
      element.formula = "Na";
      return element.validate().should.be.fulfilled;
    });

    it('should use pre-validation hook to generate formula and mW from name', function () {
      var element = new Element();
      element.name = "Sodium";
      return element.validate().should.be.fulfilled;
    });
    
  });

  describe('Statics', function () {});

  describe('Methods', function () {});

  describe('Virtuals', function () {});

  describe('Hooks', function () {});

});