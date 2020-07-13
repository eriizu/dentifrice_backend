import * as express from "express";
import * as bodyParser from "body-parser";

let webApp = express();

import * as example from "./components/example";

let components = [{ middlewares: example.middleware || null, routes: example.router }];

let loadMiddleware = () => {
    webApp.use(bodyParser.json);
    webApp.use(bodyParser.urlencoded);
};
loadMiddleware();

let loadRoutes = () => {
    // webApp.use
};
