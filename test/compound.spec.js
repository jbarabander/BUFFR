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

    it('should correctly add elements from a formula', function () {

      var naCl = new Compound({formula: 'NaCl'});
      var aceticAcid = new Compound({formula: 'C2H4O2'});
      return naCl.validate().should.be.fulfilled
      .then(function () {
        return aceticAcid.validate().should.be.fulfilled;
      });
    });

  });

  describe('Methods', function () {
    
    var x;

    beforeEach(function() {
      x = new Compound({formula: 'NaCl'});
    });

    describe('getElements', function() {

      it('should properly create the elements array', function () {
        var sodiumId, chlorineId;
        return Element.findOne({formula: 'Na'})
        .then(function (el) {
          sodiumId = el._id;
          return Element.findOne({formula: 'Cl'});
        })
        .then(function (el) {
          chlorineId = el._id;
          return x.getElements();
        })
        .then(function (compound) {
          expect(compound.elements[0].value.toString()).to.equal(sodiumId.toString());
          expect(compound.elements[1].value.toString()).to.equal(chlorineId.toString());
        });
      });

    });

    describe('getMW', function() {

      it('should get molecular weight from an elements array', function () {
        var sodiumId, chlorineId;
        return Element.findOne({formula: 'Na'})
        .then(function (el) {
          sodiumId = el._id;
          return Element.findOne({formula: 'Cl'});
        })
        .then(function (el) {
          chlorineId = el._id;
          return x.getElements();
        })
        .then(function (compound) {
          return compound.getMW();
        })
        .then(function (number) {
          expect(number).to.be.closeTo(58.44, .1);
        });
      });

      it('should get molecular weight from a complicated array of elements', function () {
        return Compound.create({formula: 'C2H4O2'})
        .then(function (cpd) {
          return cpd.getMW();
        })
        .then(function (number) {
          expect(number).to.be.closeTo(60.05, 0.1);
        });
      });

      it('should get molecular weight from an array of elements with parentheses', function () {
        return Compound.create({formula: '(C2H4)O2'})
        .then(function (cpd) {
          return cpd.getMW();
        })
        .then(function (number) {
          expect(number).to.be.closeTo(60.05, 0.1);
        });
      });

      it('should get molecular weight from an array of elements with multiplied parentheses', function () {
        return Compound.create({formula: '(CH2)2O2'})
        .then(function (cpd) {
          return cpd.getMW();
        })
        .then(function (number) {
          expect(number).to.be.closeTo(60.05, 0.1);
        });
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
