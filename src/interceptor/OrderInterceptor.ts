/**
 * Created by waqar on 11/6/16.
 */
import express = require("express");
import ItemModel = require("./../app/model/ItemModel");

/*var router = express.Router();*/
class OrderInterceptor {

    constructor () {
    }


    create(req, res, next){
        if((req.body.defaultTask.assignedTo._id === undefined) || (req.body.shippingAddress._id === undefined) ||
            (req.body.billingAddress._id === undefined) || (req.body.customer._id === undefined)) {
            console.log("Order Interceptor:create field varification failed.");
            return res.status(400).send({ message: "field verification failed." });
        }
        var items: Array<ItemModel> = new Array();
        req.body.defaultTask.assignedTo = req.body.defaultTask.assignedTo._id;
        req.body.shippingAddress = req.body.shippingAddress._id;
        req.body.billingAddress = req.body.billingAddress._id;
        req.body.customer = req.body.customer._id;
        req.body.items.forEach((item)=>{
            items.push(new ItemModel(item._id, item.qty));
        });
        req.body.items = items;
        console.log("Order Interceptor:field varification done ");
        next();
    }

    retrieve(req, res, next){
        next();
    }

    update(req, res, next){
        if((req.body.defaultTask.assignedTo._id === undefined) || (req.body.shippingAddress._id === undefined) ||
            (req.body.billingAddress._id === undefined) || (req.body.customer._id === undefined) ||
            (req.params._id === undefined)) {
            console.log("Order Interceptor:update field verification failed.");
            return res.status(400).send({ message: "field verification failed." });
        }
        var items: Array<ItemModel> = new Array();
        req.body.defaultTask.assignedTo = req.body.defaultTask.assignedTo._id;
        req.body.shippingAddress = req.body.shippingAddress._id;
        req.body.billingAddress = req.body.billingAddress._id;
        req.body.customer = req.body.customer._id;
        req.body.items.forEach((item)=>{
            items.push(new ItemModel(item._id, item.qty));
        });
        req.body.items = items;
        console.log("Order Interceptor: Update field verification done.");
        next();
    }

    delete(req, res, next){
        if(req.params._id === undefined){
            console.log("Order Interceptor:field varification failed.");
            return res.status(400).send({ message: "Fields verification failed" });
        }
        next();
    }
}

Object.seal(OrderInterceptor);
export = OrderInterceptor;