---
type: screen
tags: [app, screen, ui]
---
# Routine Detail Screen (`#routines.<id>`, `viewRoutine(id)`)

- "← All routines" back button (`data-go="routines"`).
- Eyebrow = routine time ("Breakfast, lunch, dinner"…), `h1` = routine name.
- Standing tip: `"One hand" means your dominant hand. Keep signs in front of your chest and face, where your child is already looking.`
- **Sign list** — one `signCard(s)` per sign:
  - gloss + status pill (**New** / **Learning** / **Known**, from `card()`/`isKnown()`),
  - `Hand / Where / Move` definition list,
  - "Remember it:" hook, italic `say` prompt,
  - buttons: **Add to my practice** (if no card, `data-learn`), **Check with camera** (only if `Coach.supported()`, `data-camsign` → straight into [[Camera Coach Screen]]), and **Watch it signed ↗** link (`videoUrl(s)` = `https://www.signingsavvy.com/search/<lowercased gloss>`, opens in new tab).
- **Put them together** — phrases for this routine from [[Phrases]], with a reminder that ASL glosses are capitalized and yes/no questions use raised eyebrows.

Sign card anchors have `id="sign-<id>"` (not currently linked to).

All routine pages: [[Mealtime]], [[Bath & bedtime]], [[Feelings]], [[Family]], [[Play & manners]], [[Safety & getting out]].
