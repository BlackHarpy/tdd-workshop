const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('./index');

chai.use(chaiHttp);

describe('Server index', () => {
  it('respond ping with pong', function(done) {
    chai.request(server)
    .get('/ping')
    .end(function(err, res) {
      expect(res.text).toEqual('pong');    
      done(); 
    });
  });

  it('respond pong with pang', function(done) {
    chai.request(server)
    .get('/pong')
    .end(function(err, res) {
      expect(res.text).toEqual('pang');    
      done(); 
    });
  });
});