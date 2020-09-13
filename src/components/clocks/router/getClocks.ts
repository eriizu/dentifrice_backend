import { routesToApply } from "./router";
import * as express from "express";
import * as clocks from "..";

import HttpError from "../../../HttpError";

let handler: express.Handler = async (req, res) => {
    let textq = req.query["q"];
    let builder = {};

    if (textq instanceof Array) {
        textq.join(" ");
    }
    if (typeof textq == "string") {
        console.log(textq);
        builder["$text"] = { $search: textq, $language: "fr" };
    } else if (textq) {
        throw new HttpError(400, `"q" query parameter could not be parsed.`);
    }

    if (req.query["author"]) {
        builder["author"] = req.query.author;
    } else {
        builder["author"] = req.context.author;
    }

    let query = clocks.model.find(builder);

    req.applyQueryParam(query);

    res.send(await query);
};

// let handler: express.Handler = async (req, res, next) => {

//     try {

//     } catch (err) {
//         next(err);
//     }
// };

routesToApply.push((router) => {
    // middlewares would be added here, before "handler"
    router.get("/", handler);
});
