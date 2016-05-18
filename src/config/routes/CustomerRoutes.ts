/**
 * Created by chetan on 17/5/16.
 */
import express = require("express");
import OrderController = require("./../../controllers/OrderController");
import CustomerController = require("./../../controllers/CustomerController");
import Auth = require("./../../interceptor/Auth/AuthInterceptor");

var router = express.Router();
class CustomerRoutes {
    private _customerController: CustomerController;
    private _auth: Auth;

    constructor () {
        this._customerController = new CustomerController();
        this._auth = new Auth();
    }
    get routes () {
        var controller = this._customerController;
        var auth = this._auth;
        router.get("/", auth.requiresAuth, controller.retrieve);
        router.post("", auth.requiresAuth, controller.create);
        router.put("/:_id", auth.requiresAuth, controller.update);
        router.delete("/:_id", auth.requiresAuth, controller.delete);
        return router;
    }

}

Object.seal(CustomerRoutes);
export = CustomerRoutes;