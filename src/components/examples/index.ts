// Automatically generated index
export * from "./Example";
export * as middlewares from "./middlewares";
export * from "./router";

import * as examples from ".";
import * as assert from "assert";

let someRequests = async () => {
    try {
        let exampleDocument = new examples.model({ tag: 12, name: "toto" });
        await exampleDocument.save();
    } catch (err) {
        console.log("failed to create", err);
    }

    try {
        let docs = await examples.model.find({});

        assert(docs.length);

        console.log(docs[0].tag);
        // console.log(docs[0].name);
    } catch (err) {
        console.error("failed to find", err);
    }
};
someRequests();
