    /// <reference path="../../../typings/tsd.d.ts" />

    import Mongoose = require("mongoose");
    import config = require("config");
    
    class DataAccess {
        static mongooseInstance: any;
        static mongooseConnection: Mongoose.Connection;

        
        constructor () {
            DataAccess.connect();
        }
        
        static connect (): Mongoose.Connection {
            if(this.mongooseInstance) return this.mongooseInstance;
            
            this.mongooseConnection  = Mongoose.connection;
            this.mongooseConnection.once("open", () => {
                console.log("Connected to mongodb.");
            });
            var host = config.get("database.host");
            var port = config.get("database.port");
            var dbName = config.get("database.name");
            console.log("Using Database: Host: %s | Port: %s | Name: %s", host, port, dbName);
            /*connection = mongoose.connect('mongodb://' + host + ':' + port + '/' + dbName);*/
           this.mongooseInstance = Mongoose.connect('mongodb://' + host + ':' + port + '/' + dbName);
           return this.mongooseInstance;
        }
        
    }
    
    DataAccess.connect();
    export = DataAccess;
     