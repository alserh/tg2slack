const fetch = require('node-fetch');
require('dotenv').config();

const slackUserId = process.env.SLACK_TEST_USER_ID;
const slackToken = process.env.SLACK_API_TOKEN;

function slackPostMessage(message) {
    const body = {
        "channel": `${slackUserId}`,
        "text": `${message}`
    };
    
    fetch('https://slack.com/api/chat.postMessage', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${slackToken}`
        },
    })
    .then(res => res.json())
    .then(json => console.log(json));
}

module.exports = { slackPostMessage };



