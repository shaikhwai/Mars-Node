/**
 * Created by waqar on 3/5/16.
 */
import express = require("express");
import UserController = require("./../controllers/UserController");
import Interceptor = require("./../interceptor/UserInterceptor");
import Auth = require("./../interceptor/Auth/AuthInterceptor");

var router = express.Router();
class UserRoutes {
    private _userController: UserController;
    private _interceptor: Interceptor;
    private _auth: Auth;

    constructor () {
        this._userController = new UserController();
        this._interceptor = new Interceptor();
        this._auth = new Auth();
    }
    get routes () {
        var controller = this._userController;
        var interceptor = this._interceptor;
        var auth = this._auth;
        router.get("/", auth.requiresAuth, interceptor.retrieve, controller.retrieve);
        router.post("", auth.requiresAuth, controller.create);
        router.put("/:_id", auth.requiresAuth, interceptor.update,controller.update);
        router.delete("/:_id", auth.requiresAuth, interceptor.delete, controller.delete);
        router.post("/login",interceptor.login, controller.login);
        router.get("/task", auth.requiresAuth, controller.task);
        router.get("/order", auth.requiresAuth, controller.order);
        return router;
    }


}

Object.seal(UserRoutes);
export = UserRoutes;