/**
 * Created by waqar on 18/4/16.
 */
import DataAccess = require("./../../dataAccess/DataAccess");
import IEmailModel = require("./../../model/interfaces/EmailModel");
import ITask = require("./../../model/interfaces/Task");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class EmailSchema{
    static get schema () {
        var schema =  mongoose.Schema({

            fromCompany : {
                type: String,
                required: false
            },html : {
                type: String,
                required: false
            },
            text:{
                type: String,
                require: false
            },
            subject:{
                type: String,
                require: false
            },
            from: {
                type: [],
                required: false
            },
            to: {
                type: [],
                required: false
            },
            date: {
                type: Date,
                require: false
            },
            receivedDate: {
                type: Date,
                require: false
            },
            attachments: {
                type: [],
                require: false
            },
            defaultTask:{
                type:ITask,
                require: false
            }
        });

        return schema;
    }
}
var schema = mongooseConnection.model<IEmailModel>("Email", EmailSchema.schema);
export = schema;