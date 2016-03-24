/**
 * Created by waqar on 23/3/16.
 */
/// <reference path="../../../../typings/tsd.d.ts" />
import mongoose = require("mongoose");

interface OrderModel extends mongoose.Document {
    name: string;
    qty: number;
    amount: number;
}

export = OrderModel;