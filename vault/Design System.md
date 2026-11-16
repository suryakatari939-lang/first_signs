---
type: design
tags: [design, css, accessibility]
---
# Design System (`styles.css`)

**App-style design (2026-11-03, Ramani's request).** Modeled on learning apps like Duolingo without copying them: white surfaces, chunky rounded buttons that press down, a handful of bright colors, rounded type, and Mitt, an original hand mascot. Replaces the earlier website-style design (photo banners, curved background lines, serif headings). Screen-by-screen behavior is in [[App Layout and Screens]].

## Tokens (`:root`)
| Token | Value | Use |
|---|---|---|
| `--teal` / `-d` / `-l` | `#11a3a0` / `#0b7f7c` / `#d9f4f2` | main buttons, current tab, links, Mealtime unit |
| `--plum` | `#7c5cff` / `#5d3fe0` / `#ece7ff` | read-and-pick, XP, Bedtime and Safety units |
| `--coral` | `#ff7a6b` / `#e2584a` / `#ffe6e2` | real moments, wrong answers, Feelings unit |
| `--sun` | `#ffb938` / `#e6951a` / `#fff2d6` | streak, finished lessons, hooks, Family unit |
| `--leaf` | `#48c774` / `#2fa85a` / `#e2f7e9` | right answers, Continue, Play unit |
| `--ink`, `--muted`, `--line`, `--track`, `--soft` | `#20313a`, `#6c7e87`, `#e5ebee`, `#e9eef1`, `#f5f8f9` | text, hints, borders, empty bars, light fills |
| `--display` / `--font` | Fredoka / Nunito | headings, buttons, labels / reading text |
| `--r` / `--r-sm` | 18px / 14px | cards / buttons |

The app is light only. Fonts are stored in `vendor/fonts` (Fredoka 600/700, Nunito 600/700/800, latin subset, SIL Open Font License) so the app works offline.

## Components
- **Buttons** `.btn`: white with a gray "ledge" (`box-shadow: 0 4px 0`) that disappears when pressed. Colored variants `.teal` (also `.sun`, kept for the ABC code), `.green` (also `.good`), `.coral`; `.ghost`, `.sm`, `.wide`, `.block`. Disabled buttons turn gray.
- **Color blocks** `.c-teal`, `.c-plum`, `.c-coral`, `.c-sun`, `.c-leaf`: background + darker ledge, used by unit bars, page headers, path bubbles, badges and lesson end stats.
- **Cards** `.panelcard`, `.panel`, `.card`, `.sign`, `.routine`, `.badge`, `.stattile`: 2px light border, 18px corners, no drop shadows.
- **Progress bars** `.pbar` (`.thin`, `.big`, color classes) and the older `.bar` (ABC tiles).
- **Lesson (minimal, 2026-11-16)** `body.lesson-mode` uses its own muted palette on white: `--lbg #ffffff`, `--lpanel #f4f5f7`, text `--link #1f2630` / `--lsub #5b6573` / `--ldim #8a93a0`, lavender buttons `--llav-d #5d5a94`, sage `--lsage #3f8a70` (right), rose `--lrose #b46262` (wrong), sand `--lsand #a07c3c` (hints). (It was dark for a few hours on 2026-11-16, then switched to white to match the rest of the app.)
- **Learn** `.upnext` (Up next card, `.upnext-words`), `.rcards` / `.rcard` with `.t-<color>` setting `--tc` / `--tl`, `.rhead`, `.ric`, `.rcount`, `.rbar`, `.lrows` / `.lrow` (`.now`, `.done`), `.lnum`, `.lwords`, `.lstate`, `.rfoot`, `.textbtn`, and `.btn.calm` (flat lavender primary button). Classes: `.ltop` (`.x` exit, `.lprog` bar, `.lcount`), `.lgrid` (two columns ≥900px), `.pane`, `.plabel` (Watch / Your turn), `.lframe`, `.lgloss`, `.lbig`, `.lname`, `.ldesc`, `.lcard`, `.lopts`/`.lopt` (`.right`, `.wrong`, `.dim`), `.lresult` (`.ok`/`.no`, `.lcheck`), `.lfoot` (sticky), `.lbtn` (`.main`, `.ghost`, `.plain`, `.small`), `.lend`. The camera check list `.checks li` is a 3-column row: mark, text, accuracy note.

## Layout
- Phones: bottom tab bar, page padding 16px, stats bar at the top of each page.
- ≥900px: left sidebar (236px) with the logo; page content up to 860px wide.
- ≥1240px: right rail (350px) with stats, today's real moment, daily goal and badges.
- Lessons (`body.lesson-mode`) hide the sidebar and rail; content up to 900px (1100px with the camera).

## Accessibility choices
- Visible `:focus-visible` outlines (plum), `aria-current="page"` on the nav, `aria-label`s on path bubbles (lesson number and its signs), `role="status"` on feedback and toasts, a `progressbar` role on the lesson bar.
- Right/wrong is shown with an icon and words as well as color.
- `prefers-reduced-motion` turns off transitions.
- 50px minimum button height (40px for small ones).
