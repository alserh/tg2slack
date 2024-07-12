/* eslint-disable no-undef */
require("dotenv").config();
const { Bot } = require("grammy");
const { slackPostMessage } = require("./slackBot/slackPostMessage");

const tgToken = process.env.TG_API_TOKEN;
const bot = new Bot(`${tgToken}`);
let i = 0;

bot.on("message", (ctx) => {

    i++;
    slackPostMessage(ctx);
    console.log(`Sent ${i} messages to slack`);
    
});

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
    } else {
      console.error("Unknown error:", e);
    }
});

bot.start();