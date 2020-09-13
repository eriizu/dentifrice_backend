import { list } from "./list";
import * as express from "express";

declare global {
    namespace Express {
        interface Request {
            tata: string;
        }
    }
}

export const tata: express.Handler = function (req, _res, next) {
    req.tata = "tata";
    next();
};

list.push(tata);
