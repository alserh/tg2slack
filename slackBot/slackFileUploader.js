require("dotenv").config();
const { App } = require("@slack/bolt");
const { settings } = require("../settings");
const { standardTextMessageBody } = require("./slackMessageStructures");

const channel_id = process.env.SLACK_TEST_CHANNEL_ID;
const app = new App({
    token: process.env.SLACK_API_TOKEN,
    signingSecret: process.env.SLACK_SIGNIN_SECRET
});


async function captionSender(ctx) {
    const who = ctx.update.message.from.last_name ? ctx.update.message.from.first_name + " " + ctx.update.message.from.last_name : ctx.update.message.from.first_name;
    const text = ctx.update.message.caption ? ctx.update.message.caption : " ";
    try {
        app.client.chat.postMessage(
            standardTextMessageBody(channel_id, settings.body_header_text, who, settings.tg_link, text)
        );
    } catch (e) {
        console.error(e);
    }
}

async function uploadFile(file, filename) {
    try {
        const result = await app.client.files.uploadV2(
            { channel_id, file, filename }
        );
        console.log(result.files);
    } catch (e) {
        console.error(e);
    }
}

module.exports = { uploadFile, captionSender };