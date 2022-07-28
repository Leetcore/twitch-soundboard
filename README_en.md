# Soundboard
This is a simple soundboard for Twitch. German readme is here: README_de.md

## Setup
### Channel name
Change channel name in the `example.env` file and rename it to `.env`. You can specify multiple channels by separating them with a comma.

### NodeJS
You need NodeJS (https://nodejs.org/en/) for this project.

Install the package:
```
npm install
npm start
```

### OBS
Insert a browser window to your OBs scene and point the URL to: http://localhost:3000.
If you change the files or the code you have to click "reload" in the settings of this
browser window in OBS.

## Change /public/files/
Place your sound or viddeo files in "/public/files/". The command will be the filenames with `!` infront.

Mapping in Twitch chat. "!lala" will play "lala.mp3" or "lala.mp4" in the browser window.
```
!lala -> lala.mp3
```

You can use *.mp3 or *.mp4 files that are playable in a OBS browser window.

## Text to speech
TTS is completely done by the browser. Which voice speaks, therefore, depends
depends on your operating system. When a message is written to the chat 
the soundboards plays `/public/files/icq.mp3`. (Yes, currently hardcoded.)

## Webhook
It is possible to configure a webhook in ".env". When starting the 
soundboard you will be asked if this webhook should be sent with the webhook 
text should be sent.

```env
WEBHOOK=url
WEBHOOK_CONTENT=text
```

## Show all commands:
Type these commands in the twitch chat to trigger the help window that shows all commands!
`!help`, `!hilfe`, `!soundboard`, `!commands`

## Translation?
The `!help` is in german language. Edit the HTML in /public/index.html to change the help text.