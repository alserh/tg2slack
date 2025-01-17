# T2S: Tg to Slack

This project is designed based on [grammY](https://github.com/grammyjs/grammY) and the need to stream messages from TG to Slack channels / DMs. Essentially at the moment it does only that. 
```mermaid
graph LR
A[Telegram] -- text only --> D{Slack}
D -- future plans--> A
```
---
### Installation: 
(requires Node.js installed)

```
npm install
```
---
### Usage
You will require to set up an `.env` file with the following parameters:
- TELEGRAM bot:
	-  TG_API_TOKEN=`YOUR_BOT_TOKEN_HERE`
- SLACK:
	- SLACK_API_TOKEN=`YOUR_SLACK_APP_TOKEN`
	- SLACK_TEST_USER_ID=`CHANNEL_ID`
	- SLACK_SIGNIN_SECRET=`YOUR_SLACK_SIGNIN_SECRET`

In it's current form the app just echoes anything Telegram Bot receives to a selected Slack channel. 

To run the app do: 
```
node bot.js
```

Once the app is running: sending the message to a Telegram bot (TG_API_TOKEN) will echo the message to Slack (SLACK_TEST_USER_ID) via SLACK_API_TOKEN

---
### TODO
- I accept feature requests
- [x] *DONE* Add user recognition for platforms transitioning (so peeps in Slack see, who wrote what in TG)
- [x] *DONE* ~~Improve project structure to add various kinds of messages / formatting 
    - here we can introduce something like an object file that will contain required formats, and invoke those formats on demand. 
    - added a workaround notification about media messages~~ <- I just implemented :file recognition method from Grammy and echo files directly to slack (20Mb max atm). After that the file is deleted from server permanently - no retries
- Handle file errors in TG correctly (currently may fake unsuccessful file upload)
- Handle stickers in TG and maybe somethign to show similarities in slack 
- Implement backwards compatiability, allowing sending messages from Slack to TG
	- in order to do so we want to map message types from TG to Slack and vice versa. This map requires learning types of `message` and comparing those to slack
- [x] *DONE* It would be nice to figure out handling images and another kinds of content transitioning --> [docs](https://grammy.dev/plugins/files)