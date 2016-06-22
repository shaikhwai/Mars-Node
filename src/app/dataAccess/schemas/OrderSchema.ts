/**
 * Created by waqar on 23/3/16.
 */
import DataAccess = require("./../../dataAccess/DataAccess");
import IOrderModel = require("./../../model/interfaces/OrderModel");
import IItem = require("./../../model/interfaces/Item");
import IAddress = require("./../../model/interfaces/Address");
import ItemModel = require("../../model/interfaces/Item");
import ITask = require("./../../model/interfaces/Task");
import ICustomer = require("./../../model/interfaces/CustomerModel");


var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class OrderSchema {


    static get schema () {
        var schema =  mongoose.Schema({

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
            totalAmount: {
                type: Number,
                require: false
            },
            items: {
                type:[{productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product'},
                qty: Number}],
                require: false
            },
            billingAddress: {type:mongoose.Schema.Types.ObjectId, ref:'Address'},
            shippingAddress: {type:mongoose.Schema.Types.ObjectId, ref:'Address'},
            defaultTask:  {type:mongoose.Schema.Types.ObjectId, ref:'Task'},
            customer: {type:mongoose.Schema.Types.ObjectId, ref:'Customer'}
        });

        return schema;
    }

}
var schema = mongooseConnection.model<IOrderModel>("Orders", OrderSchema.schema);
export = schema;