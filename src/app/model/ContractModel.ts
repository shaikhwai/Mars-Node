/**
 * Created by waqar on 23/5/16.
 */
import IContract = require("./interfaces/ContractModel");
import mongoose = require("mongoose");

class ContractModel {

    productId: {type:mongoose.Schema.Types.ObjectId, ref:'Product'};
    unitRate: Number;
    item: String;


    constructor(){
    }

    constructor(productId, unitRate, item){
        this.productId = productId;
        this.unitRate = unitRate;
        this.item = item;
    }
}
Object.seal(ContractModel);
export =  ContractModel;