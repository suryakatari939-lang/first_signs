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

## Working with a collaborator
The repo has more than one person working on it, so the vault is shared through git like code.
- The vault only reaches a teammate once it is merged to `main` (until then it sits on the branch it was committed to).
- Obsidian's per-user files (`vault/.obsidian/workspace*.json`, cache, trash) are git-ignored so two people opening the vault don't create conflicts. Shared Obsidian settings would be the other `.obsidian/` files, if anyone adds them.
- Pull before you edit notes and commit small, so edits to the same note don't collide. Prefer appending to a list over reordering it.
- Whoever changes `js/` updates the matching note in the same commit ([[File Map]]), so the vault doesn't drift for the other person.
- Record decisions and answers in [[Open Questions]] / [[Known Issues and Quirks]] rather than only in chat, and say who owns what there if you split the work. Role split between the two team members isn't recorded anywhere yet.

## Conventions
- One concept per note; link with wikilinks (double square brackets); frontmatter has `type` and `tags`.
- Quote exact thresholds and file/line refs so a future session doesn't need to re-derive them.
- Facts marked "I could not verify" stay in [[Open Questions]] until confirmed.
