import * as mongoose from "mongoose";
import * as users from "..";
import UserMethods from "./UserMethods";

// Schemas describe what gets saved to the database and ressemble closely our interfaces.
const schema = new mongoose.Schema({
    name: { user: { type: String }, nick: { type: String } },
    discordId: { type: String, unique: true },
    profile: { picture: { type: String }, bio: { type: String } },
});

schema.loadClass(UserMethods);

// Models simply are objects used to interact with the database collection.
// Interactions such as queries, mass updates, mass deletions and aggregations

export const db = mongoose.model<users.IUserDocument>("users", schema);
