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

export enum State {
    Activated = 1,
    Deactivated = 2,
    Banned = 3,
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
     * Is the user activated or not?
     */
    @prop({ required: true, default: State.Activated })
    state!: State;

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

    /**
     * Creates a user in DB for the logged in discord user.
     * @param this the user ODM model
     * @param client discord client connected as the user to create in our DB.
     */
    static async createFromDiscordClient(this: typeof model, client: discord.Client) {
        // let user = new model({
        //     discord: {
        //         id: client.user.id,
        //         tag: client.user.tag,
        //         username: client.user.username,
        //         avatar: client.user.avatar,
        //     },
        // } as Partial<DocumentType<User>>);
        // user = await user.save();
        // console.log("created a user: ", user.discord.username);
        // return user;
    }

    /**
     * Updates and saves the user, using the provided logged in discord client.
     * @param this a user document
     * @param client the discord client, logged in as the user we are updating
     */
    async updateFromDiscordClient(this: DocumentType<User>, client: discord.Client) {
        // this.set({
        //     discord: {
        //         id: client.user.id,
        //         tag: client.user.tag,
        //         username: client.user.username,
        //         avatar: client.user.avatar,
        //     },
        // } as Partial<DocumentType<User>>);
        // let user = await this.save();
        // console.log("updated a user: ", this.discord.username);
        // return user;
    }
}

// This produces the model, which is the object to use when queriying the database.
// export const model = getModelForClass<typeof User, queryHelpers.IQueryHelpers>(User);
export const model = getModelForClass(User);
