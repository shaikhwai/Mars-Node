/**
 * Created by waqar on 3/5/16.
 */
import express = require("express");
import UserBusiness = require("./../app/business/Userbusiness");
import IBaseController = require("./interfaces/base/BaseController");
import IUserModel = require("./../app/model/interfaces/UserModel");
import UserBusiness = require("../app/business/Userbusiness");

import Auth = require("./../interceptor/Auth/AuthInterceptor");

class UserController implements IBaseController <UserBusiness> {

    create(req: express.Request, res: express.Response): void {
        try {
            /*console.log(req.body);*/
            var user: IUserModel = <IUserModel>req.body;
            user.createdAt = new Date();
            user.role = "User"
            var user = req.user;
            var auth :Auth = new Auth();
            var userBusiness = new UserBusiness();
            userBusiness.create(user, (error, result) => {
                if(error){
                    res.send({"error": "error"});
                }
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
            var userBusiness = new UserBusiness();
            var params = req.query;
            delete params.access_token;
            var user = req.user;
            var auth :Auth = new Auth();
            console.log("params: "+JSON.stringify(req.query));
            userBusiness.retrieve(params, (error, result) => {
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
            var user: IUserModel = <IUserModel>req.body;
            var _id: string = req.params._id;
            var user = req.user;
            var auth :Auth = new Auth();
            var userBusiness = new UserBusiness();
            userBusiness.update(_id, user, (error, result) => {
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
            var userBusiness = new UserBusiness();
            userBusiness.delete(_id, (error, result) => {
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
            var userBusiness = new UserBusiness();
            userBusiness.findById(_id, (error, result) => {
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

    login(req: express.Request, res: express.Response): void {
        try {
            var userBusiness = new UserBusiness();
            var params = req.body;
            delete params.access_token;
            var auth = new Auth();
            console.log("params: "+JSON.stringify(req.body));
            userBusiness.retrieve(params, (error, result) => {
                if(error) res.send({"error": "error"});
                else{
                    var token = auth.issueTokenWithUid(result[0]);
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
Object.seal(UserController);
export = UserController;