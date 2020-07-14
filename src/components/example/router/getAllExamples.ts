import { router } from ".";
import * as examples from "..";
import * as mongoose from "mongoose";

router.get("/", async (_req, res) => {
    try {
        // Find with not parameters will get all entries
        let example_list = await examples.model.find();
        if (!example_list) {
            res.sendStatus(404);
        } else {
            res.send(example_list);
        }
    } catch (err) {
        // Errrors are treated as "500" for now, but is not ideal.
        console.error(err);
        res.status(500).send(err);
    }
});
