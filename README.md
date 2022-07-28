# Soundboard
Dies ist ein einfaches Soundboard für Twitch.

## Setup
### Kanalname ändern
Ändere den Kanalname in der Datei `example.env` und benenne die Datei in `.env` um. Du kannst mehrere Kanäle hinzufügen, indem du sie mit Kommata trennst.

### NodeJS
Du brauchst NodeJS (https://nodejs.org/en/) für dieses Projekt.

Installiere die Pakete in der Kommandozeile mit:
```
npm install
npm start
```
Optional:
Kopiere die `example.env` und benenne sie in `.env` um. Dort wird TTS und dein 
Webhook konfiguriert.

### OBS
Füge ein Browserfenster in OBS hinzu und wähle die URL: http://localhost:3003.
Wenn du eine neue Datei zu deinem Soundboard hinzugefügt hast, musst du es 
danach neustarten und es in OBS auswählen und "aktualisieren" klicken.

## Sounds und Videos hochladen in /public/files/
Speichere deine Sound oder Videodatein in "/public/files/". Der Befehl im Chat 
wird genauso heißen,
wie deine Datei. Allerdings muss `!` vorher geschrieben werden.

Die Chatnachricht "!lala" spielt die Datei "lala.mp3" oder "lala.mp4" im OBS 
Browserfenster ab.

```
!lala -> lala.mp3
```

Du kannst *.mp3 oder *.mp4 Dateien benutzen, die in einem OBS Browserfenster 
abgespielt werden können.

## Text to speech
TTS wird komplett vom Browser übernommen. Welche Stimme spricht, hängt also
von deinem Betriebssystem ab. Wenn eine Nachricht in den Chat geschrieben wird, 
spielt der Browser `/public/files/icq.mp3` ab.

## Webhook
Es ist möglich einen Webhook in ".env" zu konfigurieren. Beim Start des 
Soundboards wird gefragt, ob dieser Webhook mit dem Webhook Text gesendet 
werden soll.

```env
WEBHOOK=url
WEBHOOK_CONTENT=text
```

## Zeige alle Befehle an:
`!help`, `!hilfe`, `!soundboard`, `!commands` zeigt ein Hilfefenster mit allen 
möglichen Befehlen an.