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
            console.log("Interceptor:login varification failed.");
            /*return res.send(403, { message: "Fields verification failed" });*/
            return res.status(400).send({ message: "Fields verification failed" });
        }
        console.log("Interceptor:login varification done ");
        next();
    }

    retrieve(req, res, next){
        next();

    }

    update(req, res, next){
        if(req.params._id === undefined){
            console.log("Interceptor:login varification failed.");
            return res.status(400).send({ message: "Fields verification failed" });
        }
        next();
    }

    delete(req, res, next){
        if(req.params._id === undefined){
            console.log("Interceptor:login varification failed.");
            return res.status(400).send({ message: "Fields verification failed" });
        }
        next();
    }

}

Object.seal(AdminInterceptor);
export = AdminInterceptor;