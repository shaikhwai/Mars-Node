import express = require("express");
import OrderRoutes = require("./../OrderRoutes");
import EmailRoutes = require("./../EmailRoutes");
import AdminRoutes = require("./../AdminRoutes");
import UserRoutes = require("./../UserRoutes");
import ProductRoutes = require("./../ProductRoutes");
import CustomerRoutes = require("../CustomerRoutes");

var app = express();
class BaseRoutes {


    get routes() {
        app.use("/api/", new OrderRoutes().routes);
        app.use("/api/", new EmailRoutes().routes);
        app.use("/api/admin", new AdminRoutes().routes);
        app.use("/api/user", new UserRoutes().routes);
        app.use("/api/product", new ProductRoutes().routes);
        app.use("/api/customer", new CustomerRoutes().routes);
        return app;
    }

}
export = BaseRoutes;