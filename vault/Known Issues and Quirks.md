---
type: health
tags: [issues, quirks, review]
---
# Known Issues and Quirks

Found by reading the code at commit `e3c743a` (2026-10-28). Nothing here has been fixed in the repo; none were run in a browser (no camera in the analysis environment), so camera behaviour is judged from the code only. Verified items are marked ✔ (checked directly in source).

## Content / copy mismatches
1. ✔ **42 vs 43 signs.** `README.md` says "teaches 42 everyday signs"; `SIGNS` has **43** (Mealtime 8, Bath 6, Feelings 7, Family 6, Play 9, Safety 7). Either fix the README/plan or the data. ([[Signs Index]])
2. ✔ **"Known after two separate days" is not what the code does.** `learn()` puts a sign in box 1 and one correct rating moves it to box 2 = `isKnown`. A sign can be *Known* after one correct answer in a single session, but the Progress screen note says two separate days. ([[Spaced Repetition]], [[Progress Screen]])
3. Stats in "Why this matters" (90%+, ≤40%, 70%) carry source attributions in the UI; I did not verify them. Check before presenting to judges. ([[Project Overview]])

## Logic quirks
4. ✔ **Switching practice mode re-rolls the set and silently "starts" more signs.** `startPractice` calls `learn()` on all 5–6 items; since those are no longer "new", toggling mode (or "Practice again") pulls different new signs and starts them too. Over a few toggles you can start many signs without practising them. ([[Practice Screen]])
5. ✔ **Mission eyebrow can name the wrong routine.** The mission sign is frozen for the day, but the label uses the *current* time-of-day routine (`<10` meal, `<17` play, else bed). ([[Today Screen]])
6. ✔ **State mutated during render.** `viewToday()` assigns `S.mission` while building HTML (saved afterwards by `route()`).
7. ✔ **Sample data never goes away on its own.** `S.sample` stays true until "Start fresh"; real activity mixes with the fake streak/log, and the banner keeps showing. ([[Data Model and Storage]])
8. ✔ **A miss is due immediately** (`INTERVALS[0] = 0`), so a failed sign stays in the "due" list and will be in the next `todaysSet()` immediately; fine for learning but can make sessions repetitive.
9. ✔ **Practice session is not persisted** — refresh mid-session loses `P`.
10. ✔ **Tab bar vs "Start practice"**: the tab link resumes the old `P`, the Today button resets it — inconsistent expectations. ([[Router and Events]])

## Camera coach limitations
11. ✔ **`still` always passes** → LOVE, BED, I LOVE YOU are verified on handshape + place only. `any` needs only 0.4F of travel. ([[Movement Detection]])
12. ✔ **Handshape set is small.** A/S/T look the same as `fist`; K approximated by `two`/`index`. ILY and Y detection ignore the thumb (pinky-only counts as Y). ([[Handshape Detection]])
13. ✔ **Several checks are very permissive** (e.g. DOG accepts six handshapes at `body` with `any` movement). Good for forgiveness, but the coach can't really confirm those signs. ([[Camera CHECKS Table]])
14. ✔ **Two-handed rule asymmetry**: both hands must match a shape, but location/movement pass if *either* hand does. ([[Evaluation and Scoring]])
15. ✔ **Only the first `move` entry is used for the failure hint**, even if a different one was closer.
16. ✔ **Palm orientation, facial expression and body language are not checked**, though several sign descriptions rely on them (SAD, MAD, SLEEP, yes/no eyebrows).
17. Performance/accuracy depend on lighting, camera framing and `modelComplexity: 0`; the first start loads ~30 MB of WASM/models. Not benchmarked.
18. ✔ **Overlay guide for `cheek`** only draws the right-side cheek point (`cheeks[1]`).

## Privacy / dependencies
19. ✔ "Nothing is uploaded" is true for video, but `index.html` loads **Google Fonts** from the network on every visit (leaks IP/UA to Google, fails offline → fallback fonts). Self-hosting the two fonts would make the claim airtight. ([[Design System]])
20. "Watch it signed" opens a Signing Savvy **search URL** (`/search/<gloss>`), not a verified video page; multi-word glosses like "all done" or "i love you" may not hit directly. ([[Routine Detail Screen]])

## Engineering
21. ✔ No tests, no linter, no CI, no `package.json` at root, no PWA manifest/service worker (despite phone-first layout). `Coach._readHand` is exported, so unit tests are feasible.
22. ✔ Full `innerHTML` re-render on every click resets focus/scroll (accessibility impact for keyboard/screen-reader users beyond the `aria` attributes present).
23. ✔ `.chip.known` CSS and the `id="sign-<id>"` anchors are unused.
24. ✔ `.gitignore` is the generic GitHub Node template; irrelevant to this repo.
25. ✔ Large binary vendor files are committed directly (~32 MB) — fine for a competition, heavy for cloning. ([[MediaPipe Holistic Vendor Bundle]])

See [[Ideas and Next Steps]] for what to do about these.
