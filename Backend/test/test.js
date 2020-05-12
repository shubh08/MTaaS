var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check tester credentials and return status code", function(done){
    chai.request('http://localhost:3010')
    .post('/tester/login')
    .send({ "email": "john.snow@gmail.com", "password" : "mahalasa"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Should check manager credentials and return status code", function(done){
    chai.request('http://localhost:3010')
    .post('/manager/login')
    .send({ "email": "rani.mukherjee@gmail.com", "password" : "mahalasa"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Should check admin credentials and return status code", function(done){
    chai.request('http://localhost:3010')
    .post('/admin/login')
    .send({ "email": "tin.admin@gmail.com", "password" : "mahalasa"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Should check if the S3 files are loaded for manager or not", function(done){
    chai.request('http://localhost:3010')
    .get('/manager/loadFiles/Proj_2')
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})


it("Should check if the S3 files are loaded for tester or not", function(done){
    chai.request('http://localhost:3010')
    .post('/tester/loadFiles')
    .send({ "testerName": "John Snows", "projectName" : "Proj_2"})
    .end(function (err, res) {
       
        expect(res).to.have.status(200);
        done();
    });
})