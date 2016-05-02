/**
 * Created by waqar on 18/4/16.
 */
import mongoose = require("mongoose");
import ITask = require("./Task");
interface EmailModel extends mongoose.Document {

    fromCompany: string;
    html : string;
    text : string;
    subject : string;
    from : Array<any>;
    to : Array<any>;
    date : Date;
    receivedDate : Date;
    attachments : Array<any>;
    defaultTask : ITask;
    messageId : string;
    conversation: Array<any>;


}

export = EmailModel;