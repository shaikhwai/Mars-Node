
/**
 * Created by waqar on 18/4/16.
 */
import DataAccess = require("./../../dataAccess/DataAccess");
import ITaskModel = require("./../../model/interfaces/Task");


var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class TaskSchema{
    static get schema () {
        var schema =  mongoose.Schema({

            assignedOn : {
                type:Date
            },
            assignedTo : {type:mongoose.Schema.Types.ObjectId, ref:'User'},
            status : {
                type:String
            },
            priority : {
                type: String
            },
            completeBy:{
                type: Date
            }
        });

        return schema;
    }
}
var schema = mongooseConnection.model<ITaskModel>("Task", TaskSchema.schema);
export = schema;