import * as mongoose from "mongoose";
import * as users from "..";

export default class UserMethods {
    // Methods prototypes need to be added to the Docuement interface
    public lock(this: users.IUserDocument, lock: boolean) {
        this.lock = lock;
    }

    // Getters and setters need to be added to the Docuement interface as fields/variables
    set(this: users.IUserDocument, password: string) {
        // Obviously an example
        this.hash = password;
    }

    // Static function prototypes need to be added to the Db interface
    public static async findByDiscordId(this: users.IUserDb, discordId: string) {
        await this.findOne({ discordId });
    }
}
