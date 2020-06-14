import { router } from ".";
import * as users from "..";
import * as mongoose from "mongoose";

router.get("/:id", async (req, res) => {
    // let id: mongoose.Types.ObjectId;
    // try {
    //     id = mongoose.Types.ObjectId(req.params["id"]);
    // } catch {
    //     // res.
    //     return;
    // }
    // try {
    //     let user = await users.db.findById(id);
    // } catch {}
});
