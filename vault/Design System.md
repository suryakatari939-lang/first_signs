---
type: design
tags: [design, css, accessibility]
---
# Design System (`styles.css`)

**Slate-teal and amber style (2026-11-01, Ramani's request).** Inspired by the Sammamish Circle site (not copied): deep slate-teal surfaces in dark mode, warm paper background in light mode, a serif display face for headings and sign glosses, Roboto for reading, small uppercase Roboto Mono labels (`.eyebrow`, `.status`, `.routine .time`, stat labels), pill chips and tabs, rounded cards with a soft shadow. Green and red still only mean right and wrong. Replaced the earlier "minimal style" (white, blue accent, system font).

Fonts are **vendored in `vendor/fonts/`** (Fraunces variable, Roboto 400/500/600, Roboto Mono 500, latin subset, ~144 KB) with `@font-face` rules at the top of `styles.css`, so the app still works offline. Licenses: `vendor/fonts/LICENSE-*.txt` (SIL OFL 1.1).

## Tokens (`:root`)
| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f6f4ef` | `#0c1c21` | page |
| `--surface` | `#ffffff` | `#12262d` | cards, buttons, inputs |
| `--ink` | `#14232b` | `#e5eaf1` | text |
| `--muted` | `#5b6b75` | `#8fa6b6` | hints, labels |
| `--line` | `#e2ddd2` | `#213a44` | borders, dividers |
| `--soft` | `#efece4` | `#183039` | light fill (bars, hooks, photos) |
| `--accent` / `--accent-soft` | `#155e63` / `#dfeeec` | `#f2c46d` / `#2c2a1c` | main buttons, links, current tab |
| `--on-accent` | `#ffffff` | `#0c1c21` | text on accent fills |
| `--gold` | `#b07d1f` | `#f2c46d` | brand mark, streak pill, progress gradient end, hook border |
| `--good` / `--good-soft` | `#2e7d5b` / `#e3f1e8` | `#5fcf98` / `#13302a` | right / known |
| `--bad` / `--bad-soft` | `#b84a3c` / `#f8e4df` | `#f08a7c` / `#351c1b` | wrong / not yet |
| `--nav-bg` | translucent bg | translucent bg | blurred tab bar |
| `--shadow` | soft drop shadow | darker drop shadow | cards |
| `--font` / `--font-display` / `--font-mono` | Roboto / Fraunces / Roboto Mono | | body / headings / labels |
| `--r` / `--r-sm` | 14px / 10px | | cards / buttons, tiles, inputs |

Dark mode is automatic via `prefers-color-scheme`, with `data-theme` overrides on `<html>`. The brand mark is pure CSS (`.brand::before`); no markup changed.

## Components
Two button looks: `.btn` (outline) and `.btn.sun` / `.btn.good` (filled accent; class names kept from the old design so the JS didn't change). Boxes with a 1px border: `.today`, `.card`, `.routine`, `.stat`, `.mission`. Sections divided by a top line instead of a box: `.sign`, `.phrases`, `.panel`. Photos: `.photo`, `.photo.small` (see [[Photos]]). Camera, ABC and quiz classes are unchanged in name.

Layout: `main` is max 640px, 20px side padding, 28px gaps. Routines grid 2 to 3 columns at 560px; camera result rows collapse at 420px.

ABC tab additions (end of `styles.css`): `button.chip` (clickable suggestion chips), `.field` (text input), `.tiles`/`.tile(.on/.done)` (letters of the word being spelled), `.tips` (bulleted list), `.wordrow` (word chip + status pill + note). A rule makes a lone last tile in any `.routines` grid span the full width (`.routines > :last-child:nth-child(odd)`). The tab bar grid is now **5 columns** (Today, Routines, ABC, Practice, Progress).

## Accessibility choices
- Visible `:focus-visible` outlines, `aria-current="page"` on tabs, `aria-pressed` on the mode switch, `role="status"` on toasts/feedback, `aria-label`s on the dot progress and nav, `aria-hidden` decorative icons.
- No entrance animations; only short hover/press transitions (routine cards lift 2px, active progress dot widens).
- 48px minimum button height; large type; muted text contrast tuned for both themes (not formally audited).
- Mirrors camera preview so it feels like a mirror; text feedback instead of color-only (✓/✕ marks + words).

