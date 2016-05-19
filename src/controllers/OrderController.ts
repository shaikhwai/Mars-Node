/**
 * Created by waqar on 23/3/16.
 */
import express = require("express");
import OrderBusiness = require("./../app/business/OrderBusiness");
import EmailProvider = require("./../app/business/EmailProvider");
import IBaseController = require("./interfaces/base/BaseController");
import IOrderModel = require("./../app/model/interfaces/OrderModel");
import Auth = require("./../interceptor/Auth/AuthInterceptor");
import Imap = require('imap');
import Util = require('util');
import fs = require('fs');
/*import inspect = require("util").inspect;*/
//import inspect = Util.inspect;



class OrderController implements IBaseController <OrderBusiness> {

    create(req: express.Request, res: express.Response): void {
        try {
            console.log(req.body);
            var order: IOrderModel = <IOrderModel>req.body;
            var user = req.user;
            var auth :Auth = new Auth();
            var orderBusiness = new OrderBusiness();
            orderBusiness.create(order, (error, result) => {
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
            var orderBusiness = new OrderBusiness();
            var params = req.query;
            delete params.access_token;
            var user = req.user;
            var auth :Auth = new Auth();
            if(req.query.sendLastOrder === "true"){
                console.log(req.query);
                var params = { $query:{"fromCompany": req.query.fromCompany},$orderby:{"orderDate":-1}};
                console.log("params are" + params);
            }

            console.log("params: "+JSON.stringify(req.query));
            orderBusiness.findAndPopulate(params,{path:'defaultTask assignedTo',  populate:{path:'items'}, populate:{path:'assignedTo'}}, (error, result) => {
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
            var order: IOrderModel = <IOrderModel>req.body;
            var _id: string = req.params._id;
            var user = req.user;
            var auth :Auth = new Auth();
            var orderBusiness = new OrderBusiness();
            orderBusiness.update(_id, order, (error, result) => {
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
            var orderBusiness = new OrderBusiness();
            orderBusiness.delete(_id, (error, result) => {
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
            var orderBusiness = new OrderBusiness();
            orderBusiness.findById(_id, (error, result) => {
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
Object.seal(OrderController);
export = OrderController;