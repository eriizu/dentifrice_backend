import * as express from "express";

export const router = express.Router();

// This function is meant for use at the top level
// and loads the routes of this component onto the main
// app.
export function useRouter(app: express.Application, scope: string = "users") {
    app.use(scope, router);
}
