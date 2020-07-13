import * as mongoose from "mongoose";
import * as examples from ".";

// Schemas describe what gets saved to the database and ressemble closely our interfaces.
const schema = new mongoose.Schema({
    foo: {
        bar: {
            // Types passed in schemas start by a capital letter.
            type: String,
            unique: true,
        },
    },
    toto: { type: Number },
});

// Contains methods that can be run on the "db" object (when they are static)
// or on the "document" object (when they are not)
class ExampleDbMethodsAndStatics {
    // Methods prototypes need to be added to the Docuement interface
    public changeToto(this: examples.IExampleDocument, val: number) {
        this.toto = val;
    }

    // Getters and setters need to be added to the Docuement interface as fields/variables
    set "foo.bar"(val: string) {
        // Horrible contraption that we have to use in setters and getters
        ((this as any) as examples.IExampleDocument).foo.bar = val;
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
