import { routesToApply } from "./router";
import * as express from "express";
import * as villagers from "..";
import HttpError from "../../../HttpError";

let handler: express.Handler = async (req, res) => {
    let results: string[] = await villagers.model.distinct("species");

    res.send(results);
};

routesToApply.push((router) => {
    // middlewares would be added here, before "handler"
    router.get("/species", handler);
});
