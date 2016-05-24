/**
 * Created by waqar on 23/5/16.
 */
import mongoose = require("mongoose");

interface ContractModel extends mongoose.Document {
    productId: {type:mongoose.Schema.Types.ObjectId, ref:'Product'};
    unitRate: number;
    item: string;
}

export = ContractModel;