---
type: design
tags: [design, css, accessibility]
---
# Design System (`styles.css`)

Phone-first single column app shell: `main` is max 720px centered, padded 16px (respecting safe-area insets), with extra bottom padding (96px) for the fixed tab bar. Sections are cards with 14–20px radii and soft shadows.

## Tokens (`:root`)
| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f4f6fb` | `#11162a` | page |
| `--surface` | `#ffffff` | `#1a2140` | cards |
| `--ink` | `#1b2440` | `#eef1fb` | text, primary button |
| `--muted` | `#5b6585` | `#a3abc8` | secondary text |
| `--line` | `#dfe3ee` | `#2c3560` | borders |
| `--sun` / `--sun-soft` | `#f2b134` / `#fdf0d2` | `#f5bf55` / `#3a3220` | main accent (marigold): CTAs, streak, hooks |
| `--sea` / `--sea-soft` | `#2a8c7f` / `#dcf1ec` | `#4fc2b1` / `#173a37` | success / known |
| `--dusk` | `#4a5bd4` | `#94a1ff` | links + focus ring |
| `--rose` / `--rose-soft` | `#d6555e` / `#fbe3e5` | `#f08088` / `#3e2028` | "not yet" / errors |
| `--r` | 14px | | radius |

**Dark mode**: automatic via `prefers-color-scheme: dark`, plus manual override attributes `data-theme="dark"` / `"light"` on `<html>` (no UI toggle exists yet).

## Fonts
- Display: **Fredoka** (500/600/700), headings, buttons, chips, glosses.
- Body: **Atkinson Hyperlegible** (made by the Braille Institute for legibility).
- Loaded from Google Fonts in `index.html`; fallbacks Trebuchet MS / Segoe UI / system-ui.

## Components
Buttons `.btn` (+ `.sun`, `.ghost`, `.good`, `.bad`, `.block`), hero card `.today`, chips `.chip(.due)`, dashed mission box `.mission`, routine cards `.routine` with `.bar`, sign card `.sign` (+ `.steps` dl, `.hook`, `.say`, `.status` pill), phrases, segmented control `.seg`, practice `.card`, quiz `.opt(.right/.wrong)`, progress dots, stats `.stat`, `.panel`, `.prow`, `.log`, `.hs` handshape grid, `.facts`, fixed tab bar `nav.tabs`, `.toast`, camera: `.cam-stage`, `.cam-count(.go)`, `.cam-status`, `.cam-live`, `.checks` result rows, `.howto`.

`.chip.known` is defined but not used by any view.

## Accessibility choices
- Visible `:focus-visible` outlines, `aria-current="page"` on tabs, `aria-pressed` on the mode switch, `role="status"` on toasts/feedback, `aria-label`s on the dot progress and nav, `aria-hidden` decorative icons.
- Respects `prefers-reduced-motion` (the `.pop` entrance animation only runs when motion is allowed).
- 46px minimum button height; large type; muted text contrast tuned for both themes (not formally audited).
- Mirrors camera preview so it feels like a mirror; text feedback instead of color-only (✓/✕ marks + words).

Layout breakpoints: routines grid 2 → 3 columns at 560px; camera result rows collapse at 420px.
