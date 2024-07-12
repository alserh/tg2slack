/* eslint-disable no-undef */
require("dotenv").config();
const { Bot } = require("grammy");
const { slackPostMessage } = require("./slackBot/slackPostMessage");

const tgToken = process.env.TG_API_TOKEN;
const bot = new Bot(`${tgToken}`);
let i = 0;

bot.on("message", (ctx) => {
    
    i++
    slackPostMessage(ctx);
    console.log(`Sent ${i} messages to slack`)
    
});

bot.start();