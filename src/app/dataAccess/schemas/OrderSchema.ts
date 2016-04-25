/**
 * Created by waqar on 23/3/16.
 */
import DataAccess = require("./../../dataAccess/DataAccess");
import IOrderModel = require("./../../model/interfaces/OrderModel");
import IItem = require("./../../model/interfaces/Item");
import IAddress = require("./../../model/interfaces/Address");
import ItemModel = require("../../model/interfaces/Item");
import ITask = require("./../../model/interfaces/Task");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class OrderSchema {

    static get schema () {
        var schema =  mongoose.Schema({

            fromCompany : {
                type: String,
                required: false
            },
            orderDate:{
                type: Date,
                require: false
            },
            completionDate:{
                type: Date,
                require: false
            },
            status: {
                type: String,
                required: false
            },
            orderType: {
                type: String,
                required: false
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
                require: false
            },
            contactNumber: {
                type: Number,
                require: false
            },
            totalAmount: {
                type: Number,
                require: false
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
            },
            defaultTask:  {
                type: ITask,
                require: true
            }
        });

        return schema;
    }

}
var schema = mongooseConnection.model<IOrderModel>("Orders", OrderSchema.schema);
export = schema;