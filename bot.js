require('dotenv').config();
const { Bot } = require("grammy");
const { slackPostMessage } = require("./knockSlack");

const tgToken = process.env.TG_API_TOKEN
const bot = new Bot(`${tgToken}`);

bot.on("message:text", (ctx) => {
    slackPostMessage(ctx.update.message.text);
});

bot.start();