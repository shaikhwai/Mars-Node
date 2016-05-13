/**
 * Created by waqar on 3/5/16.
 */
import express = require("express");
import AdminBusiness = require("./../app/business/AdminBusiness");
import IBaseController = require("./interfaces/base/BaseController");
import IAdminModel = require("./../app/model/interfaces/AdminModel");
import UserBusiness = require("./../app/business/Userbusiness");
import IUserModel = require("./../app/model/interfaces/UserModel");

import Auth = require("./../interceptor/Auth/AuthInterceptor");


class AdminController implements IBaseController <AdminBusiness> {

    create(req: express.Request, res: express.Response): void {
        try {
            console.log(req.body);
            var admin: IAdminModel = <IAdminModel>req.body;
            admin.createdAt = new Date();
            admin.role = "Admin"
            console.log(admin);
            var adminBusiness = new AdminBusiness();
            adminBusiness.create(admin, (error, result) => {
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
            var adminBusiness = new AdminBusiness();
            var params = req.query;
            var user = req.user;
            var auth :Auth = new Auth();
            console.log("params: "+JSON.stringify(req.query));
            adminBusiness.retrieve(params, (error, result) => {
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
            var admin: IAdminModel = <IAdminModel>req.body;
            var _id: string = req.params._id;
            var adminBusiness = new AdminBusiness();
            var user = req.user;
            var auth :Auth = new Auth();
            adminBusiness.update(_id, admin, (error, result) => {
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
            var adminBusiness = new AdminBusiness();
            var user = req.user;
            var auth :Auth = new Auth();
            adminBusiness.delete(_id, (error, result) => {
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
            var adminBusiness = new AdminBusiness();
            adminBusiness.findById(_id, (error, result) => {
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
            var adminBusiness = new AdminBusiness();
            console.log("body"+req.body);
            var params = req.body;
            var auth = new Auth();
            console.log("params: "+JSON.stringify(req.body));
            adminBusiness.retrieve(params, (error, result) => {
                if(error) res.send({"error": "error"});

                else{
                    var token = auth.issueTokenWithUid(result[0]);
                    res.send({"result":result[0],access_token: token});
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    user(req: express.Request, res: express.Response): void{
        try {
            console.log(req.body);
            var user: IUserModel = <IUserModel>req.body;
            user.createdAt = new Date();
            var user = req.user;
            var auth :Auth = new Auth();
            var userBusiness = new UserBusiness();
            userBusiness.create(user, (error, result) => {
                if(error) res.send({"error": "error"});
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

}
Object.seal(AdminController);
export = AdminController;