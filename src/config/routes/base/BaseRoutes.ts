import express = require("express");
import OrderRoutes =require("./../OrderRoutes");
var app = express();
class BaseRoutes {
    
    get routes() {
        app.use("/", new OrderRoutes().routes);
        return app;
    }
}
export = BaseRoutes;