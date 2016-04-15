var express = require("express");
var OrderController = require("./../../controllers/OrderController");

var router = express.Router();
var OrderRoutes = (function () {
    function OrderRoutes() {
        this._orderController = new OrderController();
    }
    Object.defineProperty(OrderRoutes.prototype, "routes", {
        get: function () {
            var controller = this._orderController;
            router.get("/orders", controller.retrieve);
            router.post("/orders", controller.create);
            router.put("/orders/:_id", controller.update);
            router.get("/orders/:_id", controller.findById);
            router.delete("/orders/:_id", controller.delete);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return OrderRoutes;
})();

Object.seal(OrderRoutes);
module.exports = OrderRoutes;
