import express = require("express");
import OrderRoutes = require("./../OrderRoutes");
import EmailRoutes = require("./../EmailRoutes");
import AdminRoutes = require("./../AdminRoutes");
import UserRoutes = require("./../UserRoutes");
import ProductRoutes = require("./../ProductRoutes");

var app = express();
class BaseRoutes {


    get routes() {
        app.use("/", new OrderRoutes().routes);
        app.use("/", new EmailRoutes().routes);
        app.use("/admin", new AdminRoutes().routes);
        app.use("/user", new UserRoutes().routes);
        app.use("/product", new ProductRoutes().routes);
        return app;
    }

}
export = BaseRoutes;