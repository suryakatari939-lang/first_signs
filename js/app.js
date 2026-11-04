/* ---------- Storage (per-browser, safe if blocked) ---------- */
const KEY = "firstsigns.v1";
const DAY = 86400000;
const INTERVALS = [0, 1, 2, 4, 7, 14, 30]; // days until next review, by box
const GOAL = 5;                              // signs practiced per day for the daily goal
function load() {
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.cards) return s; } catch (e) {}
  return null;
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
function dayKey(t = Date.now()) { const d = new Date(t); return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate(); }

// First visit opens with a few days of example progress so the app shows what it does; one tap clears it.
function sampleState() {
  const now = Date.now();
  const cards = {};
  const learned = { eat:3, more:3, finish:2, milk:2, drink:1, mom:2, dad:1, sleep:1, ily:2 };
  for (const [id, box] of Object.entries(learned)) cards[id] = { box, due: now - (id === "drink" || id === "sleep" ? DAY : -DAY * INTERVALS[box]), seen: box + 1 };
  return {
    sample: true, cards, days: [dayKey(now - 2*DAY), dayKey(now - DAY)],
    used: [{ id:"more", t: now - DAY - 3600000 }, { id:"finish", t: now - DAY - 3500000 }, { id:"ily", t: now - 2*DAY }],
    mission: null, goal: { day: dayKey(now), n: 2 },
  };
}
let S = load() || sampleState();

/* ---------- Helpers ---------- */
const $ = (sel, el = document) => el.querySelector(sel);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const byId = id => SIGNS.find(s => s.id === id);
const card = id => S.cards[id];
const isKnown = id => (card(id)?.box || 0) >= 2;
const isDue = id => card(id) && card(id).due <= Date.now();
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function streak() {
  const set = new Set(S.days); let n = 0; let t = Date.now();
  if (!set.has(dayKey(t))) t -= DAY;
  while (set.has(dayKey(t))) { n++; t -= DAY; }
  return n;
}
function markDay() { const k = dayKey(); if (!S.days.includes(k)) S.days.push(k); }
function toast(msg) {
  const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; t.setAttribute("role", "status");
  document.body.appendChild(t); setTimeout(() => t.remove(), 2200);
}
// Daily goal: how many signs were practiced today (signs, letters and words all count).
function goalToday() { return S.goal && S.goal.day === dayKey() ? S.goal.n : 0; }
function bumpGoal() { S.goal = { day: dayKey(), n: goalToday() + 1 }; }
// XP is worked out from what is already saved, so older saved progress gets XP too.
function xp() {
  const seen = o => Object.values(o || {}).reduce((n, c) => n + (c.seen || 0), 0);
  return seen(S.cards) * 10 + seen(S.abc && S.abc.cards) * 5 + S.used.length * 20;
}

// Today's set: everything due for review, then new signs in routine order, 5 total.
function todaysSet() {
  const due = SIGNS.filter(s => isDue(s.id)).sort((a, b) => card(a.id).box - card(b.id).box);
  const fresh = SIGNS.filter(s => !card(s.id));
  const newCount = Math.max(2, 5 - due.length);
  return [...due.slice(0, 5), ...fresh.slice(0, newCount)].slice(0, 6);
}
function rate(id, got) {
  const c = S.cards[id] || { box: 0, due: 0, seen: 0 };
  c.seen++;
  c.box = got ? Math.min(c.box + 1, INTERVALS.length - 1) : 1;
  c.due = Date.now() + INTERVALS[got ? c.box : 0] * DAY;
  S.cards[id] = c; markDay(); bumpGoal(); save();
}
function learn(id) { if (!S.cards[id]) { S.cards[id] = { box: 1, due: Date.now() + DAY, seen: 1 }; markDay(); save(); } }

/* ---------- Icons and Mitt, the mascot (an open hand) ---------- */
const ICON = {
  heart: c => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 27C7 21 3 16 3 11a6.5 6.5 0 0 1 13-2 6.5 6.5 0 0 1 13 2c0 5-4 10-13 16z" fill="${c || "#ff7a6b"}"/></svg>`,
  flame: () => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3c2 6 9 8 9 16a9 9 0 0 1-18 0c0-4 2-6 4-8 0 3 1 5 3 5-1-5 0-9 2-13z" fill="#ffb938"/><path d="M16 17c2 2 4 3 4 6a4 4 0 0 1-8 0c0-2 2-4 4-6z" fill="#fff2d6"/></svg>`,
  star: c => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3l3.6 8 8.4.8-6.3 5.7 1.9 8.5L16 21.6 8.4 26l1.9-8.5L4 11.8l8.4-.8z" fill="${c || "#7c5cff"}"/></svg>`,
  ring: f => `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="12" fill="none" stroke="#e5ebee" stroke-width="5"/><circle cx="16" cy="16" r="12" fill="none" stroke="#11a3a0" stroke-width="5" stroke-dasharray="${(75.4 * Math.min(1, f)).toFixed(1)} 76" stroke-linecap="round" transform="rotate(-90 16 16)"/></svg>`,
  check: c => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 17l5 5 11-12" fill="none" stroke="${c || "#fff"}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  cross: c => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 10l12 12M22 10L10 22" fill="none" stroke="${c || "#fff"}" stroke-width="4.5" stroke-linecap="round"/></svg>`,
  chest: () => `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="11" width="22" height="15" rx="3" fill="#fff"/><path d="M5 15h22" stroke="#2fa85a" stroke-width="3"/><rect x="14" y="13" width="4" height="6" rx="1" fill="#ffb938"/></svg>`,
  book: c => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 7c4-1 7 0 10 2v17c-3-2-6-3-10-2zM26 7c-4-1-7 0-10 2v17c3-2 6-3 10-2z" fill="none" stroke="${c || "#fff"}" stroke-width="2.6" stroke-linejoin="round"/></svg>`,
  cam: c => `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="9" width="20" height="15" rx="4" fill="${c}"/><path d="M23 14l6-4v13l-6-4z" fill="${c}"/></svg>`,
  quiz: c => `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13" fill="${c}"/><path d="M12 12a4 4 0 1 1 6 3c-1.5 1-2 2-2 3.5M16 23v.5" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
  hand: c => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 26V12c0-2 3-2 3 0v6V8c0-2 3-2 3 0v10V7c0-2 3-2 3 0v11V9c0-2 3-2 3 0v12c0 4-3 6-6 6h-1c-3 0-5-2-6-5l-3-6c-1-2 2-3 3-1z" fill="${c}"/></svg>`,
  bulb: () => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4a9 9 0 0 0-5 16.5V24h10v-3.5A9 9 0 0 0 16 4z" fill="#e6951a"/><path d="M13 14l3 3 3-3" fill="none" stroke="#fff2d6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="11.5" y="25.5" width="9" height="3" rx="1.5" fill="#a8771e"/></svg>`,
  lock: () => `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="8" y="13" width="16" height="13" rx="3" fill="#b4c1c7"/><path d="M11 13V10a5 5 0 0 1 10 0v3" fill="none" stroke="#b4c1c7" stroke-width="3"/></svg>`,
};
// One picture per routine, used on the lesson bubbles and badges.
const UNIT_ICON = {
  meal: c => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 6h14l-2 20H11z" fill="${c}"/></svg>`,
  bed: c => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M21 5a11 11 0 1 0 6 18A10 10 0 0 1 21 5z" fill="${c}"/></svg>`,
  feel: c => ICON.heart(c),
  family: c => `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="11" cy="10" r="4.5" fill="${c}"/><circle cx="22" cy="12" r="3.5" fill="${c}"/><path d="M3 26c.5-6 4-9 8-9s7.5 3 8 9zM17 26c.4-4.5 2.5-7 5-7s4.6 2.5 5 7z" fill="${c}"/></svg>`,
  play: c => `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11" fill="${c}"/><path d="M5.5 13c6 2 15 2 21 0M16 5c-3 6-3 16 0 22" stroke="rgba(0,0,0,.18)" stroke-width="2.2" fill="none"/></svg>`,
  safe: c => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7z" fill="${c}"/></svg>`,
};
const UNIT_COLOR = { meal: "teal", bed: "plum", feel: "coral", family: "sun", play: "leaf", safe: "plum" };

function mitt(size = 112, mood = "happy") {
  const mouth = mood === "sad" ? `<path d="M48 100c5-5 11-5 16 0" fill="none" stroke="#20313a" stroke-width="3.2" stroke-linecap="round"/>`
    : `<path d="M48 96c5 5 11 5 16 0" fill="none" stroke="#20313a" stroke-width="3.2" stroke-linecap="round"/>`;
  return `<svg class="mitt" width="${size}" height="${Math.round(size * 130 / 112)}" viewBox="0 0 112 130" aria-hidden="true">
    <ellipse cx="56" cy="122" rx="34" ry="6" fill="#000" opacity=".08"/>
    <path d="M30 70V34c0-7 10-7 10 0v26V22c0-7 10-7 10 0v36V18c0-7 10-7 10 0v40V24c0-7 10-7 10 0v46l8-12c4-6 13-1 9 6L82 96c-5 13-14 22-30 22h-2c-12 0-20-8-20-22z" fill="#ffb938" stroke="#e6951a" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="47" cy="84" r="5" fill="#20313a"/><circle cx="65" cy="84" r="5" fill="#20313a"/>
    <circle cx="48.5" cy="82.5" r="1.6" fill="#fff"/><circle cx="66.5" cy="82.5" r="1.6" fill="#fff"/>${mouth}
    <circle cx="40" cy="95" r="4" fill="#ff7a6b" opacity=".5"/><circle cx="72" cy="95" r="4" fill="#ff7a6b" opacity=".5"/></svg>`;
}

/* ---------- Shared pieces ---------- */
// `brand` and `hero()` are used by the ABC screens (js/abc.js).
const brand = "";
function hero(key, eyebrow, title, sub) {
  return `<section class="pagehead c-${key === "abc" ? "teal" : "plum"}">
    <div class="pagehead-text">${eyebrow ? `<small>${eyebrow}</small>` : ""}<h1>${title}</h1>${sub ? `<p>${sub}</p>` : ""}</div>
    <div class="pagehead-mitt">${mitt(92)}</div></section>`;
}
function statBar() {
  const g = goalToday();
  return `<div class="statbar" aria-label="Your stats">
    <span class="stat s-sun" title="Day streak">${ICON.flame()}${streak()}</span>
    <span class="stat s-teal" title="Daily goal">${ICON.ring(g / GOAL)}${Math.min(g, GOAL)}/${GOAL}</span>
    <span class="stat s-plum" title="Total XP">${ICON.star()}${xp()}</span>
    <span class="stat s-coral" title="Real moments with your child">${ICON.heart()}${S.used.length}</span></div>`;
}
function sampleBanner() {
  return S.sample ? `<div class="notice"><div class="notice-mitt">${mitt(44)}</div>
    <p><b>You're looking at example progress</b> so you can see how the app works.</p>
    <button class="btn ghost sm" id="reset">Start fresh</button></div>` : "";
}
// Today's real-life sign: one sign from the routine that fits the time of day.
function todayMission() {
  const hour = new Date().getHours();
  const moment = hour < 10 ? "meal" : hour < 17 ? "play" : "bed";
  const pick = S.mission && byId(S.mission.id) && S.mission.day === dayKey() ? byId(S.mission.id)
    : (SIGNS.filter(s => s.r === moment && card(s.id))[0] || SIGNS.find(s => s.r === moment));
  S.mission = { id: pick.id, day: dayKey() };
  return pick;
}
function momentCard() {
  const s = todayMission();
  const done = S.used.some(u => u.id === s.id && dayKey(u.t) === dayKey());
  return `<section class="panelcard"><h4>Today's real moment</h4>
    <div class="moment"><div class="moment-ic">${ICON.heart()}</div>
      <div><b>Sign ${esc(s.w)} with your child</b><span>${esc(s.say)}</span></div></div>
    <div class="row">${done ? `<span class="pill good">${ICON.check("#2fa85a")} Done today</span>`
      : `<button class="btn coral sm" data-used="${s.id}">We did it</button>`}
      <button class="btn ghost sm" data-open="${s.r}">How to sign</button></div></section>`;
}
function goalCard() {
  const g = goalToday(), left = Math.max(0, GOAL - g);
  return `<section class="panelcard"><h4>Daily goal <span class="muted">${Math.min(g, GOAL)} of ${GOAL} signs</span></h4>
    <div class="pbar teal"><i style="width:${Math.min(100, g / GOAL * 100)}%"></i></div>
    <p class="note">${left ? `${left} more sign${left > 1 ? "s" : ""} to reach today's goal.` : "Goal reached. Nice work today!"}</p></section>`;
}

/* ---------- Badges ---------- */
function badges() {
  const unit = r => { const l = SIGNS.filter(s => s.r === r.id); return { id: "u-" + r.id, name: r.name, icon: UNIT_ICON[r.id]("#fff"), color: UNIT_COLOR[r.id], have: l.filter(s => isKnown(s.id)).length, need: l.length, how: "Know every sign in " + r.name }; };
  const abcK = list => list.filter(x => abcKnown(x.id)).length;
  return [
    { id: "first", name: "First moment", icon: ICON.heart("#fff"), color: "coral", have: Math.min(1, S.used.length), need: 1, how: "Use a sign with your child" },
    { id: "ten", name: "10 moments", icon: ICON.heart("#fff"), color: "coral", have: Math.min(10, S.used.length), need: 10, how: "Use signs with your child 10 times" },
    { id: "week", name: "7-day streak", icon: `<svg viewBox="0 0 32 32"><path d="M16 3c2 6 9 8 9 16a9 9 0 0 1-18 0c0-4 2-6 4-8 0 3 1 5 3 5-1-5 0-9 2-13z" fill="#fff"/></svg>`, color: "sun", have: Math.min(7, streak()), need: 7, how: "Practice 7 days in a row" },
    ...ROUTINES.map(unit),
    { id: "abc", name: "Alphabet Ace", icon: `<svg viewBox="0 0 32 32"><text x="16" y="22" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="14" fill="#fff">ABC</text></svg>`, color: "teal", have: abcK(LETTERS), need: LETTERS.length, how: "Know every letter" },
    { id: "num", name: "Counting Pro", icon: `<svg viewBox="0 0 32 32"><text x="16" y="22" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="15" fill="#fff">123</text></svg>`, color: "leaf", have: abcK(NUMBERS), need: NUMBERS.length, how: "Know the numbers 1 to 10" },
  ];
}
function badgeTile(b) {
  const got = b.have >= b.need;
  return `<div class="badge ${got ? "got" : ""}" title="${esc(b.how)}">
    <i class="${got ? "c-" + b.color : ""}">${got ? b.icon : ICON.lock()}</i><b>${esc(b.name)}</b>
    ${got ? `<span>Earned</span>` : `<div class="pbar thin"><i style="width:${Math.round(b.have / b.need * 100)}%"></i></div><span>${b.have}/${b.need}</span>`}</div>`;
}
function badgeCard() {
  const close = badges().filter(b => b.have < b.need).sort((a, b) => b.have / b.need - a.have / a.need).slice(0, 2);
  return `<section class="panelcard"><h4>Badges in progress <button class="link" data-go="rewards">View all</button></h4>
    ${close.map(b => `<div class="brow"><i class="c-${b.color}">${b.icon}</i><div><b>${esc(b.name)}</b>
      <div class="pbar thin c-${b.color}"><i style="width:${Math.round(b.have / b.need * 100)}%"></i></div></div><span class="muted">${b.have}/${b.need}</span></div>`).join("")}</section>`;
}
function rail() { return `${statBar()}${momentCard()}${goalCard()}${badgeCard()}`; }

/* ---------- Learn: one path of lessons, a unit per routine ---------- */
const LESSON_SIZE = 3;
function unitLessons(r) {
  const l = SIGNS.filter(s => s.r === r.id), out = [];
  for (let i = 0; i < l.length; i += LESSON_SIZE) out.push(l.slice(i, i + LESSON_SIZE));
  return out;
}
const lessonState = list => list.every(s => isKnown(s.id)) ? "done" : list.some(s => card(s.id)) ? "started" : "new";
const ZIG = [0, -70, -105, -70, 0, 70, 105, 70];
function viewLearn() {
  // The current lesson is the first one, in path order, that isn't fully known yet.
  let current = null;
  for (const r of ROUTINES) { unitLessons(r).forEach((l, i) => { if (!current && lessonState(l) !== "done") current = r.id + ":" + i; }); }
  let k = 0;
  const units = ROUTINES.map((r, ui) => {
    const lessons = unitLessons(r), c = UNIT_COLOR[r.id];
    const nodes = lessons.map((l, i) => {
      const key = r.id + ":" + i, st = lessonState(l), now = key === current, x = ZIG[k++ % ZIG.length];
      const cls = now ? "now c-" + c : st === "done" ? "done" : st === "started" ? "started" : "new";
      const icon = st === "done" ? ICON.check() : UNIT_ICON[r.id](st === "new" && !now ? "#b4c1c7" : "#fff");
      const words = l.map(s => s.w).join(", ");
      return `<div class="step" style="--x:${x}px">
        ${now ? `<span class="startbubble">START</span>` : ""}
        <button class="node ${cls}" data-lesson="${key}" aria-label="Lesson ${i + 1}: ${esc(words)}${st === "done" ? ", done" : ""}">${icon}</button>
        ${now ? `<div class="pathmitt" style="--side:${x > 0 ? -1 : 1}">${mitt(96)}</div>` : ""}
        <span class="nodelabel">${esc(words)}</span></div>`;
    }).join("");
    const review = `<div class="step" style="--x:${ZIG[k++ % ZIG.length]}px"><button class="node chest" data-review="${r.id}" aria-label="${esc(r.name)} review">${ICON.chest()}</button><span class="nodelabel">Unit review</span></div>`;
    return `<section class="unit" aria-labelledby="u-${r.id}">
      <header class="unitbar c-${c}"><div><small>Unit ${ui + 1} · ${esc(r.time)}</small><b id="u-${r.id}">${esc(r.name)}</b></div>
        <button class="guide" data-open="${r.id}">${ICON.book()}<span>Sign guide</span></button></header>
      <div class="path">${nodes}${review}</div></section>`;
  }).join("");
  return `${statBar()}${sampleBanner()}<div class="rail-dup">${momentCard()}</div>${units}`;
}

/* ---------- Practice hub ---------- */
function viewPractice() {
  const set = todaysSet();
  const mode = (key, color, icon, title, text) => `<button class="mode" data-start="${key}"><i class="c-${color}">${icon}</i><span><b>${title}</b><span>${text}</span></span></button>`;
  return `${statBar()}
  <section class="pagehead c-teal"><div class="pagehead-text"><small>Practice</small><h1>Five signs, five minutes.</h1>
    <p>Today: ${set.map(s => esc(s.w)).join(", ")}. Signs you know come back less often.</p></div><div class="pagehead-mitt">${mitt(92)}</div></section>
  <div class="modes">
    ${mode("mix", "plum", ICON.star("#fff"), "Today's 5 minutes", "A mix of reading and signing")}
    ${mode("pick", "sun", ICON.quiz("none"), "Read &amp; pick", "Read a description, pick the sign")}
    ${mode("recall", "teal", ICON.hand("#fff"), "Sign it yourself", "See a word, make the sign, then check")}
    ${mode("cam", "coral", ICON.cam("#fff"), "Camera coach", Coach.supported() ? "Your camera checks your sign" : "Works when the app runs from its folder")}
  </div>
  <section class="panel"><h2>Handshape cheat sheet</h2><p class="muted">Most signs use one of a dozen handshapes. Learn these and the instructions get much easier.</p>
  <div class="hs">${HANDSHAPES.map(([n, d]) => `<div>${HANDSHAPE_PHOTOS[n] ? photo(HANDSHAPE_PHOTOS[n], n + " handshape", "photo small") : ""}<b>${esc(n)}</b><span class="muted">${esc(d)}</span></div>`).join("")}</div></section>`;
}

/* ---------- Sign guide for one routine ---------- */
function viewRoutine(id) {
  const r = ROUTINES.find(x => x.id === id); if (!r) return viewLearn();
  const list = SIGNS.filter(s => s.r === id);
  return `<button class="back" data-go="learn">← Back to the path</button>
  <section class="pagehead c-${UNIT_COLOR[id]}"><div class="pagehead-text"><small>Sign guide · ${esc(r.time)}</small><h1>${esc(r.name)}</h1>
    <p>"One hand" means your dominant hand. Keep signs in front of your chest and face, where your child is already looking.</p></div>
    <div class="pagehead-mitt">${mitt(92)}</div></section>
  <div class="signlist">${list.map(signCard).join("")}</div>
  <section class="phrases"><h2>Put them together</h2><p class="muted">ASL glosses are written in capitals. Yes/no questions use raised eyebrows.</p>
  ${(PHRASES[id] || []).map(([g, e]) => `<div class="phrase"><span class="g">${esc(g)}</span><span class="muted">${esc(e)}</span></div>`).join("")}</section>`;
}

// A Commons photo. If it can't load (offline), it removes itself. Credits are in README.md.
function photo(file, caption, cls = "photo") {
  if (file.endsWith(".svg")) cls += " drawing";
  return `<figure class="${cls}"><img src="${photoSrc(file)}" alt="${esc(caption)}" loading="lazy" onerror="this.closest('figure').remove()"></figure>`;
}
/* ---------- Hints: a panel that opens right under the question, instead of a link to another site ---------- */
// Which handshapes a sign uses, read from its written "hand" text, in the order they appear.
const SHAPE_WORDS = [
  [/flat-o/i, "Flat-O"], [/claw|slightly bent|bent hands/i, "Claw"], [/\bC-hand|C to S|curved hands/i, "C"],
  [/\bA-hand|thumbs-up/i, "A"], [/\bS-hand/i, "S"], [/\bT-hand/i, "T"], [/\bK-hand/i, "K"], [/\bW-hand/i, "W"], [/\bY-hand/i, "Y"],
  [/thumb, index and pinky/i, "ILY"], [/index fingers?\b(?! and middle)/i, "Index"], [/\bfists?\b/i, "S"],
  [/5-hand|open hands?|hands open/i, "5 (open)"], [/flat hands?/i, "Flat"],
];
const EXTRA_SHAPES = { Flat: "Fingers straight and together" };
function signShapes(s) {
  const hits = SHAPE_WORDS.map(([re, n]) => { const m = s.hand.match(re); return m ? [m.index, n] : null; }).filter(Boolean).sort((a, b) => a[0] - b[0]).map(x => x[1]);
  let out = [...new Set(hits)];
  if (out.some(n => ["A", "T"].includes(n))) out = out.filter(n => n !== "S" || /\bS-hand/i.test(s.hand));   // "A-hand (fist...)" is not an S
  if (out.includes("Claw")) out = out.filter(n => n !== "5 (open)" || /hands open/i.test(s.hand));          // "claw (5-hand with fingers bent)"
  return out.slice(0, 2);
}
const hintButton = id => `<button class="hintbtn" data-hint="${id}" aria-expanded="false" aria-controls="${id}">${ICON.bulb()}<span>Hint</span></button>`;
function hintShape(n) {
  const d = (HANDSHAPES.find(h => h[0] === n) || [, EXTRA_SHAPES[n]])[1];
  if (!d) return "";
  return `<div class="hint-hs">${HANDSHAPE_PHOTOS[n] ? photo(HANDSHAPE_PHOTOS[n], n + " handshape", "photo tiny") : ""}
    <div><small>Handshape</small><b>${esc(n === "Flat" ? "Flat hand" : n)}</b><span>${esc(d)}</span></div></div>`;
}
// withHook: also show the memory hook (left out where the hook is already on screen).
function hintPanel(id, s, withHook = true) {
  const shapes = signShapes(s).map(hintShape).join("");
  return `<div class="hintpop" id="${id}" hidden>${shapes}
    ${withHook ? `<p class="hint-tip"><b>Remember it:</b> ${esc(s.hook)}</p>` : ""}
    ${!shapes && !withHook ? `<p class="hint-tip">${esc(s.hand)}</p>` : ""}
    <p class="note">Left-handed? Mirror the sign with your left hand.</p></div>`;
}

const stepsDl = s => `<dl class="steps"><dt>Hand</dt><dd>${esc(s.hand)}</dd><dt>Where</dt><dd>${esc(s.where)}</dd><dt>Move</dt><dd>${esc(s.move)}</dd></dl>`;

function signCard(s) {
  const c = card(s.id);
  const st = !c ? `<span class="status">New</span>` : isKnown(s.id) ? `<span class="status k">Known</span>` : `<span class="status l">Learning</span>`;
  return `<article class="sign" id="sign-${s.id}">
    <div class="sign-head"><span class="gloss">${esc(s.w)}</span>${st}</div>
    ${SIGN_PHOTOS[s.id] ? photo(SIGN_PHOTOS[s.id].file, SIGN_PHOTOS[s.id].caption) : ""}
    ${stepsDl(s)}
    <p class="hook"><b>Remember it:</b> ${esc(s.hook)}</p>
    <p class="say">${esc(s.say)}</p>
    <div class="row">
      ${c ? "" : `<button class="btn ghost sm" data-learn="${s.id}">Add to my practice</button>`}
      ${Coach.supported() ? `<button class="btn ghost sm" data-camsign="${s.id}">Check with camera</button>` : ""}
      ${hintButton("hint-" + s.id)}
    </div>${hintPanel("hint-" + s.id, s, false)}</article>`;
}

/* ---------- Lessons: full screen, one step at a time ----------
   A lesson is a list of steps: "teach" (meet a new sign), "pick" (read the description, pick the sign)
   and "recall" (see the word, make the sign, check yourself or with the camera). Wrong answers cost a heart. */
let P = null;
function startLesson(title, steps, back = "learn", cam = false) {
  P = { title, steps, back, i: 0, right: 0, scored: 0, hearts: 5, answered: null, opts: null, revealed: false, cam, xp: 0 };
  go("lesson");
}
function lessonFromSigns(title, list, back) {
  const steps = [];
  list.forEach(s => { if (!card(s.id)) steps.push({ t: "teach", id: s.id }); });
  shuffle(list).forEach(s => steps.push({ t: "pick", id: s.id }));
  list.filter(s => card(s.id)).slice(0, 1).forEach(s => steps.push({ t: "recall", id: s.id }));
  startLesson(title, steps, back);
}
function startMode(key) {
  let set = todaysSet(); if (set.length < 4) set = shuffle(SIGNS).slice(0, 5);
  if (key === "mix") return lessonFromSigns("Today's 5 minutes", set, "practice");
  set.forEach(s => learn(s.id));
  startLesson(key === "pick" ? "Read & pick" : key === "cam" ? "Camera coach" : "Sign it yourself",
    shuffle(set).map(s => ({ t: key === "pick" ? "pick" : "recall", id: s.id })), "practice", key === "cam");
}

const HEART_ROW = () => `<span class="hearts" aria-label="${P.hearts} hearts left">${ICON.heart()}${P.hearts}</span>`;
function lessonTop() {
  return `<div class="ltop"><button class="x" data-exit="1" aria-label="Leave lesson">✕</button>
    <div class="pbar big" role="progressbar" aria-valuemin="0" aria-valuemax="${P.steps.length}" aria-valuenow="${P.i}"><i style="width:${P.i / P.steps.length * 100}%"></i></div>${HEART_ROW()}</div>`;
}
function viewLesson() {
  if (!P) { setTimeout(() => go("learn")); return ""; }
  if (P.hearts <= 0 && !P.answered) return lessonEnd(true);   // show the last answer's feedback first
  if (P.i >= P.steps.length) return lessonEnd(false);
  const st = P.steps[P.i], s = byId(st.id);
  if (st.t === "teach") return `${lessonTop()}<div class="lbody">
      <div class="qtype c-text-leaf">${ICON.star("#48c774")}New sign · ${esc(P.title)}</div><h1 class="q">Meet <span class="hl">${esc(s.w)}</span></h1>
      <div class="hintwrap">${hintButton("hint-lesson")}${hintPanel("hint-lesson", s, false)}</div>
      <div class="signcard">${SIGN_PHOTOS[s.id] ? photo(SIGN_PHOTOS[s.id].file, SIGN_PHOTOS[s.id].caption) : `<div class="handpic">${mitt(110)}</div>`}
        <div class="stack">${stepsDl(s)}<p class="hook"><b>Remember it:</b> ${esc(s.hook)}</p><p class="say">${esc(s.say)}</p></div></div></div>
    <footer class="lfoot"><span class="ask">Try it with your hands.</span><button class="btn green wide" data-taught="1">Got it</button></footer>`;
  if (st.t === "pick") {
    if (!P.opts) P.opts = shuffle([s, ...shuffle(SIGNS.filter(x => x.id !== s.id)).slice(0, 3)]).map(x => x.id);
    const ok = P.answered === s.id;
    return `${lessonTop()}<div class="lbody">
      <div class="qtype c-text-plum">${ICON.quiz("#7c5cff")}Read &amp; pick · ${esc(P.title)}</div><h1 class="q">Which sign is this?</h1>
      ${P.answered ? "" : `<div class="hintwrap">${hintButton("hint-lesson")}${hintPanel("hint-lesson", s)}</div>`}
      <div class="signcard"><div class="handpic">${mitt(100)}</div>${stepsDl(s)}</div>
      <div class="opts">${P.opts.map(id => {
        const cls = P.answered ? (id === s.id ? "right" : id === P.answered ? "wrong" : "dim") : "";
        return `<button class="opt ${cls}" data-pick="${id}" ${P.answered ? "disabled" : ""}>${esc(byId(id).w)}</button>`;
      }).join("")}</div></div>
    ${P.answered ? feedbackBar(ok, ok ? "Nice signing!" : "Not quite.", (ok ? "" : "The answer is " + s.w + ". ") + s.hook)
      : `<footer class="lfoot"><span class="ask">Tap the sign that matches the description.</span></footer>`}`;
  }
  // recall
  if (P.cam && Coach.supported()) return `${lessonTop()}${viewCamera(s)}`;
  return `${lessonTop()}<div class="lbody">
    <div class="qtype c-text-teal">${ICON.hand("#11a3a0")}Sign it yourself · ${esc(P.title)}</div><h1 class="q">Sign <span class="hl">${esc(s.w)}</span></h1>
    <p class="situation">${esc(s.say)}</p>
    ${P.revealed ? "" : `<div class="hintwrap">${hintButton("hint-lesson")}${hintPanel("hint-lesson", s)}</div>`}
    ${P.revealed ? `<div class="signcard">${SIGN_PHOTOS[s.id] ? photo(SIGN_PHOTOS[s.id].file, SIGN_PHOTOS[s.id].caption) : `<div class="handpic">${mitt(100)}</div>`}
        <div class="stack">${stepsDl(s)}<p class="hook"><b>Remember it:</b> ${esc(s.hook)}</p></div></div>`
      : `<div class="bigword">${esc(s.w)}<span>Make the sign with your hands, then check.</span></div>
        <p class="note" id="camhelp" hidden>${esc(CAM_HELP[Coach.whyNot()] || "")}</p>`}</div>
  ${P.revealed ? `<footer class="lfoot"><span class="ask">Did your sign match?</span><div class="row"><button class="btn ghost" data-rate="0">Not yet</button><button class="btn green wide" data-rate="1">Got it</button></div></footer>`
    : `<footer class="lfoot"><button class="btn ghost" data-reveal="1">Show me the steps</button>
      ${Coach.supported() ? `<button class="btn teal wide" data-camon="1">Check with camera</button>` : `<button class="btn ghost" data-camhelp="1">Check with camera</button>`}</footer>`}`;
}
function feedbackBar(ok, title, text) {
  return `<footer class="lfoot ${ok ? "good" : "bad"}" role="status">
    <div class="yay"><span class="tick">${ok ? ICON.check("#2fa85a") : ICON.cross("#e2584a")}</span><div><b>${esc(title)}</b><span>${esc(text)}</span></div></div>
    <button class="btn ${ok ? "green" : "coral"} wide" data-next="1">Continue</button></footer>`;
}
function lessonEnd(outOfHearts) {
  const acc = P.scored ? Math.round(P.right / P.scored * 100) : 100;
  if (outOfHearts) return `<div class="lbody end">${mitt(150, "sad")}<h1 class="q">Out of hearts</h1>
      <p class="muted">That's OK. Look over the steps for these signs, then try again. Mistakes help you remember.</p></div>
    <footer class="lfoot"><button class="btn ghost" data-exit="1">Back</button><button class="btn teal wide" data-retry="1">Try again</button></footer>`;
  return `<div class="lbody end">${mitt(150)}<h1 class="q">Lesson complete!</h1>
      <div class="endstats"><div class="c-sun"><small>XP earned</small><b>${ICON.star("#fff")}+${P.xp}</b></div>
        <div class="c-leaf"><small>Accuracy</small><b>${acc}%</b></div><div class="c-coral"><small>Hearts left</small><b>${ICON.heart("#fff")}${P.hearts}</b></div></div>
      <p class="muted">Now the important part: use one of these with your child today. Real conversations are what build language.</p></div>
    <footer class="lfoot"><span></span><button class="btn green wide" data-exit="1">Continue</button></footer>`;
}

/* ---------- Camera coach (inside a lesson) ---------- */
const CAM_HELP = {
  file: "You opened index.html directly, and browsers block the camera that way. Close this tab and double-click start-mac.command (Mac) or start-windows.bat (Windows) in the First Signs folder instead. The app will open at localhost:8000 with the camera working.",
  preview: "This online preview can't use your camera. Download the First Signs folder, then double-click start-mac.command (Mac) or start-windows.bat (Windows). The app opens at localhost:8000 with the camera working.",
  browser: "This browser doesn't allow camera access here. Open the app in Chrome or Edge at localhost:8000.",
};
function viewCamera(s) {
  return `<div class="lbody wide">
    <div class="qtype c-text-teal">${ICON.cam("#11a3a0")}Camera coach · ${esc(P.title)}</div><h1 class="q">Sign <span class="hl">${esc(s.w)}</span></h1>
    <div class="hintwrap">${hintButton("hint-lesson")}${hintPanel("hint-lesson", s)}</div>
    <div class="camgrid">
      <div class="cam-stage" id="cam-stage">
        <video id="cam-video" playsinline muted></video><canvas id="cam-canvas"></canvas>
        <div class="cam-count" id="cam-count" hidden></div>
        <div class="cam-status" id="cam-status">Starting camera…</div>
      </div>
      <div class="livecard"><b>Live check</b>
        <p class="cam-live" aria-live="off"><span id="live-hand">Looking for your hand…</span></p>
        <p class="note">The dashed outline shows where this sign happens. Sit so your face and chest are in view.</p>
        <div id="cam-result" class="cam-result" role="status"></div>
        <details class="howto"><summary>How to sign ${esc(s.w)}</summary>${stepsDl(s)}<p class="hook"><b>Remember it:</b> ${esc(s.hook)}</p></details>
        <button class="link" data-camoff="1">Turn camera off</button>
      </div>
    </div></div>
  <footer class="lfoot"><div class="row" id="cam-actions"><button class="btn ghost" data-camskip="1">Skip</button><button class="btn teal wide" data-record="1">Record my sign</button></div></footer>`;
}
function mountCamera() {
  const s = byId(P.steps[P.i].id);
  Coach.setTarget(CHECKS[s.id]);
  const status = m => { const el = $("#cam-status"); if (el) { el.textContent = m; el.hidden = !m; } };
  const video = $("#cam-video"), canvas = $("#cam-canvas");
  video.addEventListener("loadedmetadata", () => { $("#cam-stage").style.aspectRatio = video.videoWidth + " / " + video.videoHeight; });
  Coach.start(video, canvas, f => {
    const el = $("#live-hand"); if (!el) return;
    const L = f.live;
    el.textContent = !L.face ? "Move back so your face is in the picture."
      : !L.hands ? "Looking for your hand…"
      : `I see ${L.hands === 2 ? "two hands" : "one hand"}${L.shape ? ", shaped like a " + Coach.SHAPE_NAMES[L.shape] : ""}, ${Coach.ZONE_NAMES[L.zone]}.`;
  }, status).catch(err => {
    status(err && err.name === "NotAllowedError"
      ? "Camera access is blocked. Allow the camera in your browser's address bar, then turn the camera on again."
      : "The camera couldn't start. Check that no other app is using it.");
  });
}
let recordingNow = false;
async function recordSign() {
  if (recordingNow) return; recordingNow = true;
  const s = byId(P.steps[P.i].id), check = CHECKS[s.id];
  const count = $("#cam-count"), out = $("#cam-result"), acts = $("#cam-actions");
  out.innerHTML = ""; acts.hidden = true; count.hidden = false;
  for (const n of ["3", "2", "1"]) { count.textContent = n; await new Promise(r => setTimeout(r, 700)); }
  count.textContent = "Sign now!"; count.classList.add("go");
  const frames = await Coach.record(3000);
  count.hidden = true; count.classList.remove("go"); recordingNow = false;
  if (!$("#cam-result")) return;
  const res = Coach.evaluate(frames, check);
  acts.hidden = false;
  if (res.error) {
    out.innerHTML = `<p class="cam-verdict no">${esc(res.error)}</p>`;
    acts.innerHTML = `<button class="btn ghost" data-camskip="1">Skip</button><button class="btn teal wide" data-record="1">Try again</button>`;
    return;
  }
  const want = check.shape.map(x => Coach.SHAPE_NAMES[x]).slice(0, 2).join(" or ");
  const handsOk = res.handsSeen >= res.handsNeeded;
  const rows = [
    [res.shapeOk && handsOk, "Handshape", !handsOk ? `This sign uses both hands. I only saw one.`
      : res.shapeOk ? `Looks like a ${Coach.SHAPE_NAMES[res.saw] || want}.` : `I saw ${res.saw ? "a " + Coach.SHAPE_NAMES[res.saw] : "a shape I couldn't read"}. Try a ${want}.`],
    [res.zoneOk, "Location", res.zoneOk ? `Right place, ${Coach.ZONE_NAMES[check.at]}.` : `Your hand was ${Coach.ZONE_NAMES[res.at]}. Sign it ${Coach.ZONE_NAMES[check.at]}.`],
    [res.moveOk, "Movement", res.moveOk ? "Movement looks right." : `Try to ${Coach.MOVE_HINTS[check.move[0]]}.`],
  ];
  const all = rows.every(r => r[0]);
  out.innerHTML = `<p class="cam-verdict ${all ? "ok" : "no"}">${all ? "That matches!" : "Close. Here's what to fix:"}</p>
    <ul class="checks">${rows.map(([ok, k, t]) => `<li class="${ok ? "ok" : "no"}"><span class="mark" aria-hidden="true">${ok ? "✓" : "✕"}</span><b>${k}</b><span>${esc(t)}</span></li>`).join("")}</ul>`;
  acts.innerHTML = all
    ? `<button class="btn ghost" data-record="1">Record again</button><button class="btn green wide" data-rate="1">Next sign</button>`
    : `<button class="btn ghost" data-rate="1">It was right, count it</button><button class="btn teal wide" data-record="1">Try again</button>`;
}

/* ---------- Rewards and profile ---------- */
function viewRewards() {
  const all = badges(), got = all.filter(b => b.have >= b.need).length;
  return `${statBar()}
  <section class="pagehead c-sun"><div class="pagehead-text"><small>Rewards</small><h1>${got} of ${all.length} badges earned</h1>
    <p>Badges come from knowing whole routines and, most of all, from using signs with your child.</p></div><div class="pagehead-mitt">${mitt(92)}</div></section>
  <div class="badges">${all.map(badgeTile).join("")}</div>`;
}
function weekDots() {
  const now = new Date(), monday = new Date(now); monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const set = new Set(S.days);
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => {
    const t = new Date(monday); t.setDate(monday.getDate() + i);
    const k = dayKey(t.getTime()), today = k === dayKey();
    return `<div class="day ${set.has(k) ? "on" : ""} ${today ? "today" : ""}"><i></i>${d}</div>`;
  }).join("");
}
function viewProfile() {
  const started = Object.keys(S.cards).length;
  const known = SIGNS.filter(s => isKnown(s.id)).length;
  const recent = S.used.slice().sort((a, b) => b.t - a.t).slice(0, 6);
  const fmt = t => new Date(t).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  const first = S.days.slice().sort((a, b) => new Date(a) - new Date(b))[0];
  const since = first ? new Date(first.replace(/-/g, "/")).toLocaleDateString(undefined, { month: "long", year: "numeric" }) : "today";
  const tile = (icon, n, label) => `<div class="stattile"><span class="tile-ic">${icon}</span><div><b>${n}</b><span>${label}</span></div></div>`;
  return `${statBar()}${sampleBanner()}
  <div class="profilehead"><div class="avatar">${mitt(70)}</div><div><h1>Your family</h1><p class="muted">Learning since ${since} · ${started} signs started</p></div></div>
  <div class="tiles4">${tile(ICON.flame(), streak(), "day streak")}${tile(ICON.star(), xp(), "total XP")}${tile(ICON.check("#11a3a0"), known, "signs known")}${tile(ICON.heart(), S.used.length, "real moments")}</div>
  <section class="panelcard"><h4>This week</h4><div class="week">${weekDots()}</div></section>
  <section class="panel"><h2>By routine</h2>
    ${ROUTINES.map(r => { const l = SIGNS.filter(s => s.r === r.id); const k = l.filter(s => isKnown(s.id)).length;
      return `<div class="prow"><span>${esc(r.name)}</span><div class="pbar c-${UNIT_COLOR[r.id]}"><i style="width:${Math.round(k / l.length * 100)}%"></i></div><span class="n">${k}/${l.length}</span></div>`; }).join("")}
    <p class="note">A sign counts as known after you get it right on two separate days.</p>
  </section>
  ${abcProgress()}
  <section class="panel"><h2>Signs used with your child</h2>
    ${recent.length ? `<ul class="log">${recent.map(u => `<li><b>${esc(byId(u.id)?.w || u.id)}</b><span class="muted">${fmt(u.t)}</span></li>`).join("")}</ul>` : `<p class="muted">Tap "We did it" under Today's real moment after you sign with your child.</p>`}
  </section>
  <section class="panel"><h2>Why this matters</h2>
    <div class="facts">
      <div class="fact"><b>90%+</b><p>of deaf children are born to hearing parents, most of whom don't know sign language.</p></div>
      <div class="fact"><b>≤40%</b><p>of these families sign at home, according to a 2010 Gallaudet University survey.</p></div>
      <div class="fact"><b>70%</b><p>of deaf children may miss out on language early on, say Boston University researchers.</p></div>
    </div>
    <p>The first years are when the brain is built for language. Every sign you use at the table or at bedtime gives your child words they can see. You don't have to be fluent to start. You only have to start.</p>
    <p class="note">Sign descriptions are written guides. Tap "Hint" for the handshape and a memory tip, and learn alongside Deaf adults and your local early intervention program whenever you can.</p>
  </section>
  <section class="panel"><h2>Start over</h2><p class="muted">Clears all progress saved in this browser.</p>
    <div class="row"><button class="btn ghost" data-askreset="1">Reset my progress</button></div><div id="resetconfirm" hidden class="row"><span>Are you sure?</span><button class="btn coral sm" id="reset">Yes, reset</button></div></section>`;
}

/* ---------- Router & events ---------- */
const app = $("#app");
const ALIAS = { today: "learn", progress: "profile" };
function route() {
  const h = (location.hash || "#learn").slice(1);
  let [tab, sub] = h.split(".");
  tab = ALIAS[tab] || tab;
  if (tab === "routines" && !sub) tab = "learn";
  let html;
  if (tab === "routines") html = viewRoutine(sub);
  else if (tab === "lesson") html = viewLesson();
  else if (tab === "practice") html = viewPractice();
  else if (tab === "abc") html = viewAbc(sub);
  else if (tab === "rewards") html = viewRewards();
  else if (tab === "profile") html = viewProfile();
  else { tab = "learn"; html = viewLearn(); }
  const inLesson = tab === "lesson";
  document.body.classList.toggle("lesson-mode", inLesson);
  app.innerHTML = html;
  const r = $("#rail"); if (r) r.innerHTML = inLesson ? "" : rail();
  const camOn = inLesson && P && P.cam && P.i < P.steps.length && P.hearts > 0 && P.steps[P.i].t === "recall" && Coach.supported();
  if (camOn) mountCamera(); else Coach.stop();
  const active = tab === "routines" ? "learn" : tab;
  document.querySelectorAll("nav.tabs a").forEach(a => {
    if (a.dataset.tab === active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  save();
}
function go(hash) { if (location.hash === "#" + hash) route(); else location.hash = hash; window.scrollTo(0, 0); }

function score(id, ok) { rate(id, ok); P.scored++; if (ok) { P.right++; P.xp += 10; } else P.hearts--; }
function onClick(e) {
  const b = e.target.closest("button"); if (!b) return;
  const d = b.dataset;
  if (d.hint) { const el = document.getElementById(d.hint); if (el) { el.hidden = !el.hidden; b.setAttribute("aria-expanded", String(!el.hidden)); } return; }
  if (abcClick(b)) return;   // ABC tab buttons (js/abc.js)
  if (b.id === "reset") { S = { sample: false, cards: {}, days: [], used: [], mission: null }; P = null; save(); toast("Fresh start. Welcome!"); go("learn"); return; }
  if (d.askreset) { const n = $("#resetconfirm"); if (n) n.hidden = false; }
  else if (d.go) go(d.go);
  else if (d.open) go("routines." + d.open);
  else if (d.learn) { learn(d.learn); toast(byId(d.learn).w + " added to your practice"); route(); }
  else if (d.used) { S.used.push({ id: d.used, t: Date.now() }); learn(d.used); markDay(); save(); toast("Nice! That's real language for your child."); route(); }
  else if (d.lesson) { const [rid, i] = d.lesson.split(":"); const r = ROUTINES.find(x => x.id === rid); lessonFromSigns(r.name, unitLessons(r)[+i], "learn"); }
  else if (d.review) { const r = ROUTINES.find(x => x.id === d.review); const l = SIGNS.filter(s => s.r === r.id);
    l.forEach(s => learn(s.id)); startLesson(r.name + " review", [...shuffle(l).map(s => ({ t: "pick", id: s.id })), ...shuffle(l).slice(0, 2).map(s => ({ t: "recall", id: s.id }))], "learn"); }
  else if (d.start) startMode(d.start);
  else if (d.exit) { const back = P ? P.back : "learn"; P = null; Coach.stop(); go(back); }
  else if (d.retry) { P = Object.assign(P, { i: 0, right: 0, scored: 0, hearts: 5, answered: null, opts: null, revealed: false, xp: 0 }); route(); }
  else if (d.taught) { learn(P.steps[P.i].id); bumpGoal(); P.i++; route(); }
  else if (d.reveal) { P.revealed = true; route(); }
  else if (d.rate) { score(P.steps[P.i].id, d.rate === "1"); P.i++; P.revealed = false; route(); }
  else if (d.pick) { const id = P.steps[P.i].id; P.answered = d.pick; score(id, d.pick === id); route(); }
  else if (d.next) { P.i++; P.answered = null; P.opts = null; route(); }
  else if (d.camon) { P.cam = true; route(); }
  else if (d.camoff) { P.cam = false; route(); }
  else if (d.camhelp) { const n = $("#camhelp"); if (n) n.hidden = false; }
  else if (d.record) recordSign();
  else if (d.camskip) { score(P.steps[P.i].id, false); P.i++; route(); }
  else if (d.camsign) { learn(d.camsign); startLesson("Camera coach", [{ t: "recall", id: d.camsign }], location.hash.slice(1) || "learn", true); }
}
app.addEventListener("click", onClick);
document.getElementById("rail").addEventListener("click", onClick);
window.addEventListener("hashchange", route);
route();
