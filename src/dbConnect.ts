import * as mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = new MongoMemoryServer();

export async function memoryDbConnect() {
    let mongoUri = await mongoServer.getUri();
    const mongooseOpts = {
        // options for mongoose 4.11.3 and above
        // autoReconnect: true,
        // reconnectTries: Number.MAX_VALUE,
        // reconnectInterval: 1000,
        serverSelectionTimeoutMS: 1000,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        // useMongoClient: true, // remove this line if you use mongoose 5 and above
    };

    let odm = await mongoose.connect(mongoUri, mongooseOpts);
    console.log(`(await) MongoDB successfully connected to ${mongoUri}`);

    mongoose.connection.on("error", (e) => {
        if (e.message.code === "ETIMEDOUT") {
            console.log(e);
            mongoose.connect(mongoUri, mongooseOpts);
        }
        console.log(e);
    });

    mongoose.connection.once("open", () => {
        console.log(`(once open) MongoDB successfully connected to ${mongoUri}`);
    });
    return odm;
}

export async function dbConnect(uri: string = process.env.MONGO_URL) {
    if (!uri) uri = `mongodb://root:example@localhost/citrouille`;
    try {
        let odm = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log("Mongodb connection established to: " + uri);
        return odm;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to connect to MongoDB");
    }
}

export default dbConnect;
