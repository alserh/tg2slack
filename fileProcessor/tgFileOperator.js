const { getFile } = require("../tgBot/tgEndpointLib");
const { downloadFile } = require("./fileDownload");
const { uploadFile } = require("../slackBot/slackFileUploader");
const { unlink } = require("node:fs/promises");

async function tgFileOperator(fileData) {
    try {
        const file = await getFile(fileData);
        const path = file.result.file_path;
        const fileName = path.split("/").pop();
        const downloadUrl = `https://api.telegram.org/file/bot${tgToken}/${path}`;
        const downloadPath = `./downloads/${fileName}`;

        await downloadFile(downloadUrl, fileName);
        await uploadFile(downloadPath, fileName);
        await unlink(downloadPath);

    } catch (e) {
        console.error("Error processing file message:", e.message);
    }
}

module.exports = { tgFileOperator };