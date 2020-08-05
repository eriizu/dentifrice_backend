import * as express from "express";
import HttpError from "../../../HttpError";

/**
 * Global middleware that replaces occurences of "self" by author id.
 */
export const isAdmin: express.Handler = async function (req, _res, next) {
    if (req?.context?.author?.admin) {
        next();
    } else {
        next(new HttpError(403));
    }
};
