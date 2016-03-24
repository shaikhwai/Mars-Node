import express = require("express");
import HeroRoutes = require("./../HeroRoutes");
import SpartanRoutes = require("./../SpartanRoutes");
import OrderRoutes =require("./../OrderRoutes");
var app = express();
class BaseRoutes {
    
    get routes() {
        app.use("/", new HeroRoutes().routes);
        app.use("/", new SpartanRoutes().routes);
        app.use("/", new OrderRoutes().routes);
        return app;
    }
}
export = BaseRoutes;