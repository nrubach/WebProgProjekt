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
Klickt der Anwender auf den grünen Button "+ Neues Team anlegen", gelangt er in die Teamerstellungsmaske. Dort kann der Benutzer dem Team einen Namen geben, ein Logo hochladen und Spieler hinzufügen. Ein Team benötigt mindestens sechs Spieler. Der Anwender kann den Namen und das Skill Rating, sprich, wie gut er in dem Spiel ist, angeben sowie auswählen, ob der Spieler ein Kapitän des Teams ist. Ist er mit seinem Team zufrieden, kann er das Team über den grünen "Team anlegen"-Button der Datenbank hinzufügen.

### Tournaments
Über den "Tournaments"-Link oben rechts in der Ecke wird dem Benutzer eine Übersicht der bereits bestehenden Turniere angezeigt. Ähnlich wie die Teams werden auch diese in einer Datenbank gespeichert und bleiben auch nach einem Server-Neustart bestehen. Fährt der User mit der Maus über eine der Kacheln der Turniere, wird auf der Kachel der Turniername angezeigt.

#### Turnier anzeigen
Klickt der Nutzer auf eine Turnierkachel, gelangt er in die Anzeige des ausgewählten Turniers. Oben sieht der den Titel, Organisator sowie Start- und Enddatum des Turniers. Darunter befindet sich die Turnierstruktur mit den Teams, die beim Anlegen des Turniers ausgewählt wurden. Gibt es bereits gespielte Spiele mit Ergebnissen und weitergeschrittenen Teams, so werden diese dynamisch aus der Datenbank geladen und auf das Turnier angewandt. Möchte der Nutzer auswählen, welches Team in einem Match gewonnen hat, so genügt ein Klick auf das entsprechende Team. Dieses wird dann als Gewinner markiert und in die nächste Runde geschickt, sofern eine existiert. Die Änderungen werden direkt in die Datenbank geschrieben. Möchte der Nutzer das Turnier zurücksetzen, so klickt er unten auf den "Turnier zurücksetzen"-Button. In einem Popup muss er seine Entscheidung erst bestätigen, bevor der Reset ausgeführt wird.

#### Neues Turnier erstellen
Über einen Klick auf den grünen "+ Neues Turnier anlegen"-Button oben in der Turnierübersicht wird die Turniererstellungsmaske geöffnet. Oben kann der Nutzer Name, Organisator, Start- und Enddatum sowie Logo, Spielsystem und teilnehmende Teams angeben. Das Start- und Enddatum wird über ein Calendar-Pick-Modul dynamisch ausgewählt oder per Tastatureingabe festgelegt. Ähnlich wie in der Teamerstellungsmaske kann der Nutzer ein Logo hochladen. Im Dropdown-Menü des Spielsystems kann der Benutzer zwischen den verschiedenen Turniermodi auswählen (momentan wird nur das Standard-K.O.-System unterstützt). Zuletzt wählt der Nutzer aus den in der Datenbank angelegten Teams die Teilnehmer des Turniers aus. Dabei muss beachtet werden, dass das Turnier nur 2, 4, 8, 16 oder 32 teilnehmende Teams hat. Über den grünen "Turnier erstellen"-Button wird das Turnier in der Datenbank angelegt.

### Chatbot
Auf jeder Seite wird unten rechts ein roter "Klick mich!"-Button angezeigt. Über diesen öffnet sich das Popup des Chatbots, der dem Nutzer helfen soll, sich auf der Seite zurecht zufinden. Dabei kann dieser beispielsweise gefragt werden, wie man ein neues Team erstellt. Die KI dahinter basiert auf der SAP Conversational AI. https://cai.tools.sap/nrubach/tournamentmanager

## Vorgehensweise & Aufteilung
Das Grundgerüst der Anwedung wurde von allen 3 Teammitgliedern gemeinsam erstellt und von Nico Rubach committed. Dazu gehört auch die standard License, die sich zur Sicherheit in diesem PUBLIC Repository befindet. Die restlichen Aufgaben wurden wie folgt aufgeteilt:

#### Frederic
- Startseite mit Neuigkeiten und VoDs
- Detailanzeige für Turniere
- Dokumentation und Readme

#### Theodor
- Teamerstellung
- Turniererstellung
- Firebase Integration & Setup

#### Nico
- Teamübersicht & Details
- Turnierübersicht
- Routing & Grundstruktur
- Chatbotintegration

Aufgrund dieser Aufteilung sind wir der Überzeugung, dass alle Gruppenmitglieder einen ählichen Anteil an diesem Projekt geleistet haben.
