const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./api');
const { expect } = chai;

chai.use(chaiHttp);

describe('Index page', function() {
  after(() => {
    server.close();
  });

  it('should return the welcome message with correct status code', function(done) {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Welcome to the payment system');
        done();
      });
  });

});