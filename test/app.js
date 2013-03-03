var request = require('supertest'),
    should = require('should'),
    app = require('../app.js');
    
describe('Response html with 200', function () {
    it('should be responded as html', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200, done);
    });
});

describe('GET /', function () {
    it('res.ok okshould be true', function (done) {
        request(app)
            .get('/')
            .end(function (err, res) {
                if (err) return done(err);
                //res.text.should.include('logcat');
                should.exist(res);
                should.exist(res.body);
                res.should.have.property('ok', true);
                done();
            });
    });
});
