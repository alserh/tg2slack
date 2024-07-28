require("dotenv").config();
const { createHmac, timingSafeEqual } = require("crypto");

const slackSigninSecret = process.env.SLACK_SIGNIN_SECRET;

function slackVerifyKey(req) {
    const timestamp = req.headers["x-slack-request-timestamp"];
    const slackSignature = req.headers["x-slack-signature"];
    const body = req.body.toString();
    const baseString = "v0:" + timestamp + ":" + body;

    const curSig = "v0=" + createHmac("SHA256", slackSigninSecret).update(baseString).digest("hex");

    const curSigBuffer = Buffer.from(curSig);
    const slackSignatureBuffer = Buffer.from(slackSignature);

    return timingSafeEqual(curSigBuffer, slackSignatureBuffer);
}

module.exports = { slackVerifyKey };