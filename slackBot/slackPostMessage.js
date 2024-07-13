/* eslint-disable no-undef */
require("node-fetch");
require("dotenv").config();
const { settings } = require("../settings");
const { standardTextMessageBody } = require("./slackMessageStructures");

const slackChannelId = process.env.SLACK_TEST_CHANNEL_ID;
const slackToken = process.env.SLACK_API_TOKEN;

function slackPostMessage(ctx) {
    const who = ctx.update.message.from.last_name ? ctx.update.message.from.first_name + " " + ctx.update.message.from.last_name : ctx.update.message.from.first_name;
    const text = ctx.update.message.text;
    const body = standardTextMessageBody(slackChannelId, settings.body_header_text, who, settings.tg_link, text);

    fetch("https://slack.com/api/chat.postMessage", {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${slackToken}`
        },
    });
}

module.exports = { slackPostMessage };



