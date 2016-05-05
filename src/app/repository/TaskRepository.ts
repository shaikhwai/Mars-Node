/**
 * Created by waqar on 3/5/16.
 */
import TaskModel = require("./../model/TaskModel");
import ITaskModel = require("./../model/interfaces/Task");
import TaskSchema = require("./../dataAccess/schemas/TaskSchema");
import RepositoryBase = require("./base/RepositoryBase");

class TaskRepository extends RepositoryBase<ITaskModel> {
    constructor () {
        super(TaskSchema);
    }
}
Object.seal(TaskRepository);
export = TaskRepository;