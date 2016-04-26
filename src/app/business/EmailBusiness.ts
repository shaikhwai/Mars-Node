/**
 * Created by waqar on 18/4/16.
 */

import EmailRepository = require("./../repository/EmailRepository");
import IEmailProvider = require("./interfaces/EmailProvider");
import IEmailModel = require("./../model/interfaces/EmailModel");
import EmailModel = require("./../model/EmailModel");
import IEmailBusiness = require("./interfaces/EmailBusiness");


class EmailBusiness  implements IEmailBusiness {
    private _emailRepository: EmailRepository;

    constructor () {
        this._emailRepository = new EmailRepository();
    }

    create (item: IEmailModel, callback: (error: any, result: any) => void) {
        //console.log(item);
        this._emailRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this._emailRepository.retrieve(callback);
    }

    update (_id: string, item: IEmailModel, callback: (error: any, result: any) => void) {

        this._emailRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._emailRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._emailRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IEmailModel) => void) {
        this._emailRepository.findById(_id, callback);
    }

}


Object.seal(EmailBusiness);
export = EmailBusiness;