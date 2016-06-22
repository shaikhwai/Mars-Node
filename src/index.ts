    /// <reference path="../typings/tsd.d.ts" />

    import express = require("express");
    import Middlewares = require("./middlewares/base/MiddlewaresBase");
    import config = require('config');

    import cors = require('cors')
    
    var app = express();

    //
    // Current Environment
    // Config module uses NODE_ENV variable to determine the configuration file to be loaded from the /config directory.
    //
    if (!process.env.NODE_ENV) {
         process.env.NODE_ENV = 'development';
    }
    console.log("Runtime Environment: %s", process.env.NODE_ENV);
    //
    // App Configuration
    //
    console.log("Config Base: " + config.util.getEnv('NODE_CONFIG_DIR'));
    console.log("Config File: " + config.util.getEnv('NODE_ENV'));

    app.use(cors());
    app.use(express.static(__dirname + '/public'));
    var port = parseInt(config.get("server.port"), 10) || 5000;
    app.set("port", port);
    app.use(Middlewares.configuration);
    
    app.listen(port,config.get("Domain.host"), () => {
        console.log("Node app is running at "+config.get("Domain.host")+":" + port);
       
    });

    module.exports = app;