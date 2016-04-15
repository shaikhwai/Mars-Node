"use strict";
/**
 * Created by waqar on 23/3/16.
 */
var DataAccess = require("./../../dataAccess/DataAccess");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
var OrderSchema = (function () {
    function OrderSchema() {
    }
    Object.defineProperty(OrderSchema, "schema", {
        get: function () {
            var schema = mongoose.Schema({
                companyName: {
                    type: String,
                    required: true
                },
                orderDate: {
                    type: Date,
                    require: true
                },
                completionDate: {
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
                vendorName: {
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
                billingAddress: {
                    type: IAddress,
                    require: true
                },
                Task: {
                    type: ITask,
                    require: true
                }
            });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return OrderSchema;
}());
var schema = mongooseConnection.model("Orders", OrderSchema.schema);
module.exports = schema;
//# sourceMappingURL=OrderSchema.js.map