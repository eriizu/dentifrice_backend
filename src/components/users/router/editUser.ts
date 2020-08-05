import { routesToApply } from "./router";
import * as users from "..";
import * as mongoose from "mongoose";
import * as express from "express";
import * as context from "../../context";

let handler: express.Handler = async (req, res) => {
    let id: mongoose.Types.ObjectId;
    try {
        id = mongoose.Types.ObjectId(req.params["id"]);
    } catch {
        res.sendStatus(400);
        return;
    }

    try {
        let user = await users.model.updateOne({ _id: id }, req.body);
        if (!user) {
            res.sendStatus(404);
        } else {
            res.send(user);
        }
    } catch (err) {
        // Errrors are treated as "500" for now, but is not ideal.
        console.error(err);
        res.status(500).send(err);
    }
};

routesToApply.push((router) => {
    router.put(
        "/:id",
        context.middlewares.isAuthentificated,
        context.middlewares.isAdmin,
        context.middlewares.self,
        handler
    );
});
