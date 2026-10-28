---
type: screen
tags: [app, screen, ui]
---
# Routines Screen (`#routines`, `viewRoutines()`)

- Heading "Routines" + copy: signs are grouped by the moments you already share with your child, "so practice happens inside your day instead of on top of it."
- `routineGrid()` — six routine cards, each with time label, name, progress bar and "`k` of `n` signs started" ([[Routines and Signs Overview]]).
- **Handshape cheat sheet** panel: renders `HANDSHAPES` as a grid ([[Handshape Cheat Sheet]]).

Clicking a card → `data-open=<id>` → `#routines.<id>` ([[Routine Detail Screen]]).

Layout: 2-column grid, 3 columns at ≥560px ([[Design System]]).
