/**
 * Created by waqar on 16/5/16.
 */
import express = require("express");
import ProductBusiness = require("./../app/business/ProductBusiness");
import IBaseController = require("./interfaces/base/BaseController");
import IProductModel = require("./../app/model/interfaces/ProductModel");
import  productModel = require("./../app/model/ProductModel");
import ProductBusiness = require("../app/business/ProductBusiness");

import Auth = require("./../interceptor/Auth/AuthInterceptor");
import ProductModel = require("../app/model/interfaces/ProductModel");

class ProductController implements IBaseController <ProductBusiness> {

    create(req: express.Request, res: express.Response): void {
        try {
            /*console.log(req.body);*/
            var product: ProductModel = <ProductModel>req.body;
            var user = req.user;
            var auth :Auth = new Auth();
            var productBusiness = new ProductBusiness();
            productBusiness.create(product, (error, result) => {
                if(error){
                    console.log("Error "+JSON.stringify((error)));
                    res.status(403).send({ message: error });
                }
                else{
                    console.log("product created"+ result);
                    var token = auth.issueTokenWithUid(user);
                    res.send({"result":result,access_token: token});
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.status(403).send({ message: e.message });

        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {
            var productBusiness = new ProductBusiness();
            var params = req.query;
            delete params.access_token;
            var user = req.user;
            var auth :Auth = new Auth();
            console.log("params: "+JSON.stringify(req.query));
            productBusiness.retrieve(params, (error, result) => {
                if(error){
                    console.log("Error "+JSON.stringify((error)));
                    res.status(403).send({ message: error });
                }
                else{
                    var token = auth.issueTokenWithUid(user);
                    res.send({"result":result,access_token: token});
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.status(403).send({ message: e.message });

        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            var product: ProductModel = <ProductModel>req.body;
            var _id: string = req.params._id;
            var user = req.user;
            var auth :Auth = new Auth();
            var productBusiness = new ProductBusiness();
            productBusiness.update(_id, product, (error, result) => {
                if(error){
                    console.log("Error "+JSON.stringify((error)));
                    res.status(403).send({ message: error });
                }
                else{
                    var token = auth.issueTokenWithUid(user);
                    res.send({"result":result,access_token: token});
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.status(403).send({ message: e.message });

        }
    }

    delete(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var user = req.user;
            var auth :Auth = new Auth();
            var productBusiness = new ProductBusiness();
            productBusiness.delete(_id, (error, result) => {
                if(error){
                    console.log("Error "+JSON.stringify((error)));
                    res.status(403).send({ message: error });
                }
                else{
                    var token = auth.issueTokenWithUid(user);
                    res.send({"result":result,access_token: token});
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.status(403).send({ message: e.message });

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
            var productBusiness = new ProductBusiness();
            productBusiness.findById(_id, (error, result) => {
                if(error){
                    console.log("Error "+JSON.stringify((error)));
                    res.status(403).send({ message: error });
                }
                else{
                    var token = auth.issueTokenWithUid(user);
                    res.send({"result":result,access_token: token});
                }
            });
        }
        catch (e)  {
            console.log(e);
            res.status(403).send({ message: e.message });

        }
    }

}
Object.seal(ProductController);
export = ProductController;