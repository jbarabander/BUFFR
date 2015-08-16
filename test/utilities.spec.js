var util = require('../utilities');
var compoundMatcher = util.compoundMatcher;
var elementMatcher = util.elementMatcher;
var getNumbers = util.getNumbers;
var getElements = util.getElements;

var Element = require('../models/elements');

var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
chai.should();
var expect = chai.expect;


describe('Helper Functions', function () {

  // describe('compoundMatcher', function () {

  //   it('should return each element in the formula correctly as objects', function () {
  //     expect(compoundMatcher('NaCl')).to.deep.equal([{formula: "Na", number: 1}, {formula: "Cl", number: 1}]);
  //     expect(compoundMatcher('NaCl2')).to.deep.equal([{formula: "Na", number: 1}, {formula: "Cl", number: 2}]);
  //     expect(compoundMatcher('CH4')).to.deep.equal([{formula: "C", number: 1}, {formula: "H", number: 4}]);
  //   })

  //   it('should combine elements listed twice', function () {
  //     expect(compoundMatcher('NaCl2Na')).to.deep.equal([{formula: "Na", number: 2}, {formula: "Cl", number: 2}]);
  //   })

  // })

  describe('elementMatcher', function () {
    
    it('should return each element in the formula correctly as objects', function () {
      var sodiumId, chlorineId;
      return Element.findOne({formula: 'Na'})
      .then(function (el) {
        sodiumId = el._id;
        return Element.findOne({formula: 'Cl'});
      })
      .then(function (el) {
        chlorineId = el._id;
        expect(elementMatcher('NaCl')).to.eventually.deep.equal([{value: sodiumId, number: 1}, {value: chlorineId, number: 1}]);
        // expect(elementMatcher('NaCl2')).to.deep.equal([{value: sodiumId, number: 1}, {value: chlorineId, number: 2}]);
      });
    });

    it('should return each element in the formula even twice correctly', function () {
      var sodiumId, chlorineId;
      return Element.findOne({formula: 'Na'})
      .then(function (el) {
        sodiumId = el._id;
        return Element.findOne({formula: 'Cl'});
      })
      .then(function (el) {
        chlorineId = el._id;
        // expect(elementMatcher('NaCl')).to.eventually.deep.equal([{value: sodiumId, number: 1}, {value: chlorineId, number: 1}]);
        expect(elementMatcher('NaCl2')).to.eventually.deep.equal([{value: sodiumId, number: 1}, {value: chlorineId, number: 2}]);
      });
    });

    xit('should combine elements listed twice', function () {
      var hydroId, carbonId;
      return Element.findOne({formula: 'C'})
      .then(function (el) {
        carbonId = el._id;
        return Element.findOne({formula: 'H'});
      })
      .then(function (el) {
        hydroId = el._id;
        expect(elementMatcher('CHC')).to.deep.equal([
          {value: carbonId, number: 2}, 
          {value: hydroId, number: 1}
        ]);
      });
    });

    xit('should use parentheses to double the stuff inside', function () {
      var hydroId, carbonId;
      return Element.findOne({formula: 'C'})
      .then(function (el) {
        carbonId = el._id;
        return Element.findOne({formula: 'H'});
      })
      .then(function (el) {
        hydroId = el._id;
        expect(elementMatcher('CH3CH4(CH3)2')).to.deep.equal([{value: carbonId, number: 4}, {value: hydroId, number: 13}]);
      });
    });

  });
  
});