import * as express from "express";

let handler: express.Handler = async (req, res) => {
    res.send({ example: "foo bar" });
};

export function apply(router: express.Router) {
    // middlewares would be added here, before "handler"
    router.get("/:id", handler);
}
