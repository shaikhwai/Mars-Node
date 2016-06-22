import express = require("express");
interface ReadInterceptor {
    retrieve: express.RequestHandler;
    findById: express.RequestHandler;
    
    
}
export = ReadInterceptor;