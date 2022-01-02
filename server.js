const fs = require("fs");
const tmi = require("tmi.js");

// Define configuration options
const opts = {
    channels: ["change_this_channel_name"]
};

let board = {
    commands: [],
    sound_strings: []
}

const express = require("express");
const app = express();
const port = 3000;

console.log(`
#  ### ### ###                 
##    #   #   # 
 #   ##  ##   # ### ### ### ### 
 #    #   #   # #   # # #   ##  
### ### ###   # ### ### #   ###   

Starting 1337core.de Hacker Soundboard!
* Change channel name in this (server.js) file (line 7: "change_this_channel_name")
* Insert browser window with URL: http://localhost:${port} to OBS
* Upload your *.mp4 and *.mp3s to /pulic/files/*
* Files will be shown with "!filename" in twitch chat

`);

app.use(express.static('public'));

// Build a soundstrings to pass to your frontend
fs.readdir("./public/files/", (err, files) => {
    if (err) {
        throw err;
    }

    files.forEach(file => {
        board.sound_strings.push({
            command: "!" + file.toLocaleLowerCase().split(".")[0],
            media: file.toLocaleLowerCase()
        })
    });
});

// Endpoint for the frontend that gets all the twitch messages and commands
app.get('/board', (req, res) => {
    res.send(JSON.stringify(board));
    board.commands = [];
});

// Create a twitch client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const message = msg.trim();
    if (message.indexOf("!") === 0) {
        runCommand(message);
    }
}

// Push all commands to your board object
// board object will be passed to the frontend
function runCommand(command) {
    board.commands.push(command.toLowerCase());
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to twitch chat on ${addr}:${port}`);
}

// Start the browser window server
app.listen(port, () => {
    console.log(`Soundboard visuals are listening at http://localhost:${port}`)
})