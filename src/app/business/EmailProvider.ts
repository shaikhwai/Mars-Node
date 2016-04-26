
import IEmailProvider = require("./interfaces/EmailProvider");
import EmailBusiness = require("./EmailBusiness");
import EmailModel = require("./../model/EmailModel");
import Task =  require("./../model/TaskModel");

import Imap = require('imap');
import Util = require('util');
import fs = require('fs');
import inbox = require("inbox");
import stream = require('stream');

import eMailParser = require("mailparser");
import ITask = require("../model/interfaces/Task");
var MailParser = eMailParser.MailParser;
class EmailProvider  implements IEmailProvider {
    //imap:Imap;
    constructor(){

    }

    openInbox(callback):void{

        console.log("in OpenInbox");
        var imap = new Imap({
            user: 'waqartesst@gmail.com',
            password: 'Heaven@1',
            host: 'imap.gmail.com',
            port: 993,
            tls: true
        });
        imap.connect();
        imap.once('ready', function() {
            imap.openBox('INBOX', function (err, box) {
                imap.search([ 'UNSEEN' ], function(err, results) {
                    if (err){
                        console.log("Got Error: "+ err);
                        callback(err, null);
                    }
                    else{
                        console.log("result length : "+results.length);
                        if(results.length == 0){
                            console.log("got in");
                            imap.end();
                        }
                        else{
                           var  emailBusiness = new EmailBusiness();
                            var f = imap.fetch(results, { bodies: ["HEADER.FIELDS (FROM SUBJECT)", ""],markSeen: true  });
                            f.on('message', function(msg, seqno) {
                                console.log("Processing msg #" + seqno);
                                var attchments :Array<any>= [];
                                var parser = new eMailParser.MailParser({streamAttachments: true});
                                parser.on("attachment", function(attachment, mail){
                                    var currentDate: Date = new Date();
                                    var fileName: String =  currentDate.getDate()+"-"+(currentDate.getMonth()+1)
                                        +"-"+currentDate.getFullYear()+"-"+currentDate.getHours()+":"+currentDate.getMinutes()
                                        +":"+attachment.generatedFileName;
                                    var output = fs.createWriteStream('lib/public/'+fileName);
                                    console.log("file path =>"+'lib/public/'+fileName);
                                    attachment.stream.pipe(output);
                                    attchments.push({fileName:fileName});
                                });
                                parser.on("end", function(msg) {

                                    var email = new EmailModel();
                                    email.html = msg.html;
                                    email.text = msg.text;
                                    email.subject =  msg.subject;
                                    email.from = msg.from;
                                    email.to = msg.to;
                                    email.date = msg.date;
                                    email.recivedDate = msg.recivedDate;
                                    email.attachments = attchments;
                                    var defaultTask : ITask = new Task();
                                    defaultTask.assignedOn = new Date();
                                    defaultTask.assignedTo = "Swapnil";
                                    defaultTask.status = "open";
                                    defaultTask.priority = "high";
                                    defaultTask.completeBy = new Date();
                                    email.defaultTask = defaultTask;

                                    var my_email=email.from[0].address;
                                    var ind=my_email.indexOf("@");
                                    var my_slice=my_email.slice((ind+1),my_email.length);
                                    my_slice = my_slice.split(".");
                                    email.fromCompany = my_slice[0];
                                    //var x = my_email.match(/^[^@\s]+@([^@\s])+$/);

                                    //console.log("attachment file name = "+ JSON.stringify(attchments));
                                    //console.log("Email: " + JSON.stringify(email));
                                    emailBusiness.create(email, (error, result) => {
                                        /* if(error) callback({"error": "error"}, null);
                                         else callback(null, {"success": "success"});*/
                                    });
                                });
                                msg.on("body", function (stream) {
                                    stream.on("data", function (chunk) {
                                        parser.write(chunk.toString("utf8"));
                                    });
                                });
                                msg.once("end", function () {
                                    console.log("Finished msg #" + seqno);
                                    parser.end();
                                });
                            });

                            f.once('error', function(err) {
                                console.log('Fetch error: ' + err);
                            });
                            f.once('end', function() {
                                console.log('Done fetching all messages!');
                                imap.end();
                            });
                        }
                    }
                });

            });
        });
        imap.once('error', function(err) {
            console.log("got err : "+err);
        });

        imap.once('end', function() {
            console.log('Connection ended');
            callback(null, {status:"Done"});
        });
    }

}


Object.seal(EmailProvider);
export = EmailProvider;

