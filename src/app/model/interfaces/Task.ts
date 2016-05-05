/**
 * Created by waqar on 24/3/16.
 */
/**
 * Created by waqar on 23/3/16.
 */
/// <reference path="../../../../typings/tsd.d.ts" />
import mongoose = require("mongoose");

interface ITask extends mongoose.Document {
    assignedOn:Date;
    assignedTo:{type:mongoose.Schema.Types.ObjectId, ref:'User'};
    status:string;
    priority:string;
    completeBy:Date;
}

export = ITask;