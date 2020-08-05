import * as express from "express";
import * as users from "../../users";
import HttpError from "../../../HttpError";

/**
 * Global middleware to authorise requests.
 */
export const authorise: express.Handler = async function (req, _res, next) {
    try {
        if (req.context) {
            if (req?.headers?.authorization) {
                let splitAuth = req.headers.authorization.split(" ");
                let token = splitAuth[1];
                let user = await users.model.ensureByAccessToken(token);
                req.context.author = user;
                console.log(
                    `Authorised ${req.context.author.id} ${req.context.author.discord.username}`
                );
            } else {
                console.warn("no auth");
            }
        } else {
            throw new HttpError(500, "Context wasn't found when authorising.");
        }
    } catch (err) {
        next(err);
    }
    next();
};

/**
 * Non-global middleware, to check that request has been authorised.
 */
export const isAuthentificated: express.Handler = async function (req, _res, next) {
    if (req.context?.author) next();
    else next(new HttpError(401, "Authorisation missing on route marked to require it."));
};
