import * as express from "express";
import * as middlewares from ".";

export const list: express.Handler[] = [
    middlewares.addContext,
    middlewares.authorise,
    middlewares.self,
];

export function getGlobal(): express.Handler[] {
    return [middlewares.addContext, middlewares.authorise, middlewares.self];
}
