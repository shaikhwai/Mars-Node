/**
 * Created by waqar on 3/5/16.
 */
import IAdminModel = require("./interfaces/AdminModel");

class AdminModel {

    private _adminModel: IAdminModel;

    constructor(adminModel: IAdminModel) {
        this._adminModel = adminModel;
    }

}
Object.seal(AdminModel);
export =  AdminModel;