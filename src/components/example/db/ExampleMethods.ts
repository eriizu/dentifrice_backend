import * as mongoose from "mongoose";
import * as examples from "..";

export default class ExampleMethods {
    // Methods prototypes need to be added to the Docuement interface
    public lock(this: examples.IExampleDocument, lock: boolean) {
        this.lock = lock;
    }

    // Getters and setters need to be added to the Docuement interface as fields/variables
    set(this: examples.IExampleDocument, password: string) {
        // Obviously an example
        this.hash = password;
    }

    // Static function prototypes need to be added to the Db interface
    public static async findByDiscordId(this: examples.IExampleDb, discordId: string) {
        await this.findOne({ discordId });
    }
}
