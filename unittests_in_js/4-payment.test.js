const sinon = require('sinon');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./4-payment');
const Utils = require('./utils');

describe('sendPaymentRequestToApi', function () {
  let consoleSpy, calculateNumberStub;

  beforeEach(function () {
    // Spy on console.log to monitor its calls
    consoleSpy = sinon.spy(console, 'log');

    // Stub Utils.calculateNumber to always return 10
    calculateNumberStub = sinon.stub(Utils, 'calculateNumber').returns(10);
  });

  afterEach(function () {
    // Restore the original functionality of console.log and Utils.calculateNumber
    consoleSpy.restore();
    calculateNumberStub.restore();
  });

  it('should call calculateNumber with "SUM", 100, 20 and log "The total is: 10"', function () {
    sendPaymentRequestToApi(100, 20);

    // Verify that the stub was called with the expected arguments
    expect(calculateNumberStub.calledWith('SUM', 100, 20)).to.be.true;

    // Verify that console.log was called with the expected message
    expect(consoleSpy.calledWith('The total is: 10')).to.be.true;
  });
});
