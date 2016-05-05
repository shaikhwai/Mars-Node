/**
 * Created by waqar on 3/5/16.
 */
import express = require("express");
import AdminController = require("./../../controllers/AdminController");

var router = express.Router();
class AdminRoutes {
    private _adminController: AdminController;

    constructor () {
        this._adminController = new AdminController();
    }
    get routes () {
        var controller = this._adminController;
        router.get("/", controller.retrieve);
        router.get("/login", controller.login);
        router.post("/user", controller.user);
        router.post("",controller.create);
        router.put("/:_id", controller.update);
        router.delete("/:_id", controller.delete);
        return router;
    }


}

Object.seal(AdminRoutes);
export = AdminRoutes;