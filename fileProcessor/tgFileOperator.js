const { getFile } = require("../tgBot/tgEndpointLib");
const { downloadFile } = require("./fileDownload");
const { slackEndpoints } = require("../slackBot/slackEndpointLib");
const { unlink } = require("node:fs/promises");
require("dotenv").config();

const tgToken = process.env.TG_API_TOKEN;

async function tgFileOperator(tgMessage) {
    try {
        const file = await getFile(tgMessage.file);
        const from = tgMessage.from;
        const path = file.result.file_path;
        const fileName = path.split("/").pop();
        const fileSize = file.result.file_size;
        const downloadUrl = `https://api.telegram.org/file/bot${tgToken}/${path}`;
        const downloadPath = `./downloads/${fileName}`;

        await downloadFile(downloadUrl, fileName);
        await slackEndpoints.slackPostFile(fileName, fileSize, downloadPath, from);
        await unlink(downloadPath);

    } catch (e) {
        console.error("Error processing file message:", e.message + " \n" + e);
    }
}

module.exports = { tgFileOperator };