/**
 * Created by waqar on 11/6/16.
 */
import express = require("express");
import CustomerModel = require("./../app/model/CustomerModel");

/*var router = express.Router();*/
class CustomerInterceptor {

    constructor () {
    }


    create(req, res, next){
        if((req.body.fromCompany === undefined || req.body.fromCompany === "") ||
            (req.body.contactPerson === undefined || req.body.contactPerson === "") ||
            (req.body.contactNumber === undefined || req.body.contactNumber === "") ||
            (req.body.billingAddress === undefined || req.body.billingAddress === "" ||
            req.body.billingAddress.length <= 0) ||
            (req.body.shippingAddress === undefined || req.body.shippingAddress === "" ||
            req.body.shippingAddress.length <= 0)) {
            console.log("Customer Interceptor:create field verification failed.");
            return res.status(400).send({ message: "field verification failed." });
        }

        console.log("Customer Interceptor:field verification done ");
        next();
    }

    retrieve(req, res, next){
        next();
    }

    update(req, res, next){
        if((req.body.fromCompany === undefined || req.body.fromCompany === "") ||
            (req.body.contactPerson === undefined || req.body.contactPerson === "") ||
            (req.body.contactNumber === undefined || req.body.contactNumber === "") ||
            (req.body.billingAddress === undefined || req.body.billingAddress === "" ||
            req.body.billingAddress.length <= 0) ||
            (req.body.shippingAddress === undefined || req.body.shippingAddress === "" ||
            req.body.shippingAddress.length <= 0) || (req.params._id === undefined)) {
            console.log("Customer Interceptor:update field verification failed.");
            return res.status(400).send({ message: "field verification failed." });
        }

        console.log("Customer Interceptor: Update field verification done.");
        next();
    }

    delete(req, res, next){
        if(req.params._id === undefined){
            console.log("Customer Interceptor:field verification failed.");
            return res.status(400).send({ message: "Fields verification failed" });
        }
        next();
    }
}

Object.seal(CustomerInterceptor);
export = CustomerInterceptor;