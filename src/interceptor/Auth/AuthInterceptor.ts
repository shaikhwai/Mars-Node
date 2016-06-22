import express = require("express");
import passport = require('passport');
import jwt = require('jwt-simple');
import httpStatusCode = require('http-status-code');
import Bearer = require('passport-http-bearer');
var BearerStrategy: passport.Strategy = Bearer.Strategy;

import AdminRepository = require("./../../app/repository/AdminRepository");
import UserRepository = require("./../../app/repository/UserRepository");
/*import TestStrategy = require("./TestStrategy");*/
/*import {Strategy} from "passport-http-bearer";*/
/*import {Passport} from "passport"*/

class  AuthInterceptor{
    private _adminRepository: AdminRepository ;
    private _userRepository: UserRepository;

    constructor(){
        this._adminRepository = new AdminRepository();
        this._userRepository = new UserRepository();
        /*console.log("i can see you.");*/
        passport.use(new BearerStrategy(function (token, done) {
            var decoded = null;
            try {
                decoded = jwt.decode(token, "thisisjwtsecret#@$#&(*0)%");
            } catch (e) {
                var err = new Error();
                err.message = "Invalid Token: " + e.message;
                return done(err, false);
            }

            if(decoded.exp === undefined){
                console.log("its an unsub call");
            }
            else if (decoded.exp <= Date.now()) {
                return done(null, false, {
                    message: 'Access token has expired'
                });
            }
            console.log("exp date",decoded.exp);
            console.log("role",decoded.role);
            if(decoded.role === "User"){
                var userRepository: UserRepository = new UserRepository();
                console.log("loking for id =" + decoded.iss);
                userRepository.findById(decoded.iss, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) {
                        console.log("user = "+user);
                        return done(null, false); }
                    return done(null, user);
                });
            }

            if(decoded.role === "Admin" || decoded.role === "SuperAdmin"){
                var adminRepository: AdminRepository = new AdminRepository();
                adminRepository.findById(decoded.iss, function (err, admin) {
                    if (err) { return done(err); }
                    if (!admin) {
                        console.log(admin);
                        return done(null, false); }
                    return done(null, admin);
                });
            }
        }));
    }

    issueTokenWithUid(user) {
        var curDate = new Date();
        // expires in 60 days
        console.log("id ="+user.id);
        var expires = new Date(curDate.getTime() + (60*24*60*60*1000)); //(day*hr*min*sec*milisec)
        var token = jwt.encode({
            iss: user.id, // issuer
            exp: expires.getTime(), // expiration time
            role: user.role
        },  "thisisjwtsecret#@$#&(*0)%");

        return token;
    }

    // generic require signin middleware
    requiresAuth(req, res, next) {
        console.log("requireAuth is been hit");
        passport.authenticate('bearer', { session: false },
            function(err, user, info) {
                if (err) return res.send(500, err);
                if (!req.query.access_token && !req.body.access_token) {
                    return res.send(401, {
                        message: "An access token must be provided"
                    });
                }
                if (!user) {
                    return res.send(401, {
                        message: "Access token has expired or is invalid"
                    });
                }
                console.log("Role ="+user.role);
                req.user = user;
                next();
                /*if(user.role === "User"){
                    req.user = user;
                    next();
                }
                if((user.role === "Admin") || (user.role === "SuperAdmin")){
                    req.admin = user;
                    next();
                }*/
            })(req, res, next);
    }

}


Object.seal(AuthInterceptor);
export = AuthInterceptor;