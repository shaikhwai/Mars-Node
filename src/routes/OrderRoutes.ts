import express = require("express");
import OrderController = require("./../controllers/OrderController");
import Auth = require("./../interceptor/Auth/AuthInterceptor");
import OrderInterceptor = require("./../interceptor/OrderInterceptor");

var router = express.Router();
class OrderRoutes {
    private _orderController: OrderController;
    private _auth: Auth;
    private _orderInterceptor: OrderInterceptor;

    constructor () {
        this._orderController = new OrderController();
        this._auth = new Auth();
        this._orderInterceptor = new OrderInterceptor();
    }
    get routes () {
        var controller = this._orderController;
        var auth = this._auth;
        var interceptor = this._orderInterceptor;
        router.get("/orders", auth.requiresAuth, interceptor.retrieve, controller.retrieve);
        router.post("/orders", auth.requiresAuth, interceptor.create, controller.create);
        router.put("/orders/:_id", auth.requiresAuth, interceptor.update, controller.update);
        router.delete("/orders/:_id", auth.requiresAuth, interceptor.delete, controller.delete);
        return router;
    }

}

Object.seal(OrderRoutes);
export = OrderRoutes;