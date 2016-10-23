'use strict';

// Force node environment for testing purposes
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app.js');

const should = chai.should();

chai.use(chaiHttp);

let id;
const authenticatedUser = { email: 'test1@test.com', password: 'random123' };
const createdUser = { email: 'test2@test.com', password: 'random123' };
const modifiedUser = { email: 'test3@test.com', password: 'random123' };


describe('USER ROUTER', function() {
    describe('/users/', function() {
        it('Should get list of users when calling GET', function(done) {
            chai.request(app).get('/').end(function(error, response) {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.should.have.lengthOf(1);
                done();
            }); 
        });
        it('Should create new user when calling POST', function(done) {
            chai.request(app).post('/').end(function(error, response) {
                response.should.have.status(404);
                done();
            }); 
        });
        it('Should fail when calling PUT', function(done) {
            chai.request(app).put('/').end(function(error, response) {
                response.should.have.status(404);
                done();
            }); 
        });
        it('Should fail when calling DELETE', function(done) {
            chai.request(app).put('/').end(function(error, response) {
                response.should.have.status(404);
                done();
            }); 
        });
    });

    describe('/users/'+id, function() {
        it('Should get user details when calling GET', function(done) {
            chai.request(app).get('/').end(function(error, response) {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('email');
                done();
            }); 
        });
        it('Should fail when calling POST', function(done) {
            chai.request(app).post('/').end(function(error, response) {
                response.should.have.status(404);
                done();
            }); 
        });
        it('Should update user details when calling PUT and return the details', function(done) {
            chai.request(app).put('/').end(function(error, response) {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('email');
                done();
            }); 
        });
        it('Should remove user when calling DELETE and return the details', function(done) {
            chai.request(app).put('/').end(function(error, response) {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('email');
                done();
            }); 
        });
    });
});
