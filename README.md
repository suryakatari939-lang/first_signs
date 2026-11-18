# First Signs

Our TSA Software Development entry.

A bite-sized ASL app for hearing parents of deaf children. It teaches 42 everyday signs grouped
by daily routine (mealtime, bath and bedtime, feelings, family, play, safety), with spaced
practice, a daily "use it with your child" goal, and a camera coach that checks your sign.

## What's in the app

- **Learn:** a path of short lessons, one unit per routine. Each lesson teaches up to 3 signs,
  then quizzes you. The green chest at the end of a unit is a review.
- **Lessons:** one question per screen, with hearts, instant feedback and a "Continue" bar.
- **Practice:** quick sessions (read and pick, sign it yourself, camera coach) and a handshape cheat sheet.
- **ABC:** the alphabet, numbers 1 to 10, fingerspelling and easy-word lessons.
- **Rewards and Profile:** badges, streak, XP, daily goal, and the real moments you've signed with your child.

## Camera letter check (experimental)

The ABC tab can check a letter or a spelled word with the camera, using a small learned model
(`models/letters.json`, run by `js/letters.js`). It was only tested on photos from research
datasets (about 64-83% top-1), never on a live webcam, so the screen says so and every letter has
"Skip" and "I did it" buttons. Details, accuracy numbers, thresholds and licences are in
`ai-transfer/NOTES.md`. `models/candidates/numbers.json` (digits 1-9) is included but not wired in.

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

## Picture credits

The app shows line drawings of handshapes, not photos of people. They come from the public-domain drawn manual alphabet on [Wikimedia Commons](https://commons.wikimedia.org/) ("Sign language A.svg", "Sign language B.svg" and so on, originally from wpclipart.com) and load from Commons, so they need an internet connection. Used: A, B (for the flat hand), C, K, S, T, W, Y.
