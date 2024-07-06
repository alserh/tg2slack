/* eslint-disable no-undef */
require("node-fetch");
const { settings } = require("./settings");
require("dotenv").config();

const slackChannelId = process.env.SLACK_TEST_CHANNEL_ID;
const slackToken = process.env.SLACK_API_TOKEN;

function slackPostMessage(ctx) {
    const who = ctx.update.message.from.last_name ? ctx.update.message.from.first_name + " " + ctx.update.message.from.last_name : ctx.update.message.from.first_name
    const text = ctx.update.message.text ? ctx.update.message.text : "Looks like we got a file. Please refer to the original channel"
    const body = {
        "channel": `${slackChannelId}`,
        "blocks": [
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `${settings.body_header_text} *${who}*`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Open Telegram", /* TODO use a link that leads to source author or to a source grp! */
                        "emoji": true
                    },
                    "url": `${settings.tg_link}`
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `${text}`
                }


            }]
    }

    fetch("https://slack.com/api/chat.postMessage", {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${slackToken}`
        },
    })
        // .then(res => res.json())
        // .then(json => console.log(json));
}

module.exports = { slackPostMessage };



