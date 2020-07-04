import * as mongoose from "mongoose";
import * as examples from ".";

export interface IExampleDb extends mongoose.Model<examples.IExampleDocument> {}
