import {
    prop,
    Ref,
    isDocument,
    modelOptions,
    plugin,
    getModelForClass,
    ReturnModelType,
    queryMethod,
    DocumentType,
} from "@typegoose/typegoose";
// import objec
import HttpError from "../../HttpError";
import * as assert from "assert";
import * as users from "../users";
import * as villagers from "../villagers";

export type State = "RESIDENT" | "MOVE_INTENTION" | "MOVING" | "MOVED" | "CANCELED";

@modelOptions({ schemaOptions: { timestamps: true } })
export class VillagerListing {
    @prop({ ref: "User", autopopulate: true })
    author: Ref<users.User>;

    @prop({ autopopulate: true, ref: "Villager" })
    villager: Ref<villagers.Villager>;

    @prop()
    state: State;

    async test(this: DocumentType<VillagerListing>) {
        if (isDocument(this.author)) {
            console.log(this.author.discord.id);
        } else {
            await this.populate("author").execPopulate();
            //     console.log(this.author.toHexString());
        }
    }
}
