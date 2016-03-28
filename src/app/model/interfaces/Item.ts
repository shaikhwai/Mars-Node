/**
 * Created by waqar on 24/3/16.
 */
/**
 * Created by waqar on 23/3/16.
 */
/// <reference path="../../../../typings/tsd.d.ts" />
import mongoose = require("mongoose");

interface ItemModel extends mongoose.Document {
    name: string;
    detail: string;
    varient: string;
    qty: number;
    unitRate: number;
    amount: number;
}

export = ItemModel;