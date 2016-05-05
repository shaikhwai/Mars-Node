/**
 * Created by waqar on 3/5/16.
 */
import TaskRepository = require("./../repository/TaskRepository");
import ITaskModel = require("./../model/interfaces/Task");
import TaskModel = require("./../model/TaskModel");
import ITaskBusiness = require("./interfaces/TaskBusiness");


class TaskBusiness  implements ITaskBusiness {
    private _taskRepository: TaskRepository;

    constructor () {
        this._taskRepository = new TaskRepository();
    }

    create (item: ITaskModel, callback: (error: any, result: any) => void) {
        this._taskRepository.create(item, callback);
    }

    retrieve (field, callback: (error: any, result: any) => void) {
        this._taskRepository.retrieve(field, callback);
    }

    update (_id: string, item: ITaskModel, callback: (error: any, result: any) => void) {

        this._taskRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._taskRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._taskRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: ITaskModel) => void) {
        this._taskRepository.findById(_id, callback);
    }

    findAndPopulate(searchField, populateField, callback:(err: any, result: any)=>void){

    }

    findOneAndUpdate(query, newData, options, callback:(error: any, result: any) => void){
        this._taskRepository.findOneAndUpdate(query, newData, options, callback);
    }
}


Object.seal(TaskBusiness);
export = TaskBusiness;