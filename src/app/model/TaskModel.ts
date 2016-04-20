/**
 * Created by waqar on 18/4/16.
 */
import ITask = require("./interfaces/Task");

class TaskModel {

    private _task: ITask;

    /*constructor(){

    }*/
    /*constructor(task: ITask) {
        this._task = task;
    }*/

}
Object.seal(TaskModel);
export =  TaskModel;