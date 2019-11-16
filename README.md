# WebProgProjekt
Abschlussprojekt für die Vorlesung Webprogrammierung 2019 - Nico Rubach, Frederic Janning, Theodor Houghton-Larsen

## Ziel des Projekts
Das Ziel des Projekts besteht darin, ein Organisationstool für Turniere zu erstellen. Hierbei liegt das Hauptaugenmerk auf der eSports-Szene.

## Installation
Benötigt node.js und npm.

Zuerst müssen die beiden Pakete serve-static und connect intalliert werden:
`npm install serve-static`
`npm install connect`
Nun kann über das Terminal oder die Kommandozeile zum Ordner navigiert werden. Im Packageroot angelangt kann der Node-Server über den Befehl `node server.js` gestartet werden. Die Website kann nun im Browser über [localhost:8080](http://localhost:8080/) aufgerufen werden.

## Anwendung
Sobald die Website aufgerufen wurde, kann wie gewohnt mit Klicks navigiert werden.

### Startseite
Auf der Startseite befinden sich links die neusten Nachrichten des Turnierteams. Diese sind in einem Accordion aufgebaut und können mit einem Klick auf den Titel geöffnet oder geschlossen werden. Dabei kann nur eine Nachricht gleichzeitig angezeigt werden. Auf der rechten Seite können die neusten VoDs (videos on demand) der letzten Spiele angezeigt werden. Im dummy-document wird hier lediglich der "Monstercat"-Livestream als Beispiel angezeigt. Zu der Startseite kann jeder Zeit über einen Klick auf das Tournament Manager-Banner oben links zurückgekehrt werden.

### Teams
Durch einen Klick auf "Teams" oben rechts gelangt der Anwender zur Übersicht der bereits erstellten Teams. Diese werden in einer Firebase-Datenbank gespeichert und können so auch nachdem der Server neugestartet wurde abgerufen werden.
Durch einen Klick auf eines der Teams dreht sich dessen Kachel und verschiedenste Informationen zu dem Team werden angezeigt, unter anderem auch dessen Spieler.

#### Neues Team erstellen

Klickt der Anwender auf den grünen Button "Create new Team", 
