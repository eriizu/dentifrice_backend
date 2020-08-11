import { DocumentType } from "@typegoose/typegoose";
import * as users from "../users";
import * as express from "express";
import { DocumentQuery } from "mongoose";

export class Context {
    public author?: DocumentType<users.User>;
}

declare global {
    namespace Express {
        interface Request {
            context: Context;
            applyQueryParam: (dbQuery: DocumentQuery<any, any>) => void;
        }
    }
}
