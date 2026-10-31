# First Signs (TSA Software Development entry)

Static, no-build ASL learning app for hearing parents of deaf children: vanilla HTML/CSS/JS, `localStorage` state, MediaPipe Holistic camera coach vendored in `vendor/holistic/`.

## Project memory: Obsidian vault
A full analysis of this repo lives in `vault/` (open that folder as an Obsidian vault). **Read `vault/00 Home.md` first**, then the notes relevant to your task:
- App logic and screens → `vault/App/`
- Camera coach internals and thresholds → `vault/Camera Coach/`
- Signs, routines, phrases, alphabet/numbers content → `vault/Content/`; ABC tab (letters, numbers 1-10, spell-a-word, easy-word lessons) → `vault/App/ABC Screens.md`, `vault/Content/Easy Word Lessons.md`
- Known bugs and quirks → `vault/Known Issues and Quirks.md`; unanswered questions → `vault/Open Questions.md`

When you change code in `js/`, update the matching vault note (see `vault/File Map.md` and `vault/Maintaining This Vault.md`). Notes under `vault/Content/Signs/`, `vault/Content/Routines/` and the CHECKS table are generated from `js/signs.js`; regenerate or hand-edit them when signs change.

## Run
`python3 -m http.server 8000` in the repo root, open http://localhost:8000 in Chrome/Edge (camera needs a served page, not `file://`). No build, lint or tests exist.

## Facts to keep straight
- Script load order: `vendor/holistic/holistic.js`, `js/signs.js`, `js/alphabet.js`, `js/camera.js`, `js/abc.js`, `js/app.js` (shared globals).
- State key: `localStorage["firstsigns.v1"]`.
- The data has 43 signs although the README says 42 (unresolved; see the vault).
- ABC progress is in `S.abc.cards`, separate from `S.cards`; easy-word cards are `w-<WORD>` entries in the same object.
