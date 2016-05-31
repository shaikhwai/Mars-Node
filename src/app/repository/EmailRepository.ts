/**
 * Created by waqar on 18/4/16.
 */
import EmailModel = require("./../model/EmailModel");
import IEmailModel = require("./../model/interfaces/EmailModel");
import EmailSchema = require("./../dataAccess/schemas/EmailSchema");
import RepositoryBase = require("./base/RepositoryBase");

class EmailRepository extends RepositoryBase<EmailModel> {
    constructor () {
        super(EmailSchema);
    }
}
Object.seal(EmailRepository);
export = EmailRepository;