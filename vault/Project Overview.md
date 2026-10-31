---
type: overview
tags: [project, overview]
---
# Project Overview

**First Signs** — "Our TSA Software Development entry." A bite-sized American Sign Language (ASL) app for **hearing parents of deaf children**.

- Repo: `suryakatari939-lang/TSA_softwaredev_surya-Anish` (GitHub). Authors per repo name: Surya and Anish. History is in [[Git History]].
- Project plan (idea, features, research): not in the repo yet, see [[Open Questions]].

## The problem (as stated in the app's own copy)
From [[Progress Screen]] "Why this matters":
- 90%+ of deaf children are born to hearing parents, most of whom don't know sign language.
- ≤40% of these families sign at home (cites a 2010 Gallaudet University survey).
- 70% of deaf children may miss out on language early on (cites Boston University researchers).
- The first years are when the brain is built for language; "You don't have to be fluent to start. You only have to start."

(These figures are copy from the app; I have not independently verified them — worth checking sources before presenting.)

## What it does
1. **Teaches 43 everyday signs** grouped by *daily routine*, not by alphabet: mealtime, bath & bedtime, feelings, family, play & manners, safety & getting out. (README says 42; the data has 43 — [[Known Issues and Quirks]].) See [[Routines and Signs Overview]].
2. **Spaced practice** — a daily "Today's 5 minutes" set of due + new signs, driven by Leitner boxes ([[Spaced Repetition]]).
3. **"Use it with your child" daily goal** — one mission sign per day; "We used it" logs a real moment ([[Today Screen]]).
4. **Camera coach** — in-browser hand/face/pose tracking (MediaPipe Holistic) checks handshape, location and movement of the parent's sign ([[Camera Coach Overview]]).
5. **Progress** — known/started counts, per-routine bars, streak, log of real-life uses ([[Progress Screen]]).
6. **ABC tab** — the ASL alphabet (26 letters in 6 look-alike groups), numbers 1–10, a "Spell a word" stepper (type a name, see each handshape in order, with double-letter and smooth-spelling tips), and spaced practice for letters and numbers, and **9 easy-word lessons** (54 words, from 3-letter words to names) with spell-it-yourself practice ([[ABC Screens]], [[Alphabet and Numbers]], [[Easy Word Lessons]]). No camera check for these.
7. Written sign descriptions (Hand / Where / Move), a memory hook, a "say it" real-life prompt, phrases ("Put them together"), a handshape cheat sheet, and a link out to Signing Savvy for video.

## Key product ideas worth remembering
- **Practice happens inside the day**, not on top of it (routine-based grouping).
- **Short daily practice beats long sessions.**
- **Real conversations build language** — the app pushes the parent to use a sign in real life ("Real moments" counter).
- **Privacy**: video is processed on the laptop; nothing is uploaded (but the page does load Google Fonts — [[Known Issues and Quirks]]).
- **Honest coach**: "a practice helper, not a certified ASL judge" — parent can overrule with "It was right, count it".
- Recommends learning alongside Deaf adults and local early-intervention programs.

## Tech at a glance
Vanilla HTML/CSS/JS, no framework, no build step, no package.json at root, no tests. State in `localStorage`. MediaPipe Holistic 0.5 vendored (~32 MB repo). Served by any static server. See [[Architecture]].

## Platform support
Chrome or Edge on a laptop; must be served over http://localhost (not `file://`) for the camera. Phone-first layout that widens to a 720px column ([[Design System]]).
