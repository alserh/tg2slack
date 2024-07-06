function standardTextMessageBody(slackChannelId, headerText, who, buttonLink, messageText) {
    return {
        "channel": `${slackChannelId}`,
        "blocks": [
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `${headerText} *${who}*`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Open Telegram", /* TODO use a link that leads to source author or to a sourse grp! */
                        "emoji": true
                    },
                    "url": `${buttonLink}`
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `${messageText}`
                }

            }
        ]
    };
}

module.exports = { standardTextMessageBody };