
import ICustomerModel = require("./interfaces/CustomerModel");

class CustomerModel {

    private _customerModel: ICustomerModel;

    constructor(customerModel: ICustomerModel) {
        this._customerModel = customerModel;
    }

}
Object.seal(CustomerModel);
export =  CustomerModel;