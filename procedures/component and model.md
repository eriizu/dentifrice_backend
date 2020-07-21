# Procedure to create a component with a data model

# 0. Create a directory

- Create a directory under `src/components/` and give it the name of your compenent.

Component names are often plural.

- Create an empty `.auto-index` file in the new folder. This will enable you to run `yarn auto-index` to update the index of your directory.

- It is a good practice to run this command everytime your create a file in a directory that contains a `.auto-index` file.

# 1. Create the model definition

- Create a new `.ts` file bearing the name of your component, capitalised. For instance, the "examples" components would have it's model definition called `Example.ts`.

- Import the basic decorators from `typegoose` :
```ts
import {
    prop,
    modelOptions,
    getModelForClass,
} from "@typegoose/typegoose";
```
If you need more decorators or anything else related to modeling, you can refer to [typegoose's documentation](https://typegoose.github.io/typegoose/docs/guides/all-decorators).

- Create the model class and give it the same name as your file (without the extension):

```ts
@modelOptions({ schemaOptions: { timestamps: true } })
// Main class of the file, the "Example" entity model.
export class Example {
    @prop({ required: true })
    tag!: number;

    @prop()
    name: string;

    print() {
        console.log(this.tag + this?.name);
    }
}
```

This example sets two properties : "tag" which is required, and "name" which isn't.

It also sets a document method, which, when called, displays "tag" and "name" onto the console.

# 2. Generate the model

Add the following line, by replacing "Example" with the name of your class.

```ts
export const model = getModelForClass(Example);
```

# Profit!

Now that we have a "model" we can make db request on our "examples"!

Here is an example of creating a document, saving it, and then "finding" a list of document from the db, that should contain the newly created one.

```ts
import * as examples from ".";
import * as assert from "assert";

let someRequests = async () => {
    try {
        let exampleDocument = new examples.model({ tag: 12, name: "toto" });
        await exampleDocument.save();
    } catch (err) {
        console.error("failed to create", err);
    }

    try {
        let docs = await examples.model.find({});

        assert(docs.length);

        console.log(docs[0].tag);
        console.log(docs[0].name);
    } catch (err) {
        console.error("failed to find", err);
    }
};
someRequests();
```
