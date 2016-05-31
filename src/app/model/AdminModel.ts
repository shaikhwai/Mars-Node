/**
 * Created by waqar on 3/5/16.
 */
import IAdminModel = require("./interfaces/AdminModel");

class AdminModel {

    public userName : String;
    public password : String;
    public createdAt: Date;
    public role: String;

    constructor() {

    }
    constructor(userName, password, createdAt, role){
        this.userName = userName;
        this.password = password;
        this.createdAt = createdAt;
        this.role = role;
    }

}
Object.seal(AdminModel);
export =  AdminModel;