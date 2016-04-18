/**
 * Created by waqar on 18/4/16.
 */
import express = require("express");
import EmailController = require("./../../controllers/EmailController");

var router = express.Router();
class EmailRoutes {
    private _emailController: EmailController;

    constructor () {
        this._emailController = new EmailController();
    }
    get routes () {
        var controller = this._emailController;
        router.get("/emails", this._emailController.retrieve);
        router.post("/emails",controller.create);
        router.put("/emails/:_id", controller.update);
        router.get("/emails/:_id", controller.findById);
        router.delete("/emails/:_id", controller.delete);
        //router.get("/read", this._emailController.read);
        return router;
    }


}

Object.seal(EmailRoutes);
export = EmailRoutes;