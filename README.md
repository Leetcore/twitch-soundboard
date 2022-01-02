# Soundboard
Dies ist ein einfaches Soundboard für Twitch.

## Setup
### Kanalname ändern
Ändere den Kanalname in der Datei `server.js` (Zeile 7: `"change_this_channel_name"`)

### NodeJS
Du brauchst NodeJS (https://nodejs.org/en/) für dieses Projekt.

Installiere die Pakete in der Kommandozeile mit:
```
npm install
npm start
```

### OBS
Füge ein Browserfenster in OBS hinzu und wähle die URL: http://localhost:3000.
Wenn du eine neue Datei zu deinem Soundboard hinzugefügt hast, musst du es danach neustarten
und es in OBS auswählen und "aktualisieren" klicken.

## Sounds und Videos hochladen in /public/files/
Speichere deine Sound oder Videodatein in "/public/files/". Der Befehl im Chat wird genauso heißen,
wie deine Datei. Allerdings muss `!` vorher geschrieben werden.

Die Chatnachricht "!lala" spielt die Datei "lala.mp3" oder "lala.mp4" im OBS Browserfenster ab.

```
!lala -> lala.mp3
```

Du kannst *.mp3 oder *.mp4 Dateien benutzen, die in einem OBS Browserfenster abgespielt werden können.

## Zeige alle Befehle an:
`!help`, `!hilfe`, `!soundboard`, `!commands` zeigt ein Hilfefenster mit allen möglichen Befehlen an.