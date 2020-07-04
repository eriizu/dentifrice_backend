import { router } from ".";
import * as examples from "..";
import * as mongoose from "mongoose";

router.post("/", async (req, res) => {
    try {
        // Creates a document, without saving it yet.
        let newDoc = new examples.db(req.body);

        // If document has a field referencing its creator or owner:
        // add the creator's id to the field.

        // Save the new docuemnt
        newDoc = await newDoc.save();

        res.status(201).send(newDoc);
    } catch (err) {
        // Errrors are treated as "500" for now, but is not ideal.
        // Espacially for validation errors, which should mostly produce "400".
        console.error(err);
        res.status(500).send(err);
    }
});