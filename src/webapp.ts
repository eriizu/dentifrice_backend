import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";

import components from "./genericComponents";

export default class webapp {
    public express = express();
    public server: http.Server;

    constructor(port: number = parseInt(process.env.API_PORT)) {
        this.loadMiddleware();
        this.loadRoutes();
        this.server = this.express.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    }

    loadMiddleware() {
        this.express.use(bodyParser.json);
        this.express.use(bodyParser.urlencoded);
        components.forEach((comp) => {
            this.express.use(comp.routes);
        });
    }

    loadRoutes() {
        components.forEach((comp) => {
            this.express.use(comp.routes);
        });
    }
}
