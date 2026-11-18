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
/* ---------- Badges ---------- */
function badges() {
  const unit = r => { const l = SIGNS.filter(s => s.r === r.id); return { id: "u-" + r.id, name: r.name, icon: UNIT_ICON[r.id]("#fff"), color: UNIT_COLOR[r.id], have: l.filter(s => isKnown(s.id)).length, need: l.length, how: "Know every sign in " + r.name }; };
  const abcK = list => list.filter(x => abcKnown(x.id)).length;
  return [
    { id: "first", name: "First moment", icon: ICON.heart("#fff"), color: "coral", have: Math.min(1, S.used.length), need: 1, how: "Use a sign with your child" },
    { id: "ten", name: "10 moments", icon: ICON.heart("#fff"), color: "coral", have: Math.min(10, S.used.length), need: 10, how: "Use signs with your child 10 times" },
    { id: "week", name: "7-day streak", icon: `<svg viewBox="0 0 32 32"><path d="M16 3c2 6 9 8 9 16a9 9 0 0 1-18 0c0-4 2-6 4-8 0 3 1 5 3 5-1-5 0-9 2-13z" fill="#fff"/></svg>`, color: "sun", have: Math.min(7, streak()), need: 7, how: "Practice 7 days in a row" },
    ...ROUTINES.map(unit),
    { id: "abc", name: "Alphabet Ace", icon: `<svg viewBox="0 0 32 32"><text x="16" y="22" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="12" fill="#fff">ABC</text></svg>`, color: "teal", have: abcK(LETTERS), need: LETTERS.length, how: "Know every letter" },
    { id: "num", name: "Counting Pro", icon: `<svg viewBox="0 0 32 32"><text x="16" y="22" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="13" fill="#fff">123</text></svg>`, color: "leaf", have: abcK(NUMBERS), need: NUMBERS.length, how: "Know the numbers 1 to 10" },
  ];
}
function badgeTile(b) {
  const got = b.have >= b.need;
  return `<div class="badge ${got ? "got" : ""}" title="${esc(b.how)}">
    <i class="${got ? "c-" + b.color : ""}">${got ? b.icon : ICON.lock()}</i><b>${esc(b.name)}</b>
    ${got ? `<span>Earned</span>` : `<div class="pbar thin"><i style="width:${Math.round(b.have / b.need * 100)}%"></i></div><span>${b.have}/${b.need}</span>`}</div>`;
}
/* ---------- Learn: lessons of three signs, one set per routine ---------- */
const LESSON_SIZE = 3;
function unitLessons(r) {
  const l = SIGNS.filter(s => s.r === r.id), out = [];
  for (let i = 0; i < l.length; i += LESSON_SIZE) out.push(l.slice(i, i + LESSON_SIZE));
  return out;
}
const lessonState = list => list.every(s => isKnown(s.id)) ? "done" : list.some(s => card(s.id)) ? "started" : "new";
// The current lesson is the first one, in routine order, that isn't fully known yet.
function currentLesson() {
  for (const r of ROUTINES) { const ls = unitLessons(r); for (let i = 0; i < ls.length; i++) if (lessonState(ls[i]) !== "done") return r.id + ":" + i; }
  return null;
}
// One routine as a card: icon, progress, and its lessons as a numbered checklist.
function routineCard(r, current) {
  const lessons = unitLessons(r), c = UNIT_COLOR[r.id], all = SIGNS.filter(s => s.r === r.id), k = all.filter(s => isKnown(s.id)).length;
  const rows = lessons.map((l, i) => {
    const key = r.id + ":" + i, st = lessonState(l), now = key === current;
    const tag = st === "done" ? `<span class="lstate done">${ICON.check("#2f8f5b")}Done</span>`
      : now ? `<span class="lstate now">${st === "started" ? "Keep going" : "Start"}</span>`
      : st === "started" ? `<span class="lstate">Keep going</span>` : `<span class="lstate">Start</span>`;
    return `<li><button class="lrow ${now ? "now" : ""} ${st}" data-lesson="${key}" aria-label="${esc(r.name)} lesson ${i + 1}: ${esc(l.map(s => s.w).join(", "))}${st === "done" ? ", done" : ""}">
      <span class="lnum">${i + 1}</span><span class="lwords">${l.map(s => esc(s.w)).join(" · ")}</span>${tag}</button></li>`;
  }).join("");
  return `<section class="rcard t-${c}" aria-labelledby="r-${r.id}">
    <header class="rhead"><i class="ric">${UNIT_ICON[r.id]("currentColor")}</i>
      <div><b id="r-${r.id}">${esc(r.name)}</b><small>${esc(r.time)}</small></div>
      <span class="rcount">${k}/${all.length} signs</span></header>
    <div class="rbar"><i style="width:${Math.round(k / all.length * 100)}%"></i></div>
    <ol class="lrows">${rows}</ol>
    <footer class="rfoot"><button class="textbtn" data-review="${r.id}">Review all ${all.length}</button><button class="textbtn" data-open="${r.id}">Sign guide</button></footer>
  </section>`;
}

/* ---------- Learn dashboard ---------- */
let mapSel = null;   // routine picked in the learning path (null = the one with the current lesson)
// A ring that fills with a share (0 to 1), with a label in the middle.
function donut(f, label) {
  const c = 2 * Math.PI * 52, on = Math.max(0, Math.min(1, f)) * c;
  return `<div class="donut"><svg viewBox="0 0 128 128" aria-hidden="true"><circle cx="64" cy="64" r="52" fill="none" stroke="#fbe3cf" stroke-width="16"/>
    <circle cx="64" cy="64" r="52" fill="none" stroke="#3b6e98" stroke-width="16" stroke-dasharray="${on.toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 64 64)"/>
    ${f > 0 && f < 1 ? `<circle cx="64" cy="64" r="52" fill="none" stroke="#e98b5d" stroke-width="16" stroke-dasharray="${Math.min(14, c - on).toFixed(1)} ${c.toFixed(1)}" stroke-dashoffset="${(-on).toFixed(1)}" transform="rotate(-90 64 64)"/>` : ""}</svg><b>${label}</b></div>`;
}
function viewLearn() {
  const current = currentLesson(), g = goalToday(), fresh = !Object.keys(S.cards).length;
  const cur = current ? current.split(":")[0] : null, sel = ROUTINES.find(r => r.id === (mapSel || cur)) || ROUTINES[0];
  const total = SIGNS.length, known = SIGNS.filter(s => isKnown(s.id)).length;
  let next = `<button class="btn teal" data-go="practice">Practice</button>`, nextWords = [];
  if (current) {
    const [rid, ci] = current.split(":"), r = ROUTINES.find(x => x.id === rid), l = unitLessons(r)[+ci];
    nextWords = l;
    next = `<div class="bnext"><small>Up next · ${esc(r.name)}</small><b>${l.map(s => esc(s.w)).join(", ")}</b></div>
      <button class="btn teal" data-lesson="${current}">${lessonState(l) === "started" ? "Keep going" : "Start lesson"}</button>`;
  }
  // Banner
  const banner = `<section class="welcome"><div class="welcome-text"><h2>${fresh ? "Welcome!" : "Welcome back!"}</h2>
      <p>${fresh ? "Ready to learn your first signs?" : "Ready to sign with your child?"}</p>
      <div class="row welcome-act">${next}<span class="lpill">${ICON.flame()}${streak()} day streak</span></div></div>
    <div class="welcome-art">${mitt(118)}</div></section>`;
  // Daily goal
  const goal = `<section class="dcard goal"><h3>Daily goal</h3>${donut(g / GOAL, Math.round(Math.min(1, g / GOAL) * 100) + "%")}
    <p class="center">Goal: <b>${GOAL} signs</b> a day<br>Done today: <b>${Math.min(g, GOAL)} sign${Math.min(g, GOAL) === 1 ? "" : "s"}</b></p>
    <p class="note center">${g >= GOAL ? "Goal reached. Nice work today!" : `${GOAL - g} more to reach today's goal.`}</p>
    <button class="btn teal block" data-go="practice">Start practice session</button></section>`;
  // Sign of the day (today's real moment)
  const m = todayMission(), mdone = S.used.some(u => u.id === m.id && dayKey(u.t) === dayKey());
  const day = `<section class="dcard sotd"><h3>Today's real moment</h3>
    <div class="sotd-word">${SIGN_PHOTOS[m.id] ? `<img src="${photoSrc(SIGN_PHOTOS[m.id].file)}" alt="" onerror="this.remove()">` : ""}<span>${esc(m.w)}</span></div>
    <b class="center">Sign ${esc(m.w)} with your child</b><p class="note center">${esc(m.say)}</p>
    <div class="row center-row">${mdone ? `<span class="pill good">${ICON.check("#3f9a6b")} Done today</span>` : `<button class="btn teal" data-used="${m.id}">We did it</button>`}
      <button class="btn ghost" data-open="${m.r}">How to sign</button></div></section>`;
  // Learning path: every routine as a module; pick one to see its lessons
  const mods = ROUTINES.map(r => {
    const all = SIGNS.filter(s => s.r === r.id), k = all.filter(s => isKnown(s.id)).length, started = all.some(s => card(s.id));
    const st = k === all.length ? "done" : r.id === cur ? "now" : started ? "started" : "new";
    const label = st === "done" ? "Done" : st === "now" ? "In progress" : st === "started" ? `${k} of ${all.length} signs` : "Not started";
    return `<button class="mod ${st} ${r.id === sel.id ? "sel" : ""}" data-mapsel="${r.id}" aria-pressed="${r.id === sel.id}">
      <b>${esc(r.name)}</b><span>${st === "done" ? ICON.check("#3f9a6b") : ""}${label}</span></button>`;
  }).join("");
  const path = `<section class="dcard path"><h3>Learning path</h3><div class="mods">${mods}</div>
    <div class="pathbar"><b>${Math.round(known / total * 100)}%</b><div class="pbar teal"><i style="width:${known / total * 100}%"></i></div><span class="note">${known} of ${total} signs</span></div></section>`;
  // Milestones (badges)
  const bs = badges(), got = bs.filter(b => b.have >= b.need), nextB = bs.filter(b => b.have < b.need).sort((a, b) => b.have / b.need - a.have / a.need)[0];
  const miles = `<section class="dcard miles"><h3>Milestones</h3>
    ${got.length ? `<ul class="mlist">${got.slice(0, 3).map(b => `<li>${ICON.check("#3f9a6b")}<div><b>${esc(b.name)}</b><span>Achieved</span></div></li>`).join("")}</ul>`
      : `<p class="note">No badges yet. Your first one comes after your first real moment.</p>`}
    ${nextB ? `<div class="mnext"><small>Next milestone</small><b>${esc(nextB.name)}</b><div class="pbar thin teal"><i style="width:${Math.round(nextB.have / nextB.need * 100)}%"></i></div><span class="note">${nextB.have}/${nextB.need} · ${esc(nextB.how)}</span></div>` : ""}
    <button class="link" data-go="rewards">View all badges</button></section>`;
  // Quick access: the signs in the next lesson
  const tones = ["qa-blue", "qa-green", "qa-peach"];
  const quick = nextWords.length ? `<section class="quick"><h3>Quick access <span class="muted">signs in your next lesson</span></h3><div class="qtiles">
    ${nextWords.map((s, i) => `<button class="qtile ${tones[i % 3]}" data-open="${s.r}" aria-label="How to sign ${esc(s.w)}"><span>${esc(s.w)}</span><small>${isKnown(s.id) ? "Learned" : card(s.id) ? "Practicing" : "New"}</small></button>`).join("")}</div></section>` : "";
  return `${sampleBanner()}<h1 class="ptitle">Learn</h1>${banner}
    <div class="dash"><div class="dash-l">${goal}${day}${quick}</div><div class="dash-r">${path}<div class="dcol">${routineCard(sel, current)}</div>${miles}</div></div>`;
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
  return `<button class="back" data-go="learn">← Back to Learn</button>
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
   and "recall" (see the word, make the sign, check yourself or with the camera). */
let P = null;
function startLesson(title, steps, back = "learn", cam = false) {
  P = { title, steps, back, i: 0, right: 0, scored: 0, answered: null, opts: null, revealed: false, cam, xp: 0 };
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

/* Lesson screens: a calm, two-column layout ("Watch" | "Your turn") on a muted dark background,
   with a thin progress bar and one main button at the bottom. */
function lessonTop() {
  const n = P.steps.length, at = Math.min(P.i + 1, n);
  return `<div class="ltop"><button class="x" data-exit="1" aria-label="Leave lesson"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    <div class="lprog" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${P.i}"><i style="width:${P.i / n * 100}%"></i></div>
    <span class="lcount">${P.i >= n ? n : at} of ${n}</span></div>`;
}
// The "Watch" picture: the sign's photo, else its handshape's photo, else the word itself.
function watchFrame(s) {
  const file = SIGN_PHOTOS[s.id] ? SIGN_PHOTOS[s.id].file : HANDSHAPE_PHOTOS[signShapes(s)[0]];
  return `<div class="lframe"><span class="lgloss">${esc(s.w)}</span>
    ${file ? `<img src="${photoSrc(file)}" alt="${esc(s.w)}" loading="lazy" onerror="this.remove()">` : ""}</div>`;
}
const paneLabel = (t, live) => `<div class="plabel">${live ? "<i></i>" : ""}${t}</div>`;
const lbtn = (cls, data, text) => `<button class="lbtn ${cls}" ${data}>${text}</button>`;
const resultRow = (ok, title, text) => `<div class="lresult ${ok ? "ok" : "no"}" role="status">
    <span class="lcheck">${ok ? ICON.check("#3f8a70") : ICON.cross("#b46262")}</span><div><b>${esc(title)}</b><p>${esc(text)}</p></div></div>`;

function viewLesson() {
  if (!P) { setTimeout(() => go("learn")); return ""; }
  if (P.i >= P.steps.length) return lessonEnd();
  const st = P.steps[P.i], s = byId(st.id);
  if (st.t === "teach") return `${lessonTop()}<div class="lgrid">
      <section class="pane">${paneLabel("Watch")}${watchFrame(s)}
        <h1 class="lname">${esc(s.w)}</h1><p class="ldesc">${esc(s.hand)}</p>
        <div class="hintwrap">${hintButton("hint-lesson")}${hintPanel("hint-lesson", s, false)}</div></section>
      <section class="pane">${paneLabel("Your turn")}
        <div class="lcard"><p class="lnew">New sign</p>${stepsDl(s)}<p class="hook"><b>Remember it:</b> ${esc(s.hook)}</p><p class="say">${esc(s.say)}</p></div>
        <p class="lnote">Try it with your hands now. Mirror it if you're left-handed.</p></section></div>
    <footer class="lfoot">${lbtn("main", 'data-taught="1"', "Continue")}</footer>`;
  if (st.t === "pick") {
    if (!P.opts) P.opts = shuffle([s, ...shuffle(SIGNS.filter(x => x.id !== s.id)).slice(0, 3)]).map(x => x.id);
    const ok = P.answered === s.id;
    return `${lessonTop()}<div class="lgrid">
      <section class="pane">${paneLabel("Read")}
        <div class="lcard">${stepsDl(s)}</div>
        ${P.answered ? "" : `<div class="hintwrap">${hintButton("hint-lesson")}${hintPanel("hint-lesson", s)}</div>`}</section>
      <section class="pane">${paneLabel("Which sign is this?")}
        <div class="lopts">${P.opts.map(id => {
          const cls = P.answered ? (id === s.id ? "right" : id === P.answered ? "wrong" : "dim") : "";
          return `<button class="lopt ${cls}" data-pick="${id}" ${P.answered ? "disabled" : ""}>${esc(byId(id).w)}</button>`;
        }).join("")}</div>
        ${P.answered ? resultRow(ok, ok ? "Correct" : "Not quite. It's " + s.w + ".", s.hook) : ""}</section></div>
    <footer class="lfoot">${P.answered ? lbtn("main", 'data-next="1"', "Continue") : `<span class="lnote">Tap the sign that matches.</span>`}</footer>`;
  }
  // recall: see the word, make the sign
  if (P.cam && Coach.supported()) return `${lessonTop()}${viewCamera(s)}`;
  return `${lessonTop()}<div class="lgrid">
    <section class="pane">${paneLabel("Sign this")}
      <div class="lframe"><span class="lbig">${esc(s.w)}</span></div>
      <p class="ldesc">${esc(s.say)}</p>
      ${P.revealed ? "" : `<div class="hintwrap">${hintButton("hint-lesson")}${hintPanel("hint-lesson", s)}</div>`}</section>
    <section class="pane">${paneLabel("Your turn")}
      ${P.revealed ? `<div class="lcard">${stepsDl(s)}<p class="hook"><b>Remember it:</b> ${esc(s.hook)}</p></div><p class="lnote">Did your sign match?</p>`
        : `<div class="lcard center"><p>Make the sign with your hands, then check it.</p>
            ${Coach.supported() ? lbtn("main", 'data-camon="1"', "Check with camera") : lbtn("ghost", 'data-camhelp="1"', "Check with camera")}
            <p class="lnote" id="camhelp" hidden>${esc(CAM_HELP[Coach.whyNot()] || "")}</p></div>`}</section></div>
  <footer class="lfoot">${P.revealed ? `${lbtn("plain", 'data-rate="0"', "Not yet")}${lbtn("main", 'data-rate="1"', "Got it")}`
    : lbtn("plain", 'data-reveal="1"', "Show me the steps")}</footer>`;
}
function lessonEnd() {
  const acc = P.scored ? Math.round(P.right / P.scored * 100) : 100;
  const done = new Set(P.steps.map(x => x.id)).size;
  return `<div class="lend">${resultRow(true, "Lesson complete", `${done} sign${done > 1 ? "s" : ""} practiced · ${acc}% correct · +${P.xp} XP`)}
      <p class="ldesc">Now the important part: use one of these with your child today. Real conversations are what build language.</p></div>
    <footer class="lfoot">${lbtn("main", 'data-exit="1"', "Continue")}</footer>`;
}

/* ---------- Camera coach (inside a lesson) ---------- */
const CAM_HELP = {
  file: "You opened index.html directly, and browsers block the camera that way. Close this tab and double-click start-mac.command (Mac) or start-windows.bat (Windows) in the First Signs folder instead. The app will open at localhost:8000 with the camera working.",
  preview: "This online preview can't use your camera. Download the First Signs folder, then double-click start-mac.command (Mac) or start-windows.bat (Windows). The app opens at localhost:8000 with the camera working.",
  browser: "This browser doesn't allow camera access here. Open the app in Chrome or Edge at localhost:8000.",
};
function viewCamera(s) {
  return `<div class="lgrid">
    <section class="pane">${paneLabel("Watch")}${watchFrame(s)}
      <h1 class="lname">${esc(s.w)}</h1><p class="ldesc">${esc(s.hand)}</p>
      <div class="hintwrap">${hintButton("hint-lesson")}${hintPanel("hint-lesson", s)}</div></section>
    <section class="pane">${paneLabel("Your turn", true)}
      <div class="cam-stage" id="cam-stage">
        <video id="cam-video" playsinline muted></video><canvas id="cam-canvas"></canvas>
        <div class="cam-count" id="cam-count" hidden></div>
        <div class="cam-status" id="cam-status">Starting camera…</div>
      </div>
      <p class="cam-live" aria-live="off"><span id="live-hand">Looking for your hand…</span></p>
      <div id="cam-result" class="cam-result" role="status"></div>
      <button class="lbtn plain small" data-camoff="1">Turn camera off</button>
    </section></div>
  <footer class="lfoot"><div class="row" id="cam-actions">${lbtn("plain", 'data-camskip="1"', "Skip")}${lbtn("main", 'data-record="1"', "Record my sign")}</div></footer>`;
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
    out.innerHTML = resultRow(false, "Let's try that again", res.error);
    acts.innerHTML = `${lbtn("plain", 'data-camskip="1"', "Skip")}${lbtn("main", 'data-record="1"', "Try again")}`;
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
  // How much of the recording matched each part. Movement is a yes/no check.
  const pct = [res.shapePct, res.zonePct, null].map(v => v == null ? null : Math.round(v * 100));
  const passed = rows.filter(r => r[0]).length;
  out.innerHTML = `${resultRow(all, all ? "Great match" : "Almost there", `${passed} of 3 checks passed${all ? "" : ". Here's what to fix."}`)}
    <ul class="checks">${rows.map(([ok, k, t], n) => `<li class="${ok ? "ok" : "no"}"><span class="mark" aria-hidden="true">${ok ? "✓" : "✕"}</span>
      <div><b>${k}</b><span>${esc(t)}</span></div>
      <em>${pct[n] == null ? (ok ? "Detected" : "Not seen") : `Matched ${pct[n]}% of the time`}</em></li>`).join("")}</ul>`;
  acts.innerHTML = all
    ? `${lbtn("plain", 'data-record="1"', "Record again")}${lbtn("main", 'data-rate="1"', "Next sign")}`
    : `${lbtn("plain", 'data-rate="1"', "It was right, count it")}${lbtn("main", 'data-record="1"', "Try again")}`;
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
  const camOn = inLesson && P && P.cam && P.i < P.steps.length && P.steps[P.i].t === "recall" && Coach.supported();
  if (camOn) mountCamera(); else Coach.stop();
  const active = tab === "routines" ? "learn" : tab;
  document.querySelectorAll("nav.tabs a").forEach(a => {
    if (a.dataset.tab === active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  save();
}
function go(hash) { if (location.hash === "#" + hash) route(); else location.hash = hash; window.scrollTo(0, 0); }

function score(id, ok) { rate(id, ok); P.scored++; if (ok) { P.right++; P.xp += 10; } }
function onClick(e) {
  const b = e.target.closest("button"); if (!b) return;
  const d = b.dataset;
  if (d.hint) { const el = document.getElementById(d.hint); if (el) { el.hidden = !el.hidden; b.setAttribute("aria-expanded", String(!el.hidden)); } return; }
  if (abcClick(b)) return;   // ABC tab buttons (js/abc.js)
  if (b.id === "reset") { S = { sample: false, cards: {}, days: [], used: [], mission: null }; P = null; save(); toast("Fresh start. Welcome!"); go("learn"); return; }
  if (d.askreset) { const n = $("#resetconfirm"); if (n) n.hidden = false; }
  else if (d.go) go(d.go);
  else if (d.open) go("routines." + d.open);
  else if (d.mapsel) { mapSel = d.mapsel; route(); }
  else if (d.learn) { learn(d.learn); toast(byId(d.learn).w + " added to your practice"); route(); }
  else if (d.used) { S.used.push({ id: d.used, t: Date.now() }); learn(d.used); markDay(); save(); toast("Nice! That's real language for your child."); route(); }
  else if (d.lesson) { const [rid, i] = d.lesson.split(":"); const r = ROUTINES.find(x => x.id === rid); lessonFromSigns(r.name, unitLessons(r)[+i], "learn"); }
  else if (d.review) { const r = ROUTINES.find(x => x.id === d.review); const l = SIGNS.filter(s => s.r === r.id);
    l.forEach(s => learn(s.id)); startLesson(r.name + " review", [...shuffle(l).map(s => ({ t: "pick", id: s.id })), ...shuffle(l).slice(0, 2).map(s => ({ t: "recall", id: s.id }))], "learn"); }
  else if (d.start) startMode(d.start);
  else if (d.exit) { const back = P ? P.back : "learn"; P = null; Coach.stop(); go(back); }
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
window.addEventListener("hashchange", route);
route();
