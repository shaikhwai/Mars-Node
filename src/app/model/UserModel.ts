/**
 * Created by waqar on 3/5/16.
 */
import IUserModel = require("./interfaces/UserModel");

class UserModel {

    public firstName : string;
    public lastName: string;
    public password : string;
    public createdAt: Date;
    public role: string;

    constructor() {
    }

    constructor(firstName, lastName, password, createdAt, role){
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.createdAt = createdAt;
        this.role = role;
    }

}
Object.seal(UserModel);
export =  UserModel;