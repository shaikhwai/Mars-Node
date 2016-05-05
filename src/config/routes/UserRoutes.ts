/**
 * Created by waqar on 3/5/16.
 */
import express = require("express");
import UserController = require("./../../controllers/UserController");

var router = express.Router();
class UserRoutes {
    private _userController: UserController;

    constructor () {
        this._userController = new UserController();
    }
    get routes () {
        var controller = this._userController;
        router.get("/", controller.retrieve);
        router.post("",controller.create);
        router.put("/:_id", controller.update);
        router.delete("/:_id", controller.delete);
        router.get("/login", controller.login);
        return router;
    }


}

Object.seal(UserRoutes);
export = UserRoutes;