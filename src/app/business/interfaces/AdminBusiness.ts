/**
 * Created by waqar on 3/5/16.
 */
import BaseBusiness = require("./base/BaseBusiness");
import IAdminModel = require("./../../model/interfaces/AdminModel");

interface AdminBusiness extends BaseBusiness<IAdminModel> {

}
export = AdminBusiness;