import { router } from ".";
import * as examples from "..";
import * as mongoose from "mongoose";

router.get("/:id", async (req, res) => {
    // When getting by ID, ensure that we can construct an ObjectId with the param.
    // Otherwise send status 400, indicating a missing or erroneous param to the client.
    let id: mongoose.Types.ObjectId;
    try {
        id = mongoose.Types.ObjectId(req.params["id"]);
    } catch {
        res.sendStatus(400);
        return;
    }

    // Try and find by ID. If nothing is found, return 404.
    try {
        let example = await examples.db.findById(id);
        if (!example) {
            res.sendStatus(404);
        } else {
            res.send(example);
        }
    } catch (err) {
        // Errrors are treated as "500" for now, but is not ideal.
        console.error(err);
        res.status(500).send(err);
    }
});
