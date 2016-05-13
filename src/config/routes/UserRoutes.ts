/**
 * Created by waqar on 3/5/16.
 */
import express = require("express");
import UserController = require("./../../controllers/UserController");
import Auth = require("./../../interceptor/Auth/AuthInterceptor");

var router = express.Router();
class UserRoutes {
    private _userController: UserController;
    private _auth: Auth;

    constructor () {
        this._userController = new UserController();
        this._auth = new Auth();
    }
    get routes () {
        var controller = this._userController;
        var auth = this._auth;
        router.get("/", auth.requiresAuth, controller.retrieve);
        router.post("", auth.requiresAuth, controller.create);
        router.put("/:_id", auth.requiresAuth, controller.update);
        router.delete("/:_id", auth.requiresAuth, controller.delete);
        router.post("/login", controller.login);
        return router;
    }


}

Object.seal(UserRoutes);
export = UserRoutes;