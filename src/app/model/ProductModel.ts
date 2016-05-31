/**
 * Created by waqar on 16/5/16.
 */
import IProductModel = require("./interfaces/ProductModel");

class ProductModel {

    public name: string;
    public detail: string;
    public type:string;
    public variant: string;
    public unitRate: number;
    public available: boolean;

    constructor(){
    }
    constructor(name, detail, type, variant, unitRate, available){
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.variant = variant;
        this.unitRate = unitRate;
        this.available = available;
    }
}
Object.seal(ProductModel);
export =  ProductModel;