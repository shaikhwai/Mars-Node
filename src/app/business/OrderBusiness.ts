/**
 * Created by waqar on 23/3/16.
 */
/// <reference path="../../../typings/tsd.d.ts" />
import OrderRepository = require("./../repository/OrderRepository");
import IOrderBusiness = require("./interfaces/OrderBusiness");
import IOrderModel = require("./../model/interfaces/OrderModel");
import OrderModel = require("./../model/OrderModel");


class OrderBusiness  implements IOrderBusiness {
    private _orderRepository: OrderRepository;

    constructor () {
        this._orderRepository = new OrderRepository();
    }

    create (item: IOrderModel, callback: (error: any, result: any) => void) {
        this._orderRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this._orderRepository.retrieve(callback);
    }

    update (_id: string, item: IOrderModel, callback: (error: any, result: any) => void) {

        this._orderRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._orderRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._orderRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IOrderModel) => void) {
        this._orderRepository.findById(_id, callback);
    }

}


Object.seal(OrderBusiness);
export = OrderBusiness;