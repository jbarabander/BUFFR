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

    it('should correctly set volume', function () {
      var buffer = new Buffer();
      console.log(buffer);
      buffer.volume = '5 L';
      console.log(buffer);
      buffer.volume.value.should.equal(5);
      buffer.volume.units.should.equal('L');
    });
  });

  describe('Statics', function () {});

  describe('Methods', function () {
    
    var buffer;
    beforeEach(function () {
      buffer = new Buffer();
    });


    describe('strParse', function () {

      it('should get the correct number', function () {
        buffer.strParse('3 mM', ['M', 'mM', 'uM', 'nM', 'pM'])
        .should.have.property('value', 3);
        buffer.strParse('3M', ['M', 'mM', 'uM', 'nM', 'pM'])
        .should.have.property('value', 3);
        buffer.strParse('5M', ['M', 'mM', 'uM', 'nM', 'pM'])
        .should.have.property('value', 5);
      });

      it('should get the correct concentration units', function () {
        buffer.strParse('3 mM', ['M', 'mM', 'uM', 'nM', 'pM']).should.have.property('units', 'mM');
        buffer.strParse('3M', ['M', 'mM', 'uM', 'nM', 'pM']).should.have.property('units', 'M');
        buffer.strParse('5M', ['M', 'mM', 'uM', 'nM', 'pM']).should.have.property('units', 'M');
      });

      it('should err with no number', function () {
        expect(buffer.strParse.bind(null, 'mM', ['M', 'mM', 'uM', 'nM', 'pM'])).to.throw(Error);
        expect(buffer.strParse.bind(null, ' M', ['M', 'mM', 'uM', 'nM', 'pM'])).to.throw(Error);
      });

      it('should err with unknown units', function () {
        expect(buffer.strParse.bind(null, '4 mg', ['M', 'mM', 'uM', 'nM', 'pM'])).to.throw(Error);
        expect(buffer.strParse.bind(null, '8 dM', ['M', 'mM', 'uM', 'nM', 'pM'])).to.throw(Error);
      });


    });

    describe('addCompound', function () {

      xit('should add to the compounds list', function () {
        // can run with compounds
        buffer.addCompound('NaCl', '3 M');
        buffer.compounds.should.have.length(1);
      });



    });

  });

  describe('Virtuals', function () {});

  describe('Hooks', function () {});

});
