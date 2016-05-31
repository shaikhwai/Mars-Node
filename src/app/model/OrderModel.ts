/**
 * Created by waqar on 23/3/16.
 */
import IOrderModel = require("./interfaces/OrderModel");
import Item = require("./ItemModel");
import Address = require("./AddressModel");
import Task = require("./TaskModel");
import mongoose = require("mongoose");

class OrderModel {

    orderDate: Date;
    completionDate: Date;
    status: string;
    orderType: string;
    remarks: string;
    totalAmount: number;
    items: Array<Item>;
    defaultTask: {type:mongoose.Schema.Types.ObjectId, ref:'Task'};
    customer: {type:mongoose.Schema.Types.ObjectId, ref:'Customer'};
    shippingAddress: Address;
    billingAddress: Address;

    constructor(){
    }

    constructor(orderDate, completionDate, status, orderType, remarks, totalAmount, items, defaultTask,
        customer, shippingAddress, billingaddress) {
        this.orderDate = orderDate;
        this.completionDate = completionDate;
        this.status = status;
        this.orderType = orderType;
        this.remarks = remarks;
        this.totalAmount = totalAmount;
        this.items = items;
        this.defaultTask = defaultTask;
        this.customer = customer;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingaddress;
    }


}
Object.seal(OrderModel);
export =  OrderModel;