import * as mongoose from "mongoose";
import * as examples from ".";

// Schemas describe what gets saved to the database and ressemble closely our interfaces.
const schema = new mongoose.Schema({
    name: {
        user: {
            // Types passed in schemas start by a capital letter.
            type: String,
            unique: true,
        },
        nick: { type: String, required: true },
    },
});

// Contains methods that can be run on the "db" object (when they are static)
// or on the "document" object (when they are not)
class ExampleDbMethodsAndStatics {
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

schema.loadClass(ExampleDbMethodsAndStatics);

// Models simply are objects used to interact with the database collection.
// Interactions such as queries, mass updates, mass deletions and aggregations

export const db = mongoose.model<examples.IExampleDocument>("examples", schema);
