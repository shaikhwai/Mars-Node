/**
 * Created by chetan on 17/5/16.
 */
import IAddress = require("./Address");
import ITask = require("./Task");
import mongoose = require("mongoose");
var schema = mongoose.Schema;

interface CustomerModel extends mongoose.Document {

    fromCompany: string;
    contactPerson: string;
    contactNumber: number;
    shippingAddress: {type:mongoose.Schema.Types.ObjectId, ref:'IAddress'};
    billingAddress: {type:mongoose.Schema.Types.ObjectId, ref:'IAddress'};

}

export = CustomerModel;