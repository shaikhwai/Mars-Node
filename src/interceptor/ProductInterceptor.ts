/**
 * Created by waqar on 14/6/16.
 */
import express = require("express");

/*var router = express.Router();*/
class ProductInterceptor {

    constructor () {
    }

    create(req, res, next){
        if((req.body.name === undefined) || (req.body.detail === undefined) ||
            (req.body.variant === undefined) || (req.body.type === undefined) ||
            (req.body.available === undefined) || (req.body.unitRate === undefined) ||
            (req.body.vat === undefined) || (req.body.unit === undefined)) {
            console.log("Product Interceptor:create field varification failed.");
            return res.status(400).send({ message: "field verification failed." });
        }
        next();
    }

    retrieve(req, res, next){
        next();
    }

    update(req, res, next){
        if((req.params._id === undefined) || (req.body.name === undefined) || (req.body.detail === undefined) ||
            (req.body.variant === undefined) || (req.body.type === undefined) ||
            (req.body.available === undefined) || (req.body.unitRate === undefined) ||
            (req.body.vat === undefined) || (req.body.unit === undefined)){
            console.log("Product Interceptor:update field verification failed.");
            return res.status(400).send({ message: "Fields verification failed" });
        }
        next();
    }

    delete(req, res, next){
        if(req.params._id === undefined){
            console.log("Product Interceptor:delete verification failed.");
            return res.status(400).send({ message: "Fields verification failed" });
        }
        next();
    }
}

Object.seal(ProductInterceptor);
export = ProductInterceptor;