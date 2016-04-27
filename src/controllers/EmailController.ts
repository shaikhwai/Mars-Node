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
import Imap = require('imap');
import Util = require('util');
import fs = require('fs');
/*import inspect = require("util").inspect;*/
//import inspect = Util.inspect;



class EmailController implements IBaseController <EmailBusiness> {

    create(req: express.Request, res: express.Response): void {
        try {
            console.log(req.body);
            var email: IEmailModel = <IEmailModel>req.body;
            //console.log(email);
            var emailBusiness = new EmailBusiness();
            emailBusiness.create(email, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": e.message});

        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {
            var emailProvider = new EmailProvider();
            emailProvider.openInbox(function(err, data){
                if(err){
                    return err;
                }
                else{
                    var emailBusiness = new EmailBusiness();
                    var params = req.query;
                    emailBusiness.retrieve(params, (error, result) => {
                        if(error) res.send({"error": "error"});
                        else res.send(result);
                    });
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            var email: IEmailModel = <IEmailModel>req.body;
            var _id: string = req.params._id;
            var emailBusiness = new EmailBusiness();
            emailBusiness.update(_id, email, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    delete(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var emailBusiness = new EmailBusiness();
            emailBusiness.delete(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var emailBusiness = new EmailBusiness();
            emailBusiness.findById(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send(result);
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }


}
Object.seal(EmailController);
export = EmailController;