const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', function() {
  it('should return sum of rounded a and b', function() {
    assert.strictEqual(calculateNumber(1, 3), 4);
    assert.strictEqual(calculateNumber(1, 3.7), 5);
    assert.strictEqual(calculateNumber(1.2, 3.7), 5);
    assert.strictEqual(calculateNumber(1.5, 3.7), 6);
  });

  // Add more tests to cover edge cases
  it('should handle negative numbers correctly', function() {
    assert.strictEqual(calculateNumber(-1.4, 2.6), 2);
  });

  it('should return 0 when both numbers are 0', function() {
    assert.strictEqual(calculateNumber(0, 0), 0);
  });
});