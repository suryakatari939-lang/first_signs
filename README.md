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
- `js/alphabet.js`: the ASL alphabet, numbers 1 to 10 and fingerspelling tips
- `js/abc.js`: the ABC tab (alphabet, numbers, spell a word, practice)
- `js/app.js`: screens, practice and progress (saved in the browser with localStorage)
- `js/camera.js`: camera coach
- `vendor/holistic/`: MediaPipe Holistic 0.5 (Apache 2.0 license, from Google)
