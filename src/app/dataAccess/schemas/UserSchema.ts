
/**
 * Created by waqar on 18/4/16.
 */
import DataAccess = require("./../../dataAccess/DataAccess");
import IUserModel = require("./../../model/interfaces/UserModel");
import ITask = require("./../../model/interfaces/Task");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class UserSchema{
    static get schema () {
        var schema =  mongoose.Schema({

            firstName : {
                type: String,
                required: false
            },
            lastName : {
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
var schema = mongooseConnection.model<IUserModel>("User", UserSchema.schema);
export = schema;