import Webapp from "./webapp";
import dbConnect, { memoryDbConnect } from "./dbConnect";
import * as mongoose from "mongoose";
import * as assert from "assert";
import seed from "./components/villagers/seed";

async function start() {
    let app: Webapp;
    try {
        app = new Webapp(9000);
    } catch (err) {
        console.error("failed to start server");
        console.error(err);
        process.exit(1);
    }

    let odm: typeof mongoose;
    try {
        if (process.env.TEST == "1") {
            odm = await memoryDbConnect();
        } else {
            odm = await dbConnect();
        }
        assert(odm.connection.readyState === 1);
    } catch (err) {
        console.error("failed to start Object-Data Mapper and database connection.");
        console.error(err);
        app.server.close();
        process.exit(1);
    }
}
start();
seed();
