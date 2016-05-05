/**
 * Created by waqar on 3/5/16.
 */
import IUserModel = require("./interfaces/UserModel");

class UserModel {

    private _userModel: IUserModel;

    constructor(userModel: IUserModel) {
        this._userModel = userModel;
    }

}
Object.seal(UserModel);
export =  UserModel;