const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app.js');

const should = chai.should();

chai.use(chaiHttp);

describe('INDEX', function() {
    describe('GET /', function() {
        it('Should get JSON with message "Hello World!"', function(done) {
            chai.request(app).get('/').end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.equal('Hello World!');
                done();
            }); 
        });
    });
});
