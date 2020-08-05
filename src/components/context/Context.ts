import { DocumentType } from "@typegoose/typegoose";
import * as users from "../users";

export class Context {
    public author?: DocumentType<users.User>;
}

declare global {
    namespace Express {
        interface Request {
            context: Context;
        }
    }
}
