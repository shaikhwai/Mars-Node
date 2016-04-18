/**
 * Created by waqar on 18/4/16.
 */
import mongoose = require("mongoose");
interface EmailModel extends mongoose.Document {

    html : string;
    text : string;
    subject : string;
    from : Array<any>;
    to : Array<any>;
    date : Date;
    receivedDate : Date;
    attachments : Array<any>;


}

export = EmailModel;