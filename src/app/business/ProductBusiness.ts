/**
 * Created by waqar on 16/5/16.
 */
import ProductRepository = require("./../repository/ProductRepository");
import IProductModel = require("./../model/interfaces/ProductModel");
import ProductModel = require("./../model/ProductModel");
import IProductBusiness = require("./interfaces/ProductBusiness");


class ProductBusiness  implements IProductBusiness {
    private _productRepository: ProductRepository;

    constructor () {
        this._productRepository = new ProductRepository();
    }

    create (item: IProductModel, callback: (error: any, result: any) => void) {
        this._productRepository.create(item, callback);
    }

    retrieve (field, callback: (error: any, result: any) => void) {
        this._productRepository.retrieve(field, callback);
    }

    update (_id: string, item: IProductModel, callback: (error: any, result: any) => void) {

        this._productRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._productRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._productRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IProductModel) => void) {
        this._productRepository.findById(_id, callback);
    }

    findAndPopulate(searchField, populateField, callback:(err: any, result: any)=>void){

    }

    findOneAndUpdate(query, newData, options, callback:(error: any, result: any) => void){
        this._productRepository.findOneAndUpdate(query, newData, options, callback);
    }
}


Object.seal(ProductBusiness);
export = ProductBusiness;