var Buffer = require('../models/buffers');
var Compound = require('../models/compounds');
var Element = require('../models/elements');

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
      buffer.volume = '5 L';
      buffer.volume.value.should.equal(5);
      buffer.volume.units.should.equal('L');
    });

    it('getting volume should output number of liters', function () {
      var buffer = new Buffer();
      buffer.volume = '5 mL';
      buffer.liters.should.equal(0.005);
    });

  });

  describe('Statics', function () {

    describe('strParse', function () {

      it('should get the correct number', function () {
        Buffer.strParse('3 mM', ['M', 'mM', 'uM', 'nM', 'pM'])
        .should.have.property('value', 3);
        Buffer.strParse('3M', ['M', 'mM', 'uM', 'nM', 'pM'])
        .should.have.property('value', 3);
        Buffer.strParse('5M', ['M', 'mM', 'uM', 'nM', 'pM'])
        .should.have.property('value', 5);
      });

      it('should get the correct concentration units', function () {
        Buffer.strParse('3 mM', ['M', 'mM', 'uM', 'nM', 'pM']).should.have.property('units', 'mM');
        Buffer.strParse('3M', ['M', 'mM', 'uM', 'nM', 'pM']).should.have.property('units', 'M');
        Buffer.strParse('5M', ['M', 'mM', 'uM', 'nM', 'pM']).should.have.property('units', 'M');
      });

      it('should err with no number', function () {
        expect(Buffer.strParse.bind(null, 'mM', ['M', 'mM', 'uM', 'nM', 'pM'])).to.throw(Error);
        expect(Buffer.strParse.bind(null, ' M', ['M', 'mM', 'uM', 'nM', 'pM'])).to.throw(Error);
      });

      it('should err with unknown units', function () {
        expect(Buffer.strParse.bind(null, '4 mg', ['M', 'mM', 'uM', 'nM', 'pM'])).to.throw(Error);
        expect(Buffer.strParse.bind(null, '8 dM', ['M', 'mM', 'uM', 'nM', 'pM'])).to.throw(Error);
      });

    });

  });

  describe('Methods', function () {
    
    var buffer;
    beforeEach(function () {
      buffer = new Buffer();
    });


    describe('addCompound', function () {

      it('should add to the compounds list', function () {
        // can run with compounds
        buffer.addCompound('NaCl', '3 M')
        .then(function () {
          buffer.compounds.should.have.length(1);
        });
        
      });



    });

    describe('storeAmounts', function () {

      it('should add an amount property to the compound buffer object', function () {
        var buffer = new Buffer();
        buffer.volume = '1 L';
        return buffer.addCompound('NaCl', '1 M')
        .then(function (cpd) {
          return buffer.save();  
        })
        .then(function () {
          return buffer.storeAmounts();
        })
        .then(function () {
          expect(buffer.compounds[0].amount).to.be.closeTo(58.44, 0.1);
        })
      });



    });

  });

  describe('Virtuals', function () {});

  describe('Hooks', function () {});

});
