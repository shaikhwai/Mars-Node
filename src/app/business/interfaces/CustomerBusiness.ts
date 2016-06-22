/**
 * Created by chetan on 17/5/16.
 */

import BaseBusiness = require("./base/BaseBusiness");
import ICustomerModel = require("./../../model/interfaces/CustomerModel");

interface CustomerBusiness extends BaseBusiness<ICustomerModel> {

}
export = CustomerBusiness;
