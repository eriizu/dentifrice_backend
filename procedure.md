# Procedure to implement a component

# 0. Create a directory

Create a directory under `src/components/` and give it the name of your compenent.

Component names are often plural.

Create an empty `.auto-index` file in the new folder. This will enable you to run `yarn auto-index` to update the index of your directory.

It is a good practice to run this command everytime your create a file in a directory that contains a `.auto-index` file.

# 1. Create main type definition

This will contain the fields you expect to have on your new type. For users it might be things like their name, nickname, password hash or role.

Create an interface `IComponent` in a new file called something like `IComponent.ts`, except it should use your component's name.

```ts
export interface IExample {
    name: {
        // mandatory name.user field
        user: string;
        // optional name.nick field
        nick?: string;
    };
}
```

If you need to create enums, you would put them in the same file.

# 2. Create the schema definition

The schema is used by mongoose (our database manager) so it knows what fields to send to the database.

It can be used to mark a field as "unique" accross the entire collection (meaning that only one document can bear a given value.) Or to set mandatory fields, without which, the document won't be sent to the database.

Create the schema defintion in a `ComponentDb.ts` file.

```ts
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

export const db = mongoose.model<examples.IExampleDocument>("examples", schema);
```

Details about how to declare a schema can be found here: https://mongoosejs.com/docs/guide.html and here: https://mongoosejs.com/docs/schematypes.html

You may have noticed the `IExampleDocument` interface, mentioned in the last line. It tells mongoose, what type of object shall it return during database related operations. We will now declare that object.

# 3. The document interface

Whenever we store something to the database, this "something" is called a "document". When we query the database, it will return exactly that: a document. And so we need an interface to work with them properly.

Let's create a new file in our component's folder: `IComponentDocument.ts` with the following contents.

```ts
export interface IExampleDocument extends examples.IExample, mongoose.Document {}
```

It merges our component's interface with mongoose's document interface. If we had declared methods on our schema: we would have declared their signature here, so we can use them accross the project.

> Don't forget to run `yarn auto-index` so that your index file is up to date.
