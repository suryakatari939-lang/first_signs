/* ABC tab: the alphabet, numbers 1-10, spelling words, and practice for them.
   Uses helpers and state from app.js (S, $, esc, shuffle, markDay, save, toast, go, route, brand,
   INTERVALS, DAY), which are only called at runtime, after app.js has loaded.
   Progress lives in S.abc.cards, separate from the 43 signs in S.cards. */
const ABC_ITEMS = [...LETTERS, ...NUMBERS];
const abcById = id => ABC_ITEMS.find(x => x.id === id);
const abcCards = () => (S.abc = S.abc || { cards: {} }).cards;
const abcCard = id => abcCards()[id];
const abcKnown = id => (abcCard(id)?.box || 0) >= 2;   // same rule as isKnown() for signs
const abcDue = id => abcCard(id) && abcCard(id).due <= Date.now();
const abcVideo = x => "https://www.signingsavvy.com/search/" + encodeURIComponent(x.q);
const abcStarted = list => list.filter(x => abcCard(x.id)).length;
const wordId = w => "w-" + w;                        // easy-word cards live in S.abc.cards under "w-<WORD>"
const wordKnown = w => abcKnown(wordId(w));
const ALL_WORDS = [...new Set(WORD_LESSONS.flatMap(l => l.words))];
const lessonById = id => WORD_LESSONS.find(l => l.id === id);
const signFor = w => SIGNS.find(s => s.w === w);    // words that already have a real sign in the app

function abcLearn(id) { if (!abcCards()[id]) { abcCards()[id] = { box: 1, due: Date.now() + DAY, seen: 1 }; markDay(); save(); } }
function abcRate(id, got) {   // same Leitner rules as rate() in app.js
  const c = abcCards()[id] || { box: 0, due: 0, seen: 0 };
  c.seen++;
  c.box = got ? Math.min(c.box + 1, INTERVALS.length - 1) : 1;
  c.due = Date.now() + INTERVALS[got ? c.box : 0] * DAY;
  abcCards()[id] = c; markDay(); save();
}

// Due items first (weakest box first), then new ones in order, like todaysSet() for signs.
function abcSet(scope) {
  const pool = scope === "numbers" ? NUMBERS : LETTERS;
  const due = pool.filter(x => abcDue(x.id)).sort((a, b) => abcCard(a.id).box - abcCard(b.id).box);
  const fresh = pool.filter(x => !abcCard(x.id));
  let set = [...due.slice(0, 5), ...fresh.slice(0, Math.max(2, 5 - due.length))].slice(0, 6);
  if (set.length < 4) set = shuffle(pool).slice(0, 5);
  return set;
}
// Wrong answers come from the same group first, so look-alikes (A, S, T...) get compared.
function abcOptions(x, pool) {
  const others = pool.filter(y => y.id !== x.id);
  const near = shuffle(others.filter(y => y.g === x.g)), far = shuffle(others.filter(y => y.g !== x.g));
  return shuffle([x, ...[...near, ...far].slice(0, 3)]).map(y => y.id);
}

/* ---------- Views ---------- */
function abcSteps(x) {
  return `<dl class="steps"><dt>Hand</dt><dd>${esc(x.hand)}</dd>${x.move ? `<dt>Move</dt><dd>${esc(x.move)}</dd>` : ""}</dl>`;
}
function abcCardHtml(x) {
  const c = abcCard(x.id);
  const st = !c ? `<span class="status">New</span>` : abcKnown(x.id) ? `<span class="status k">Known</span>` : `<span class="status l">Learning</span>`;
  return `<article class="sign" id="abc-${x.id}">
    <div class="sign-head"><span class="gloss">${esc(x.ch)}</span>${st}</div>
    ${abcSteps(x)}
    <p class="hook"><b>Remember it:</b> ${esc(x.hook)}</p>
    <div class="row">
      ${c ? "" : `<button class="btn" data-abc="learn" data-val="${x.id}">Add to my practice</button>`}
      <a href="${abcVideo(x)}" target="_blank" rel="noopener">Watch it signed ↗</a>
    </div></article>`;
}
const abcBack = `<button class="back" data-go="abc">← Letters &amp; numbers</button>`;
const handNote = `<p class="note">Instructions are for a right-handed signer. The palm faces the person you are signing to, except G and H (turned sideways) and P and Q (pointing down). If you are left-handed, mirror them.</p>`;
const sourcesPanel = () => `<details class="howto panel"><summary>Where these descriptions come from</summary>
  <p class="note">Written in our own words from these published guides and checked against each other. Guides differ in small ways, so use "Watch it signed" and learn with Deaf adults whenever you can.</p>
  <ul class="tips">${ABC_SOURCES.map(x => `<li><a href="${x.url}" target="_blank" rel="noopener">${esc(x.name)}</a></li>`).join("")}</ul></details>`;

function viewAbc(sub) {
  if (sub === "letters") return abcLetters();
  if (sub === "numbers") return abcNumbers();
  if (sub === "spell") return abcSpell();
  if (sub === "practice") return abcPractice();
  if (sub === "lessons") return abcLessons();
  if (sub === "wordpractice") return abcWordPractice();
  if (sub && sub.startsWith("lesson-")) return abcLesson(sub.slice(7));
  return abcHub();
}

function abcHub() {
  const tile = (go, name, line, list) => `<button class="routine" data-go="${go}">
    <span class="time">${esc(line)}</span><span class="name">${esc(name)}</span>
    ${list ? `<div class="bar" aria-hidden="true"><i style="width:${Math.round(abcStarted(list) / list.length * 100)}%"></i></div>
    <span class="count">${abcStarted(list)} of ${list.length} started</span>` : ""}</button>`;
  return `${hero("abc", "Fingerspelling", "Letters &amp; numbers.", "Spell names and words that don't have their own sign, like your child's name, a street or a pet. Numbers 1 to 10 cover ages, counting and time.")}
  <div class="routines">
    ${tile("abc.letters", "The alphabet", "A to Z", LETTERS)}
    ${tile("abc.numbers", "Numbers", "1 to 10", NUMBERS)}
    <button class="routine" data-go="abc.lessons"><span class="time">9 lessons</span><span class="name">Easy words</span>
      <div class="bar" aria-hidden="true"><i style="width:${Math.round(ALL_WORDS.filter(wordKnown).length / ALL_WORDS.length * 100)}%"></i></div>
      <span class="count">${ALL_WORDS.filter(wordKnown).length} of ${ALL_WORDS.length} words known</span></button>
    ${tile("abc.spell", "Spell a word", "Try your child's name", null)}
    <button class="routine" data-abc="start"><span class="time">5 minutes</span><span class="name">Practice</span><span class="count">Letters and numbers</span></button>
  </div>`;
}

function abcLetters() {
  return `${abcBack}
  <div class="stack"><h1>The alphabet</h1>
  <p class="muted">Learn one group at a time. Letters in a group look alike, so comparing them side by side helps.</p>${handNote}</div>
  ${ABC_GROUPS.map(g => `<section class="stack" aria-labelledby="g-${g.id}">
    <h2 id="g-${g.id}">${esc(g.name)}</h2><p class="muted">${esc(g.tip)}</p>
    <div class="signlist">${LETTERS.filter(l => l.g === g.id).map(abcCardHtml).join("")}</div></section>`).join("")}
  ${sourcesPanel()}
  <section class="panel"><h2>Ready to use them?</h2><p class="muted">Letters are for names and new words. Try spelling your child's name.</p>
  <div class="row"><button class="btn sun" data-go="abc.lessons">Easy word lessons</button><button class="btn ghost" data-go="abc.spell">Spell a word</button><button class="btn ghost" data-abc="start">Practice letters</button></div></section>`;
}

function abcNumbers() {
  return `${abcBack}
  <div class="stack"><h1>Numbers 1 to 10</h1><p class="muted">${esc(NUMBER_TIP)}</p>${handNote}</div>
  <div class="signlist">${NUMBERS.map(abcCardHtml).join("")}</div>
  ${sourcesPanel()}
  <div class="row"><button class="btn ghost" data-abc="start" data-val="numbers">Practice numbers</button></div>`;
}

/* Spell a word: step through the handshapes of any word, one letter at a time. Not saved. */
let SP = { word: "", i: 0 };
const spellClean = s => String(s).toUpperCase().replace(/[^A-Z]/g, "").slice(0, 12);
function abcSpell() {
  const w = SP.word, ls = w.split("").map(c => LETTERS.find(l => l.ch === c));
  let stepper = "";
  if (w) {
    const x = ls[SP.i], last = SP.i === ls.length - 1;
    const dbl = (ls[SP.i + 1] && ls[SP.i + 1].ch === x.ch) || (ls[SP.i - 1] && ls[SP.i - 1].ch === x.ch);
    stepper = `<div class="tiles" role="group" aria-label="Letters in ${esc(w)}">${ls.map((l, k) =>
      `<button class="tile ${k === SP.i ? "on" : k < SP.i ? "done" : ""}" data-abc="at" data-val="${k}" aria-label="Letter ${k + 1}, ${l.ch}">${l.ch}</button>`).join("")}</div>
    <section class="card pop">
      <span class="eyebrow" style="text-align:center">Letter ${SP.i + 1} of ${ls.length}</span>
      <div class="big">${x.ch}</div>
      ${abcSteps(x)}
      <p class="hook"><b>Remember it:</b> ${esc(x.hook)}</p>
      ${dbl ? `<p class="note"><b>Double letter:</b> bounce your hand slightly, or slide it a little to the side, instead of forming the letter again.</p>` : ""}
      ${last ? `<p class="muted" style="text-align:center">That's the last letter. Now spell <b>${esc(w)}</b> from the start in one smooth motion, hand near your shoulder.</p>` : ""}
      <div class="options"><button class="btn ghost" data-abc="prev" ${SP.i ? "" : "disabled"}>Back</button>
      <button class="btn ${last ? "" : "sun"}" data-abc="next">${last ? "Start over" : "Next letter"}</button></div>
    </section>`;
  }
  return `${abcBack}
  <div class="stack"><h1>Spell a word</h1>
  <p class="muted">Type your child's name or any word (one word at a time, up to 12 letters). We'll show each letter's handshape in order.</p></div>
  <form id="spell-form" class="stack" autocomplete="off">
    <label class="eyebrow" for="spell-in">Word or name</label>
    <div class="row"><input id="spell-in" class="field" type="text" maxlength="24" value="${esc(w)}" autocapitalize="characters" spellcheck="false" placeholder="Type here"><button class="btn sun" type="submit">Show me</button></div>
  </form>
  <div class="stack"><span class="eyebrow">Or try one</span><div class="chips">${SPELL_WORDS.map(x => `<button class="chip" data-abc="word" data-val="${x}">${x}</button>`).join("")}</div></div>
  ${stepper}
  <section class="panel"><h2>Fingerspelling tips</h2><ul class="tips">${SPELL_TIPS.map(t => `<li>${esc(t)}</li>`).join("")}</ul>${handNote}</section>
  ${sourcesPanel()}`;
}

/* Practice: same two modes as signs. Session AP (ABC practice) is in memory only. */
let AP = null;
function abcStart(scope, mode) {
  const set = abcSet(scope); set.forEach(x => abcLearn(x.id));
  AP = { scope, mode, items: shuffle(set).map(x => x.id), i: 0, right: 0, revealed: false, answered: null, opts: null };
}
function abcPractice() {
  if (!AP) abcStart("letters", "recall");
  const pool = AP.scope === "numbers" ? NUMBERS : LETTERS, noun = AP.scope === "numbers" ? "number" : "letter";
  const seg = (label, key, val, opts) => `<div class="seg" role="group" aria-label="${label}">${opts.map(([v, t]) =>
    `<button data-abc="${key}" data-val="${v}" aria-pressed="${val === v}">${t}</button>`).join("")}</div>`;
  const head = `${abcBack}${seg("Practice what", "scope", AP.scope, [["letters", "Letters"], ["numbers", "Numbers"]])}
    ${seg("Practice type", "mode", AP.mode, [["recall", "Try it yourself"], ["pick", "Read &amp; pick"]])}`;
  const dots = `<div class="progress-dots" aria-label="${noun} ${Math.min(AP.i + 1, AP.items.length)} of ${AP.items.length}">${AP.items.map((_, k) => `<i class="${k < AP.i ? "on" : ""}"></i>`).join("")}</div>`;
  if (AP.i >= AP.items.length) {
    return `${head}<section class="card pop"><span class="eyebrow">Session done</span>
      <h1>${AP.right} of ${AP.items.length} ${AP.mode === "pick" ? "right" : "felt solid"}</h1>
      <p>${AP.scope === "letters" ? "Now put them to work: spell your child's name for them." : "Use a number today: count the crackers or the stairs out loud and on your hands."}</p>
      <div class="row"><button class="btn sun" data-abc="again">Practice again</button><button class="btn ghost" data-go="abc.spell">Spell a word</button><button class="btn ghost" data-go="today">Back to today</button></div></section>`;
  }
  const x = abcById(AP.items[AP.i]);
  if (AP.mode === "recall") {
    return `${head}<section class="card pop">${dots}
      <span class="eyebrow" style="text-align:center">Make this ${noun}</span>
      <div class="big">${esc(x.ch)}</div>
      ${AP.revealed ? `${abcSteps(x)}<p class="hook"><b>Remember it:</b> ${esc(x.hook)}</p>
        <p class="muted" style="text-align:center">Did your hand match?</p>
        <div class="options"><button class="btn bad" data-abc="rate" data-val="0">Not yet</button><button class="btn good" data-abc="rate" data-val="1">Got it</button></div>`
      : `<p class="muted" style="text-align:center">Make it with your hand, then check.</p>
        <div class="options"><button class="btn" data-abc="reveal">Show me the steps</button></div>`}
    </section>`;
  }
  if (!AP.opts) AP.opts = abcOptions(x, pool);
  return `${head}<section class="card pop">${dots}
    <span class="eyebrow" style="text-align:center">Which ${noun} is this?</span>
    ${abcSteps(x)}
    <div class="options">${AP.opts.map(id => {
      const cls = AP.answered ? (id === x.id ? "right" : id === AP.answered ? "wrong" : "") : "";
      return `<button class="opt ${cls}" data-abc="pick" data-val="${id}" ${AP.answered ? "disabled" : ""}>${esc(abcById(id).ch)}</button>`;
    }).join("")}</div>
    <p class="feedback" role="status">${AP.answered ? (AP.answered === x.id ? "Yes! " : "That one is " + esc(x.ch) + ". ") + esc(x.hook) : ""}</p>
    ${AP.answered ? `<button class="btn block" data-abc="nextq">Next</button>` : ""}
  </section>`;
}

/* Easy-word lessons (data: WORD_LESSONS). Word practice session WP is in memory only. */
const wordStatus = w => !abcCard(wordId(w)) ? `<span class="status">New</span>` : wordKnown(w) ? `<span class="status k">Known</span>` : `<span class="status l">Learning</span>`;
const signNote = w => signFor(w) ? `<span class="note">Has its own sign: use the sign in real life.</span>` : "";
function abcLessons() {
  const next = WORD_LESSONS.find(l => !l.words.every(wordKnown));
  return `${abcBack}
  <div class="stack"><h1>Easy word lessons</h1><p class="muted">${esc(WORD_LESSON_INTRO)}</p></div>
  <div class="routines">${WORD_LESSONS.map(L => {
    const k = L.words.filter(wordKnown).length;
    return `<button class="routine" data-go="abc.lesson-${L.id}">
      <span class="time">${next === L ? "Next up · " : ""}${L.letters ? "New: " + [...L.letters].join(" ") : "No new letters"}</span>
      <span class="name">${esc(L.title)}</span>
      <div class="bar" aria-hidden="true"><i style="width:${Math.round(k / L.words.length * 100)}%"></i></div>
      <span class="count">${k} of ${L.words.length} words known</span></button>`;
  }).join("")}</div>`;
}
function abcLesson(id) {
  const L = lessonById(id); if (!L) return abcLessons();
  const fresh = [...L.letters].map(c => LETTERS.find(l => l.ch === c));
  const n = fresh.length ? 2 : 1;
  return `<button class="back" data-go="abc.lessons">← All lessons</button>
  <div class="stack"><span class="eyebrow">${L.letters ? "New letters: " + [...L.letters].join(" ") : "Practice"}</span><h1>${esc(L.title)}</h1><p class="muted">${esc(L.blurb)}</p>${handNote}</div>
  ${fresh.length ? `<section class="stack"><h2>1. Learn the new letters</h2><div class="signlist">${fresh.map(abcCardHtml).join("")}</div></section>` : ""}
  <section class="stack"><h2>${n}. Watch the words</h2><p class="muted">Tap a word to step through it one letter at a time.</p>
    <div class="stack">${L.words.map(w => `<div class="wordrow"><button class="chip" data-abc="tryword" data-val="${w}">${w}</button>${wordStatus(w)}${signNote(w)}</div>`).join("")}</div></section>
  <section class="panel"><h2>${n + 1}. Spell them yourself</h2><p class="muted">You see a word, spell it with your hand, then check the handshapes.</p>
    <div class="row"><button class="btn sun" data-abc="wstart" data-val="${L.id}">Practice these words</button></div></section>`;
}
let WP = null;
function abcWordStart(id) {
  const L = lessonById(id); L.words.forEach(w => abcLearn(wordId(w)));
  WP = { lesson: id, items: shuffle(L.words), i: 0, right: 0, revealed: false };
}
function abcWordPractice() {
  if (!WP) return abcLessons();
  const L = lessonById(WP.lesson), nextL = WORD_LESSONS[WORD_LESSONS.indexOf(L) + 1];
  const back = `<button class="back" data-go="abc.lesson-${L.id}">← ${esc(L.title)}</button>`;
  const dots = `<div class="progress-dots" aria-label="Word ${Math.min(WP.i + 1, WP.items.length)} of ${WP.items.length}">${WP.items.map((_, k) => `<i class="${k < WP.i ? "on" : ""}"></i>`).join("")}</div>`;
  if (WP.i >= WP.items.length) {
    return `${back}<section class="card pop"><span class="eyebrow">Lesson practice done</span>
      <h1>${WP.right} of ${WP.items.length} felt solid</h1>
      <p>${L.id === "l9" ? "Last step: spell your child's name for them, then use it every day." : "Words you missed come back sooner. Next, try spelling one of these words to your child while you say it."}</p>
      <div class="row"><button class="btn sun" data-abc="wagain">Practice again</button>
      ${nextL ? `<button class="btn ghost" data-go="abc.lesson-${nextL.id}">Next lesson</button>` : `<button class="btn ghost" data-go="abc.spell">Spell a name</button>`}
      <button class="btn ghost" data-go="abc.lessons">All lessons</button></div></section>`;
  }
  const w = WP.items[WP.i], ls = [...w].map(c => LETTERS.find(l => l.ch === c));
  const dbl = [...w].some((c, k) => c === w[k + 1]);
  return `${back}<section class="card pop">${dots}
    <span class="eyebrow" style="text-align:center">Spell this word</span>
    <div class="big">${w}</div>${signFor(w) ? `<p class="note" style="text-align:center">Has its own sign: use the sign in real life.</p>` : ""}
    ${WP.revealed ? `<dl class="steps">${ls.map(l => `<dt>${l.ch}</dt><dd>${esc(l.hand)}${l.move ? " " + esc(l.move) : ""}</dd>`).join("")}</dl>
        ${dbl ? `<p class="note"><b>Double letter:</b> bounce your hand slightly, or slide it a little to the side.</p>` : ""}
        <p class="muted" style="text-align:center">Did your spelling match?</p>
        <div class="options"><button class="btn bad" data-abc="wrate" data-val="0">Not yet</button><button class="btn good" data-abc="wrate" data-val="1">Got it</button></div>`
    : `<p class="muted" style="text-align:center">Spell it with your hand, one letter after another, then check.</p>
        <div class="options"><button class="btn" data-abc="wreveal">Show the handshapes</button></div>`}
  </section>`;
}

// Progress panel, inserted into viewProgress().
function abcProgress() {
  const row = (name, list) => { const k = list.filter(x => abcKnown(x.id)).length;
    return `<div class="prow"><span>${name}</span><div class="bar"><i style="width:${Math.round(k / list.length * 100)}%"></i></div><span class="n">${k}/${list.length}</span></div>`; };
  const kw = ALL_WORDS.filter(wordKnown).length;
  const words = `<div class="prow"><span>Easy words</span><div class="bar"><i style="width:${Math.round(kw / ALL_WORDS.length * 100)}%"></i></div><span class="n">${kw}/${ALL_WORDS.length}</span></div>`;
  return `<section class="panel"><h2>Letters &amp; numbers</h2>${row("Alphabet", LETTERS)}${row("Numbers", NUMBERS)}${words}</section>`;
}

/* ---------- Events (called from the click handler in app.js; returns true if handled) ---------- */
function abcClick(b) {
  const a = b.dataset.abc, v = b.dataset.val;
  if (a === undefined) return false;
  if (a === "learn") { abcLearn(v); toast(abcById(v).ch + " added to your practice"); route(); }
  else if (a === "start") { abcStart(v || "letters", "recall"); go("abc.practice"); }
  else if (a === "scope") { abcStart(v, AP ? AP.mode : "recall"); route(); }
  else if (a === "mode") { Object.assign(AP, { mode: v, i: 0, right: 0, revealed: false, answered: null, opts: null }); route(); }  // same items, so nothing new gets started
  else if (a === "again") { abcStart(AP.scope, AP.mode); route(); }
  else if (a === "reveal") { AP.revealed = true; route(); }
  else if (a === "rate") { abcRate(AP.items[AP.i], v === "1"); if (v === "1") AP.right++; AP.i++; AP.revealed = false; route(); }
  else if (a === "pick") { const id = AP.items[AP.i], ok = v === id; AP.answered = v; if (ok) AP.right++; abcRate(id, ok); route(); }
  else if (a === "nextq") { AP.i++; AP.answered = null; AP.opts = null; route(); }
  else if (a === "word") { SP = { word: spellClean(v), i: 0 }; route(); }
  else if (a === "at") { SP.i = +v; route(); }
  else if (a === "prev") { SP.i = Math.max(0, SP.i - 1); route(); }
  else if (a === "next") { SP.i = SP.i >= SP.word.length - 1 ? 0 : SP.i + 1; route(); }
  else if (a === "tryword") { SP = { word: spellClean(v), i: 0 }; go("abc.spell"); }
  else if (a === "wstart") { abcWordStart(v); go("abc.wordpractice"); }
  else if (a === "wagain") { abcWordStart(WP.lesson); route(); }
  else if (a === "wreveal") { WP.revealed = true; route(); }
  else if (a === "wrate") { abcRate(wordId(WP.items[WP.i]), v === "1"); if (v === "1") WP.right++; WP.i++; WP.revealed = false; route(); }
  return true;
}
document.getElementById("app").addEventListener("submit", e => {
  if (e.target.id !== "spell-form") return;
  e.preventDefault();
  SP = { word: spellClean(e.target.querySelector("input").value), i: 0 };
  route();
});
