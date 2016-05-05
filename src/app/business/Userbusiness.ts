/**
 * Created by waqar on 3/5/16.
 */
import UserRepository = require("./../repository/UserRepository");
import IUserModel = require("./../model/interfaces/UserModel");
import UserModel = require("./../model/UserModel");
import IUserBusiness = require("./interfaces/UserBusiness");


class Userbusiness  implements IUserBusiness {
    private _userRepository: UserRepository;

    constructor () {
        this._userRepository = new UserRepository();
    }

    create (item: IUserModel, callback: (error: any, result: any) => IUserModel) {
        this._userRepository.create(item, callback);
    }

    retrieve (field, callback: (error: any, result: any) => void) {
        this._userRepository.retrieve(field, callback);
    }

    update (_id: string, item: IUserModel, callback: (error: any, result: any) => void) {

        this._userRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._userRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._userRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IUserModel) => void) {
        this._userRepository.findById(_id, callback);
    }

    findAndPopulate(searchField, populateField, callback:(err: any, result: any)=>void){

    }

    findOneAndUpdate(query, newData, options, callback:(error: any, result: any) => void){
        this._userRepository.findOneAndUpdate(query, newData, options, callback);
    }
}


Object.seal(Userbusiness);
export = Userbusiness;