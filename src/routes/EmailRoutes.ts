/**
 * Created by waqar on 18/4/16.
 */
import express = require("express");
import EmailController = require("./../controllers/EmailController");
import Auth = require("./../interceptor/Auth/AuthInterceptor");

var router = express.Router();
class EmailRoutes {
    private _emailController: EmailController;
    private _auth : Auth;

    constructor () {
        this._emailController = new EmailController();
        this._auth =  new Auth()
    }
    get routes () {
        var controller = this._emailController;
        var auth = this._auth;
        router.get("/emails", auth.requiresAuth, controller.retrieve);
        router.post("/emails",auth.requiresAuth, controller.create);
        router.put("/emails/:_id", auth.requiresAuth, controller.update);
        router.delete("/emails/:_id", auth.requiresAuth, controller.delete);
        router.post("/sendmail", auth.requiresAuth, controller.sendMail);

        return router;
    }


}

Object.seal(EmailRoutes);
export = EmailRoutes;