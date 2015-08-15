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

    xit('should correctly save to database', function () {
      return MW.create({
        value: 58.44,
        units: 'g/mol'
      })
      .then(function (mW) {
        return Element.create({
          name: "Sodium",
          formula: "Na",
          mW: mW._id
        });
      })
      .then(function (element) {
        console.log(element);
      }).catch(function (error) {
        console.log(error);
      })

      // .then(function (error) {
      //   expect(error.errors).to.have.property('formula');
      //   expect(error.errors).to.have.property('mW');
      //   expect(error.errors).to.have.property('name');
      // });
    });

    xit('should use pre-validation hook to generate element.name', function () {
      var element = new Element();
      element.formula = "Na";
      return element.validate().should.be.rejected.then(function (error) {
        expect(error.errors).to.have.property('mW');
        expect(error.errors).to.not.have.property('name');
      });
    });

    xit('should use pre-validation hook to generate element.formula', function () {
      var element = new Element();
      element.name = "Sodium";
      return element.validate().should.be.rejected.then(function (error) {
        // only does not have 
        expect(error.errors).to.have.property('mW');
      });
    });
    
  });

  describe('Statics', function () {});

  describe('Methods', function () {});

  describe('Virtuals', function () {});

  describe('Hooks', function () {});

});