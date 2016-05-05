/**
 * Created by waqar on 3/5/16.
 */
import AdminRepository = require("./../repository/AdminRepository");
/*import IEmailProvider = require("./interfaces/EmailProvider");*/
import IAdminModel = require("./../model/interfaces/AdminModel");
import AdminModel = require("./../model/AdminModel");
import IAdminbusiness = require("./interfaces/AdminBusiness");
/*import nodemailer = require('nodemailer');*/


class AdminBusiness  implements IAdminbusiness {
    private _adminRepository: AdminRepository;

    constructor () {
        this._adminRepository = new AdminRepository();
    }

    create (item: IAdminModel, callback: (error: any, result: any) => void) {
        this._adminRepository.create(item, callback);
    }

    retrieve (field, callback: (error: any, result: any) => void) {
        this._adminRepository.retrieve(field, callback);
    }

    update (_id: string, item: IAdminModel, callback: (error: any, result: any) => void) {

        this._adminRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._adminRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._adminRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IAdminModel) => void) {
        this._adminRepository.findById(_id, callback);
    }

    findAndPopulate(searchField, populateField, callback:(err: any, result: any)=>void){

    }

    findOneAndUpdate(query, newData, options, callback:(error: any, result: any) => void){
        this._adminRepository.findOneAndUpdate(query, newData, options, callback);
    }
}


Object.seal(AdminBusiness);
export = AdminBusiness;