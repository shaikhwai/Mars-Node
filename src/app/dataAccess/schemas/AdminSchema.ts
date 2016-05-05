/**
 * Created by waqar on 3/5/16.
 */
/**
 * Created by waqar on 18/4/16.
 */
import DataAccess = require("./../../dataAccess/DataAccess");
import IAdminModel = require("./../../model/interfaces/AdminModel");
import ITask = require("./../../model/interfaces/Task");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class AdminSchema{
    static get schema () {
        var schema =  mongoose.Schema({

            userName : {
                type: String,
                required: false
            },
            password : {
                type: String,
                required: false
            },
            createdAt:{
                type: Date,
                require: false
            }
        });

        return schema;
    }
}
var schema = mongooseConnection.model<IAdminModel>("Admin", AdminSchema.schema);
export = schema;