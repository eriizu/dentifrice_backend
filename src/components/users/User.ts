import {
    prop,
    modelOptions,
    getModelForClass,
    ReturnModelType,
    queryMethod,
    DocumentType,
} from "@typegoose/typegoose";
import * as bent from "bent";
import HttpError from "../../HttpError";
import * as assert from "assert";
import * as discord from "discord.js";

export class DiscordUser {
    @prop({ unique: true, required: true, index: true })
    id!: string;

    @prop({ required: true })
    username!: string;

    @prop({ required: true })
    discriminator!: string;

    @prop()
    avatar?: string;

    @prop()
    locale?: string;
}

@modelOptions({ schemaOptions: { timestamps: true } })
// @queryMethod(queryHelpers.findByTag)
export class User {
    /**
     * Cached fields synchronised from the discord API.
     */
    @prop({ _id: false, required: true })
    discord!: DiscordUser;

    /**
     * Has the user admin priviledges?
     */
    @prop({ required: true, default: false })
    admin!: boolean;

    private static async getDiscordUser(this: typeof model, access_token: string) {
        let response: DiscordUser;

        try {
            let authorizedRequest = bent("https://discord.com/api/v6", "json", {
                Authorization: `Bearer ${access_token}`,
            });
            response = (await authorizedRequest("/users/@me")) as any;
        } catch (err) {
            console.warn(err);
            if (err.statusCode === 401) {
                throw new HttpError(
                    401,
                    "Invalid credentials. Consider refreshing or re-authentificating."
                );
            } else {
                throw new HttpError(
                    500,
                    `Error while requesting user infromation to discord. Got code : ${err.statusCode}.`
                );
            }
        }

        return response;
    }

    /**
     * Ensures that a user exists for the logged in user; creates it if necessary.
     * @param this the user ODM model
     * @param access_token discord auth access token
     */
    static async ensureByAccessToken(this: typeof model, access_token: string) {
        let discordUser = await this.getDiscordUser(access_token);
        return await this.ensureByDiscordUser(discordUser);
    }

    /**
     * Ensures that a user exists for the given discord user.
     * @param this the user ODM model
     * @param access_token discord auth access token
     */
    static async ensureByDiscordUser(this: typeof model, discordUser: DiscordUser) {
        let user: DocumentType<User>;

        try {
            user = await this.findOneAndUpdate(
                { "discord.id": discordUser.id },
                {
                    $set: {
                        "discord.username": discordUser.username,
                        "discord.discriminator": discordUser.discriminator,
                        "discord.avatar": discordUser.avatar,
                        "discord.locale": discordUser.locale,
                    },
                },
                { upsert: true, setDefaultsOnInsert: true, runValidators: true, new: true }
            );
            assert(user);
        } catch (err) {
            console.error("ensure user");
            console.error(err);
            throw new HttpError(
                500,
                "Failed to ensure the existence of the user in the database. The database may be out of order."
            );
        }
        return user;
    }
}

// This produces the model, which is the object to use when queriying the database.
// export const model = getModelForClass<typeof User, queryHelpers.IQueryHelpers>(User);
export const model = getModelForClass(User);
