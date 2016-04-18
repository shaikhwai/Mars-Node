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
                    required: false
                },
                orderDate: {
                    type: Date,
                    require: false
                },
                completionDate: {
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
                billingAddress: {
                    type: IAddress,
                    require: true
                },
                task: {
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
})();
var schema = mongooseConnection.model("Orders", OrderSchema.schema);
module.exports = schema;
//# sourceMappingURL=OrderSchema.js.map