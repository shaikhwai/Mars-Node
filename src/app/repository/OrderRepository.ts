/**
 * Created by waqar on 23/3/16.
 */
import OrderModel = require("./../model/OrderModel");
import IOrderModel = require("./../model/interfaces/OrderModel");
import OrderSchema = require("./../dataAccess/schemas/OrderSchema");
import RepositoryBase = require("./base/RepositoryBase");

class OrderRepository  extends RepositoryBase<OrderModel> {
    constructor () {
        super(OrderSchema);
    }
}
Object.seal(OrderRepository);
export = OrderRepository;