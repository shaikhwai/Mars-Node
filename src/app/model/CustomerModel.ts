
import ICustomerModel = require("./interfaces/CustomerModel");
import mongoose = require("mongoose");
import Contract = require("./ContractModel");

class CustomerModel {

    fromCompany: string;
    contactPerson: string;
    contactNumber: number;
    shippingAddress: [{type:mongoose.Schema.Types.ObjectId, ref:'IAddress'}];
    billingAddress: [{type:mongoose.Schema.Types.ObjectId, ref:'IAddress'}];
    contract: Array<Contract>;

    constructor() {
    }

    constructor(fromCompany, contactPerson, contactNumber, shippingAddress, billingAddress, contract){
        this.fromCompany = fromCompany;
        this.contactPerson = contactPerson;
        this.contactNumber = contactNumber;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
        this.contract = contract;
    }

}
Object.seal(CustomerModel);
export =  CustomerModel;