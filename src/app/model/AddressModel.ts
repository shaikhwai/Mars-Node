/**
 * Created by chetan on 17/5/16.
 */

import IAddress = require("./interfaces/Address");

class AddressModel {

    /*private _addressModel: IAddress;*/
    public line1: string;
    public line2: string;
    public pinCode: number;
    public city: string;
    public country: string;
    public state: string;

    constructor(){
        console.log("default constructor is been called.");
    }
    constructor(line1, line2, city, pinCode, state, country) {

        this.line1 = line1;
        this.line2 = line2;
        this.city = city;
        this.pinCode = pinCode;
        this.state = state;
        this.country = country;
    }

}
Object.seal(AddressModel);
export =  AddressModel;