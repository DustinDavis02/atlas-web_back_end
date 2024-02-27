const Utils = {
    calculateNumber(type, a, b) {
      const roundA = Math.round(a);
      const roundB = Math.round(b);
  
      switch (type) {
        case 'SUM':
          return roundA + roundB;
        case 'SUBTRACT':
          return roundA - roundB;
        case 'DIVIDE':
          if (roundB === 0) return 'Error';
          return roundA / roundB;
        default:
          throw new Error('Invalid type');
      }
    },
  };
  
  module.exports = Utils;
