import * as express from "express";

export const routesToApply: ((router: express.Router) => void)[] = [];

// This function is meant for use at the top level
// and loads the routes of this component onto the main
// app.
export function useRouter(app: express.Application, scope: string = "/examples") {
    const router = express.Router();
    routesToApply.forEach((apply) => {
        apply(router);
    });
    app.use(scope, router);
}
