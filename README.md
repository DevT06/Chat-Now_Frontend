# Web Chat-App

## Abstract

Wir möchten mit Chat-Now eine Web Chat Applikation umsetzen. In unserer Chat-App kann man nach Benutzern suchen. Mit den
gefundenen Benutzern kann man als registrierte Benutzer Chats eröffnen, in denen man sich gegenseitig Nachrichten senden
kann. Chatnachrichten bleiben unbegrenzt erhalten, sie können jedoch vom Benutzer, der diese geschrieben hat, gelöscht
werden.

## Get Started

### Erste Schritte:

1. Öffnen Sie das Terminal.
2. Navigieren Sie im Terminal zum Ort, wo Sie das Projekt speichern möchten.
3. Erstellen Sie ein neues Verzeichnis "mkdir name". (Der Name kann dabei beliebig gewählt werden)

### Frontend:

1. Navigieren Sie zu ihrem erstellten Projekt-Verzeichnis: "cd name".
2. Führen Sie folgenden Befehl im Terminal aus: `git clone git@github.com:DevT06/Chat-Now_Frontend.git`
3. Öffnen Sie nun im Editor oder IDE ihrer Wahl das Projekt unter (ihr Pfad) ...\name\frontend
4. Öffnen Sie ein Terminal, welches sich im Projekt-Verzeichnis befindet und geben Sie folgenden Befehl ein: "npm
   install"

### Backend:

1. Navigieren Sie zu ihrem erstellten Projekt-Verzeichnis: "cd name".
2. Führen Sie folgenden Befehl im Terminal aus: `git clone git@github.com:DevT06/Chat-Now_Backend.git`
3. Öffnen Sie nun im Editor oder IDE ihrer Wahl das Projekt unter (ihr Pfad) ...\name\backend\BackendChatApp
4. Stellen Sie sicher, dass Sie sich im Solution Verzeichnis BackenChatApp befinden und Bauen Sie die Solution mit:
   dotnet build
5. Stellen Sie sicher, dass die Solution erfolgreich gebaut wurde.

### Datenbank:

1. Vergewissern Sie sich, dass Sie einen MySql Server mit einem beliebigen Benutzer haben (Sie können auch eine Andere
   Datenbank verwenden Konfigurieren Sie in diesem Fall die benötigten EF Packages und den ConnectionString nach ihrem
   Bedarf)
2. Erstellen Sie eine Datenbank mit dem Dumpfile namens: chatnow_db_structure.sql
3. Vergewissern Sie sich auch, dass ihr Benutzer über alle DDL Rechte in ihrem zuvor erstellten Schema besitzt, zudem
   sollte er auch alle Objekt Rechte, ausser "Execute" & "Show view" in ihrem Schema besitzen.
4. Passen Sie nun den Connection String in der Datei (ihr Pfad)
   ...\name\backend\BackendChatApp\DataAccess.EFCore\ChatNowDbContext.cs an. (Der ConnectionString (MySql) sollte etwa
   so aussehen: "server=IHRE SERVERADRESSE;user=IHR BENUTZER;password=IHR PASSWORT;database=chatnow_db")
5. Öffnen Sie im Terminal das Projekt ...\name\backend\BackendChatApp\ChatAppApi
6. Führen Sie dann den Befehl aus: dotnet ef database update
7. Die Datenbank ist nun aufgesetzt.
8. Falls Sie Emoji support möchten setzen sie das Charset bei beim Schema oder bei der Tabelle Messages (falls nötig auch beim Attribut "Text") auf "utf8mb4" und die Collation auf utf8mb4_unicode_ci (dies können sie auch im nachhinein tun)



### Info: 
- When incountering issues consider generating a new migration from ChatNowDbContext 
- Generating a new migration will cause an Error to solve replace:
 `MySQLEntityTypeBuilderExtensions.HasCharSet(b, "utf8mb4");` with `b.HasAnnotation("MySQL:Charset", "utf8mb4");` (or use NVARCHAR)
- Replace this, where error is displayed in migration files
- Emojis supported with manual configuration

### Applikation Starten:

#### Backend:

1. Öffnen Sie nun im Terminal unter (ihrem Pfad) ...name\backend\BackendChatApp\ChatAppApi und führen Sie den Befehl:
   dotnet run --launch-profile "http" (mit https: dotnet run --launch-profile "https")
2. Es sollte sich im Browser ein Fenster unter: http://localhost:5072/swagger/index.html öffnen. (Sie können hier die
   Api mit GUI bedienen.)
3. Öffnen Sie nun im Terminal unter ...name\backend\BackendChatApp\ChatAppSignalRApi und führen Sie den Befehl: `dotnet run --launch-profile "http" (mit https: dotnet run --launch-profile "https")` (`dotnet run --urls http://localhost:8076`)

#### Frontend:

1. Nachdem der vorherige Befehl ausgeführt wurde, können Sie die Applikation mit dem Befehl: "npm run dev" starten. (for production do your own research)
2. Warten Sie nun, bis die Applikation gestartet ist.
3. Das Frontend is nun under: http://localhost:3000/ verfügbar.


## Endpoints Backend

| URI                   | HTTP Methode | Beschreibung                                                                    |
|-----------------------|--------------|---------------------------------------------------------------------------------|
| /api/AuthUser         | POST         | Für die Authentifizierung benötigt.                                             |
|                       |              |                                                                                 |
| /api/Chat             | GET          | Ruft eine Liste aller Chat.                                                     |
| /api/Chat             | POST         | Erstellt einen neue Chat.                                                       |
| /api/Chat/name/{name} | GET          | Ruft Chat nach dem angegebenen Namen ab.                                        |
| /api/Chat/{id}        | GET          | Ruft eine spezifische Chat nach ihrer ID ab.                                    |
| /api/Chat/{id}        | PUT          | Updates an existing chat session identified by its ID.                          |
| /api/Chat/{id}        | DELETE       | Löscht eine spezifische Chat nach ihrer ID.                                     |
|                       |              |                                                                                 |
| /api/User             | GET          | Ruft eine Liste aller Benutzer ab.                                              |
| /api/User             | POST         | Erstellt einen neuen Benutzer.                                                  |
| /api/User/{id}        | GET          | Ruft einen spezifischen Benutzer nach seiner ID ab.                             |
| /api/User/{id}        | PUT          | Aktualisiert einen bestehenden Benutzer, der durch seine ID identifiziert wird. |
| /api/User/{id}        | DELETE       | Löscht einen spezifischen Benutzer nach seiner ID.                              |
| /api/User/name/{name} | GET          | Ruft Benutzer nach dem angegebenen Namen ab.                                    |
| /api/User/email       | GET          | Ruft Benutzer nach ihrer E-Mail ab.                                             |
|                       |              |                                                                                 |
| /api/Message          | GET          | Ruft eine Liste aller Nachrichten ab.                                           |
| /api/Message          | POST         | Erstellt eine neue Nachricht.                                                   |
| /api/Message/{id}     | GET          | Ruft eine spezifische Nachricht nach ihrer ID ab.                               |
| /api/Message/{id}     | PUT          | Aktualisiert eine bestehende Nachricht, die durch ihre ID identifiziert wird.   |
| /api/Message/{id}     | DELETE       | Löscht eine spezifische Nachricht nach ihrer ID.                                |

## Sitemap

| Seiten            | Link                   |
|-------------------|------------------------|
| Chat (HauptSeite) | http://localhost:3000/ |
| Register          | http://localhost:3000/ |
| Login             | http://localhost:3000/ |

## Navigation

Wir haben einen Login und Register Page die miteinander verbunden sind. Wen man sich einloggt wird man auf die
hauptseite geleitet. Dort gibt es zwei Burger-menus. Die jedoch nicht direkt auf eine Seite navigieren. Es sind
Funktionen wie Logout und Delete Chat.

## Design

### Mockups (Adobe XD)

[Chat-Now_Mockup](/doc/Mockup/Chat-Now.xd)

### Farbschema

- Hauptfarbe: #BBE1F1
- Sekundärfarbe: #FFFFFF
- Hintergrundfarbe: #EFEFEF

### Schriftarten

- Hauptüberschriften: Roboto Bold
- Text: Roboto Regular

# Testing

Betriebssystem: Windows 11
Browser: Microsoft Edge
Geräte:
Auflösung: Desktop: 1920x1080, Mobile: 375x667

# User acceptance tests

| Inhalt             | Beschreibung                                                                                                                                                                                                                                                                                        |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|                    |                                                                                                                                                                                                                                                                                                     |
| Testfall Nummer    | T-01                                                                                                                                                                                                                                                                                                |
| Anforderungen      | Als neuer Benutzer möchte ich mich registrieren können, damit ich die Chat-App nutzen kann.                                                                                                                                                                                                         |
| Akzeptanzkriterien | - Ein Registrierungsformular ist verfügbar, das folgende Felder enthält: Benutzername, Passwort, E-Mail-Adresse. <br/>-	Der Benutzer kann sich nach der Registrierung mit seinen neuen Zugangsdaten anmelden.                                                                                       |
| Vorbedingung       | -                                                                                                                                                                                                                                                                                                   |
| Ablauf             | 1. Die Application starten. <br/>2. Die Registrierungsseite öffnen sich. <br/>3. Benutzername, Passwort und E-Mail-Adresse eingeben. <br/>4. Den Registrierungsbutton klicken.                                                                                                                      |
| Resultat           | Der Benutzer wird erfolgreich registriert mit keiner Fehlermeldung.                                                                                                                                                                                                                                 |
|                    |                                                                                                                                                                                                                                                                                                     |
| Testfall Nummer    | T-1.1                                                                                                                                                                                                                                                                                               |
| Anforderungen      | Als neuer Benutzer möchte ich mich registrieren können, damit ich die Chat-App nutzen kann.                                                                                                                                                                                                         |
| Akzeptanzkriterien | - Ein Registrierungsformular ist verfügbar, das folgende Felder enthält: Benutzername, Passwort, E-Mail-Adresse. <br/>-	Der Benutzer kann sich nach der Registrierung mit seinen neuen Zugangsdaten anmelden.                                                                                       |
| Vorbedingung       | -                                                                                                                                                                                                                                                                                                   |
| Ablauf             | 1. Die Application starten. <br/>2. Die Registrierungsseite öffnen sich. <br/>3. Benutzername, Passwort und E-Mail-Adresse one @ eingeben. <br/>4. Den Registrierungsbutton klicken.                                                                                                                |
| Resultat           | Der Benutzer wird nicht erfolgreich registriert mit einer Fehlermeldung bestätigt.                                                                                                                                                                                                                  |
|                    |                                                                                                                                                                                                                                                                                                     |
| Testfall Nummer    | T-02                                                                                                                                                                                                                                                                                                |
| Anforderungen      | Als registrierter Benutzer möchte ich mich anmelden können, damit ich auf meine Chats und Nachrichten zugreifen kann.                                                                                                                                                                               |
| Akzeptanzkriterien | - Ein Anmeldeformular ist verfügbar, das folgende Felder enthält:<br/> -- Benutzername <br/>--Passwort. <br/>- Der Benutzer wird bei erfolgreicher Anmeldung auf seine Chat-Übersicht weitergeleitet. - Bei falschen Anmeldedaten wird eine entsprechende Fehlermeldung angezeigt.                  |
| Vorbedingung       | T-01 Bestanden, Ein Benutzerkonto ist bereits registriert.                                                                                                                                                                                                                                          |
| Ablauf             | 1. Die Application starten. <br/>2. Die Anmeldeseite öffnen. <br/>3. Benutzername und Passwort eingeben. <br/>4. Den Anmeldebutton klicken.                                                                                                                                                         |
| Resultat           | Der Benutzer wird erfolgreich angemeldet und auf die Chat-Übersicht weitergeleitet oder erhält eine Fehlermeldung bei falschen Anmeldedaten.                                                                                                                                                        |
|                    |                                                                                                                                                                                                                                                                                                     |
| Testfall Nummer    | T-03                                                                                                                                                                                                                                                                                                |
| Anforderungen      | Als angemeldeter Benutzer möchte ich anderen Benutzern finden können.                                                                                                                                                                                                                               |
| Akzeptanzkriterien | -	Ein Suchfeld ist verfügbar, in dem der Benutzer nach anderen Benutzern suchen kann.<br/>-	Die Suchergebnisse werden in Echtzeit angezeigt, während der Benutzer tippt.<br/>-	Der Benutzer kann aus den Suchergebnissen einen anderen Benutzer auswählen, um ein Profil oder einen Chat zu öffnen. |
| Vorbedingung       | T-01 Bestanden, Der Benutzer ist angemeldet.                                                                                                                                                                                                                                                        |
| Ablauf             | 1. Die Chat-Übersicht öffnen. <br/>2. Das Suchfeld benutzen und einen Benutzernamen eingeben. <br/>3. Einen Benutzer aus den Suchergebnissen auswählen.                                                                                                                                             |
| Resultat           | Die Suchergebnisse werden angezeigt und der Benutzer kann ein Profil oder einen Chat öffnen.                                                                                                                                                                                                        |
|                    |                                                                                                                                                                                                                                                                                                     ||                                                                                                                                                                                                                                                                                   | Testfall Nummer    |                                                                                                                                                                                                                                                                                    |
| Testfall Nummer    | T-04                                                                                                                                                                                                                                                                                                |
| Anforderungen      | Als Benutzer möchte ich eines neuen Chats mit anderen Benutzern eröffnen können, damit ich mit ihnen kommunizieren kann.                                                                                                                                                                            |
| Akzeptanzkriterien | -	Der Benutzer kann einen anderen Benutzer aus den Suchergebnissen auswählen, um einen neuen Chat zu starten.                                                                                                                                                                                       |
| Vorbedingung       | T-03 Bestanden	                                                                                                                                                                                                                                                                                     |
| Ablauf             | 1. Die Chat-Übersicht öffnen. <br/>2. Einen Benutzer suchen und auswählen. <br/>3. Den Chat-Button klicken.                                                                                                                                                                                         |
| Resultat           | Ein neuer Chat wird eröffnet und der Benutzer kann Nachrichten senden.                                                                                                                                                                                                                              |
|                    |                                                                                                                                                                                                                                                                                                     ||
| Testfall Nummer    | T-05                                                                                                                                                                                                                                                                                                |
| Anforderungen      | Als Benutzer möchte ich in einem Chat Textnachrichten senden können.                                                                                                                                                                                                                                |
| Akzeptanzkriterien | -	Der Benutzer kann ein Textfeld sehen, in das er Nachrichten eingeben kann.<br/>-	Es gibt einen Sende Knopf, um die eingegebene Nachricht zu senden.<br/>-	Die Gesendete Nachricht wird auf der rechten Seite im Chat- Fenster angezeigt.                                                          |
| Vorbedingung       | T-04 Bestanden                                                                                                                                                                                                                                                                                      |
| Ablauf             | 1. Einen Chat öffnen. <br/>2. Eine Nachricht im Textfeld eingeben. <br/>3. Den Sende-Knopf klicken.                                                                                                                                                                                                 |
| Resultat           | Die Nachricht wird gesendet und auf der rechten Seite im Chat-Fenster angezeigt.                                                                                                                                                                                                                    |
|                    |                                                                                                                                                                                                                                                                                                     ||
| Testfall Nummer    | T-06                                                                                                                                                                                                                                                                                                |
| Anforderungen      | Als Benutzer möchte ich in einem Chat Textnachrichten in Echtzeit empfangen können.                                                                                                                                                                                                                 |
| Akzeptanzkriterien | -	Eingehende Nachrichten erscheinen in Echtzeit auf der linken Seite im Chat-Fenster des Benutzers.                                                                                                                                                                                                 |
| Vorbedingung       | T-04 Bestanden                                                                                                                                                                                                                                                                                      |
| Ablauf             |                                                                                                                                                                                                                                                                                                     |
| Resultat           | Eingehende Nachrichten erscheinen in Echtzeit auf der linken Seite im Chat-Fenster.                                                                                                                                                                                                                 |
|                    |                                                                                                                                                                                                                                                                                                     ||
| Testfall Nummer    | T-07                                                                                                                                                                                                                                                                                                |
| Anforderungen      | Als Benutzer möchte ich meine gesendeten Nachrichten löschen können, damit ich Kontrolle über meine Konversationen habe.                                                                                                                                                                            |
| Akzeptanzkriterien | -	Der Benutzer kann eine gesendete Nachricht auswählen und löschen.<br/>-	Gelöschte Nachrichten verschwinden aus dem Chat-Fenster.<br/>-	Der andere Benutzer wird darüber informiert, dass die Nachricht gelöscht wurde.                                                                            |
| Vorbedingung       | T-05 Bestanden                                                                                                                                                                                                                                                                                      |
| Ablauf             | 1. Eine gesendete Nachricht im Chat auswählen. <br/>2. Auf den Löschen Button klicken.                                                                                                                                                                                                              |
| Resultat           | Die Nachricht wird gelöscht und der andere Benutzer wird informiert.                                                                                                                                                                                                                                |
|                    |                                                                                                                                                                                                                                                                                                     ||
| Testfall Nummer    | T-08                                                                                                                                                                                                                                                                                                |
| Anforderungen      | Als Benutzer möchte ich, dass Nachrichten im Chat bleiben und nicht nach einer Zeit verschwinden, damit ich sie zu einem späteren Zeitpunkt immer noch lesen kann.                                                                                                                                  |
| Akzeptanzkriterien | -	Gesendete Nachrichten werden in einer Datenbank gespeichert.<br/>-	Gesendete Nachrichten sind ohne Zeit Begrenzung im Chat sichtbar.                                                                                                                                                              |
| Vorbedingung       | T-06, T-05 Bestanden                                                                                                                                                                                                                                                                                |
| Ablauf             | 1. Nachrichten in einem Chat senden. <br/>2. Den Chat später erneut öffnen.                                                                                                                                                                                                                         |
| Resultat           | Alle gesendeten Nachrichten sind ohne Zeitbegrenzung im Chat sichtbar.                                                                                                                                                                                                                              |
|

| Test Nummer | Bestanden | Getestet von   | Datum      |
|-------------|-----------|----------------|------------|
| T-01        | ja        | placeholder    | 08.07.2024 |
| T-01.1      | ja        | placeholder    | 08.07.2024 |
| T-02        | ja        | placeholder    | 08.07.2024 |
| T-03        | ja        | placeholder    | 08.07.2024 |
| T-04        | ja        | placeholder    | 08.07.2024 |
| T-05        | ja        | placeholder    | 08.07.2024 |
| T-06        | ja        | placeholder    | 08.07.2024 |
| T-07        | ja        | placeholder    | 08.07.2024 |
| T-08        | ja        | placeholder    | 08.07.2024 |

# Fazit

- Was lief gut/schlecht? <br/>
  Im Allgemeinen lief alles ziemlich gut es gab am Anfang Startschwierigkeiten dies legete sich jedoch nach nicht allzu langer Zeit.
- Habt ihr euer Ziel erreicht? <br/>
  Wir konnten alle Ziele erreichen, einige optionale Ziele konnten wir nicht erreichen.
- Wie bist du mit dem Endergebnis zufrieden? <br/>
  Wir sind mit dem Endergebnis zufrieden, wir haben aber beide das Gefühl mehr machen zu können.
- Was hast du gelernt? <br/>
  Wir haben viele neue Technologien kennen gelernt, wie z.B. Signal R und AutoMapper...
- Was würdest du nächstes Mal anders machen?<br/> 
  Strukturierteres Vorgehen.
    
### - This was a Student Project
### - This Readme was not entirely written by myself others also share contributions. 
#### - This Project is no longer maintained and will likeley not be updated in the future
#### - This Readme may contain alot of spelling errors and inconsistencies due to the project being rushed to a certain extent
readme might still get updates  
