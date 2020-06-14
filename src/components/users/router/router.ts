import * as express from "express";

export const router = express.Router();

export function useRouter(app: express.Application, scope: string = "users") {
    app.use(scope, router);
}
