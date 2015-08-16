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
  });

  describe('Statics', function () {});

  describe('Methods', function () {
    var buffer;
    beforeEach(function () {
      buffer = new Buffer();
    });


    describe('concStrParse', function () {

      it('should get the correct number', function () {
        buffer.concStrParse('3 mM').should.have.property('value', '3');
        buffer.concStrParse('3M').should.have.property('value', '3');
        buffer.concStrParse('5M').should.have.property('value', '5');
      });

      it('should get the correct concentration', function () {
        buffer.concStrParse('3 mM').should.have.property('concentration', 'mM');
        buffer.concStrParse('3M').should.have.property('concentration', 'M');
        buffer.concStrParse('5M').should.have.property('concentration', 'M');
      });

      it('should err with no number', function () {
        expect(buffer.concStrParse.bind(null, 'mM')).to.throw(Error);
        expect(buffer.concStrParse.bind(null, ' M')).to.throw(Error);
      });


    });

  });

  describe('Virtuals', function () {});

  describe('Hooks', function () {});

});
