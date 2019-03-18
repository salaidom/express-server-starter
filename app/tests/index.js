"use strict";

// Force node environment for testing purposes
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../app.js");

const describe = chai.describe;
const it = chai.it;

chai.use(chaiHttp);

describe("INDEX ROUTER", function() {
  describe("/", function() {
    it("Should work when calling GET", function(done) {
      chai
        .request(app)
        .get("/")
        .end(function(error, response) {
          response.should.have.status(200);
          done();
        });
    });
    it("Should fail when calling POST", function(done) {
      chai
        .request(app)
        .post("/")
        .end(function(error, response) {
          response.should.have.status(404);
          done();
        });
    });
    it("Should fail when calling PUT", function(done) {
      chai
        .request(app)
        .put("/")
        .end(function(error, response) {
          response.should.have.status(404);
          done();
        });
    });
    it("Should fail when calling DELETE", function(done) {
      chai
        .request(app)
        .put("/")
        .end(function(error, response) {
          response.should.have.status(404);
          done();
        });
    });
  });
});
