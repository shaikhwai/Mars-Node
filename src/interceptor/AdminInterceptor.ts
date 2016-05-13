/**
 * Created by waqar on 9/5/16.
 */
import express = require("express");

/*var router = express.Router();*/
class AdminInterceptor {

    constructor () {
    }


    login(req, res, next){
        console.log("hi");
        next();
    }

}

Object.seal(AdminInterceptor);
export = AdminInterceptor;