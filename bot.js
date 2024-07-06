/* eslint-disable no-undef */
require("dotenv").config();
const { Bot } = require("grammy");
const { slackPostMessage } = require("./slackBot/slackPostMessage");

const tgToken = process.env.TG_API_TOKEN;
const bot = new Bot(`${tgToken}`);

bot.on("message", (ctx) => {
    
    slackPostMessage(ctx);
    
});

bot.start();