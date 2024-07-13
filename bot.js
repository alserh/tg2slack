/* eslint-disable no-undef */
require("dotenv").config();
const {unlink} = require("node:fs/promises");
const { Bot } = require("grammy");
const { slackPostMessage } = require("./slackBot/slackPostMessage");
const { downloadFile } = require("./slackBot/downloader");
const { uploadFile, captionSender } = require("./slackBot/slackFileUploader");

const tgToken = process.env.TG_API_TOKEN;
const bot = new Bot(`${tgToken}`);
let textMessages = 0;
let fileTransfers = 0;

bot.on(":text", (ctx) => {
    try {
        textMessages++;
        slackPostMessage(ctx);
        console.log(`Sent ${textMessages} messages to slack`);
    } catch (e) {
        console.error(e);
    }
});
bot.on([":file"], async (ctx) => {
    try {
        let file = await ctx.getFile();
        let path = file.file_path;
        let fileName = path.split("/")[1];

        captionSender(ctx);
        await downloadFile(`https://api.telegram.org/file/bot${tgToken}/${path}`, fileName);
        await uploadFile(`./downloads/${fileName}`, fileName);
        await unlink(`./downloads/${fileName}`);

        fileTransfers++;
        console.log(`Sent ${fileTransfers} files to slack`);
        
    } catch (e) {
        await ctx.reply(`ERROR! CODE ${e.error_code}: ${e.description}. Didn't transfer file to destination`);
        console.error(e);
    }
});


bot.start();