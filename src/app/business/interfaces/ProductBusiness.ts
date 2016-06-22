/**
 * Created by waqar on 16/5/16.
 */
import BaseBusiness = require("./base/BaseBusiness");
import IProductModel = require("./../../model/interfaces/ProductModel");

interface ProductBusiness extends BaseBusiness<IProductModel> {

}
export = ProductBusiness;