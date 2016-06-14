/**
 * Created by waqar on 16/5/16.
 */
import express = require("express");
import ProductController = require("./../controllers/ProductController");
import Auth = require("./../interceptor/Auth/AuthInterceptor");
import ProductInterceptor = require("./../interceptor/ProductInterceptor");

var router = express.Router();
class ProductRoutes {
    private _productController: ProductController;
    private _auth: Auth;
    private _productInterceptor: ProductInterceptor;

    constructor () {
        this._productController = new ProductController();
        this._auth = new Auth();
        this._productInterceptor = new ProductInterceptor();
    }
    get routes () {
        var controller = this._productController;
        var auth = this._auth;
        var interceptor = this._productInterceptor;
        router.get("/", auth.requiresAuth, interceptor.retrieve, controller.retrieve);
        router.post("", auth.requiresAuth, interceptor.create, controller.create);
        router.put("/:_id", auth.requiresAuth, interceptor.update, controller.update);
        router.delete("/:_id", auth.requiresAuth, interceptor.delete, controller.delete);
        return router;
    }


}

Object.seal(ProductRoutes);
export = ProductRoutes;