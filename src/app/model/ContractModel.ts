/**
 * Created by waqar on 23/5/16.
 */
import IContract = require("./interfaces/ContractModel");

class ContractModel {

    private _contract: IContract;


}
Object.seal(ContractModel);
export =  ContractModel;