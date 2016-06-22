/**
 * Created by waqar on 10/5/16.
 */
import express = require("express");
import Bearer = require('passport-http-bearer');
var BearerStrategy = Bearer.Strategy;
class TestStrategy extends BearerStrategy {
    public name: string = 'bearer';
    constructor(bearerFunction) {
        super(bearerFunction);
    }
    authenticate(req: express.Request) {}
}
Object.seal(TestStrategy);
export = TestStrategy;