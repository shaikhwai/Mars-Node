import express = require("express");
import OrderController = require("./../../controllers/OrderController");
import Auth = require("./../../interceptor/Auth/AuthInterceptor");

var router = express.Router();
class OrderRoutes {
    private _orderController: OrderController;
    private _auth: Auth;

    constructor () {
        this._orderController = new OrderController();
        this._auth = new Auth();
    }
    get routes () {
        var controller = this._orderController;
        var auth = this._auth;
        router.get("/orders", auth.requiresAuth, controller.retrieve);
        router.post("/orders", auth.requiresAuth, controller.create);
        router.put("/orders/:_id", auth.requiresAuth, controller.update);
        router.delete("/orders/:_id", auth.requiresAuth, controller.delete);
        return router;
    }

}

Object.seal(OrderRoutes);
export = OrderRoutes;