const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./api');
const { expect } = chai;

chai.use(chaiHttp);

describe('Index page', function() {
  after(() => {
    server.close();
  });

  it('should check that the GET / route exists', function(done) {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });


  it('should return the welcome message "Welcome to the payment system"', function(done) {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.text).to.equal('Welcome to the payment system');
        done();
      });
  });
});
