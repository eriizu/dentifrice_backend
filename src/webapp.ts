import * as express from "express";
import * as http from "http";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import components from "./loadList";

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
        this.express.use(cors({ origin: "http://localhost:3000" }));
        this.express.options("*", cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        components?.forEach((comp) => {
            comp?.middlewares?.forEach((midware) => {
                this.express.use(midware);
            });
            // this.express.use(comp.);
        });
    }

    loadRoutes() {
        components?.forEach((comp) => {
            if (comp?.useRouter) {
                console.log("about to use");
                comp.useRouter(this.express);
            }
        });
    }
}
