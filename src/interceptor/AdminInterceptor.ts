/**
 * Created by waqar on 9/5/16.
 */
import express = require("express");

/*var router = express.Router();*/
class AdminInterceptor {

    constructor () {
    }


    login(req, res, next){
        if((req.body.userName === undefined) || (req.body.password === undefined)) {
            console.log("Admin Interceptor:login varification failed.");
            /*return res.send(403, { message: "Fields verification failed" });*/
            return res.status(400).send({ message: "Fields verification failed" });
        }
        console.log("Interceptor:login varification done ");
        next();
    }

    create(req, res, next){
        if((req.body.userName === undefined) || (req.body.password === undefined)) {
            console.log("Admin Interceptor:login verification failed.");
            /*return res.send(403, { message: "Fields verification failed" });*/
            return res.status(400).send({ message: "Fields verification failed" });
        }
        next();
    }
    retrieve(req, res, next){
        next();

    }

    update(req, res, next){
        if((req.params._id === undefined) || (req.body.userName === undefined) ||
            (req.body.password === undefined)){
            console.log("Admin Interceptor:login verification failed.");
            return res.status(400).send({ message: "Fields verification failed" });
        }
        next();
    }

    delete(req, res, next){
        if(req.params._id === undefined){
            console.log("Admin Interceptor:login verification failed.");
            return res.status(400).send({ message: "Fields verification failed" });
        }
        next();
    }

    user(req, res, next){
        if((req.body.user.firstName === undefined) || (req.body.user.password === undefined) ||
            (req.body.user.lastName === undefined)) {
            console.log("User Interceptor:create verification failed.");
            return res.status(400).send({ message: "Fields verification failed" });
        }
        next();
    }
}

Object.seal(AdminInterceptor);
export = AdminInterceptor;