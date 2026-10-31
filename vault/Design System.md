---
type: design
tags: [design, css, accessibility]
---
# Design System (`styles.css`)

**Minimal style (2026-10-31, Ramani's request).** Rules: white background, gray text, ONE accent color (blue), the computer's own system font (no Google Fonts), thin gray lines instead of shadows, lots of space. Green and red are only used to mean right and wrong. Tab bar is plain text, the current tab is blue. The SVG icons were removed from `index.html` and the brand in `js/app.js`.

## Tokens (`:root`)
| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#ffffff` | `#121417` | page and boxes |
| `--ink` | `#1f2328` | `#e8eaed` | text |
| `--muted` | `#6b7280` | `#9aa0a6` | hints, labels |
| `--line` | `#e5e7eb` | `#2b2f36` | borders, dividers |
| `--soft` | `#f6f7f9` | `#1b1e23` | light fill (photo background) |
| `--accent` / `--accent-soft` | `#2563eb` / `#eef3fe` | `#7aa7ff` / `#1b2638` | main buttons, links, current tab, progress |
| `--good` / `--good-soft` | `#15803d` / `#ecfdf3` | `#4ade80` | right / known |
| `--bad` / `--bad-soft` | `#b91c1c` / `#fef2f2` | `#f87171` | wrong / not yet |
| `--font` | system font stack | | everything |
| `--r` | 10px | | corner radius |

Dark mode is automatic via `prefers-color-scheme`, with `data-theme` overrides on `<html>`.

## Components
Two button looks: `.btn` (outline) and `.btn.sun` / `.btn.good` (filled blue; class names kept from the old design so the JS didn't change). Boxes with a 1px border: `.today`, `.card`, `.routine`, `.stat`, `.mission`. Sections divided by a top line instead of a box: `.sign`, `.phrases`, `.panel`. Photos: `.photo`, `.photo.small` (see [[Photos]]). Camera, ABC and quiz classes are unchanged in name.

Layout: `main` is max 640px, 20px side padding, 28px gaps. Routines grid 2 to 3 columns at 560px; camera result rows collapse at 420px.
