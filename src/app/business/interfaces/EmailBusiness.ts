/**
 * Created by waqar on 23/3/16.
 */

import BaseBusiness = require("./base/BaseBusiness");
import IEmailModel = require("./../../model/interfaces/EmailModel");

interface EmailBusiness extends BaseBusiness<IEmailModel> {

}
export = EmailBusiness;