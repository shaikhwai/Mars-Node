/**
 * Created by waqar on 3/5/16.
 */
import AdminModel = require("./../model/AdminModel");
import IAdminModel = require("./../model/interfaces/AdminModel");
import AdminSchema = require("./../dataAccess/schemas/AdminSchema");
import RepositoryBase = require("./base/RepositoryBase");

class AdminRepository extends RepositoryBase<AdminModel> {
    constructor () {
        super(AdminSchema);
    }
}
Object.seal(AdminRepository);
export = AdminRepository;