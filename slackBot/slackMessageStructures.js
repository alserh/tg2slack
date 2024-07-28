/**
 * Constructs a Slack message bodies using blocks system.
 * 
 * @param {string} slackChannelId - Slack channel ID.
 * @param {string} headerText - The header text of the message; denotes source channel.
 * @param {string} who - The name or identifier of the message sender.
 * @param {string} buttonLink - The URL for the button link -> TODO: make relevant.
 * @param {string} messageText - The main text of the message.
 * @returns {object} - The constructed message body.
 */

function standardTextMessageBody(slackChannelId, headerText, who, buttonLink, messageText) {
    return {
        channel: slackChannelId,
        blocks: [
            {
                type: "divider"
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `${headerText} *${who}*`
                },
                accessory: {
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Open Telegram",
                        emoji: true
                    },
                    url: buttonLink
                }
            },
            {
                type: "divider"
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: messageText
                }
            }
        ]
    };
}

function editedTextMessageBody(slackChannelId, headerText, who, buttonLink, messageText) {
    return {
        channel: slackChannelId,
        blocks: [
            {
                type: "divider"
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `${headerText} *${who}* :exclamation::exclamation::exclamation: *HAS EDITED A MESSAGE* :exclamation::exclamation::exclamation:` 
                },
                accessory: {
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Open Telegram",
                        emoji: true
                    },
                    url: buttonLink
                }
            },
            {
                type: "divider"
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: messageText
                }
            }
        ]
    };
}

module.exports = { standardTextMessageBody, editedTextMessageBody };
