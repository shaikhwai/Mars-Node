/**
* Created by waqar on 23/3/16.
*/
/// <reference path="../../../typings/tsd.d.ts" />
var OrderRepository = require("./../repository/OrderRepository");

var OrderBusiness = (function () {
    function OrderBusiness() {
        this._orderRepository = new OrderRepository();
    }
    OrderBusiness.prototype.create = function (item, callback) {
        console.log(item);
        this._orderRepository.create(item, callback);
    };

    OrderBusiness.prototype.retrieve = function (callback) {
        this._orderRepository.retrieve(callback);
    };

    OrderBusiness.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._orderRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._orderRepository.update(res._id, item, callback);
        });
    };

    OrderBusiness.prototype.delete = function (_id, callback) {
        this._orderRepository.delete(_id, callback);
    };

    OrderBusiness.prototype.findById = function (_id, callback) {
        this._orderRepository.findById(_id, callback);
    };
    return OrderBusiness;
})();

Object.seal(OrderBusiness);
module.exports = OrderBusiness;
