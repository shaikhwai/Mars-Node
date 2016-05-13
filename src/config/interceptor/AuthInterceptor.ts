
/**
 * Created by waqar on 6/5/16.
 */
import passport = require('passport');
import jwt = require('jwt-simple');
import https = require('https');
import request = require('request');

// Logger
import httpStatusCode = require('http-status-code');// for http responce
/*import BearerStrategy = require('passport-http-bearer').Strategy;*/

class AuthInterceptor{

}
Object.seal(AuthInterceptor);
export = AuthInterceptor;