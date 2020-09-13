import { routesToApply } from "./router";
import * as users from "..";
import * as mongoose from "mongoose";
import * as express from "express";
import * as context from "../../context";

let handler: express.Handler = async (req, res) => {
    let id: mongoose.Types.ObjectId;
    try {
        id = mongoose.Types.ObjectId(req.params["id"]);
    } catch (err) {
        res.sendStatus(400);
        return;
    }

    // Try and find by ID. If nothing is found, return 404.
    try {
        let user = await users.model.findById(id);
        if (!user) {
            res.sendStatus(404);
        } else {
            let dto: Partial<users.User> = user.toObject();
            if (req.context.author._id != id && !req.context.author.admin) {
                delete dto.admin, dto.discord.locale, dto.discord.id;
            }
            res.send(user);
        }
    } catch (err) {
        // Errrors are treated as "500" for now, but is not ideal.
        console.error(err);
        res.status(500).send(err);
    }
};

routesToApply.push((router) => {
    router.get("/:id", context.middlewares.isAuthentificated, context.middlewares.self, handler);
});
