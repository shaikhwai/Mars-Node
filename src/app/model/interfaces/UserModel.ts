/**
 * Created by waqar on 3/5/16.
 */
/**
 * Created by waqar on 3/5/16.
 */
import mongoose = require("mongoose");

interface UserModel extends mongoose.Document {
    firstName : String,
    lastName: String,
    password : String,
    createdAt: Date,
    role: String
}

export = UserModel;