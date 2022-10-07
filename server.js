require("dotenv").config();

const axios = require('axios');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const fs = require("fs");
const tmi = require("tmi.js");

// Define configuration options
const opts = {
    channels: process.env.CHANNELS.split(",").map(s => s.trim()),
    admins: process.env.ADMINS.split(",").map(s => s.trim().toLowerCase()),
    speakers: process.env.SPEAKERS.split(",").map(s => s.trim().toLowerCase()),
    webhook: process.env.WEBHOOK,
    webhook_content: process.env.WEBHOOK_CONTENT
};

let board = {
    commands: [],
    messages: [],
    notifications: [],
    sound_strings: [],
    message_sound: true,
    tts: true
}

const express = require("express");
const app = express();
const port = 3003;

console.log(`
#  ### ### ###                 
##    #   #   # 
 #   ##  ##   # ### ### ### ### 
 #    #   #   # #   # # #   ##  
### ### ###   # ### ### #   ###   

Starting Twitch Soundboard!
* Change channel name in the example.env file and rename it to .env
* Insert browser window with URL: http://localhost:${port} to OBS
* Upload your *.mp4 and *.mp3s to /pulic/files/*
* Files will be shown with "!filename" in twitch chat

`);

if (opts.webhook) {
    readline.question(`Do you want to trigger your configured webhook? (y/yes)\n`, result => {
        if (result === "yes" || result === "y") {
            // trigger webhook
            axios.post(opts.webhook, {
                content: opts.webhook_content
            }).then(() => {
                console.log(`Webhook triggered!`);
            }).catch(err => console.warn(err));
        }
        readline.close();
    });
}

app.use(express.static("public"));

// Build a soundstrings to pass to your frontend
fs.readdir("./public/files/", (err, files) => {
    if (err) {
        throw err;
    }

    files.forEach(file => {
        if (file.indexOf(".mp4") >= 0 || file.indexOf(".mp3") >= 0) {
            board.sound_strings.push({
                command: "!" + file.toLocaleLowerCase().split(".")[0],
                media: file.toLocaleLowerCase()
            });
        }
    });
});

// Endpoint for the frontend that gets all the twitch messages and commands
app.get('/board', (req, res) => {
    res.send(JSON.stringify(board));
    board.commands = [];
    board.messages = [];
    board.notifications = [];
});

// Create a twitch client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const twitch_message = msg.trim();

    // if message is mentioning someone else, dont read it
    for (let channel of opts.channels) {
        if (twitch_message.indexOf("@") == 0
            && twitch_message.indexOf("@" + channel) == -1) {
            return;
        }
    }

    // admin commands
    if (opts.admins.includes(context.username)) {
        switch (twitch_message.toLowerCase()) {
            case "!soundoff":
                board.message_sound = false
                break;
            case "!soundon":
                board.message_sound = true
            case "!ttsoff":
                board.tts = false
                break;
            case "!ttson":
                board.tts = true
                break;
            case "!mute":
                board.mute = true
                break;
            case "!unmute":
                board.mute = false
                break;

            default:
                break;
        }
    }

    // mute all sound
    if (board.mute) {
        return;
    }

    // read commands with !
    if (twitch_message.indexOf("!") === 0) {
        board.commands.push(twitch_message.toLowerCase());
    } else {
        // read messages without !
        if (board.message_sound) {
            board.notifications.push(twitch_message.toLowerCase());
        }

        // read message with TTS if in speakers or subscriber
        if (board.tts) {
            if (opts.speakers.indexOf(context.username.toLowerCase()) >= 0) {
                board.messages.push(twitch_message.toLowerCase());
            } else if (context.subscriber === true) {
                board.messages.push(twitch_message.toLowerCase());
            }
        }
    }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to twitch chat on ${addr}:${port}`);
}

// Start the browser window server
app.listen(port, () => {
    console.log(`Soundboard visuals are listening at http://localhost:${port}`)
})