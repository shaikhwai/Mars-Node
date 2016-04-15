"use strict";
var OrderBusiness = require("./../app/business/OrderBusiness");
var OrderController = (function () {
    function OrderController() {
    }
    OrderController.prototype.create = function (req, res) {
        try {
            var order = req.body;
            console.log(JSON.stringify(order));
            var orderBusiness = new OrderBusiness();
            orderBusiness.create(order, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": e.message });
        }
    };
    OrderController.prototype.retrieve = function (req, res) {
        try {
            var orderBusiness = new OrderBusiness();
            orderBusiness.retrieve(function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send(result);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    OrderController.prototype.update = function (req, res) {
        try {
            var order = req.body;
            var _id = req.params._id;
            var orderBusiness = new OrderBusiness();
            orderBusiness.update(_id, order, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    OrderController.prototype.delete = function (req, res) {
        try {
            var _id = req.params._id;
            var orderBusiness = new OrderBusiness();
            orderBusiness.delete(_id, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    OrderController.prototype.findById = function (req, res) {
        try {
            var _id = req.params._id;
            var orderBusiness = new OrderBusiness();
            orderBusiness.findById(_id, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send(result);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    return OrderController;
}());
module.exports = OrderController;
//# sourceMappingURL=OrderController.js.map