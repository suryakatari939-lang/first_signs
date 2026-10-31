---
type: planning
tags: [ideas, roadmap]
---
# Ideas and Next Steps

These are *suggestions drawn from the code review*, not decisions made by the team. Check with Surya and Anish; items tie back to [[Known Issues and Quirks]].

## Quick wins (small edits)
- Reconcile **42 vs 43** signs in README / plan / UI copy (#1).
- Make "Known" really mean two separate days (e.g. require `box >= 2` *and* `seen >= 2` across two day keys) **or** change the Progress note (#2).
- Fix the mission label to use `pick.r` instead of the time-of-day routine (#5).
- Stop re-rolling the set when toggling practice mode — reuse `P.items` or snapshot `todaysSet()` once per day (#4).
- Self-host Fredoka + Atkinson Hyperlegible so the "nothing leaves your computer" claim is simple (#19).
- Add a dark/light toggle (CSS already supports `data-theme`).
- Verify and cite the three statistics ([[Project Overview]]).

## Medium
- Expert review of the 43 sign descriptions by a Deaf signer/ASL instructor; add direct video links instead of search links (#20).
- Add handshape keys for A / S / T / K, and an orientation (palm facing) check ([[Handshape Detection]]).
- Tune thresholds with real recordings; add a small debug panel using `Coach._readHand` to display per-finger states.
- Persist the practice session; add export/import of progress JSON.
- Host on a static site with HTTPS (GitHub Pages / Vercel) and make it installable (manifest + service worker) so phones can use the camera coach.
- Basic tests for `readHand`, `movement`, `evaluate` using recorded landmark fixtures.

## ABC tab follow-ups
- Review all 36 descriptions with a Deaf signer / ASL instructor and the real video; add licensed or self-made handshape illustrations (currently text only).
- Camera coaching for letters/numbers (needs new keys in `readHand` for A/S/T/N/M/E, K/P, 6–9).
- Let the parent save their child's name and show it on the Today screen; fingerspelling quiz (read a spelled word); numbers in context (ages, counting games).
- Fix the stale header streak (Known Issues #26).

## Lesson follow-ups
- "Read the word" lessons: show someone else's fingerspelling (video) and ask which word it was; fingerspelling is mostly understood by word shape, which the current lessons don't train.
- Let a parent save a custom word list or their child's name as its own mini lesson.
- Mark a lesson complete only after the words are right on two different days (see Known Issues #2).
- Review lesson order/words with a Deaf educator; consider replacing words that have signs with names, places and brand-like words.

## Bigger
- More signs / routines (the content model scales: add to `SIGNS` + `CHECKS`, see [[CHECKS Format]]).
- Shared family mode (multiple caregivers), reminders at routine times, parent-set routine order.
- Sign-sequence phrases coach (check two or three signs in a row) using the `PHRASES` data.

## For the competition write-up
- Lead with the problem stats (after verifying them), the routine-based design, the spaced-practice loop, the "real moments" goal, privacy-by-design on-device vision, and the honest "practice helper, not a judge" stance. See [[Project Overview]].
- Gather the plan doc text into the vault once it's accessible — [[Open Questions]].
