import * as express from "express";
import { DocumentQuery } from "mongoose";

function applyQueryParam(this: express.Request, dbQuery: DocumentQuery<any, any>) {
    let limit = 20;
    let page = 0;

    try {
        if (typeof this.query["limit"] == "string") {
            limit = parseInt(this.query["limit"]);
        }
    } catch (err) {
        console.warn("Context::applyQueryParam limit error", err);
    }

    try {
        if (typeof this.query["page"] == "string") {
            page = parseInt(this.query["page"]);
        }
    } catch (err) {
        console.warn("Context::applyQueryParam page error", err);
    }

    dbQuery.limit(limit).skip(page * limit);

    if (this.query["select"] instanceof Array) {
        this.query["select"] = this.query["select"].join(" ");
    }

    if (typeof this.query["select"] == "string") {
        dbQuery.select(this.query["select"]);
    }
}

/**
 * Global middleware that adds a context to requests.
 */
export const addApplyQueryParams: express.Handler = function (req, _res, next) {
    req.applyQueryParam = applyQueryParam;
    next();
};
