/**
 * Created by waqar on 23/3/16.
 */
import DataAccess = require("./../../dataAccess/DataAccess");
import IOrderModel = require("./../../model/interfaces/OrderModel");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class OrderSchema {

    static get schema () {
        var schema =  mongoose.Schema({
            name : {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        });

        return schema;
    }

}
var schema = mongooseConnection.model<IOrderModel>("Orders", OrderSchema.schema);
export = schema;