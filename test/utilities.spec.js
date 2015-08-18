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

  describe('compoundMatcher', function() {
    it('should parse a simple formula into an array of its respective elements', function() {
      var parseExample = 'NaCl2Hg';
      expect(compoundMatcher(parseExample)).to.deep.equal(['Na', 'Cl2','Hg']);
    });
    it('should parse a formula with parentheses into the correct array ', function() {
      var parseExample = 'NaCl2Hg(Cu2)3';
      expect(compoundMatcher(parseExample)).to.deep.equal(['Na', 'Cl2', 'Hg', 'Cu6']);
    });
    it('should parse a formula with multiple parens correctly', function() {
      var parseExample = '(NaCl2)2Be2(H2O)4(K)';
      expect(compoundMatcher(parseExample)).to.deep.equal(['Na2', 'Cl4', 'Be2', 'H8', 'O4','K']);
    });
  });



  // describe('elementMatcher', function () {
  //   xit('should return each element in the formula correctly as objects', function () {
  //     var sodiumId, chlorineId;
  //     return Element.findOne({formula: 'Na'})
  //     .then(function (el) {
  //       sodiumId = el._id;
  //       return Element.findOne({formula: 'Cl'});
  //     })
  //     .then(function (el) {
  //       chlorineId = el._id;

  //       expect(elementMatcher('NaCl')).to.eventually.deep.equal([{value: sodiumId, number: 1}, {value: chlorineId, number: 1}]);
  //       // expect(elementMatcher('NaCl2')).to.deep.equal([{value: sodiumId, number: 1}, {value: chlorineId, number: 2}]);
  //     });
  //   });

  //   xit('should return each element in the formula even twice correctly', function () {
  //     var sodiumId, chlorineId;
  //     return Element.findOne({formula: 'Na'})
  //     .then(function (el) {
  //       sodiumId = el._id;
  //       return Element.findOne({formula: 'Cl'});
  //     })
  //     .then(function (el) {
  //       chlorineId = el._id;

  //       // expect(elementMatcher('NaCl')).to.eventually.deep.equal([{value: sodiumId, number: 1}, {value: chlorineId, number: 1}]);
  //       expect(elementMatcher('NaCl2')).to.eventually.deep.equal([{value: sodiumId, number: 1}, {value: chlorineId, number: 2}]);
  //     });
  //   });

  //   xit('should combine elements listed twice', function () {
  //     var hydroId, carbonId;
  //     return Element.findOne({formula: 'C'})
  //     .then(function (el) {
  //       carbonId = el._id;
  //       return Element.findOne({formula: 'H'});
  //     })
  //     .then(function (el) {
  //       hydroId = el._id;
  //       elementMatcher('CHC').then(console.log.bind(console));
  //       expect(elementMatcher('CHC')).to.eventually.deep.equal([
  //         {value: carbonId, number: 2},
  //         {value: hydroId, number: 1}
  //       ]);
  //     });
  //   });

  //   xit('should use parentheses to double the stuff inside', function () {
  //     var hydroId, carbonId;
  //     return Element.findOne({formula: 'C'})
  //     .then(function (el) {
  //       carbonId = el._id;
  //       return Element.findOne({formula: 'H'});
  //     })
  //     .then(function (el) {
  //       hydroId = el._id;
  //       getElements('CH3CH4(CH3)2').then(console.log.bind(console));
  //       expect(getElements('CH3CH4(CH3)2')).to.eventually.deep.equal([{value: carbonId, number: 4}, {value: hydroId, number: 13}]);
  //     });
  //   });

  // });

});
