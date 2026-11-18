# AI model transfer: the camera letter check, from the TSA repo into first_signs

Source repo: `suryakatari939-lang/TSA_softwaredev_surya-Anish`, branch `claude/nice-darwin-n61n6q`, commit `81e1c4e`.
Target: this repo (`first_signs`), branch `ai-model-transfer`, made from `main` at `2f9a82b`.

**Status: nothing in this branch is wired into the app.** No existing file was changed. It adds `js/letters.js`, two model files and this note. The screens (`js/abc.js`) and the router hook (`js/app.js`) must be merged by hand using the steps below, because `first_signs` has diverged from the source repo and its `abc.js` and `camera.js` are not the same files.

## 1. What is in this branch

| File | What it is |
|---|---|
| `models/letters.json` | The shipped letter model (98,697 bytes). Byte-identical to the source repo. Names A-Z from one hand. |
| `models/candidates/numbers.json` | A number model for digits 1-9 (53,743 bytes), copied from the source repo's `claude/numbers-model` branch, where it was built by a helper session. **Not in the source app's `models/` either**: it was never wired in, so it sits under `candidates/`. Name for reference: `numbers.json`. |
| `js/letters.js` | `LetterModel`: loads a model JSON and runs it in the browser (pure JS, no libraries). Same as the source repo except the header comment (it used to say "not wired into any screen yet"). |
| `ai-transfer/NOTES.md` | This file. |

Not copied on purpose: the 43-signs sequence model, any scraped clip data, packed `.npz` landmark files, `__pycache__`, the Python training scripts and the Node test scripts (they stay in the source repo under `ml/`).

## 2. How the files are loaded (script order and global names)

`js/letters.js` defines one global, `const LetterModel`. Nothing else in the app calls the models. Only the camera check code in `abc.js` (section 6) calls `LetterModel`.

Script order in `index.html` (add the third line; the others are already there):

```html
<script src="js/camera.js"></script>
<script src="js/letters.js"></script>   <!-- NEW: defines LetterModel -->
<script src="js/abc.js"></script>
```

API (all in `js/letters.js`):

- `await LetterModel.load(url = "models/letters.json")`: fetches the weights once and keeps them in one module-level variable. The URL is relative to the page (`index.html`), so serve the app from its root (`python3 -m http.server 8000`).
- `LetterModel.predict(landmarks, videoWidth, videoHeight, top = 3)`: `landmarks` = 21 points `{x, y, z}`. Returns `[{letter, p}, ...]`, best first, probabilities sum to 1 over all classes. Returns `[]` if no model is loaded or the hand does not have exactly 21 points. The app passes `(h.pts, 1, 1, 26)`: the features are ratios (every distance is divided by the wrist-to-middle-knuckle length), so the units do not matter as long as x and y are in the same units. `Coach` (`camera.js`) already gives `hand.pts` in pixels.
- `LetterModel.setModel(obj)`: for tests and Node; skips `fetch`.
- `LetterModel.info()`: `{ trainedOn }`.

**Model format** (both JSON files): `labels` (class names), `W1` (210x64 or 210x32), `b1`, `W2`, `b2`, `features: "pairwise-distances-2d"`, `trained_on` (a string). Network: 210 inputs (all pairwise x,y distances between the 21 hand points, divided by wrist(0)-to-middle-knuckle(9) distance) -> one ReLU hidden layer -> softmax.

**Limitation for the numbers model:** `letters.js` keeps one model in a closure. To use letters and numbers on the same page you need a second instance. Smallest change: wrap the IIFE as `const makeModel = () => { ... return { load, setModel, predict, ... }; };` then `const LetterModel = makeModel(), NumberModel = makeModel();` and call `NumberModel.load("models/candidates/numbers.json")`. Its labels are the strings `"1"` to `"9"`, so `predict` returns `{letter: "3", p: ...}`. It has no 0 or 10, and the app's numbers screen has 1-10.

## 3. How the models were made and how accurate they are

### Letter model (`models/letters.json`)

- **Trained on** (24,058 samples of hand points, 4x that with augmentation): ASLNow landmarks (HF `sid220`, MIT licence, 2,122), the Marxulia ASL-alphabet images run through MediaPipe Hand Landmarker (8,599; **licence not stated on the dataset page**), and ASL-HG (Mendeley Data `j4y5w2c8w9`, CC BY 4.0, all 10 volunteers, 13,337 hand detections). Credit ASL-HG if the model is shown or redistributed.
- **Recipe:** scikit-learn `MLPClassifier((64,), alpha=1e-3, max_iter=300)`, augmentation = 3 extra copies with random x/y stretch 0.85-1.15 and small landmark jitter. Script: `ml/train_letters.py` in the source repo.
- **Tests on data it never trained on:**

| Test set | What it is | Samples | Top-1 | Top-3 |
|---|---|---|---|---|
| SignAlphaSet (Mendeley `8fmvr9m98w`, CC BY 4.0) | close-up hands on black, few people | 5,137 | **82.8%** (87.7% without J, Z) | **95.3%** |
| Controlled Evaluation frames (Mendeley `97yd3b5f5h`) | small hand in a room, letters A-I only | 627 | **64.1%** | **79.3%** |

  **Honest range: about 64-83% top-1 and 79-95% top-3** on photos from datasets it never saw. The previous version (without ASL-HG) scored 78.4% / 94.3% and 66.7% / 77.7% on the same two sets.
- **Held-out people:** a model trained on ASL-HG volunteers P1-P8 scored 93.6% top-1 / 99.5% top-3 on volunteers P9 and P10. Those people were photographed in the same room and crop as the training volunteers, so this mostly shows the model learned that photo style. Do not quote it as accuracy for new parents.
- **Per letter** (top-1, SignAlphaSet; Controlled Evaluation in brackets where the letter exists there): A 100 (98), B 100 (70), C 100 (50), D 66 (0), E 98 (62), F 100 (91), G **7** (46), H 46 (76), I 100 (74), J 0, K 100, L 100, M **20**, N 100, O 96, P 84, Q 96, R 100, S 100, T 100, U 95, V 100, W 100, X 100, Y 100, Z 50. J and Z move; one frame cannot show that.
- **Spelled words** (replayed through the app's own word-check code, 54 easy words, 6 tries each, SignAlphaSet photos, one photo per letter held 1.4 s): right word accepted **83.6%**; a word with one wrong letter accepted **4.9%** (2.1% when the words contain no J or Z, which are not judged); a different real word accepted 0.0%.
- **Not tested:** a live webcam; the app's own tracker (MediaPipe Holistic, `modelComplexity 0`) on real video; real parents or any new signer; left-handed signers; lighting and skin-tone variety beyond what the public datasets hold; the Marxulia photos' signers. All accuracy numbers come from photos of research datasets, hand points found by MediaPipe's standalone Hand Landmarker, not Holistic. Never quote random-split scores (an earlier version scored 96.4% on a random split and 39% on a different dataset).

### Number model (`models/candidates/numbers.json`, digits 1-9)

- **Trained on** ASL-HG digits 1-9, volunteers P1-P8 (7,200 samples). Same features and network shape as the letters (hidden 32, `alpha=0.001`, no augmentation).
- **Tested on** volunteers P9 and P10: 1,798 of 1,798 correct (100.00% top-1). The helper session that built it also reports 100% for every volunteer left out in turn; I re-scored the P9+P10 result myself and got the same number. **Read that as "same room, same wall, same crop", not as 100% accuracy.** It was not tested on a webcam, a small hand far from the camera, or 16:9 frames.
- Digits 0 and 10 are not covered (0 only had 665 of 1,000 images where a hand was found). Full report: `ml/results/numbers_model.md` on the source repo's `claude/numbers-model` branch.

## 4. The exact thresholds and settings the app uses

All in the camera section of `abc.js` (section 6). Both modes read the **larger hand** in the frame (`f.hands` sorted by `palm`), call `LetterModel.predict(h.pts, 1, 1, 26)` every frame, and smooth each letter's probability: `smoothed = 0.65 * previous + 0.35 * now`.

| Setting | Value | Meaning |
|---|---|---|
| Letter mode match | top smoothed guess equals the target letter **and** its smoothed prob > 0.5, held for 700 ms, and the hand has let go since the last letter | one letter is matched live |
| `LC_CAPTURE` | 0.2 | word mode: a hold is captured when the top guess has smoothed prob at least this |
| Hold time | 700 ms | steady hold needed (letter and word mode) |
| Capture value | average of the raw (unsmoothed) probabilities over the hold | what is stored per letter |
| `LC_PASS` | 0.15 | word judged OK if the geometric mean of the target letters' captured probabilities is at least this |
| Top-k rule | every judged letter must be in that hold's top 3 guesses | otherwise the letter is marked off |
| Release rule | after a capture, the hand must "let go": smoothed prob of the captured letter < 0.35, or hand lost | so the same L held for 1 s is not read as a double L |
| `LC_MOTION` | `J`, `Z` | not judged from one frame; the user taps "I did it" |
| `LC_TRICKY` | `D`, `G`, `H`, `M` | get an on-screen heads-up (section 5) |
| Manual outs | "Skip letter" and "I did it" on every letter screen | the camera never blocks learning |

Word logic: capture each steady hold, judge the whole word at the end. This was chosen from 11 rules in `ml/word_scoring_eval.js` (source repo). With the shipped model, rule "whole word: average prob >= 0.15, each letter top 3" accepts the right word about 81% of the time, a one-letter typo about 2% and another real word about 0.2% on that script (84% / 2.1% / 0.0% through the app's own code, see above).

## 5. Tricky-letter warnings and the "experimental" wording

- Wording on the camera screen (inside `abcTry()`): *"It guesses what it sees. We have only tested it on photos from research datasets, never on a live webcam, and on those photos it was right between 2 and 4 times in 5, so trust your own eyes if it disagrees."* plus an "Experimental" eyebrow.
- Letter screen note (`lcTrickyNote`): "X is a tricky one for the camera. It often mixes X up with another letter even when your hand is right. Check the steps above, and if it says no, tap 'I did it'."
- Word screen note: "Tricky letters in this word: H, M. ..." when the word contains a tricky letter.
- J and Z keep their own note ("J moves. One camera frame can't show movement, so tap 'I did it'").
- **Which letters are flagged.** The code flags `D, G, H, M` (plus the J/Z "moves" note). You asked for `J, P, D, H, M, X, G, B`. That list came from the *older* model (J 7%, P 23%, D 33%, H 40%, M 42%, X 45%, G 52%, B 60%). The shipped model scores P 84%, X 100% and B 100% on SignAlphaSet (B 70% on the room frames), so flagging them would warn about letters that now work. To use your list instead, change one line in the pasted code: `const LC_TRICKY = new Set(["J", "P", "D", "H", "M", "X", "G", "B"]);` (J then shows both notes; it is also in `LC_MOTION`).

## 6. What to change in first_signs to make it work

`first_signs` `main` (commit `2f9a82b`) has these differences that matter:

- `js/abc.js` is a different file from the source repo's (it has `hero(...)`, `hintButton`, `abcHint`, `bumpGoal`, no `abcVideo`, no camera code). **Do not replace it.** Merge the pieces below.
- `js/camera.js` already exposes what the check needs: `Coach.supported()`, `Coach.whyNot()`, `Coach.setTarget()`, `Coach.start(video, canvas, onFrame, status)`, `Coach.stop()`, and each frame is `{ t, body, hands, live }` with `hands[i].pts` (21 pixel points) and `hands[i].palm`, and `live.face`. **No change to `camera.js` is needed.** (Its hand-shape rules differ slightly from the source repo's: claw/curl thresholds. That does not affect the camera check, which uses only `pts`, `palm` and `live.face`.)
- `CAM_HELP` and `S.abc` already exist (`js/app.js`); `abcRate`, `wordId`, `WP`, `LETTERS`, `abcSteps`, `go`, `route`, `esc`, `$` already exist in `abc.js`/`app.js`/`alphabet.js`.
- **State keys:** no new ones. The check keeps its state in memory only (`LC`, `lcDet`). A word that passes in word practice calls the existing `abcRate("w-WORD", ok)`, so it uses the existing `S.abc.cards` in `localStorage["firstsigns.v1"]`. `first_signs` also has `localStorage["firstsigns.user"]` (login); not touched.
- **Paths:** `models/letters.json` is loaded with a relative URL from `index.html`. Keep `models/` at the repo root.

### Steps (line numbers are in `first_signs` `main`)

1. **`index.html`** (script tags at lines 28-33): add `<script src="js/letters.js"></script>` between `camera.js` and `abc.js`.

2. **`js/abc.js`, `viewAbc` (line ~80):** add `if (sub === "try") return abcTry();` after the `wordpractice` line.

3. **`js/abc.js`, near the top-level helpers (after line 16):** paste the `camSupported` and `camNote` helpers:

```js
// Camera buttons only appear where the camera can run (localhost or https, Chrome/Edge).
const camSupported = () => typeof Coach !== "undefined" && Coach.supported();
const camNote = () => camSupported() ? "" : `<p class="note"><b>Camera check:</b> ${esc((typeof CAM_HELP !== "undefined" && CAM_HELP[Coach.whyNot()]) || "")}</p>`;
```

4. **`js/abc.js`, `abcCardHtml` (lines 47-58):** inside `<div class="row">`, after the `hintButton(...)` line, add the letter camera button (letters only):
   ```js
   ${LETTERS.includes(x) && camSupported() ? `<button class="btn ghost" data-abc="cam" data-val="${x.id}">Check with camera</button>` : ""}
   ```

5. **`js/abc.js`, `abcLetters` (line ~104):** append `${camNote()}` after `${handNote}` (shows why the camera is unavailable, e.g. opened as `file://`).

6. **`js/abc.js`, `abcSpell` (after the `Start over`/`Next letter` buttons, line ~141, before `</section>`):**
   ```js
   ${camSupported() ? `<div class="options"><button class="btn ghost" data-abc="camword" data-val="${esc(w)}">Spell it with the camera</button></div>` : ""}
   ```

7. **`js/abc.js`, `abcWordPractice` (line ~258):** replace the `Show the handshapes` options row with:
   ```js
   <div class="options"><button class="btn" data-abc="wreveal">Show the handshapes</button>${camSupported() ? `<button class="btn sun" data-abc="wcam">Check with camera</button>` : ""}</div>
   ```

8. **`js/abc.js`, before `// Progress panel` (line ~263):** paste the whole camera section below (`let LC` ... `mountLetterCamera`).

9. **`js/abc.js`, `abcClick` (line ~272, before the final `return true;`):** add these branches:

```js
  else if (a === "cam") lcStart("letter", null, [v], location.hash.slice(1));
  else if (a === "camword") lcStart("word", v, lcIds(v), location.hash.slice(1));
  else if (a === "wcam") lcStart("word", WP.items[WP.i], lcIds(WP.items[WP.i]), "abc.wordpractice", true);
  else if (a === "camback") go(LC ? LC.back : "abc");
  else if (a === "camskip") lcAdvance(false);
  else if (a === "camyes") lcAdvance(true);
  else if (a === "camagain") lcStart(LC.mode, LC.word, LC.ids, LC.back, LC.wp);
  else if (a === "camfinish") {
    if (LC.wp && WP) { const ok = v === "1"; abcRate(wordId(WP.items[WP.i]), ok); if (ok) WP.right++; WP.i++; WP.revealed = false; go("abc.wordpractice"); }
    else go(LC.back);
  }
```

10. **`js/app.js`, `route()` (lines 541-542):** change

    ```js
    if (camOn) mountCamera(); else Coach.stop();
    ```
    to
    ```js
    if (camOn) mountCamera(); else if (tab === "abc" && sub === "try" && LC) mountLetterCamera(); else Coach.stop();
    ```
    (`tab` and `sub` are already defined in `route()` there; `LC` is a global from `abc.js`.)

11. **`styles.css`** (near `.tile.done` / `.tile.on`, lines 344-345): add

    ```css
    span.tile { display: inline-grid; place-items: center; }
    .tile.got { border-color: var(--teal); color: var(--teal-d); }
    .tile.off { border-color: var(--coral-d); color: var(--coral-d); }
    ```
    The pasted screen also uses classes `cam-stage`, `cam-status`, `cam-live`, `big`, `note`, `card pop`, `eyebrow`, `btn good/bad/sun/ghost`, which already exist in `first_signs`.

### The camera section to paste (step 8), exactly as in the source repo at `81e1c4e`

Source: `js/abc.js` lines 262-396. It needs the globals named above and nothing else.

```js
/* ---------- Camera check for letters and spelled words (experimental) ----------
   Uses the learned letter model (js/letters.js) on the live hand points from Coach.
   Two modes. "letter": one letter, matched live (the guess must be the target and hold 0.7 s).
   "word": you spell the whole word; each steady hold is captured, then the WHOLE word is judged at the end:
   every letter must be among the model's top 3 guesses and the word's average confidence must reach 0.15
   (ml/replay_spelling.js: this accepts a right word ~84% of the time and a one-letter typo ~2%, on photos).
   LC = { mode, word, ids, i, done, slots, seen, pass, off, finished, back, wp }. In memory only. */
let LC = null, lcDet = { sm: {}, since: 0, released: true, hold: null, acc: null, n: 0, last: null };
const LC_MOTION = new Set(["J", "Z"]);   // these two move; one still frame can't show it
const LC_TRICKY = new Set(["D", "G", "H", "M"]);   // the camera often confuses these (D, G, H, M scored 0-66% on photos from datasets it never saw: vault/Camera Coach/Accuracy Test.md)
const lcTrickyNote = ch => `<p class="note"><b>${ch} is a tricky one for the camera.</b> It often mixes ${ch} up with another letter even when your hand is right. Check the steps above, and if it says no, tap "I did it".</p>`;
const LC_CAPTURE = 0.2;                 // a hold is captured when the top guess has at least this smoothed probability
const LC_PASS = 0.15;                    // average (geometric) probability the word must reach
const lcLetters = () => LC.ids.map(id => LETTERS.find(l => l.id === id));
const lcFresh = () => ({ sm: {}, since: 0, released: true, hold: null, acc: null, n: 0, last: null });
function lcStart(mode, word, ids, back, wp) {
  LC = { mode, word, ids, i: 0, done: ids.map(() => false), slots: [], seen: [], pass: false, off: [], finished: false, back, wp: !!wp };
  lcDet = lcFresh();
  go("abc.try");
}
const lcIds = w => [...w].map(c => LETTERS.find(l => l.ch === c).id);
const lcTop = (p, n) => Object.keys(p).sort((a, b) => p[b] - p[a]).slice(0, n);
function abcTry() {
  if (!LC) return abcLetters();
  const x = lcLetters()[0], word = LC.mode === "word";
  return `<button class="back" data-abc="camback">← Back</button>
  <div class="stack"><span class="eyebrow">Experimental</span><h1>${word ? "Spell " + esc(LC.word) : "Check the letter " + esc(x.ch)}</h1>
  <p class="muted">Sit back so your face and shoulders are in view, then hold ${word ? "each letter steady for a moment, near your shoulder. Let go or bounce your hand between letters. We judge the whole word at the end." : "the letter up near your shoulder."} It guesses what it sees. We have only tested it on photos from research datasets, never on a live webcam, and on those photos it was right between 2 and 4 times in 5, so trust your own eyes if it disagrees. Use the handshape steps below to check yourself.</p>${word && [...LC.word].some(c => LC_TRICKY.has(c)) ? `<p class="note"><b>Tricky letters in this word:</b> ${[...new Set([...LC.word].filter(c => LC_TRICKY.has(c)))].join(", ")}. The camera often mixes these up with other letters, so use "I did it" if it keeps saying no.</p>` : ""}</div>
  <section class="card pop">
    <div id="lc-tiles"></div>
    <div class="cam-stage" id="cam-stage"><video id="cam-video" playsinline muted></video><canvas id="cam-canvas"></canvas><div class="cam-status" id="cam-status">Starting camera…</div></div>
    <p class="cam-live" id="lc-live" aria-live="polite">Looking for your hand…</p>
    <div id="lc-body"></div>
  </section>`;
}
function lcPaint() {
  const t = $("#lc-tiles"), b = $("#lc-body"); if (!t || !b || !LC) return;
  const ls = lcLetters(), word = LC.mode === "word";
  const cls = k => LC.finished ? (word ? (LC.off[k] ? "off" : "done") : (LC.done[k] ? "done" : "")) : k === LC.i ? "on" : k < LC.i ? (word ? "got" : LC.done[k] ? "done" : "") : "";
  t.innerHTML = ls.length > 1 ? `<div class="tiles" role="group" aria-label="Letters">${ls.map((l, k) => `<span class="tile ${cls(k)}">${l.ch}</span>`).join("")}</div>` : "";
  if (LC.finished) {
    let head, sub;
    if (word) {
      const bad = ls.map((l, k) => LC.off[k] ? `letter ${k + 1} (${l.ch}) looked more like ${LC.seen[k] || "nothing I could read"}` : null).filter(Boolean);
      head = LC.pass ? "Looks like " + esc(LC.word) + " ✓" : "Not quite yet";
      sub = LC.pass ? "Nice spelling. The camera can be wrong, so trust your own eyes too." : (bad.length ? "Check " + esc(bad.join(", ")) + ". Compare it with the steps, then try again." : "Try again, holding each letter steady.");
    } else {
      const n = LC.done.filter(Boolean).length; head = n + " of " + ls.length + " letters matched"; sub = n === ls.length ? "Nice." : "Try it again.";
    }
    b.innerHTML = `<h2 style="text-align:center">${head}</h2><p class="muted" style="text-align:center">${sub}</p>
      <div class="options">${LC.wp ? `<button class="btn bad" data-abc="camfinish" data-val="0">Not yet</button><button class="btn good" data-abc="camfinish" data-val="1">Got it</button>`
        : `<button class="btn ghost" data-abc="camagain">Try again</button><button class="btn sun" data-abc="camfinish" data-val="1">Done</button>`}</div>`;
    return;
  }
  const x = ls[LC.i], dbl = LC.i > 0 && ls[LC.i - 1].ch === x.ch;
  b.innerHTML = `<span class="eyebrow" style="text-align:center">${ls.length > 1 ? `Letter ${LC.i + 1} of ${ls.length}` : "Make this letter"}</span>
    <div class="big">${esc(x.ch)}</div>${abcSteps(x)}
    ${dbl ? `<p class="note"><b>Double letter:</b> let go of the letter, then bounce your hand slightly and make it again.</p>` : ""}
    ${LC_TRICKY.has(x.ch) ? lcTrickyNote(x.ch) : ""}
    ${LC_MOTION.has(x.ch) ? `<p class="note"><b>${x.ch} moves.</b> One camera frame can't show movement, so tap "I did it" when you have signed it.</p>` : ""}
    <div class="options"><button class="btn ghost" data-abc="camskip">Skip letter</button><button class="btn" data-abc="camyes">I did it</button></div>`;
}
// Word mode: the judgement. slots[k] = the letter-probabilities captured for letter k (or null if skipped).
function lcJudge() {
  const ls = [...LC.word]; let used = 0, sumLog = 0, ok = true; LC.off = ls.map(() => false);
  ls.forEach((c, k) => {
    if (LC_MOTION.has(c)) return;                       // J and Z are not judged from one frame
    const p = LC.slots[k]; used++;
    if (!p) { LC.off[k] = true; ok = false; return; }
    const pc = p[c] || 0; sumLog += Math.log(pc + 1e-6);
    if (!lcTop(p, 3).includes(c)) { LC.off[k] = true; ok = false; }
  });
  LC.pass = ok && (used === 0 || Math.exp(sumLog / used) >= LC_PASS);
  if (!LC.pass && !LC.off.some(Boolean)) {                // average too low but no single letter stands out: flag the weakest
    let w = -1, wp = 2; ls.forEach((c, k) => { const p = LC.slots[k]; if (!LC_MOTION.has(c) && p && (p[c] || 0) < wp) { wp = p[c] || 0; w = k; } });
    if (w >= 0) LC.off[w] = true;
  }
  LC.finished = true;
}
function lcAdvance(manualYes) {            // manualYes: true = "I did it", false = "Skip letter"
  if (!LC || LC.finished) return;
  const here = lcLetters()[LC.i];
  if (LC.mode === "word") {
    LC.slots.push(manualYes ? { [here.ch]: 1 } : null); LC.seen.push(manualYes ? here.ch : null);
  } else LC.done[LC.i] = !!manualYes;
  LC.i++;
  const next = lcLetters()[LC.i];
  lcDet = lcFresh(); lcDet.last = here.ch; lcDet.released = !(next && next.ch === here.ch);   // a double letter needs the hand to let go first
  if (!next) { if (LC.mode === "word") lcJudge(); else LC.finished = true; }
  lcPaint();
}
function lcFrame(f) {
  const live = $("#lc-live"); if (!live || !LC || LC.finished) return;
  const h = f.hands.filter(Boolean).sort((a, b) => b.palm - a.palm)[0], D = lcDet;
  if (!h) {
    D.sm = {}; D.since = 0; D.released = true; D.hold = null; D.acc = null; D.n = 0;
    live.textContent = f.live && !f.live.face ? "Sit back so your face and shoulders are in the picture, then hold your hand up near your shoulder." : "Looking for your hand…"; return;
  }
  const sm = D.sm, raw = {};
  LetterModel.predict(h.pts, 1, 1, 26).forEach(r => { raw[r.letter] = r.p; sm[r.letter] = sm[r.letter] === undefined ? r.p : 0.65 * sm[r.letter] + 0.35 * r.p; });
  const top = lcTop(sm, 1)[0], x = lcLetters()[LC.i], want = x.ch;
  if (D.last && sm[D.last] !== undefined && sm[D.last] < 0.35) D.released = true;
  if (LC.mode === "letter") {
    live.textContent = top === want ? `Looks like ${want}. Hold it…` : `Looks like ${top}. You need ${want}.`;
    if (!LC_MOTION.has(want) && top === want && sm[want] > 0.5 && D.released) { if (!D.since) D.since = f.t; else if (f.t - D.since >= 700) lcAdvance(true); }
    else D.since = 0;
    return;
  }
  // word mode: capture whatever the hand holds steadily, judge at the end
  if (!D.released || sm[top] < LC_CAPTURE) { D.hold = null; D.acc = null; D.n = 0; D.since = 0; live.textContent = D.released ? "Hold the letter steady…" : "Let go or bounce your hand, then the next letter."; return; }
  if (D.hold !== top) { D.hold = top; D.since = f.t; D.acc = {}; D.n = 0; }
  for (const k in raw) D.acc[k] = (D.acc[k] || 0) + raw[k]; D.n++;
  live.textContent = `Looks like ${top}. Hold it…`;
  if (f.t - D.since >= 700) {
    const avg = {}; for (const k in D.acc) avg[k] = D.acc[k] / D.n;
    LC.slots.push(avg); LC.seen.push(D.hold); LC.i++;
    D.last = D.hold; D.released = false; D.hold = null; D.acc = null; D.n = 0; D.since = 0; D.sm = {};
    if (LC.i >= LC.ids.length) lcJudge();
    lcPaint();
    live.textContent = LC.finished ? "" : `Got letter ${LC.i}. Let go, then the next one.`;
  }
}
async function mountLetterCamera() {
  lcPaint();
  const status = m => { const el = $("#cam-status"); if (el) { el.textContent = m; el.hidden = !m; } };
  const video = $("#cam-video"), canvas = $("#cam-canvas");
  video.addEventListener("loadedmetadata", () => { $("#cam-stage").style.aspectRatio = video.videoWidth + " / " + video.videoHeight; });
  try { await LetterModel.load(); } catch (e) { status("The letter model could not load."); return; }
  Coach.setTarget(null);
  Coach.start(video, canvas, lcFrame, status).catch(err => {
    status(err && err.name === "NotAllowedError"
      ? "Camera access is blocked. Allow the camera in your browser's address bar, then try again."
      : "The camera couldn't start. Check that no other app is using it.");
  });
}
```

## 7. How to check it works after merging

- Serve the app from its root and open it in Chrome or Edge at `http://localhost:8000` (the camera needs `localhost` or `https`, not `file://`).
- ABC tab -> Letters: a letter card shows "Check with camera". Open it, allow the camera, sit back so your face and shoulders are in view, hold the letter near your shoulder. J and Z show the "moves" note; D, G, H, M show the tricky note.
- ABC tab -> Spell a word: type a word, "Spell it with the camera".
- **Checked once:** steps 1-11 were applied to a scratch copy of `first_signs` `main` (not committed here) and smoke-tested in headless Chromium with a fake camera and a real hand sample: 26 letter cards get the camera button, G shows the tricky note, the experimental wording shows, `models/letters.json` loads, a held B is matched, the spelling screen offers the camera and lists H, M for HAM, and there were no page errors (8 of 8). It was **not** tested with a real webcam or on the word-practice button (`wcam`) and its Got it / Not yet flow.
- The source repo has fuller headless-browser tests for this screen (`ml/test_letter_camera.js`, 23 checks, and `ml/replay_spelling.js`) that inject real hand points; they were not run against `first_signs`.
- Never trust a "Looks like X" as proof the sign was right. The screen says so, and the Skip and "I did it" buttons are the fallback.

## 8. Credits and licences

- Letter and number models are weights only (no photos or landmarks) but were trained on: ASLNow (MIT, HF `sid220`), the Marxulia ASL-alphabet image set (licence not stated), ASL-HG (CC BY 4.0, Mendeley Data, doi 10.17632/j4y5w2c8w9.1; please credit it).
- Test-only datasets: SignAlphaSet (CC BY 4.0, Mendeley `8fmvr9m98w`) and the Controlled Evaluation frames (Mendeley `97yd3b5f5h`).
- MediaPipe Hand Landmarker / Holistic: Apache 2.0, Google.
