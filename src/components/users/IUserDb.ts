import * as mongoose from "mongoose";
import * as users from ".";

export interface IUserDb extends mongoose.Model<users.IUserDocument> {}
