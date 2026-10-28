/* ---------- Storage (per-browser, safe if blocked) ---------- */
const KEY = "firstsigns.v1";
const DAY = 86400000;
const INTERVALS = [0, 1, 2, 4, 7, 14, 30]; // days until next review, by box
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
    mission: null,
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
const videoUrl = s => "https://www.signingsavvy.com/search/" + encodeURIComponent(s.w.toLowerCase());
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function streak() {
  const set = new Set(S.days); let n = 0; let t = Date.now();
  if (!set.has(dayKey(t))) t -= DAY;
  while (set.has(dayKey(t))) { n++; t -= DAY; }
  return n;
}
function markDay() { const k = dayKey(); if (!S.days.includes(k)) S.days.push(k); }
function toast(msg) {
  const t = document.createElement("div"); t.className = "toast pop"; t.textContent = msg; t.setAttribute("role", "status");
  document.body.appendChild(t); setTimeout(() => t.remove(), 2200);
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
  S.cards[id] = c; markDay(); save();
}
function learn(id) { if (!S.cards[id]) { S.cards[id] = { box: 1, due: Date.now() + DAY, seen: 1 }; markDay(); save(); } }

/* ---------- Views ---------- */
const brand = `<div class="top">
  <div class="brand"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="var(--sun)"/><path d="M14 27v-9.5a1.6 1.6 0 0 1 3.2 0V21M17.2 20V12a1.6 1.6 0 0 1 3.2 0v8M20.4 20v-6.5a1.6 1.6 0 0 1 3.2 0V21M23.6 19v-3a1.6 1.6 0 0 1 3.2 0v6.5c0 4-3 6.5-6.5 6.5h-.8c-2.2 0-3.8-.9-5-2.6l-2.3-3.3a1.5 1.5 0 0 1 2.4-1.8L14 23" fill="none" stroke="#1b2440" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>First Signs</div>
  <span class="streak" title="Days in a row you've practiced">${streak()} day streak</span>
</div>`;

function sampleBanner() {
  return S.sample ? `<div class="mission" style="border-color:var(--line)">
    <p><b>You're looking at example progress</b> so you can see how the app works. Start fresh whenever you're ready.</p>
    <div class="row"><button class="btn ghost" id="reset">Start fresh</button></div></div>` : "";
}

function viewToday() {
  const set = todaysSet();
  const hour = new Date().getHours();
  const moment = hour < 10 ? "meal" : hour < 17 ? "play" : "bed";
  const r = ROUTINES.find(x => x.id === moment);
  const pick = S.mission && byId(S.mission.id) && S.mission.day === dayKey() ? byId(S.mission.id)
    : (SIGNS.filter(s => s.r === moment && card(s.id))[0] || SIGNS.find(s => s.r === moment));
  S.mission = { id: pick.id, day: dayKey() };
  const usedToday = S.used.filter(u => dayKey(u.t) === dayKey()).length;
  return `${brand}${sampleBanner()}
  <section class="today pop" aria-labelledby="t1">
    <div class="stack">
      <span class="eyebrow">Today's 5 minutes</span>
      <h1 id="t1">${set.length} signs to practice</h1>
      <p class="muted">Short, daily practice sticks better than one long session. Signs you know come back less often.</p>
    </div>
    <div class="chips">${set.map(s => `<span class="chip ${card(s.id) ? "due" : ""}">${esc(s.w)}${card(s.id) ? "" : " · new"}</span>`).join("")}</div>
    <button class="btn sun block" data-go="practice">Start practice</button>
  </section>

  <section class="mission" aria-labelledby="m1">
    <span class="eyebrow">Use it for real · ${esc(r.name)}</span>
    <strong id="m1">Sign ${esc(pick.w)} with your child today</strong>
    <p>${esc(pick.say)}</p>
    <div class="row">
      <button class="btn good" data-used="${pick.id}">We used it</button>
      <button class="btn ghost" data-open="${pick.r}">How to sign it</button>
      <span class="muted">${usedToday ? usedToday + " real moment" + (usedToday > 1 ? "s" : "") + " today" : ""}</span>
    </div>
  </section>

  <section class="stack" aria-labelledby="r1">
    <h2 id="r1">Daily routines</h2>
    ${routineGrid()}
  </section>`;
}

function routineGrid() {
  return `<div class="routines">${ROUTINES.map(r => {
    const list = SIGNS.filter(s => s.r === r.id); const k = list.filter(s => card(s.id)).length;
    return `<button class="routine" data-open="${r.id}">
      <span class="time">${esc(r.time)}</span><span class="name">${esc(r.name)}</span>
      <div class="bar" aria-hidden="true"><i style="width:${Math.round(k / list.length * 100)}%"></i></div>
      <span class="count">${k} of ${list.length} signs started</span></button>`;
  }).join("")}</div>`;
}

function viewRoutines() {
  return `${brand}<div class="stack"><h1>Routines</h1><p class="muted">Signs are grouped by the moments you already share with your child, so practice happens inside your day instead of on top of it.</p></div>${routineGrid()}
  <section class="panel"><h2>Handshape cheat sheet</h2><p class="muted">Most signs use one of a dozen handshapes. Learn these and the instructions get much easier.</p>
  <div class="hs">${HANDSHAPES.map(([n, d]) => `<div><b>${esc(n)}</b><span class="muted">${esc(d)}</span></div>`).join("")}</div></section>`;
}

function viewRoutine(id) {
  const r = ROUTINES.find(x => x.id === id); if (!r) return viewRoutines();
  const list = SIGNS.filter(s => s.r === id);
  return `<button class="back" data-go="routines">← All routines</button>
  <div class="stack"><span class="eyebrow">${esc(r.time)}</span><h1>${esc(r.name)}</h1>
  <p class="muted">"One hand" means your dominant hand. Keep signs in front of your chest and face, where your child is already looking.</p></div>
  <div class="signlist">${list.map(signCard).join("")}</div>
  <section class="phrases"><h2>Put them together</h2><p class="muted">ASL glosses are written in capitals. Yes/no questions use raised eyebrows.</p>
  ${(PHRASES[id] || []).map(([g, e]) => `<div class="phrase"><span class="g">${esc(g)}</span><span class="muted">${esc(e)}</span></div>`).join("")}</section>`;
}

function signCard(s) {
  const c = card(s.id);
  const st = !c ? `<span class="status">New</span>` : isKnown(s.id) ? `<span class="status k">Known</span>` : `<span class="status l">Learning</span>`;
  return `<article class="sign" id="sign-${s.id}">
    <div class="sign-head"><span class="gloss">${esc(s.w)}</span>${st}</div>
    <dl class="steps"><dt>Hand</dt><dd>${esc(s.hand)}</dd><dt>Where</dt><dd>${esc(s.where)}</dd><dt>Move</dt><dd>${esc(s.move)}</dd></dl>
    <p class="hook"><b>Remember it:</b> ${esc(s.hook)}</p>
    <p class="say">${esc(s.say)}</p>
    <div class="row">
      ${c ? "" : `<button class="btn" data-learn="${s.id}">Add to my practice</button>`}
      ${Coach.supported() ? `<button class="btn ghost" data-camsign="${s.id}">Check with camera</button>` : ""}
      <a href="${videoUrl(s)}" target="_blank" rel="noopener">Watch it signed ↗</a>
    </div></article>`;
}

/* Practice: "Read & pick" = recognition quiz; "Try it" = recall with self-rating that drives spacing. */
let P = null;
function startPractice(mode) {
  let set = todaysSet();
  if (set.length < 4) set = shuffle(SIGNS).slice(0, 5);
  set.forEach(s => learn(s.id));
  P = { mode, items: shuffle(set).map(s => s.id), i: 0, right: 0, revealed: false, answered: null };
}
function viewPractice() {
  if (!P) startPractice("recall");
  const seg = `<div class="seg" role="group" aria-label="Practice type">
    <button data-mode="recall" aria-pressed="${P.mode === "recall"}">Try it yourself</button>
    <button data-mode="pick" aria-pressed="${P.mode === "pick"}">Read &amp; pick</button></div>`;
  const dots = `<div class="progress-dots" aria-label="Sign ${Math.min(P.i + 1, P.items.length)} of ${P.items.length}">${P.items.map((_, k) => `<i class="${k < P.i ? "on" : ""}"></i>`).join("")}</div>`;
  if (P.i >= P.items.length) {
    return `${brand}${seg}<section class="card pop"><span class="eyebrow">Session done</span>
      <h1>${P.mode === "pick" ? `${P.right} of ${P.items.length} right` : `${P.right} of ${P.items.length} felt solid`}</h1>
      <p>Now the important part: use one of these with your child before bed tonight. Real conversations are what build language.</p>
      <div class="row"><button class="btn sun" data-again="1">Practice again</button><button class="btn ghost" data-go="today">Back to today</button></div></section>`;
  }
  const s = byId(P.items[P.i]);
  if (P.mode === "recall" && P.cam) return `${brand}${seg}${viewCamera(s, dots)}`;
  if (P.mode === "recall") {
    return `${brand}${seg}<section class="card pop">${dots}
      <span class="eyebrow" style="text-align:center">Make this sign</span>
      <div class="big">${esc(s.w)}</div>
      <p class="situation">${esc(s.say)}</p>
      ${P.revealed ? `<dl class="steps"><dt>Hand</dt><dd>${esc(s.hand)}</dd><dt>Where</dt><dd>${esc(s.where)}</dd><dt>Move</dt><dd>${esc(s.move)}</dd></dl>
        <p class="hook"><b>Remember it:</b> ${esc(s.hook)}</p>
        <p class="muted" style="text-align:center">Did your sign match?</p>
        <div class="options"><button class="btn bad" data-rate="0">Not yet</button><button class="btn good" data-rate="1">Got it</button></div>`
      : `<p class="muted" style="text-align:center">Sign it with your hands, then check.</p>
        <div class="options"><button class="btn" data-reveal="1">Show me the steps</button>${Coach.supported()
          ? `<button class="btn sun" data-camon="1">Check with camera</button>`
          : `<button class="btn ghost" data-camhelp="1">Check with camera</button>`}</div>
        <p class="note" id="camhelp" hidden>${esc(CAM_HELP[Coach.whyNot()] || "")}</p>`}
    </section>`;
  }
  if (!P.opts) P.opts = shuffle([s, ...shuffle(SIGNS.filter(x => x.id !== s.id)).slice(0, 3)]).map(x => x.id);
  return `${brand}${seg}<section class="card pop">${dots}
    <span class="eyebrow" style="text-align:center">Which sign is this?</span>
    <dl class="steps"><dt>Hand</dt><dd>${esc(s.hand)}</dd><dt>Where</dt><dd>${esc(s.where)}</dd><dt>Move</dt><dd>${esc(s.move)}</dd></dl>
    <div class="options">${P.opts.map(id => {
      const cls = P.answered ? (id === s.id ? "right" : id === P.answered ? "wrong" : "") : "";
      return `<button class="opt ${cls}" data-pick="${id}" ${P.answered ? "disabled" : ""}>${esc(byId(id).w)}</button>`;
    }).join("")}</div>
    <p class="feedback" role="status">${P.answered ? (P.answered === s.id ? "Yes! " + esc(s.hook) : "That one is " + esc(s.w) + ". " + esc(s.hook)) : ""}</p>
    ${P.answered ? `<button class="btn block" data-next="1">Next</button>` : ""}
  </section>`;
}

/* ---------- Camera coach screen ---------- */
const CAM_HELP = {
  file: "You opened index.html directly, and browsers block the camera that way. Close this tab and double-click start-mac.command (Mac) or start-windows.bat (Windows) in the First Signs folder instead. The app will open at localhost:8000 with the camera working.",
  preview: "This online preview can't use your camera. Download the First Signs folder, then double-click start-mac.command (Mac) or start-windows.bat (Windows). The app opens at localhost:8000 with the camera working.",
  browser: "This browser doesn't allow camera access here. Open the app in Chrome or Edge at localhost:8000.",
};
function viewCamera(s, dots) {
  return `<section class="card pop">${dots}
    <div class="sign-head"><span class="gloss">${esc(s.w)}</span><button class="back" data-camoff="1">Turn camera off</button></div>
    <div class="cam-stage" id="cam-stage">
      <video id="cam-video" playsinline muted></video><canvas id="cam-canvas"></canvas>
      <div class="cam-count" id="cam-count" hidden></div>
      <div class="cam-status" id="cam-status">Starting camera…</div>
    </div>
    <p class="cam-live" aria-live="off"><span id="live-hand">Looking for your hand…</span></p>
    <p class="note">The dashed outline shows where this sign happens. Sit so your face and chest are in view.</p>
    <details class="howto"><summary>How to sign ${esc(s.w)}</summary>
      <dl class="steps"><dt>Hand</dt><dd>${esc(s.hand)}</dd><dt>Where</dt><dd>${esc(s.where)}</dd><dt>Move</dt><dd>${esc(s.move)}</dd></dl>
      <p class="hook"><b>Remember it:</b> ${esc(s.hook)}</p></details>
    <div id="cam-result" class="cam-result" role="status"></div>
    <div class="options" id="cam-actions"><button class="btn sun" data-record="1">Record my sign</button><button class="btn ghost" data-camskip="1">Skip</button></div>
  </section>`;
}
function mountCamera() {
  const s = byId(P.items[P.i]);
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
  const s = byId(P.items[P.i]), check = CHECKS[s.id];
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
    acts.innerHTML = `<button class="btn sun" data-record="1">Try again</button><button class="btn ghost" data-camskip="1">Skip</button>`;
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
    ? `<button class="btn good" data-rate="1">Next sign</button><button class="btn ghost" data-record="1">Record again</button>`
    : `<button class="btn sun" data-record="1">Try again</button><button class="btn ghost" data-rate="1">It was right, count it</button>`;
}

function viewProgress() {
  const started = Object.keys(S.cards).length;
  const known = SIGNS.filter(s => isKnown(s.id)).length;
  const recent = S.used.slice().sort((a, b) => b.t - a.t).slice(0, 6);
  const fmt = t => new Date(t).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  return `${brand}${sampleBanner()}<h1>Your progress</h1>
  <div class="stats">
    <div class="stat"><b>${known}</b><span>signs known</span></div>
    <div class="stat"><b>${started}</b><span>signs started</span></div>
    <div class="stat"><b>${S.used.length}</b><span>real moments</span></div>
  </div>
  <section class="panel"><h2>By routine</h2>
    ${ROUTINES.map(r => { const l = SIGNS.filter(s => s.r === r.id); const k = l.filter(s => isKnown(s.id)).length;
      return `<div class="prow"><span>${esc(r.name)}</span><div class="bar"><i style="width:${Math.round(k / l.length * 100)}%"></i></div><span class="n">${k}/${l.length}</span></div>`; }).join("")}
    <p class="note">A sign counts as known after you get it right on two separate days.</p>
  </section>
  ${abcProgress()}
  <section class="panel"><h2>Signs used with your child</h2>
    ${recent.length ? `<ul class="log">${recent.map(u => `<li><b>${esc(byId(u.id)?.w || u.id)}</b><span class="muted">${fmt(u.t)}</span></li>`).join("")}</ul>` : `<p class="muted">Tap "We used it" on the Today screen after you sign with your child.</p>`}
  </section>
  <section class="panel"><h2>Why this matters</h2>
    <div class="facts">
      <div class="fact"><b>90%+</b><p>of deaf children are born to hearing parents, most of whom don't know sign language.</p></div>
      <div class="fact"><b>≤40%</b><p>of these families sign at home, according to a 2010 Gallaudet University survey.</p></div>
      <div class="fact"><b>70%</b><p>of deaf children may miss out on language early on, say Boston University researchers.</p></div>
    </div>
    <p>The first years are when the brain is built for language. Every sign you use at the table or at bedtime gives your child words they can see. You don't have to be fluent to start. You only have to start.</p>
    <p class="note">Sign descriptions are written guides. Use "Watch it signed" to see each sign on video, and learn alongside Deaf adults and your local early intervention program whenever you can.</p>
  </section>`;
}

/* ---------- Router & events ---------- */
const app = $("#app");
function route() {
  const h = (location.hash || "#today").slice(1);
  const [tab, sub] = h.split(".");
  let html;
  if (tab === "routines" && sub) html = viewRoutine(sub);
  else if (tab === "routines") html = viewRoutines();
  else if (tab === "practice") html = viewPractice();
  else if (tab === "abc") html = viewAbc(sub);
  else if (tab === "progress") html = viewProgress();
  else html = viewToday();
  app.innerHTML = html;
  const camOn = tab === "practice" && P && P.cam && P.mode === "recall" && P.i < P.items.length;
  if (camOn) mountCamera(); else Coach.stop();
  const active = ["routines", "abc", "practice", "progress"].includes(tab) ? tab : "today";
  document.querySelectorAll("nav.tabs a").forEach(a => {
    if (a.dataset.tab === active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  save();
}
function go(hash) { if (location.hash === "#" + hash) route(); else location.hash = hash; window.scrollTo(0, 0); }

app.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  if (abcClick(b)) return;   // ABC tab buttons (js/abc.js)
  const d = b.dataset;
  if (b.id === "reset") { S = { sample: false, cards: {}, days: [], used: [], mission: null }; P = null; save(); toast("Fresh start. Welcome!"); route(); return; }
  if (d.go) { if (d.go === "practice") P = null; go(d.go); }
  else if (d.open) go("routines." + d.open);
  else if (d.learn) { learn(d.learn); toast(byId(d.learn).w + " added to your practice"); route(); }
  else if (d.used) { S.used.push({ id: d.used, t: Date.now() }); learn(d.used); markDay(); save(); toast("Nice! That's real language for your child."); route(); }
  else if (d.mode) { startPractice(d.mode); route(); }
  else if (d.reveal) { P.revealed = true; route(); }
  else if (d.rate) { const got = d.rate === "1"; rate(P.items[P.i], got); if (got) P.right++; P.i++; P.revealed = false; route(); }
  else if (d.pick) { const id = P.items[P.i]; P.answered = d.pick; const ok = d.pick === id; if (ok) P.right++; rate(id, ok); route(); }
  else if (d.next) { P.i++; P.answered = null; P.opts = null; route(); }
  else if (d.again) { const cam = P.cam; startPractice(P.mode); P.cam = cam; route(); }
  else if (d.camon) { P.cam = true; route(); }
  else if (d.camoff) { P.cam = false; route(); }
  else if (d.camhelp) { const n = $("#camhelp"); if (n) n.hidden = false; }
  else if (d.record) recordSign();
  else if (d.camskip) { rate(P.items[P.i], false); P.i++; route(); }
  else if (d.camsign) { learn(d.camsign); P = { mode: "recall", items: [d.camsign], i: 0, right: 0, revealed: false, answered: null, cam: true }; go("practice"); }
});
window.addEventListener("hashchange", route);
route();
