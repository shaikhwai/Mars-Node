/**
 * Created by waqar on 16/5/16.
 */
import DataAccess = require("./../../dataAccess/DataAccess");
import IProductModel = require("./../../model/interfaces/ProductModel");


var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class ProductSchema{
    static get schema () {
        var schema =  mongoose.Schema({

            name : {
                type:String
            },
            type:{
              type:String
            },
            detail : {
                type:String
            },
            variant : {
                type: String
            },
            unitRate:{
                type: Number
            },
            available:{
                type: Boolean
            },
            vat:{
                type:Number
            }
        });

        return schema;
    }
}
var schema = mongooseConnection.model<IProductModel>("Product", ProductSchema.schema);
export = schema;