/**
 * Created by chetan on 17/5/16.
 */

import IAddress = require("./interfaces/Address");

class AddressModel {

    private _addressModel: IAddress;

    constructor(addressModel: IAddress) {
        this._addressModel = addressModel;
    }

}
Object.seal(AddressModel);
export =  AddressModel;