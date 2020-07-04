import * as examples from ".";
import * as mongoose from "mongoose";

// Documents are the return type of mongoose functions
// we need to merge their declation with our own interfaces.
//
// It is with documents that we can update the database easely.
export interface IExampleDocument extends examples.IExample, mongoose.Document {}
