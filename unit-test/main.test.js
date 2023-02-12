let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Health check', () => {
    it('it should return ok when connect success', (done) => {
        chai.request(server)
            .get('/health-check')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({status: "ok"}); // fixme :)
                done();
            });
    });
});

describe('/GET data/1', () => {
    it('it should GET data with id equa 1', (done) => {
        chai.request(server)
            .get('/data/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({"id":1,"name":"test"}); // fixme :)
                done();
            });
    });
});