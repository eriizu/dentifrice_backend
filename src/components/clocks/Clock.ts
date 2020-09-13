import {
    prop,
    modelOptions,
    getModelForClass,
    ReturnModelType,
    queryMethod,
    Ref,
    index,
} from "@typegoose/typegoose";
import * as users from "../users";
import * as mongoose from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true } })
@index({ name: "text" })
// This is how we enable query helpers.
// Main class of the file, the "Example" entity model.
export class Clock {
    @prop({ required: true })
    count: "UP" | "DOWN";

    @prop({ required: true })
    name!: string;

    @prop()
    start: Date;

    @prop()
    end: Date;

    @prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    author!: Ref<users.User>;
}

// This produces the model, which is the object to use when queriying the database.
export const model = getModelForClass(Clock);
