import { routesToApply } from "./router";
import * as express from "express";

let handler: express.Handler = async (req, res) => {
    res.send({ example: "foo bar" });
};

routesToApply.push((router) => {
    // middlewares would be added here, before "handler"
    router.get("/:id", handler);
});
