import express = require("express");
import OrderController = require("./../../controllers/OrderController");

var router = express.Router();
class OrderRoutes {
    private _orderController: OrderController;

    constructor () {
        this._orderController = new OrderController();
    }
    get routes () {
        var controller = this._orderController;
        router.get("/orders", this._orderController.retrieve);
        router.post("/orders",controller.create);
        router.put("/orders/:_id", controller.update);
        router.get("/orders/:_id", controller.findById);
        router.delete("/orders/:_id", controller.delete);
        return router;
    }


}

Object.seal(OrderRoutes);
export = OrderRoutes;