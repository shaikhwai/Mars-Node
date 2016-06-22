/**
 * Created by waqar on 22/6/16.
 */
/**
 * Created by waqar on 20/6/16.
 */
var assert = require('chai').assert;
var superagent = require('superagent');

var server = require('./../../lib/index.js');


describe('User Controller', function() {

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
    it('server should start and should give 401 without access_token.', function( done ) {

        superagent.get('http://localhost:5000/api/user').end(function(err, res) {
            /*if (err) { return done(err); }*/
            assert.equal(res.status, 401);
            /*assert.equal(res.text, '<h1>Hello World!</h1>');*/
            done();
        });

    });

    it('server should start and should give 200 with access_token.', function( done ) {

        superagent.get('http://localhost:5000/api/user?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NzMzMjE1NGMwNzlmYzE5MGJhNGI5ODYiLCJleHAiOjE0NzAxMTk5NDU5MzksInJvbGUiOiJVc2VyIn0.GvYU-yxcIjV_VsmWnOkGGcAX_R503Kn8586wv22YrNQ').end(function(err, res) {
            if (err) { return done(err); }
            assert.equal(res.status, 200);
            /*assert.equal(res.text, '<h1>Hello World!</h1>');*/
            done();
        });

    });


});
