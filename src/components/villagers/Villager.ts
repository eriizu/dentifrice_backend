import { prop, Ref, isDocument, modelOptions, getModelForClass, index } from "@typegoose/typegoose";
// import objec
import HttpError from "../../HttpError";
import * as assert from "assert";
import * as users from "../users";

class FieldPerLanguage {
    @prop({ unique: true, required: true, index: true })
    fr: string;

    @prop({ unique: true })
    en?: string;

    @prop({ unique: true })
    jp?: string;
}

@modelOptions({ schemaOptions: { timestamps: true } })
@index(
    {
        "name.fr": "text",
        "name.en": "text",
        "name.jp": "text",
        catchPhrase: "text",
        quote: "text",
        species: "text",
    },
    {
        weights: {
            "name.fr": 10,
            "name.en": 5,
            "name.jp": 5,
            species: 5,
            catchPhrase: 1,
            quote: 1,
        },
        default_language: "fr",
    }
)
export class Villager {
    @prop({ _id: false })
    name: FieldPerLanguage;

    @prop()
    catchPhrase?: string;

    @prop()
    quote?: string;

    @prop()
    image?: string;

    @prop({ index: true })
    species?: string;
}

export const model = getModelForClass(Villager);
