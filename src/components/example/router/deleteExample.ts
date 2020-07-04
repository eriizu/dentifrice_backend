import { router } from ".";
import * as examples from "..";
import * as mongoose from "mongoose";

router.delete("/:id", async (req, res) => {
    let id: mongoose.Types.ObjectId;
    try {
        id = mongoose.Types.ObjectId(req.params["id"]);
    } catch {
        res.sendStatus(400);
        return;
    }

    // Try and find by ID. If nothing is found, return 404.
    try {
        let result = await examples.db.deleteOne(id);
        if (result.n == 0) {
            res.sendStatus(404);
        } else if (result.deletedCount == 0) {
            // If one document was found but none was deleted,
            // there is probably a conflict.
            // Should rarely occur.
            res.sendStatus(409);
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        // Errrors are treated as "500" for now, but is not ideal.
        console.error(err);
        res.status(500).send(err);
    }
});
