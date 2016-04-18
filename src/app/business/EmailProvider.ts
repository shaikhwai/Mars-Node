
import IEmailProvider = require("./interfaces/EmailProvider");
import EmailBusiness = require("./EmailBusiness");
import EmailModel = require("./../model/EmailModel");

import Imap = require('imap');
import Util = require('util');
import fs = require('fs');
import inbox = require("inbox");
import stream = require('stream');

import eMailParser = require("mailparser");
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

                                var parser = new eMailParser.MailParser({showAttachmentLinks :true});
                                parser.on("end", function(msg) {

                                    var email = new EmailModel();
                                    email.html = msg.html;
                                    email.text = msg.text;
                                    email.subject =  msg.subject;
                                    email.from = msg.from;
                                    email.to = msg.to;
                                    email.date = msg.date;
                                    email.recivedDate = msg.recivedDate;
                                    email.attachments = msg.attachments;
                                    console.log("Email: " + JSON.stringify(email));
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

