import { list } from "./list";
import * as express from "express";
import { Context } from "..";

export const addContext: express.Handler = function (req, _res, next) {
    req.context = new Context();
    console.log("DEBUG added context");
    next();
};

list.push(addContext);
