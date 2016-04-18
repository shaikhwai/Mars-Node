/**
 * Created by waqar on 13/4/16.
 */
/**
 * Created by waqar on 23/3/16.
 */
/// <reference path="../../../typings/tsd.d.ts" />
//import OrderRepository = require("./../repository/OrderRepository");
import IEmailProvider = require("./interfaces/EmailProvider");
//import IOrderModel = require("./../model/interfaces/OrderModel");
//import OrderModel = require("./../model/OrderModel");

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
        /*this.imap = new Imap({
            user: 'waqar.shaikh@techprimelab.com',
            password: 'Heaven@1',
            host: 'imap.gmail.com',
            port: 993,
            tls: true
        });*/
    }

    openInbox(callback):void {
        console.log("in OpenInbox");
        imap = new Imap({
            user: 'waqartesst@gmail.com',
            password: 'Heaven@1',
            host: 'imap.gmail.com',
            port: 993,
            tls: true
        });

        imap.connect();
        imap.once('ready', function() {
            imap.openBox('INBOX', true, function (err, box) {
                imap.search([ 'UNSEEN' ], function(err, results) {
                    if (err) callback(err, null);
                    mails = new Array();
                    var f = imap.fetch(results, { bodies: ["HEADER.FIELDS (FROM SUBJECT)", ""] });
                    f.on('message', function(msg, seqno) {
                        console.log("Processing msg #" + seqno);

                        var parser = new eMailParser.MailParser({showAttachmentLinks :true});
                        parser.on("headers", function(headers) {
                            console.log("Header: " + JSON.stringify(headers));
                        });
                        parser.on("end", function(msg) {
                            /*console.log("From: " + msg.from);
                            console.log("Subject: " + msg.subject);
                            console.log("Text: " + msg.text);*/
                            //console.log("Html: " + msg.html);
                            console.log(JSON.stringify(msg));
                        });
                        /*parser.on("attachment", function(attachment, mail){
                            var output = fs.createWriteStream(attachment.generatedFileName);
                            console.log("**************");
                            console.log("atachment file name = "+output);
                            console.log("**************");
                            attachment.stream.pipe(output);
                        });*/
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
                        callback(null, mails);
                    });
                });

            });
        });

        imap.once('error', function(err) {
            console.log(err);
        });

        imap.once('end', function() {
            console.log('Connection ended');
        });

    }


}


Object.seal(EmailProvider);
export = EmailProvider;

