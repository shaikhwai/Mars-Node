/**
 * Created by waqar on 16/5/16.
 */
import IProductModel = require("./interfaces/ProductModel");

class ProductModel {

    private _productModel: IProductModel;


}
Object.seal(ProductModel);
export =  ProductModel;