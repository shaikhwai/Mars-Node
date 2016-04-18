/**
 * Created by waqar on 23/3/16.
 */
import express = require("express");
import OrderBusiness = require("./../app/business/OrderBusiness");
import EmailProvider = require("./../app/business/EmailProvider");
import IBaseController = require("./interfaces/base/BaseController");
import IOrderModel = require("./../app/model/interfaces/OrderModel");
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
            console.log(order);
            var orderBusiness = new OrderBusiness();
            orderBusiness.create(order, (error, result) => {
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
            var orderBusiness = new OrderBusiness();
            orderBusiness.retrieve((error, result) => {
                if(error) res.send({"error": "error"});
                else res.send(result);
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
            var orderBusiness = new OrderBusiness();
            orderBusiness.update(_id, order, (error, result) => {
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
            var orderBusiness = new OrderBusiness();
            orderBusiness.delete(_id, (error, result) => {
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
            var orderBusiness = new OrderBusiness();
            orderBusiness.findById(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send(result);
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    /*read(req: express.Request, res: express.Response ): void{
        try{
            emailProvider = new EmailProvider();
            emailProvider.openInbox(function(err, data){
                if(err){
                    return err;
                }

                else{
                    console.log("calback go hit");
                    res.send({"mails": data});
                }
            });


        }catch(e){
            console.log(e);
            res.send({"error": e});
        }
    }*/

}
Object.seal(OrderController);
export = OrderController;