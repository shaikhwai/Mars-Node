/**
 * Created by waqar on 16/5/16.
 */
import ProductModel = require("./../model/ProductModel");
import IProductModel = require("./../model/interfaces/ProductModel");
import ProductSchema = require("./../dataAccess/schemas/ProductSchema");
import RepositoryBase = require("./base/RepositoryBase");

class ProductRepository extends RepositoryBase<ProductModel> {
    constructor () {
        super(ProductSchema);
    }
}
Object.seal(ProductRepository);
export = ProductRepository;