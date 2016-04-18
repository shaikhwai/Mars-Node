import express = require("express");
import OrderRoutes = require("./../OrderRoutes");
import EmailRoutes = require("./../EmailRoutes");
var app = express();
class BaseRoutes {
    
    get routes() {
        app.use("/", new OrderRoutes().routes);
        app.use("/", new EmailRoutes().routes);
        return app;
    }
}
export = BaseRoutes;