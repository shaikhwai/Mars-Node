/**
 * Created by waqar on 23/3/16.
 */
/// <reference path="../../../../typings/tsd.d.ts" />
import IItem = require("./Item");
import IAddress = require("./Address");
import mongoose = require("mongoose");

interface OrderModel extends mongoose.Document {


    orderDate: Date;
    completionDate: Date;
    companyName: string;
    status: string;
    orderType: string;
    remarks: string;
    contactPerson: string;
    venderName: string;
    contactNumber: number;
    totalAmount: number;
    items: Array<IItem>;
    shippingAddress: IAddress;
    billingAddress: IAddress;


}

export = OrderModel;