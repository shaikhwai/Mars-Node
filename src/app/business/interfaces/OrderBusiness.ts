/**
 * Created by waqar on 23/3/16.
 */

import BaseBusiness = require("./base/BaseBusiness");
import IOrderModel = require("./../../model/interfaces/OrderModel");

interface OrderBusiness extends BaseBusiness<IOrderModel> {

}
export = OrderBusiness;