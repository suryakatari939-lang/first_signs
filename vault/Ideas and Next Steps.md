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

## Bigger
- More signs / routines (the content model scales: add to `SIGNS` + `CHECKS`, see [[CHECKS Format]]).
- Shared family mode (multiple caregivers), reminders at routine times, parent-set routine order.
- Sign-sequence phrases coach (check two or three signs in a row) using the `PHRASES` data.

## For the competition write-up
- Lead with the problem stats (after verifying them), the routine-based design, the spaced-practice loop, the "real moments" goal, privacy-by-design on-device vision, and the honest "practice helper, not a judge" stance. See [[Project Overview]].
- Gather the plan doc text into the vault once it's accessible — [[Open Questions]].
