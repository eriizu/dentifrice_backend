import { routesToApply } from "./router";
import * as users from "..";
import * as express from "express";
import * as context from "../../context";

let handler: express.Handler = async (_req, res) => {
    try {
        // Find with not parameters will get all entries
        let user_list = await users.model.find();
        if (!user_list) {
            res.sendStatus(404);
        } else {
            res.send(user_list);
        }
    } catch (err) {
        // Errrors are treated as "500" for now, but is not ideal.
        console.error(err);
        res.status(500).send(err);
    }
};

routesToApply.push((router) => {
    router.get(/\/$/, context.middlewares.isAuthentificated, context.middlewares.isAdmin, handler);
});
