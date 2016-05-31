import OrderModel = require("./../model/OrderModel");
import ICustomerModel = require("./../model/interfaces/CustomerModel");
import CustomerMOdel = require("./../model/CustomerModel");
import CustomerSchema = require("./../dataAccess/schemas/CustomerSchema");
import RepositoryBase = require("./base/RepositoryBase");

class CustomerRepository  extends RepositoryBase<CustomerMOdel> {
    constructor () {
        super(CustomerSchema);
    }
}
Object.seal(CustomerRepository);
export = CustomerRepository;