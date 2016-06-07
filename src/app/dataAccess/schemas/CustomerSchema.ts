
import DataAccess = require("./../../dataAccess/DataAccess");
import ICustomerModel = require("./../../model/interfaces/CustomerModel");
import IAddressModel = require("./../../model/interfaces/Address");
import IContractModel = require("./../../model/interfaces/ContractModel");
import ContractModel = require("./../../model/ContractModel");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class CustomerSchema{
    static get schema () {
        var schema =  mongoose.Schema({

            fromCompany : {
                type: String,
                required: false
            },
            contactPerson : {
                type: String,
                required: false
            },
            contactNumber:{
                type: Number,
                require: false
            },
            shippingAddress: [{
                type:mongoose.Schema.Types.ObjectId, ref:'Address'
            }],
            billingAddress: [{
                type:mongoose.Schema.Types.ObjectId, ref:'Address'
            }],
            contract: {
               /* type:[ContractModel]*/
                type: [{productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product'},
                    unitRate: Number,
                    item:String}],
                require: false
            }

        });

        return schema;
    }
}
var schema = mongooseConnection.model<ICustomerModel>("Customer", CustomerSchema.schema);
export = schema;