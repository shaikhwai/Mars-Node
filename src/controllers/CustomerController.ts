/**
 * Created by chetan on 17/5/16.
 */
/**
 * Created by waqar on 23/3/16.
 */
import express = require("express");
import OrderBusiness = require("./../app/business/OrderBusiness");
import CustomerBusiness = require("./../app/business/CustomerBusiness");
import EmailProvider = require("./../app/business/EmailProvider");
import IBaseController = require("./interfaces/base/BaseController");
import ICustomerModel = require("./../app/model/interfaces/CustomerModel");
import Auth = require("./../interceptor/Auth/AuthInterceptor");
import Imap = require('imap');
import Util = require('util');
import fs = require('fs');
/*import inspect = require("util").inspect;*/
//import inspect = Util.inspect;


class CustomerController implements IBaseController <CustomerBusiness> {

    create(req: express.Request, res: express.Response): void {

        console.log("create customer has been hit");
        try {
            console.log(req.body);
            var customer: ICustomerModel = <ICustomerModel>req.body;
            var user = req.user;
            var auth :Auth = new Auth();
            var customerBusiness = new CustomerBusiness();
            customerBusiness.create(customer, (error, result) => {
                if(error) res.send({"error": error});
                else{
                    var token = auth.issueTokenWithUid(user);
                    res.send({"result":result,access_token: token});
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": e.message});

        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {
            var customerBusiness = new CustomerBusiness();
            var params = req.query;
            delete params.access_token;
            var user = req.user;
            var auth :Auth = new Auth();

            console.log("params: "+JSON.stringify(req.query));
            /*customerBusiness.findAndPopulate(params,{path:'defaultTask assignedTo',populate:{path:'assignedTo'}}, (error, result) => {
                if(error) res.send({"error": "error"});
                else{
                    var token = auth.issueTokenWithUid(user);
                    res.send({"result":result,access_token: token});
                }
            });*/
            customerBusiness.retrieve(params, (error, result) => {
                if(error) res.send({"error": "error"});
                else{
                    var token = auth.issueTokenWithUid(user);
                    res.send({"result":result,access_token: token});
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
            var customer: ICustomerModel = <ICustomerModel>req.body;
            var _id: string = req.params._id;
            var user = req.user;
            var auth :Auth = new Auth();
            var customerBusiness = new CustomerBusiness();
            customerBusiness.update(_id, customer, (error, result) => {
                if(error) res.send({"error": "error"});
                else{
                    var token = auth.issueTokenWithUid(user);
                    res.send({"result":result,access_token: token});
                }
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
            var user = req.user;
            var auth :Auth = new Auth();
            var customerBusiness = new CustomerBusiness();
            customerBusiness.delete(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else{
                    var token = auth.issueTokenWithUid(user);
                    res.send({"result":result,access_token: token});
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {
            console.log("findbyid is been hit");
            var _id: string = req.params._id;
            console.log(JSON.stringify(req.params));
            var _id = req.params;
            var user = req.user;
            var auth :Auth = new Auth();
            var customerBusiness = new CustomerBusiness();
            customerBusiness.findById(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else{
                    var token = auth.issueTokenWithUid(user);
                    res.send({"result":result,access_token: token});
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }


}
Object.seal(CustomerController);
export = CustomerController;