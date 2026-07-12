Green Mahjong
=============

Green Mahjong is a HTML5 based GPLv3 solitaire mahjong game. It features three
nice themes, six different layouts and works across all the major desktop and
mobile browsers.

The artwork is under the CC-BY-NC license and can not be used in commercial
products.

Play it in the browser: http://greenmahjong.daniel-beck.org

Store listings (existing entries, see "Publishing" below for how updates are
built now):

- Google Play: https://play.google.com/store/apps/details?id=de.beck.greenmahjong
- Apple App Store: https://itunes.apple.com/app/id933634500

## Project layout

```
green-mahjong/
├── GreenMahjong/
│   └── www/                     the actual game: HTML/CSS/JS, playable as-is in any browser
│       ├── index.html           entry point (#start route)
│       ├── css/                 layout stylesheets per screen size
│       ├── js/                  game logic (mahjong.js, spider.js, turtle.js, flower.js, ...)
│       ├── images/              tile sets and themes (classic, fruits, high-visibility)
│       └── config.xml           legacy Cordova/PhoneGap config (kept for reference)
├── greenmahjong-capacitor.zip    generated Capacitor project (Android + iOS), see below
└── ANLEITUNG.md                 detailed German build/publish walkthrough
```

The game itself (`GreenMahjong/www`) has no build step — it's plain HTML/CSS/JS
using jQuery. Opening `GreenMahjong/www/index.html` in a browser is enough to
play or develop it.

## App packaging: from PhoneGap Build to Capacitor

The app used to be packaged for Google Play / App Store via Adobe **PhoneGap
Build** (`phonegap-version: cli-5.2.0` in `config.xml`). That service was shut
down in 2020, so the old build pipeline no longer works.

The project has been migrated to **Capacitor**, the actively maintained
successor from the Ionic team. The web app (`www`) is unchanged; Capacitor
just wraps it into native Android (Android Studio / Gradle) and iOS (Xcode)
projects.

`greenmahjong-capacitor.zip` contains the generated project:

- App ID kept as `de.beck.greenmahjong` and app name "Green Mahjong", so both
  existing store listings are treated as an **update**, not a new app.
- Icons for all Android densities (mdpi–xxxhdpi) and the iOS App Store icon,
  generated from `greenmahjong512.png`. For a crisper 1024×1024 App Store icon,
  swap in a native high-res source later.
- Splash screens (Android) using the game icon on a white background.
- Version bumped for store updates: Android `versionCode 53` / `versionName
  2.5.0`; iOS `MARKETING_VERSION 2.5.0`.

### Building Android (Play Store)

1. Unzip `greenmahjong-capacitor.zip`, open a terminal in that folder.
2. `npm install`
3. `npx cap sync android`
4. `npx cap open android` (requires Android Studio)
5. Android Studio → **Build → Generate Signed App Bundle**, sign with the
   *original* keystore used for the existing Play Store listing (required —
   Google Play won't accept an update signed with a different key).
6. Upload the resulting `.aab` as a new release in the Play Console for
   `de.beck.greenmahjong`.

### Building iOS (App Store)

1. Same unzipped folder, on a Mac with Xcode installed.
2. `npm install`, then `npx cap sync ios`
3. Install CocoaPods if needed (`sudo gem install cocoapods`), then `pod
   install` inside `ios/App`.
4. `npx cap open ios` → opens `App.xcworkspace`.
5. In Xcode, set Signing & Capabilities to your existing Apple Developer
   team/bundle ID (`de.beck.greenmahjong`).
6. Check the last build number submitted in App Store Connect and set
   `CURRENT_PROJECT_VERSION` higher than that in Xcode's build settings, or
   Apple will reject the upload.
7. Product → Archive, then upload via the Organizer (or export an `.ipa` and
   use the Transporter app).

See `ANLEITUNG.md` for the same instructions in German, plus more detail.

## License

Code: GPLv3. Artwork: CC-BY-NC (non-commercial use only) — keep this in mind
if the app's pricing/ads model ever changes.
