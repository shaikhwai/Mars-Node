/**
 * Created by waqar on 3/5/16.
 */
import UserModel = require("./../model/UserModel");
import IUserModel = require("./../model/interfaces/UserModel");
import UserSchema = require("./../dataAccess/schemas/UserSchema");
import RepositoryBase = require("./base/RepositoryBase");

class UserRepository extends RepositoryBase<IUserModel> {
    constructor () {
        super(UserSchema);
    }
}
Object.seal(UserRepository);
export = UserRepository;