import { router } from "./router";
import * as bent from "bent";
import * as assert from "assert";
import * as users from "../../users";

import * as formurlencoded from "form-urlencoded";

const CLIENT_ID = "676485112564678657";
const CLIENT_SECRET = process.env.CLIENT_SECRET;
assert(
    CLIENT_SECRET,
    'Client secret needs to be added to the process\' environment as "CLIENT_SECRET"'
);
const REDIRECT = "http://localhost:3000/login";

async function postLogin(result: bent.Json) {
    let credentials: { access_token: string } = result as any;
    try {
        let user = await users.model.ensureByAccessToken(credentials.access_token as string);
        assert(user);
    } catch (err) {
        console.error("failed to ensure user after loggin.");
        console.error(err);
    }
}

interface ITokenRequest {
    client_id: string;
    client_secret: string;
    grant_type: "authorization_code" | "refresh_token";
    redirect_uri: string;
    refresh_token?: string;
    code?: string;
}

router.get("/discord/access_token", async (req, res) => {
    let form: ITokenRequest = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: null,
        redirect_uri: REDIRECT,
    };

    if (typeof req?.query?.code === "string") {
        form.grant_type = "authorization_code";
        form.code = req.query.code;
    } else if (typeof req?.query?.refresh_token === "string") {
        form.grant_type = "refresh_token";
        form.refresh_token = req.query.refresh_token;
    }
    if (form.grant_type && (form.code || form.refresh_token))
        try {
            const encoded_form = formurlencoded.default(form);

            const post = bent("POST", "json");
            let result = await post("https://discord.com/api/v6/oauth2/token", encoded_form, {
                "Content-Type": "application/x-www-form-urlencoded",
            });
            res.send(result);
            await postLogin(result);
        } catch (err) {
            console.error("Failed to request token");
            console.error(err);
        }
});
