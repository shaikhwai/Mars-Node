/**
 * Created by waqar on 16/5/16.
 */
import express = require("express");
import ProductController = require("./../../controllers/ProductController");
import Auth = require("./../../interceptor/Auth/AuthInterceptor");

var router = express.Router();
class ProductRoutes {
    private _productController: ProductController;
    private _auth: Auth;

    constructor () {
        this._productController = new ProductController();
        this._auth = new Auth();
    }
    get routes () {
        var controller = this._productController;
        var auth = this._auth;
        router.get("/", auth.requiresAuth, controller.retrieve);
        router.post("", auth.requiresAuth, controller.create);
        router.put("/:_id", auth.requiresAuth, controller.update);
        router.delete("/:_id", auth.requiresAuth, controller.delete);
        return router;
    }


}

Object.seal(ProductRoutes);
export = ProductRoutes;