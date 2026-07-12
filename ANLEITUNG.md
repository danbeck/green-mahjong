# Green Mahjong – Migration auf Capacitor & Neuveröffentlichung

## Ausgangslage

Das Projekt hing an PhoneGap Build (`phonegap-version: cli-5.2.0` in der alten `config.xml`), einem Adobe-Dienst, der seit 2020 abgeschaltet ist. Deshalb ließ sich die App so nicht mehr für Google Play / App Store bauen.

## Was migriert wurde

- Neues Node/Capacitor-Projekt (`greenmahjong-capacitor.zip`), App-ID `de.beck.greenmahjong` und Name „Green Mahjong“ unverändert übernommen, damit beide Store-Einträge (Play Store, App Store) als **Update** und nicht als Neuanmeldung behandelt werden.
- Dein bestehender `www`-Ordner (HTML/CSS/JS, alle Themes und Layouts) ist 1:1 als `webDir` eingebunden – am Spiel selbst musste nichts geändert werden.
- Natives Android-Projekt (`android/`) und natives iOS-Projekt (`ios/`) wurden generiert.
- App-Icons für alle Android-Dichten (mdpi–xxxhdpi) und das iOS-App-Store-Icon wurden aus deinem vorhandenen `greenmahjong512.png` erzeugt.
- Splash-Screens (Android) mit dem Spiel-Icon auf weißem Grund befüllt.
- Versionsnummern hochgezählt, wichtig für Store-Updates:
  - Android: `versionCode 53` (vorher zuletzt 52), `versionName "2.5.0"`
  - iOS: `MARKETING_VERSION 2.5.0` (Build-Nummer mit `CURRENT_PROJECT_VERSION 1` – siehe Hinweis unten)

## Was ich NICHT tun konnte

Meine Build-Sandbox hat keinen Zugriff auf `dl.google.com`, `maven.google.com`, `repo.maven.apache.org` und die Gradle-Distribution – also genau die Server, die für einen Android-Build (Android SDK, Gradle, AGP) nötig sind. Eine fertige APK/AAB oder gar ein iOS-Build (braucht ohnehin Xcode auf einem Mac) konnte ich hier nicht erzeugen. Das musst du lokal machen – ist mit den vorbereiteten Projekten aber nur noch ein paar Klicks.

## Nächste Schritte: Android (Play Store)

1. `greenmahjong-capacitor.zip` entpacken, Terminal im Ordner öffnen.
2. `npm install` (installiert Capacitor neu, `node_modules` war bewusst nicht im Zip).
3. `npx cap sync android`
4. `npx cap open android` – öffnet das Projekt in Android Studio (muss installiert sein).
5. In Android Studio: **Build → Generate Signed App Bundle** und mit deinem bestehenden Signierschlüssel (Keystore) signieren, mit dem die App bisher bei Google Play war. Ohne diesen Original-Keystore kann Google Play das Update nicht annehmen.
6. Die erzeugte `.aab`-Datei in der Play Console unter deinem bestehenden App-Eintrag (`de.beck.greenmahjong`) als neues Release hochladen.

## Nächste Schritte: iOS (App Store)

1. Gleicher entpackter Ordner, auf einem Mac mit Xcode.
2. `npm install`, danach `npx cap sync ios`.
3. CocoaPods installieren falls nicht vorhanden: `sudo gem install cocoapods`, dann im `ios/App`-Ordner `pod install`.
4. `npx cap open ios` – öffnet `App.xcworkspace` in Xcode.
5. In Xcode: Team/Signing unter „Signing & Capabilities“ auf dein bestehendes Apple-Developer-Konto setzen (gleiche Bundle-ID `de.beck.greenmahjong` wie bisher).
6. **Wichtig:** Prüfe in App Store Connect, welche Build-Nummer zuletzt eingereicht wurde, und setze `CURRENT_PROJECT_VERSION` in Xcode (Build-Einstellungen) auf einen höheren Wert – sonst lehnt Apple den Upload ab.
7. Product → Archive, dann über den Organizer zu App Store Connect hochladen (oder Export als `.ipa` + Transporter-App).

## Kleinere Nacharbeiten, die sich lohnen

- Das App-Icon wurde aus `greenmahjong512.png` (512×512) hochskaliert. Für ein wirklich scharfes App-Store-Icon (1024×1024) am besten eine native 1024er-Version nachreichen und in `ios/App/App/Assets.xcassets/AppIcon.appiconset/` bzw. den Android-`mipmap-*`-Ordnern ersetzen.
- Splash-Screens sind aktuell schlicht (Icon auf Weiß). Falls du ein schöneres Startbild willst, einfach die `splash.png`-Dateien unter `android/app/src/main/res/drawable*/` ersetzen.
- Artwork steht laut README unter CC-BY-NC (nicht kommerziell nutzbar) – falls sich an Preismodell/Werbung in der App etwas geändert hat, das im Hinterkopf behalten.

## Dateien

- `greenmahjong-capacitor.zip` – vollständiges, migriertes Projekt (Android + iOS), bereit zum lokalen Bauen.
