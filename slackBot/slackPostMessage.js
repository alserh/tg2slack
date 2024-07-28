require("node-fetch");
require("dotenv").config();
const { settings } = require("../settings");
const { standardTextMessageBody, editedTextMessageBody } = require("./slackMessageStructures");

const slackChannelId = process.env.SLACK_TEST_CHANNEL_ID;
const slackToken = process.env.SLACK_API_TOKEN;

function slackPostMessage(processedBody, edited = false) {
    const who = processedBody.from.last_name ? processedBody.from.first_name + " " + processedBody.from.last_name : processedBody.from.first_name;
    const text = processedBody.text;
    edited === false 
        ? body = standardTextMessageBody(slackChannelId, settings.body_header_text, who, settings.tg_link, text)
        : body = editedTextMessageBody(slackChannelId, settings.body_header_text, who, settings.tg_link, text);

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



