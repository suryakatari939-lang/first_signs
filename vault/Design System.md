---
type: design
tags: [design, css, accessibility]
---
# Design System (`styles.css`)

**Blue and white look (2026-11-18, Ramani's request).** A soft blue page with white cards, flat steel-blue buttons and light-blue banners. Every color in the app is a blue or white, except a muted red kept only for wrong answers and missed camera checks. Mitt, the hand mascot, appears in banners. Earlier designs (website style, the Duolingo-like path, the peach-and-green dashboard) were removed. Screen-by-screen behavior is in [[App Layout and Screens]].

## Tokens (`:root`)
The older color names are kept so existing class names (`.c-teal`, `.btn.teal`, `.t-plum`...) still work; on 2026-11-18 every warm or green value was shifted to the blue of the same lightness (hue 210°), so they are all blues now.

| Token | Value | Use |
|---|---|---|
| `--teal` / `-d` / `-l` | `#3b6e98` / `#2f5b80` / `#dcebf7` | main steel blue: buttons, current tab, links, progress |
| `--plum` | `#5f78b5` / `#4a6299` / `#e3e9f7` | XP, some unit and mode icons |
| `--coral` | `#6ca3da` / `#3f84c9` / `#d8e8f8` | real moments, streak days, donut accent |
| `--sun` | `#72a7dc` / `#317bc6` / `#e0ecf9` | sample-progress notice, a few icons |
| `--leaf` | `#3f6c9a` / `#2f567d` / `#dfe8f1` | done, right answers, earned milestones |
| `--peach` / `--peach-line` | `#d8e8f8` / `#bbd4ee` | light-blue banners, hooks, hints, lesson Watch frame (name kept from the peach era) |
| `--page` | `#eaf1f8` | page background (also lessons) |
| `--ink`, `--muted`, `--line`, `--track`, `--soft` | `#1f2d3d`, `#5f6f80`, `#d8e3ee`, `#e3ebf3`, `#f3f7fb` | text, secondary text, borders, empty bars, light fills |
| `--display` / `--font` | Nunito / Nunito | headings / reading text |
| `--r` / `--r-sm` / `--shadow` | 14px / 10px / soft two-layer shadow | cards / buttons / cards |

The app is light only. Nunito (600/700/800, latin subset, SIL Open Font License) is stored in `vendor/fonts` so the app works offline.

## Components
- **Buttons** `.btn`: flat, 46px tall, 10px corners, sentence case. Filled: `.teal` (also `.sun`, `.calm`), `.good`, `.coral`; `.ghost` is white with a border; `.sm`, `.wide`, `.block`. `.link` / `.back` are plain blue text buttons; `.textbtn` is gray text.
- **Cards** `.dcard`, `.panelcard`, `.panel`, `.card`, `.sign`, `.routine`, `.badge`, `.stattile`, `.mode`, `.rcard`: white, 1px border, 14px corners, soft shadow.
- **Banners** `.pagehead` (Practice, sign guides, Basics pages): light blue with a blue border, text only (the mascot and ABC-blocks pictures were removed 2026-11-18).
- **Stats** `.statbar` / `.stat`: white pills (streak, goal, XP, moments) at the top of pages other than Learn.
- **Progress bars** `.pbar` (`.thin`, `.big`, color classes) and `.bar` (ABC tiles).
- **Learn** `.lhead`, `.lpill`, `.mapcard`, `.maphead`, `.maptitle`, `.mapnext`, `.maplayer` (`.wide`/`.tall`), `.stop` (`.done`, `.now`, `.started`, `.new`, `.sel`, side `.r`/`.l`, with `.dot` and `.tag`), `.summit`; cards `.dash` → `.dash-l` / `.dash-r`, `.dcard`, `.donut`, `.sotd-word`, `.mlist`, `.mnext`, `.quick` / `.qtiles` / `.qtile`; routine card `.rcard` with `.t-<color>` setting `--tc` / `--tl`, `.rhead`, `.ric`, `.rcount`, `.rbar`, `.lrows` / `.lrow` (`.now`, `.done`), `.lnum`, `.lwords`, `.lstate`, `.rfoot`.
- **Lessons** `body.lesson-mode` tokens: `--lbg #eaf1f8`, `--lpanel #fff`, `--lline #d8e3ee`, text `--link` / `--lsub` / `--ldim`, `--llav-d` steel blue (main button), `--lsage` green (right), `--lrose` (wrong), `--lsand` (hints). Classes: `.ltop` (`.x`, `.lprog`, `.lcount`), `.lgrid` (two columns ≥900px), `.pane`, `.plabel` (Watch / Your turn), `.lframe`, `.lgloss`, `.lbig`, `.lname`, `.ldesc`, `.lcard`, `.lopts` / `.lopt` (`.right`, `.wrong`, `.dim`), `.lresult` (`.ok` / `.no`, `.lcheck`), `.lfoot` (sticky), `.lbtn` (`.main`, `.ghost`, `.plain`, `.small`), `.lend`. Camera checks `.checks li`: mark, text, accuracy note.
- **Hints** `.hintbtn` / `.hintpop`: light-blue pill that opens a panel under the question.

## Layout
- Phones (<900px): tab bar fixed to the bottom, page padding 16px.
- ≥900px: white sidebar (250px, sticky, rounded) with the logo ("First" in ink, "Signs" in blue), Learn / Practice / ABC / Rewards, and Profile at the bottom. Page content up to 1240px.
- Learn dashboard: two halves side by side ≥1180px; each half has 2 columns ≥700px; one column on phones.
- Lessons (`body.lesson-mode`) hide the navigation; content up to 1240px.

## Accessibility choices
- Visible `:focus-visible` outlines (light blue), `aria-current="page"` on the nav, `aria-pressed` on learning-path modules, `aria-label`s on lesson rows and quick-access tiles, `role="status"` on feedback and toasts, a `progressbar` role on the lesson bar.
- Right/wrong is shown with an icon and words as well as color.
- `prefers-reduced-motion` turns off transitions.
- 46px minimum button height (38px for small ones).
