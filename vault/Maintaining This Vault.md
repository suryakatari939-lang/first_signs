---
type: meta
tags: [meta, maintenance]
---
# Maintaining This Vault

This vault (`vault/` in the repo) is the project's long-term memory: open the **`vault/` folder** as a vault in Obsidian (File → Open folder as vault). Start at [[00 Home]]. The repo-root `DEVELOPER_NOTES.md` points anyone new to the project here first.

## Layout
| Folder | Contents |
|---|---|
| (root) | Home, [[Project Overview]], [[Architecture]], [[File Map]], [[Design System]], [[Running Locally]], [[Glossary]], issues/ideas/questions/history |
| `App/` | `js/app.js` logic and one note per screen |
| `Camera Coach/` | `js/camera.js` internals + generated [[Camera CHECKS Table]] |
| `Content/` | `js/signs.js` content: routines, 43 sign notes, phrases, cheat sheet, [[Signs Index]] |

## Keeping it in sync
- **Generated notes** (everything in `Content/Signs/`, `Content/Routines/`, `Content/Signs Index.md`, `Content/Phrases.md`, `Content/Handshape Cheat Sheet.md`, `Camera Coach/Camera CHECKS Table.md`) were produced from `js/signs.js` by a throwaway Node script. If signs change, regenerate them or edit by hand; don't trust them over the source.
- **Hand-written notes** cite line numbers and thresholds from the code at commit `e3c743a`. When changing `js/app.js` or `js/camera.js`, update the matching note (see [[File Map]] for which note covers which function).
- When you fix something in [[Known Issues and Quirks]], tick it off there. When you learn an answer in [[Open Questions]], move it into the right note.
- Add a line to [[Git History]] for notable milestones.

## Conventions
- One concept per note; link with wikilinks (double square brackets); frontmatter has `type` and `tags`.
- Quote exact thresholds and file/line refs so a future session doesn't need to re-derive them.
- Facts marked "I could not verify" stay in [[Open Questions]] until confirmed.
