import { router } from ".";
import * as examples from "..";
import * as mongoose from "mongoose";

router.put("/:id", async (req, res) => {
    let id: mongoose.Types.ObjectId;
    try {
        id = mongoose.Types.ObjectId(req.params["id"]);
    } catch {
        res.sendStatus(400);
        return;
    }

    // This simply tries to set recived body onto the document,
    // but the body should be checked for what actually can be edited.
    // Same goes for the requesting user: it should be check that the
    // document is theirs or
    try {
        let example = await examples.model.updateOne({ _id: id }, req.body);
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
