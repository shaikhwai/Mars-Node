/**
 * Created by waqar on 3/5/16.
 */
import BaseBusiness = require("./base/BaseBusiness");
import IUserModel = require("./../../model/interfaces/UserModel");

interface UserBusiness extends BaseBusiness<IUserModel> {

}
export = UserBusiness;