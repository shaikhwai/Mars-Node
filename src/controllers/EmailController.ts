/**
 * Created by waqar on 18/4/16.
 */
/**
 * Created by waqar on 23/3/16.
 */
import express = require("express");
import EmailBusiness = require("./../app/business/EmailBusiness");
import EmailProvider = require("./../app/business/EmailProvider");
import IBaseController = require("./interfaces/base/BaseController");
import IEmailModel = require("./../app/model/interfaces/EmailModel");
import EmailModel = require("./../app/model/EmailModel");
import Auth = require("./../interceptor/Auth/AuthInterceptor");
import Imap = require('imap');
import Util = require('util');
import fs = require('fs');
/*import inspect = require("util").inspect;*/
//import inspect = Util.inspect;



class EmailController implements IBaseController <EmailBusiness> {

    create(req: express.Request, res: express.Response): void {
        try {
            console.log("create email is been hit");
            var email: EmailModel = <EmailModel>req.body;
            //console.log(email);
            var emailBusiness = new EmailBusiness();
            emailBusiness.create(email, (error, result) => {
                if(error){
                    console.log("Error "+JSON.stringify((error)));
                    res.status(403).send({ message: error });
                }
                else{
                    res.send({"success": "success"});
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.status(403).send({ message: e.message });

        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {
            var emailProvider = new EmailProvider();
            var user = req.user;
            var auth :Auth = new Auth();
            emailProvider.openInbox(function(err, data){
                if(err){
                    console.log("Error "+JSON.stringify((err)));
                    res.status(403).send({ message: err });
                }
                else{
                    var emailBusiness = new EmailBusiness();
                    var params = req.query;
                    delete  params.access_token;
                    /*{path:'defaultTask assignedTo',populate:{path:'assignedTo'}}*/
                    emailBusiness.findAndPopulate(params,{path:'defaultTask assignedTo',populate:{path:'assignedTo'}}
                        ,function(error, result){
                        if(error){
                            console.log("Error "+JSON.stringify((error)));
                            res.status(403).send({ message: error });
                        }
                        else{
                            var token = auth.issueTokenWithUid(user);
                            res.send({"result":result,access_token: token});
                        }
                    });
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.status(403).send({ message: e.message });

        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            var email: EmailModel = <EmailModel>req.body;
            var _id: string = req.params._id;
            var user = req.user;
            var auth :Auth = new Auth();
            var emailBusiness = new EmailBusiness();
            emailBusiness.update(_id, email, (error, result) => {
                if(error){
                    console.log("Error "+JSON.stringify((error)));
                    res.status(403).send({ message: error });
                }
                else{
                    var token = auth.issueTokenWithUid(user);
                    res.send({"result":result,access_token: token});
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.status(403).send({ message: e.message });

        }
    }

    delete(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var emailBusiness = new EmailBusiness();
            var user = req.user;
            var auth :Auth = new Auth();
            emailBusiness.delete(_id, (error, result) => {
                if(error){
                    console.log("Error "+JSON.stringify((error)));
                    res.status(403).send({ message: error });
                }
                else{
                    var token = auth.issueTokenWithUid(user);
                    res.send({"result":result,access_token: token});
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.status(403).send({ message: e.message });

        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var emailBusiness = new EmailBusiness();
            var user = req.user;
            var auth :Auth = new Auth();
            emailBusiness.findById(_id, (error, result) => {
                if(error){
                    console.log("Error "+JSON.stringify((error)));
                    res.status(403).send({ message: error });
                }
                else{
                    var token = auth.issueTokenWithUid(user);
                    res.send({"result":result,access_token: token});
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.status(403).send({ message: e.message });

        }
    }

    sendMail(req: express.Request, res: express.Response): void {
        try {
            var body = req.body;
            var id = body.id;
            var email = {from: body.from,
                to: body.to,
                subject: body.subject,
                text: body.text,
                html: body.html,
                replyTo: body.replyTo,
                inReplyTo : body.inReplyTo,
                references: body.references,
                date: new Date()
            };
            var user = req.user;
            var auth :Auth = new Auth();
            console.log(JSON.stringify(body))
            console.log("send mail got hit");

            var emailProvider = new EmailProvider();
            emailProvider.sendMail(id, email, function(err, data){
                if(err){
                    res.status(403).send({ message: err });
                }
                else{
                    var emailBusiness = new EmailBusiness();
                    var params = req.query;
                    emailBusiness.retrieve(params, (error, result) => {
                        if(error){
                            console.log("Error "+JSON.stringify((error)));
                            res.status(403).send({ message: error });
                        }
                        else{
                            var token = auth.issueTokenWithUid(user);
                            res.send({"result":result,access_token: token});
                        }
                    });
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.status(403).send({ message: e.message });

        }
    }

}
Object.seal(EmailController);
export = EmailController;