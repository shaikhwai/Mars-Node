/**
 * Created by waqar on 16/5/16.
 */
import mongoose = require("mongoose");

interface ProductModel extends mongoose.Document {
    name: string;
    detail: string;
    type:string;
    variant: string;
    unitRate: number;
    available: boolean;
}

export = ProductModel;