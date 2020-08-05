import * as express from "express";

/**
 * Global middleware that replaces occurences of "self" by author id.
 */
export const self: express.Handler = async function (req, _res, next) {
    if (req?.context?.author) {
        for (let paramName in req.params) {
            if (req.params[paramName] == "self") {
                req.params[paramName] = req.context.author._id;
            }
        }
    }
    next();
};
