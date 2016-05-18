/**
 * Created by chetan on 18/5/16.
 */
import AddressModel = require("./../model/AddressModel");
import IAddressModel = require("./../model/interfaces/Address");
import AddressSchema = require("./../dataAccess/schemas/AddressSchema");
import RepositoryBase = require("./base/RepositoryBase");

class AddressRepository extends RepositoryBase<IAddressModel> {
    constructor () {
        super(AddressSchema);
    }
}
Object.seal(AddressRepository);
export = AddressRepository;