const { expect } = require('chai');
const { getPaymentTokenFromAPI } = require('./6-payment_token');

describe('getPaymentTokenFromAPI', function () {
  it('returns a resolved promise with the correct data on success', function (done) {
    getPaymentTokenFromAPI(true)
      .then((response) => {
        expect(response).to.deep.equal({ data: 'Successful response from the API' });
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

});
