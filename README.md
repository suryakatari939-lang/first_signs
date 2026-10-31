# First Signs

Our TSA Software Development entry.

A bite-sized ASL app for hearing parents of deaf children. It teaches 42 everyday signs grouped
by daily routine (mealtime, bath and bedtime, feelings, family, play, safety), with spaced
practice, a daily "use it with your child" goal, and a camera coach that checks your sign.

## Project plan


## Run it on your laptop

The camera coach needs the app to be served from your computer (browsers block the camera and
the tracking files when you just double-click `index.html`).

- **Mac:** double-click `start-mac.command`. If macOS blocks it, right-click it and choose Open.
- **Windows:** double-click `start-windows.bat`. It uses Python if you have it, otherwise Node (`npx serve`).
- **Any computer with Python:** open a terminal in this folder and run `python3 -m http.server 8000`,
  then go to http://localhost:8000

Use Chrome or Edge. Allow the camera when the browser asks. Nothing is uploaded: the video is
processed on your laptop.


## Run the latest version (auto-update)

One-time setup on a Mac, in Terminal:

1. Install the GitHub command-line tool: `brew install gh` (no Homebrew? install it from https://brew.sh first).
2. Sign in: `gh auth login`, then choose GitHub.com, HTTPS, Yes, and "Login with a web browser". This works with a Google sign-in.
3. Let git use that sign-in: `gh auth setup-git`
4. Download a copy that can update itself: `cd ~/Desktop && gh repo clone suryakatari939-lang/TSA_softwaredev_surya-Anish First-Signs`

Every time after that:

```
cd ~/Desktop/First-Signs && bash update-and-start.command
```

It pulls the newest code from `main`, starts the server, and opens the app in your browser.

## How the camera coach works

`js/camera.js` uses MediaPipe Holistic (in `vendor/holistic/`) to find 21 points on each hand,
plus the face and shoulders, in every frame. From those points it works out:

1. **Handshape**: which fingers are straight, bent or curled, whether the thumb is out, and whether
   the fingertips touch the thumb (flat-O). This gives labels like fist, flat hand, 5-hand, C, Y, W, ILY.
2. **Location**: where the hand is compared with the mouth, chin, forehead, cheeks and chest.
3. **Movement**: over a 3-second recording, it counts back-and-forth motions (taps, shakes),
   net movement (down, up, away), wrist turns (twists) and the hand opening or closing.

Each sign's target is in `CHECKS` at the bottom of `js/signs.js`. The coach checks the main
parts of a sign. It is a practice helper, not a certified ASL judge, so it can be fooled and can
miss correct signs. The "It was right, count it" button lets the parent overrule it.

## Files

- `index.html`: page structure
- `styles.css`: look and feel, light and dark mode
- `js/signs.js`: the signs, phrases, handshapes and camera targets
- `js/alphabet.js`: the ASL alphabet, numbers 1 to 10, fingerspelling tips and the easy-word lessons
- `js/abc.js`: the ABC tab (alphabet, numbers, easy-word lessons, spell a word, practice)
- `js/app.js`: screens, practice and progress (saved in the browser with localStorage)
- `js/camera.js`: camera coach
- `vendor/holistic/`: MediaPipe Holistic 0.5 (Apache 2.0 license, from Google)

## Photo credits

Sign and handshape photos are loaded from [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:American_Sign_Language). Each file page lists the author and license.

- Sign EAT: [ASL FlatO@Mouth-PalmBack.jpg](https://commons.wikimedia.org/wiki/File:ASL_FlatO%40Mouth-PalmBack.jpg)
- Sign DRINK: [ASL C@NearMouth-TipUp.jpg](https://commons.wikimedia.org/wiki/File:ASL_C%40NearMouth-TipUp.jpg)
- Sign WANT: [ASL Claw5@InsideChesthigh-PalmUp-Claw5@InsideChesthigh-PalmUp WANT 1.jpg](https://commons.wikimedia.org/wiki/File:ASL_Claw5%40InsideChesthigh-PalmUp-Claw5%40InsideChesthigh-PalmUp_WANT_1.jpg)
- Sign ILY: [ASL ILY@Side-PalmForward.jpg](https://commons.wikimedia.org/wiki/File:ASL_ILY%40Side-PalmForward.jpg)
- Sign THANKS: [ASL OpenB@Chin-PalmBack.jpg](https://commons.wikimedia.org/wiki/File:ASL_OpenB%40Chin-PalmBack.jpg)
- Handshape Flat-O: [ASL FlatO@Side-PalmForward.jpg](https://commons.wikimedia.org/wiki/File:ASL_FlatO%40Side-PalmForward.jpg)
- Handshape C: [ASL C@NearChin.jpg](https://commons.wikimedia.org/wiki/File:ASL_C%40NearChin.jpg)
- Handshape 5 (open): [ASL 5@Chest-PalmBack.jpg](https://commons.wikimedia.org/wiki/File:ASL_5%40Chest-PalmBack.jpg)
- Handshape A: [ASL A@Forehead.jpg](https://commons.wikimedia.org/wiki/File:ASL_A%40Forehead.jpg)
- Handshape S: [ASL S@Side-PalmForward.jpg](https://commons.wikimedia.org/wiki/File:ASL_S%40Side-PalmForward.jpg)
- Handshape Claw: [ASL Claw5@NearNose-PalmBack.jpg](https://commons.wikimedia.org/wiki/File:ASL_Claw5%40NearNose-PalmBack.jpg)
- Handshape Y: [ASL Y@Side.jpg](https://commons.wikimedia.org/wiki/File:ASL_Y%40Side.jpg)
- Handshape K: [ASL K@Side-PalmForward.jpg](https://commons.wikimedia.org/wiki/File:ASL_K%40Side-PalmForward.jpg)
- Handshape ILY: [ASL ILY@Side-PalmForward.jpg](https://commons.wikimedia.org/wiki/File:ASL_ILY%40Side-PalmForward.jpg)
- Handshape Index: [ASL 1@Side-PalmForward.jpg](https://commons.wikimedia.org/wiki/File:ASL_1%40Side-PalmForward.jpg)
- Handshape W: [Sign language W.svg](https://commons.wikimedia.org/wiki/File:Sign_language_W.svg)
- Handshape T: [Sign language T.svg](https://commons.wikimedia.org/wiki/File:Sign_language_T.svg)
