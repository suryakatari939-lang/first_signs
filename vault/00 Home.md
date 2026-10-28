---
type: home
tags: [moc, home]
---
# First Signs — Vault Home

> Map of content for the **First Signs** repo (`suryakatari939-lang/TSA_softwaredev_surya-Anish`): a TSA Software Development entry by Surya and Anish. A bite-sized ASL app for hearing parents of deaf children, with spaced practice and an in-browser camera coach.

Start with [[Project Overview]], then [[Architecture]]. Last full analysis: 2026-10-28 at commit `e3c743a`; ABC tab (alphabet, numbers, fingerspelling) added afterwards (see [[Git History]]).

## The project
- [[Project Overview]] — what it is, who it's for, feature list
- [[Architecture]] — static site, no build, how the pieces connect
- [[File Map]] — every file, what's in it, function index with line numbers
- [[Running Locally]] — how to launch it (camera needs a server)
- [[Design System]] — colors, fonts, layout, accessibility
- [[Glossary]] — ASL + MediaPipe + app terms

## App logic (`js/app.js`)
- [[Data Model and Storage]] — localStorage state shape, sample data
- [[Spaced Repetition]] — Leitner boxes, intervals, today's set
- [[Router and Events]] — hash routes, click delegation, re-render model
- Screens: [[Today Screen]] · [[Routines Screen]] · [[Routine Detail Screen]] · [[Practice Screen]] · [[Camera Coach Screen]] · [[Progress Screen]]
- ABC tab (alphabet, numbers 1–10, fingerspelling): [[ABC Screens]]

## Camera coach (`js/camera.js`)
- [[Camera Coach Overview]] — pipeline from webcam frame to verdict
- [[Zones and Body Landmarks]] · [[Handshape Detection]] · [[Movement Detection]]
- [[Evaluation and Scoring]] — how a 3-second recording is judged
- [[CHECKS Format]] · [[Camera CHECKS Table]]
- [[MediaPipe Holistic Vendor Bundle]]

## Content (`js/signs.js`)
- [[Routines and Signs Overview]] · [[Signs Index]] (43 signs) · [[Phrases]] · [[Handshape Cheat Sheet]]
- Alphabet, numbers and fingerspelling content: [[Alphabet and Numbers]]
- Routines: [[Mealtime]] · [[Bath & bedtime]] · [[Feelings]] · [[Family]] · [[Play & manners]] · [[Safety & getting out]]

## Health of the project
- [[Known Issues and Quirks]] — bugs, inconsistencies, gotchas found in the code
- [[Ideas and Next Steps]]
- [[Open Questions]] — things I could not verify
- [[Git History]]
- [[Maintaining This Vault]] — how to keep this vault in sync with the code
