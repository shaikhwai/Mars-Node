/**
 * Created by waqar on 20/6/16.
 */

var assert = require('chai').assert;
var superagent = require('superagent');

var server = require('./../lib/index.js').app;


describe('server', function() {

    /*beforeEach(function( done ) {
       /!* server.listen(5000, "Domain.host", function(err) {
            console.log(err);
            done(err);
        })*!/
    });

    afterEach(function( done ) {
        /!*server.close(function(err) {
            done(err);
        });*!/
    });

*/
    it('server should start and should give 401 without accesstoken.', function( done ) {

        superagent.get('http://localhost:5000/api/product').end(function(err, res) {
            /*if (err) { return done(err); }*/
            assert.equal(res.status, 401);
            /*assert.equal(res.text, '<h1>Hello World!</h1>');*/
            done();
        });

    });

    /*it('should return a 404 at /foo', function( done ) {

        superagent.get('http://localhost:5000/foo').end(function(err, res) {
            if (err) {
                assert.equal(err.message, 'Not Found');
                assert.equal(res.status, 404);
                assert.equal(res.text, 'Not Found');
                return done();
            }

            done(new Error('Request to /foo should have failed'));
        });

    });*/
});
