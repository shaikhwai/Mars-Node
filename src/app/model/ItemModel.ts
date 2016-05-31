/**
 * Created by waqar on 16/5/16.
 */
import IItem = require("./interfaces/Item");
import mongoose = require("mongoose");

class ItemModel {

    public productId: {type:mongoose.Schema.Types.ObjectId, ref:'Product'};
    public qty: number;

    constructor(){
    }

    constructor(productId, qty){
        this.productId = productId;
        this.qty = qty;
    }
}
Object.seal(ItemModel);
export =  ItemModel;