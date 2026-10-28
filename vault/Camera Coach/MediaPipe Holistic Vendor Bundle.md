---
type: reference
tags: [camera, vendor, mediapipe]
---
# MediaPipe Holistic Vendor Bundle (`vendor/holistic/`)

Google's **@mediapipe/holistic 0.5.1675471629** (Apache-2.0; `package.json` author `mhays@google.com`), committed into the repo so the camera coach works offline and without a CDN. Loaded globally by `<script src="vendor/holistic/holistic.js">` → `Holistic`.

| File | Size | Role |
|---|---|---|
| `holistic.js` | 78 KB | JS API (`Holistic`, options, `send`, `onResults`) |
| `holistic_solution_simd_wasm_bin.{js,wasm}` | 276 KB / 6.5 MB | WASM + SIMD build (used when supported) |
| `holistic_solution_wasm_bin.{js,wasm}` | 276 KB / 6.4 MB | non-SIMD fallback |
| `holistic_solution_packed_assets.data` + `_loader.js` | 16.9 MB / 9.8 KB | bundled model assets |
| `pose_landmark_lite.tflite` | 2.8 MB | pose model used at `modelComplexity: 0` |
| `holistic.binarypb` | 1.7 KB | MediaPipe graph |
| `README.md`, `package.json` | — | upstream metadata |

Total ≈ 32 MB — ~all of the repo's weight. Files are resolved with `locateFile: f => "vendor/holistic/" + f`, which is relative to the page URL, so the app must be served from the repo root ([[Running Locally]]).

How it's used: [[Camera Coach Overview]].

Output fields consumed: `faceLandmarks` (468), `poseLandmarks` (33, uses 2/5/7/8/9/10/11/12), `leftHandLandmarks` / `rightHandLandmarks` (21 each).
