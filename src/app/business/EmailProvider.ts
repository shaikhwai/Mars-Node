
import IEmailProvider = require("./interfaces/EmailProvider");
import EmailBusiness = require("./EmailBusiness");
import EmailModel = require("./../model/EmailModel");
import TaskBusiness = require("./TaskBusiness");
import Task =  require("./../model/TaskModel");
import ITask = require("../model/interfaces/Task");
import UserBusiness = require("./Userbusiness");
import User = require("./../model/UserModel");
import IUser = require("../model/interfaces/UserModel");

import Imap = require('imap');
import Util = require('util');
import fs = require('fs');
import inbox = require("inbox");
import stream = require('stream');

import nodemailer = require('nodemailer');
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
                                    /*console.log(JSON.stringify(msg));*/
                                    var email = new EmailModel();
                                    email.html = msg.html;
                                    email.text = msg.text;
                                    email.subject =  msg.subject;
                                    email.from = msg.from;
                                    email.to = msg.to;
                                    email.date = msg.date;
                                    email.recivedDate = msg.recivedDate;
                                    email.attachments = attchments;
                                    email.messageId = msg.messageId;

                                    var my_email=email.from[0].address;
                                    var ind=my_email.indexOf("@");
                                    var my_slice=my_email.slice((ind+1),my_email.length);
                                    my_slice = my_slice.split(".");
                                    email.fromCompany = my_slice[0];

                                    var userBusiness:UserBusiness = new UserBusiness();
                                    var query = {
                                        firstName:"waqar",
                                        lastName:"shaikh"
                                    };
                                    var newData = {
                                        firstName: "waqar",
                                        lastName: "shaikh",
                                        password: "heaven",
                                        createdAt: new Date()
                                    }
                                    userBusiness.findOneAndUpdate(query, newData, {new:true},function(err, user){
                                       if(user){
                                           var defaultTask : ITask = new Task();
                                           defaultTask.assignedOn = new Date();
                                           defaultTask.assignedTo = user._id;
                                           defaultTask.status = "open";
                                           defaultTask.priority = "high";
                                           defaultTask.completeBy = new Date();
                                           var taskBusiness = new TaskBusiness();

                                           taskBusiness.create(defaultTask, function(err, task){
                                               if(task){
                                                   email.defaultTask = task._id;
                                                   emailBusiness.create(email, function(error, result){
                                                   });
                                               }
                                               else{
                                                   console.log("unable to default task.");
                                               }
                                           });
                                       }
                                        else{
                                            console.log("Unable to find default User ");
                                       }
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

    sendMail(id, email, callback){

        var  emailBusiness = new EmailBusiness();
        var smtpConfig = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'waqartesst@gmail.com',
                pass: 'Heaven@1'
            }
        };
        var transporter = nodemailer.createTransport(smtpConfig);

        // send mail with defined transport object
        transporter.sendMail(email, function(error, info){
            if(error){
                console.log(email);
                return console.log("we got error while sending mail"+error);
            }
            console.log('Message sent: ' + info.response);
            console.log(id);
            emailBusiness.retrieve({_id:id}, function(err, record){
               if(record){
                   record[0].conversation.push(email);
                   emailBusiness.update(id, record[0],function(err, status){
                        if(status){
                            callback(null, status);
                        }
                   });
               }
                else{
                   console.log("found error =>"+err);
               }
            });
        });

    }

}


Object.seal(EmailProvider);
export = EmailProvider;

