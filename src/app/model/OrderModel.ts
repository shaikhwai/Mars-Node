/**
 * Created by waqar on 23/3/16.
 */
import IOrderModel = require("./interfaces/OrderModel");

class OrderModel {

    private _orderModel: IOrderModel;

    constructor(orderModel: IOrderModel) {
        this._orderModel = orderModel;
    }
    get name (): string {
        return this._orderModel.name;
    }

    get qty (): number {
        return this._orderModel.qty;
    }

    get amount (): number {
        return this._orderModel.amount;
    }


}
Object.seal(OrderModel);
export =  OrderModel;