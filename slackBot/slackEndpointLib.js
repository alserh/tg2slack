const { slackSendRequest } = require("./slackSendRequest");
const { settings } = require("../settings");
const fs = require("fs");
const FormData = require("form-data");
const { standardTextMessageBody, editedTextMessageBody, authorTextWithFile } = require("./slackMessageStructures");

const token = process.env.SLACK_API_TOKEN;
const slackChannelId = process.env.SLACK_TEST_CHANNEL_ID;
const baseUrl = process.env.SLACK_URL;
const authHeaders = {
    "Authorization": `Bearer ${token}`
};
function getWho(from){
    return from.last_name ? `${from.first_name} ${from.last_name}` : from.first_name;
}



const slackEndpoints = {
    async  slackAuthTest() {
        const url = baseUrl + "/" + "auth.test";
        const headers = {
            ...authHeaders
        };
        let res = await slackSendRequest(url, "POST", headers);
        return res;
    },

    async slackPostMessage(processedBody, edited = false) {
        let body;
        const url = baseUrl + "/" + "chat.postMessage";
        const headers = {
            "content-type": "application/json",
            ...authHeaders
        };
        const who = getWho(processedBody.from);
        const text = processedBody.text;
        edited === false
            ? body = standardTextMessageBody(slackChannelId, settings.body_header_text, who, settings.tg_link, text)
            : body = editedTextMessageBody(slackChannelId, settings.body_header_text, who, settings.tg_link, text);
        let res = await slackSendRequest(url, "POST", headers, body);
        return res;
    },

    async slackGetFileUploadURL(fileName, fileSize) {
        const url = baseUrl + "/" + "files.getUploadURLExternal";
        const headers = {
            "content-type": "application/x-www-form-urlencoded",
            ...authHeaders
        };
        const body = new URLSearchParams({
            "filename": `${fileName}`,
            "length": fileSize
        }).toString();

        let res = await slackSendRequest(url + "?" + body, "GET", headers);
        return res;
    },

    async slackUploadFile(fileName, fileSize, filePath) {
        const slackFile = await this.slackGetFileUploadURL(fileName, fileSize);
        const url = slackFile.upload_url;
        const body = new FormData();

        body.append("file", fs.createReadStream(filePath), fileName);

        const headers = body.getHeaders();

        let res = await slackSendRequest(url, "POST", headers, body);


        return {
            ...slackFile,
            result: res
        };
    },

    async slackPostFile(fileName, fileSize, filePath, from) {
        const slackFile = await this.slackUploadFile(fileName, fileSize, filePath);

        const who = getWho(from);
        const url = baseUrl + "/" + "files.completeUploadExternal";
        const headers = {
            "content-type": "application/json",
            ...authHeaders
        };
        const body = {
            "files": [{
                "id": `${slackFile.file_id}`,
                "title": `${fileName}`
            }], "channel_id": `${slackChannelId}`,
            initial_comment: authorTextWithFile(settings.body_header_text, who)
        };

        let res = await slackSendRequest(url, "POST", headers, body);
        return res;

    }
};


module.exports = { slackEndpoints };