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
    public vat: number;
    public unit: string;

    constructor(){
    }
    constructor(name, detail, type, variant, unitRate, available, vat, unit){
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.variant = variant;
        this.unitRate = unitRate;
        this.available = available;
        this.vat = vat;
        this.unit = unit;
    }
}
Object.seal(ProductModel);
export =  ProductModel;