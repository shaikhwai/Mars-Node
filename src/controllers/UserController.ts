/**
 * Created by waqar on 3/5/16.
 */
import express = require("express");
import UserBusiness = require("./../app/business/Userbusiness");
import IBaseController = require("./interfaces/base/BaseController");
import IUserModel = require("./../app/model/interfaces/UserModel");
import UserBusiness = require("../app/business/Userbusiness");




class UserController implements IBaseController <UserBusiness> {

    create(req: express.Request, res: express.Response): void {
        try {
            /*console.log(req.body);*/
            var user: IUserModel = <IUserModel>req.body;
            user.createdAt = new Date();
            /*console.log(user);*/
            var userBusiness = new UserBusiness();
            userBusiness.create(user, (error, result) => {
                if(error){
                    res.send({"error": "error"});
                }
                else{
                    console.log("User created"+ result);
                    res.send({"success": "success"});
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
            var userBusiness = new UserBusiness();
            var params = req.query;
            console.log("params: "+JSON.stringify(req.query));
            userBusiness.retrieve(params, (error, result) => {
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
            var user: IUserModel = <IUserModel>req.body;
            var _id: string = req.params._id;
            var userBusiness = new UserBusiness();
            userBusiness.update(_id, user, (error, result) => {
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
            var userBusiness = new UserBusiness();
            userBusiness.delete(_id, (error, result) => {
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
            console.log("findbyid is been hit");
            var _id: string = req.params._id;
            console.log(JSON.stringify(req.params));
            var _id = req.params;
            var userBusiness = new UserBusiness();
            userBusiness.findById(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send(result);
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    login(req: express.Request, res: express.Response): void {
        try {
            var userBusiness = new UserBusiness();
            var params = req.query;
            console.log("params: "+JSON.stringify(req.query));
            userBusiness.retrieve(params, (error, result) => {
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
Object.seal(UserController);
export = UserController;