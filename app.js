require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const querystring = require("querystring");
const { slackVerifyKey } = require("./slackBot/slackVerifyKey");
const { tgRequestBodyProcessor } = require("./tgBot/tgRequestBodyProcessor");
const { slackPostMessage } = require("./slackBot/slackPostMessage");
const { tgPostMessage } = require("./tgBot/tgEndpointLib");
const { tgFileOperator } = require("./fileProcessor/tgFileOperator");


const app = express();
const port = process.env.INBOUND_PORT;
const tgChatId = process.env.TG_TEST_GROUP;


// Used instead default to accomodate Slack token verification
app.use(bodyParser.raw({ type: "*/*" }));


// GET endpoints
app.get("/", (req, res) => {
    res.json({ status: 200, message: "OK" });
});

// POST endpoints

app.post("/slack", (req, res) => {
    try {
        const dataBody = req.body.toString();
        const parsedBody = querystring.parse(dataBody);
        if (slackVerifyKey(req)) {
            tgPostMessage(parsedBody.text, tgChatId);
        } else {
            throw new Error("Slack token security may be compromised or token expired");
        }
        res.json({ status: 200, message: "OK" });
    } catch (e) {
        console.error(`Error posting from Slack to TG! ${e}`);
        res.status(500).json({ status: 500, result: "Failed", body: `Error posting from Slack to TG! ${e}` });
    }
});

app.post("/telegram", async (req, res) => {
    const dataBody = req.body.toString();
    const parsedBody = JSON.parse(dataBody);

    try {
        const tgMessage = tgRequestBodyProcessor(parsedBody);

        // Array to hold all asynchronous operations
        const operations = [];

        if (tgMessage.text != null) {
            operations.push(
                slackPostMessage(tgMessage, tgMessage.edited)
            );
        }
        if (tgMessage.file != null) {
            operations.push(tgFileOperator(tgMessage.file));
        }

        await Promise.all(operations);

        res.json({ status: 200, result: "All operations processed successfully" });

    } catch (e) {
        console.error("Error processing request:", e.message);
        res.status(500).json({ status: 500, result: e.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});