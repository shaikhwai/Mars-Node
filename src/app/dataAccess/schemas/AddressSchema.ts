/**
 * Created by chetan on 17/5/16.
 */
import DataAccess = require("./../../dataAccess/DataAccess");
import IAddress = require("./../../model/interfaces/Address");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class AddressSchema{
    static get schema () {
        var schema =  mongoose.Schema({

            line1 : {
                type: String,
                required: false
            },
            line2 : {
                type: String,
                required: false
            },
            pinCode:{
                type: Number,
                require: false
            },
            city:{
                type: String,
                require: false
            },
            country:{
                type: String,
                require: false
            },
            state:{
                type: String,
                require: false
            }

        });

        return schema;
    }
}
var schema = mongooseConnection.model<IAddress>("Address", AddressSchema.schema);
export = schema;