---
type: howto
tags: [howto, run, setup]
---
# Running Locally

The camera coach needs a **served** page: browsers block `getUserMedia` and the MediaPipe file loading when `index.html` is opened via `file://`. `http://localhost` counts as a secure context.

| Platform | How |
|---|---|
| Mac | double-click `start-mac.command` (right-click → Open if blocked). Runs `python3 -m http.server 8000` and opens `http://localhost:8000` after 1 second. |
| Windows | double-click `start-windows.bat`. Uses `py`, else `python`, else `npx --yes serve -l 8000 .` |
| Anywhere with Python | `python3 -m http.server 8000` in the repo root, open http://localhost:8000 |
| Any static server | works if it serves the repo root (paths are relative: `vendor/holistic/…`, `js/…`) |

Use **Chrome or Edge**; allow camera. Nothing uploads.

## Behaviour without the server
- Opened from `file://` → `Coach.whyNot()` = `"file"` → the "Check with camera" button reveals `CAM_HELP.file` explaining to use the start scripts. The rest of the app still works (localStorage works on `file://` in most browsers).
- If `Holistic` isn't defined (e.g. a preview environment that doesn't serve `vendor/`) → `"preview"` message.

## Dev notes
- No build, lint, test or install step. Edit a file, refresh.
- Reset state: clear `localStorage["firstsigns.v1"]` or use **Start fresh** on the sample banner ([[Data Model and Storage]]).
- Hosting idea: any static host (GitHub Pages, Vercel, Netlify) would work and would give HTTPS for camera use on phones; none is configured in the repo ([[Ideas and Next Steps]]).
- ~32 MB vendor bundle: first camera start downloads/initializes WASM + models ("Loading hand tracking (first time takes a few seconds)…").

See also [[Architecture]].
