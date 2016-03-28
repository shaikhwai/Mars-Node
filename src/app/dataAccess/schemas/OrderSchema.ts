/**
 * Created by waqar on 23/3/16.
 */
import DataAccess = require("./../../dataAccess/DataAccess");
import IOrderModel = require("./../../model/interfaces/OrderModel");
import IItem = require("./../../model/interfaces/Item");
import IAddress = require("./../../model/interfaces/Address");
import ItemModel = require("../../model/interfaces/Item");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class OrderSchema {

    static get schema () {
        var schema =  mongoose.Schema({

            companyName : {
                type: String,
                required: true
            },
            orderDate:{
                type: Date,
                require: true
            },
            completionDate:{
                type: Date,
                require: true
            },
            status: {
                type: String,
                required: true
            },
            orderType: {
                type: String,
                required: true
            },
            remarks: {
                type: String,
                require: false
            },
            contactPerson: {
                type: String,
                require: false
            },
            venderName: {
                type: String,
                require: true
            },
            contactNumber: {
                type: Number,
                require: true
            },
            totalAmount: {
                type: Number,
                require: true
            },
            items: {
                type: [],
                require: true
            },
            shippingAddress: {
                type: IAddress,
                require: true
            },
            billingAddress:  {
                type: IAddress,
                require: true
            }
        });

        return schema;
    }

}
var schema = mongooseConnection.model<IOrderModel>("Orders", OrderSchema.schema);
export = schema;