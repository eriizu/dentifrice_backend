import { routesToApply } from "./router";
import * as express from "express";
import * as clocks from "..";
import * as context from "../../context";
import HttpError from "../../../HttpError";

let handler: express.RequestHandler = async function (req, res, next) {
    try {
        let author = req?.context?.author;

        if (!author) throw new HttpError(500, "No author found.");

        let instance = new clocks.model(req.body);
        if (!instance.start && !instance.end) {
            throw new HttpError(400, "At least start or end needs to be filed.");
        }
        // TODO: voir s'il faut dépopulate
        instance.author = author;
        instance = await instance.save();

        res.send(instance.toObject({ versionKey: false }));
    } catch (err) {
        next(err);
    }
};

routesToApply.push((router) => {
    router.post("/", context.middlewares.isAuthentificated, handler);
});
