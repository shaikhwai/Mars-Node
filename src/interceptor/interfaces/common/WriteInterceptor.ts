import express = require("express");
interface WriteInterceptor {
    create: express.RequestHandler;
    update: express.RequestHandler;
    delete: express.RequestHandler;
    
}

export = WriteInterceptor;