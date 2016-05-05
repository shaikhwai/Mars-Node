/**
 * Created by waqar on 3/5/16.
 */
import BaseBusiness = require("./base/BaseBusiness");
import ITaskModel = require("./../../model/interfaces/Task");

interface TaskBusiness extends BaseBusiness<ITaskModel> {

}
export = TaskBusiness;