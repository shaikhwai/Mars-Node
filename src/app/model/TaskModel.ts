/**
 * Created by waqar on 18/4/16.
 */
import ITask = require("./interfaces/Task");
import mongoose = require("mongoose");
class TaskModel {

    assignedOn:Date;
    assignedTo:string;
    status:string;
    priority:string;
    completeBy:Date;

    constructor(){
        console.log("default constructor got hit!!!!");
    }
    constructor(assignedOn, assignedTo, completeBy, priority, status) {
        console.log("task constructor got hit.");
        this.assignedOn = assignedOn;
        this.assignedTo = assignedTo;
        this.completeBy = completeBy;
        this.priority = priority;
        this.status = status;
        console.log("task constructor got work done.");
    }

}
Object.seal(TaskModel);
export =  TaskModel;