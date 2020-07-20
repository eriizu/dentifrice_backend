export class Context {
    public loggedIn: boolean;
}

declare global {
    namespace Express {
        interface Request {
            context: Context;
        }
    }
}
