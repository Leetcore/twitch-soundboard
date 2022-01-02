# Soundboard
This is a simple soundboard for Twitch. German readme is here: README_de.md

## Setup
### Channel name
Change channel name in the `server.js` file (line 7: `"change_this_channel_name"`)

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

## Show all commands:
Type these commands in the twitch chat to trigger the help window that shows all commands!
`!help`, `!hilfe`, `!soundboard`, `!commands`

## Translation?
The `!help` is in german language. Edit the HTML in /public/index.html to change the help text.