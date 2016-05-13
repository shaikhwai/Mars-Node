/**
 * Created by waqar on 3/5/16.
 */
import express = require("express");
import AdminController = require("./../../controllers/AdminController");
import AdminInterceptor = require("./../../interceptor/AdminInterceptor");
import Auth = require("./../../interceptor/Auth/AuthInterceptor");

var router = express.Router();
class AdminRoutes {
    private _adminController: AdminController;
    private _adminInterceptor: AdminInterceptor;
    private _auth: Auth;

    constructor () {
        this._adminController = new AdminController();
        this._adminInterceptor = new AdminInterceptor();
        this._auth = new Auth();
    }


    get routes () {
        var controller = this._adminController;
        var interceptor = this._adminInterceptor;
        var auth = this._auth;
        router.get("/", auth.requiresAuth, controller.retrieve);
        router.get("/login",  interceptor.login, controller.login);
        router.post("/user", auth.requiresAuth, controller.user);
        router.post("",controller.create);
        router.put("/:_id",  auth.requiresAuth, controller.update);
        router.delete("/:_id", auth.requiresAuth, controller.delete);
        return router;
    }

}

Object.seal(AdminRoutes);
export = AdminRoutes;