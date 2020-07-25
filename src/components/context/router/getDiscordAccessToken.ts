import { router } from "./router";
import * as discord from "discord.js";
import * as bent from "bent";

import * as formurlencoded from "form-urlencoded";

const CLIENT_ID = "676485112564678657";
const CLIENT_SECRET = "u_miBePm9g7z8zyW57qd9jInDRsIXLdI";
const REDIRECT = "http://localhost:3000/login";

router.get("/discord/access_token", async (req, res) => {
    if (req.query.code) {
        const form = {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: "authorization_code",
            redirect_uri: REDIRECT,
            code: req.query.code,
        };

        console.log(formurlencoded);
        const encoded_form = formurlencoded.default(form);
        console.log(encodeURIComponent);

        const post = bent("POST", "json");
        let result = await post("https://discord.com/api/v6/oauth2/token", encoded_form, {
            "Content-Type": "application/x-www-form-urlencoded",
        });
        res.send(result);
    }
});
