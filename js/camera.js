/* Camera coach.
   MediaPipe Holistic finds 21 points on each hand plus the face and shoulders in every
   webcam frame. We turn those points into three things a sign is made of:
   handshape, location and movement, then compare them with CHECKS in signs.js.
   Everything runs on the laptop. No video leaves the computer. */
const Coach = (() => {
  const TIP = [4, 8, 12, 16, 20], PIP = [3, 6, 10, 14, 18], MCP = [2, 5, 9, 13, 17];
  const HAND_LINKS = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]];

  const SHAPE_NAMES = {
    flatO: "flat-O", flat: "flat hand", "5": "open 5-hand", fist: "fist", thumbsup: "thumbs-up",
    index: "pointing finger", two: "two fingers", W: "W-hand", Y: "Y-hand", ILY: "I-love-you hand",
    C: "C-hand", claw: "claw hand",
  };
  // Most specific first, so the live label names the best match.
  const SHAPE_ORDER = ["ILY", "Y", "W", "two", "index", "flatO", "thumbsup", "fist", "claw", "C", "5", "flat"];
  const ZONE_NAMES = {
    mouth: "at your mouth", chin: "at your chin", forehead: "at your forehead", cheek: "at your cheek",
    face: "in front of your face", chest: "on your chest", body: "in front of your body", any: "anywhere",
  };
  const MOVE_HINTS = {
    repeat: "do the movement twice (tap, tap)", squeeze: "open and close your hand a few times",
    down: "move your hand down", up: "lift your hands up", away: "move your hand out, away from your face",
    side: "move side to side", circle: "make small circles", twist: "twist your wrists",
    shake: "shake or wiggle your hands", open: "spring your hands open", close: "curl your fingers in",
    change: "move or turn your hands", rock: "rock side to side", still: "hold it still", any: "move as shown",
  };

  let holistic = null, stream = null, video = null, canvas = null, ctx = null;
  let running = false, busy = false, target = null, listener = null, recording = null;

  // Why the camera coach can't run here, or null when it can.
  const whyNot = () => {
    if (location.protocol === "file:") return "file";
    if (typeof Holistic === "undefined") return "preview";
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) return "browser";
    return null;
  };
  const supported = () => whyNot() === null;

  /* ---------- geometry ---------- */
  const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: (a.z || 0) - (b.z || 0) });
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, (a.z || 0) - (b.z || 0));
  const dist2 = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const mean = pts => { const n = pts.length; return pts.reduce((s, p) => ({ x: s.x + p.x / n, y: s.y + p.y / n, z: s.z + (p.z || 0) / n }), { x: 0, y: 0, z: 0 }); };
  const angle = (u, v) => {
    const d = (u.x * v.x + u.y * v.y + u.z * v.z) / (Math.hypot(u.x, u.y, u.z) * Math.hypot(v.x, v.y, v.z) || 1);
    return Math.acos(Math.max(-1, Math.min(1, d))) * 180 / Math.PI;
  };
  const toPx = (lm, W, H) => lm.map(l => ({ x: l.x * W, y: l.y * H, z: (l.z || 0) * W }));

  /* ---------- body landmarks: where the face, chin and chest are ---------- */
  function readBody(r, W, H) {
    const f = r.faceLandmarks, p = r.poseLandmarks;
    if (!f && !p) return null;
    const B = {};
    if (f) {
      const g = i => ({ x: f[i].x * W, y: f[i].y * H });
      B.mouth = mean([g(13), g(14)]); B.chin = g(152); B.forehead = g(151);
      B.cheeks = [g(50), g(280)]; B.F = dist2(g(234), g(454));
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const l of f) { x0 = Math.min(x0, l.x * W); x1 = Math.max(x1, l.x * W); y0 = Math.min(y0, l.y * H); y1 = Math.max(y1, l.y * H); }
      B.box = { x0, y0, x1, y1 };
    } else {
      const g = i => ({ x: p[i].x * W, y: p[i].y * H });
      const eyes = mean([g(2), g(5)]); B.mouth = mean([g(9), g(10)]);
      B.F = dist2(g(7), g(8));
      const down = sub(B.mouth, eyes);
      B.chin = { x: B.mouth.x + down.x * 0.7, y: B.mouth.y + down.y * 0.7 };
      B.forehead = { x: eyes.x - down.x * 0.6, y: eyes.y - down.y * 0.6 };
      B.cheeks = [mean([g(7), B.mouth]), mean([g(8), B.mouth])];
      B.box = { x0: Math.min(g(7).x, g(8).x), x1: Math.max(g(7).x, g(8).x), y0: B.forehead.y - B.F * 0.3, y1: B.chin.y };
    }
    if (p && p[11].visibility > 0.4 && p[12].visibility > 0.4) {
      B.shoulders = [{ x: p[11].x * W, y: p[11].y * H }, { x: p[12].x * W, y: p[12].y * H }];
    } else {
      B.shoulders = [{ x: B.chin.x - B.F, y: B.chin.y + B.F * 0.9 }, { x: B.chin.x + B.F, y: B.chin.y + B.F * 0.9 }];
    }
    return B;
  }

  function inZone(pt, zone, B) {
    const F = B.F;
    const sx0 = Math.min(B.shoulders[0].x, B.shoulders[1].x), sx1 = Math.max(B.shoulders[0].x, B.shoulders[1].x);
    const sy = (B.shoulders[0].y + B.shoulders[1].y) / 2;
    switch (zone) {
      case "mouth": return dist2(pt, B.mouth) < 0.6 * F;
      case "chin": return dist2(pt, B.chin) < 0.6 * F || dist2(pt, B.mouth) < 0.35 * F;
      case "forehead": return dist2(pt, B.forehead) < 0.65 * F;
      case "cheek": return Math.min(dist2(pt, B.cheeks[0]), dist2(pt, B.cheeks[1])) < 0.65 * F;
      case "face": return pt.x > B.box.x0 - 0.35 * F && pt.x < B.box.x1 + 0.35 * F && pt.y > B.box.y0 - 0.35 * F && pt.y < B.box.y1 + 0.35 * F;
      case "chest": return pt.y > B.chin.y + 0.15 * F && pt.y < sy + 2 * F && pt.x > sx0 - 0.5 * F && pt.x < sx1 + 0.5 * F;
      case "body": return pt.y > B.chin.y - 0.3 * F;
      default: return true;
    }
  }
  // The single best name for where a point is, for feedback ("your hand was at your chin").
  function whereIs(pt, B) {
    const near = [["mouth", B.mouth], ["chin", B.chin], ["forehead", B.forehead], ["cheek", B.cheeks[0]], ["cheek", B.cheeks[1]]]
      .map(([z, c]) => [z, dist2(pt, c)]).sort((x, y) => x[1] - y[1])[0];
    if (near[1] < 0.6 * B.F) return near[0];
    if (inZone(pt, "face", B)) return "face";
    return inZone(pt, "chest", B) ? "chest" : "body";
  }

  /* ---------- handshape from 21 hand points ---------- */
  function readHand(lm, W, H) {
    const p = toPx(lm, W, H);
    const palm = dist(p[0], p[9]) || 1;
    const fingers = [1, 2, 3, 4].map(f => {
      const reach = dist(p[TIP[f]], p[0]) / (dist(p[MCP[f]], p[0]) || 1);
      const bend = angle(sub(p[PIP[f]], p[MCP[f]]), sub(p[TIP[f]], p[PIP[f]]));
      if (reach > 1.6 || (reach > 1.45 && bend < 35)) return "ext";
      if (reach < 1.15) return "curl";
      return "bent";
    });
    const [i, m, r, k] = fingers;
    const count = s => fingers.filter(x => x === s).length;
    const thumbOut = dist(p[4], p[5]) / palm > 0.55 && dist(p[4], p[9]) / palm > 0.7;
    const thumbUp = thumbOut && p[4].y < p[5].y - 0.3 * palm;
    const spread = dist(p[8], p[20]) / palm > 0.85;
    const pinch = Math.max(dist(p[8], p[4]), dist(p[12], p[4])) / palm < 0.5 && dist(p[16], p[4]) / palm < 0.7 && count("curl") <= 1;
    const gap = dist(p[8], p[4]) / palm;

    const S = new Set();
    if (pinch) S.add("flatO");
    if (count("ext") >= 3 && i === "ext") { S.add("flat"); if (thumbOut && spread) S.add("5"); }
    if (count("curl") >= 3 && i !== "ext") { S.add("fist"); if (thumbUp) S.add("thumbsup"); }
    if (i === "ext" && m !== "ext" && r !== "ext" && k !== "ext") S.add("index");
    if (i === "ext" && m === "ext" && r !== "ext" && k !== "ext") S.add("two");
    if (i === "ext" && m === "ext" && r === "ext" && k !== "ext") S.add("W");
    if (k === "ext" && i !== "ext" && m !== "ext" && r !== "ext") S.add("Y");
    if (i === "ext" && k === "ext" && m !== "ext" && r !== "ext") S.add("ILY");
    if (!pinch && count("bent") >= 2 && count("curl") <= 1 && gap > 0.35 && gap < 1.6) S.add("C");
    if (count("bent") >= 3 && spread) S.add("claw");

    const label = SHAPE_ORDER.find(s => S.has(s)) || null;
    return {
      shapes: S, label, palm,
      openness: [1, 2, 3, 4].reduce((s, f) => s + dist(p[TIP[f]], p[0]) / (dist(p[MCP[f]], p[0]) || 1), 0) / 4,
      roll: Math.atan2(p[17].y - p[5].y, p[17].x - p[5].x) * 180 / Math.PI,
      ref: { tips: mean([p[4], p[8], p[12]]), index: p[8], thumb: p[4], center: mean([p[0], p[5], p[9], p[13], p[17]]) },
      pts: p,
    };
  }

  /* ---------- per-frame loop ---------- */
  function onResults(r) {
    busy = false;
    if (!running || !video) return;
    const W = video.videoWidth, H = video.videoHeight;
    if (canvas.width !== W) { canvas.width = W; canvas.height = H; }
    const body = readBody(r, W, H);
    const hands = [r.leftHandLandmarks, r.rightHandLandmarks].map(l => (l ? readHand(l, W, H) : null));
    const frame = { t: performance.now(), body, hands };
    const h = hands.find(Boolean);
    frame.live = { shape: h ? h.label : null, zone: h && body ? whereIs(h.ref.center, body) : null, hands: hands.filter(Boolean).length, face: !!body };
    if (recording) recording.push(frame);
    draw(frame);
    if (listener) listener(frame);
  }

  function draw(frame) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const B = frame.body;
    if (B && target && target.at !== "any") {
      ctx.save(); ctx.setLineDash([10, 8]); ctx.lineWidth = 4; ctx.strokeStyle = "rgba(242,177,52,.95)";
      const c = { mouth: B.mouth, chin: B.chin, forehead: B.forehead, cheek: B.cheeks[1] }[target.at];
      if (c) { ctx.beginPath(); ctx.arc(c.x, c.y, 0.5 * B.F, 0, Math.PI * 2); ctx.stroke(); }
      else if (target.at === "chest") {
        const [a, b] = B.shoulders; const x0 = Math.min(a.x, b.x), x1 = Math.max(a.x, b.x);
        ctx.strokeRect(x0, B.chin.y + 0.3 * B.F, x1 - x0, 1.4 * B.F);
      } else if (target.at === "face") {
        ctx.strokeRect(B.box.x0, B.box.y0, B.box.x1 - B.box.x0, B.box.y1 - B.box.y0);
      }
      ctx.restore();
    }
    frame.hands.forEach((h, n) => {
      if (!h) return;
      ctx.lineWidth = 3; ctx.strokeStyle = n ? "#4fc2b1" : "#94a1ff"; ctx.fillStyle = "#ffffff";
      for (const [a, b] of HAND_LINKS) { ctx.beginPath(); ctx.moveTo(h.pts[a].x, h.pts[a].y); ctx.lineTo(h.pts[b].x, h.pts[b].y); ctx.stroke(); }
      for (const q of h.pts) { ctx.beginPath(); ctx.arc(q.x, q.y, 3.5, 0, Math.PI * 2); ctx.fill(); }
    });
  }

  async function pump() {
    if (!running) return;
    if (!busy && video && video.readyState >= 2) {
      busy = true;
      try { await holistic.send({ image: video }); } catch (e) { busy = false; }
    }
    requestAnimationFrame(pump);
  }

  async function start(videoEl, canvasEl, onFrame, status) {
    video = videoEl; canvas = canvasEl; ctx = canvas.getContext("2d"); listener = onFrame;
    if (!holistic) {
      status && status("Loading hand tracking (first time takes a few seconds)…");
      holistic = new Holistic({ locateFile: f => "vendor/holistic/" + f });
      holistic.setOptions({ modelComplexity: 0, smoothLandmarks: true, refineFaceLandmarks: false, enableSegmentation: false, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });
      holistic.onResults(onResults);
      await holistic.initialize();
    }
    if (!stream) {
      status && status("Waiting for camera permission…");
      stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 960 }, height: { ideal: 720 }, facingMode: "user" }, audio: false });
    }
    video.srcObject = stream;
    await video.play();
    status && status("");
    if (!running) { running = true; pump(); }
  }

  function stop() {
    running = false; recording = null;
    if (stream) stream.getTracks().forEach(t => t.stop());
    stream = null; video = null;
  }

  function record(ms) {
    recording = [];
    return new Promise(res => setTimeout(() => { const f = recording; recording = null; res(f); }, ms));
  }

  /* ---------- movement ---------- */
  function reversals(vals, thr) {
    let dir = 0, peak = vals[0], n = 0;
    for (const v of vals) {
      if (dir === 0) { if (v > peak + thr) { dir = 1; peak = v; } else if (v < peak - thr) { dir = -1; peak = v; } }
      else if (dir === 1) { if (v > peak) peak = v; else if (v < peak - thr) { n++; dir = -1; peak = v; } }
      else { if (v < peak) peak = v; else if (v > peak + thr) { n++; dir = 1; peak = v; } }
    }
    return n;
  }
  const range = a => Math.max(...a) - Math.min(...a);
  const avg = a => a.reduce((s, v) => s + v, 0) / a.length;
  const ends = a => { const k = Math.max(1, Math.round(a.length * 0.2)); return [avg(a.slice(0, k)), avg(a.slice(-k))]; };

  function movement(track, F, B, pair) {
    const xs = track.map(t => t.p.x), ys = track.map(t => t.p.y);
    const op = track.map(t => t.h.openness), roll = track.map(t => t.h.roll), palm = track.map(t => t.h.palm);
    const [y0, y1] = ends(ys), [o0, o1] = ends(op), [pa0, pa1] = ends(palm);
    const face = track.map(t => dist2(t.p, B.mouth)); const [f0, f1] = ends(face);
    let path = 0; for (let n = 1; n < track.length; n++) path += dist2(track[n].p, track[n - 1].p);
    const rx = reversals(xs, 0.1 * F), ry = reversals(ys, 0.1 * F), ro = reversals(op, 0.1), rr = reversals(roll, 15);
    const rd = pair ? reversals(pair, 0.12 * F) : 0;
    const pairGrow = pair ? ends(pair)[1] - ends(pair)[0] : 0;
    return {
      repeat: rx >= 2 || ry >= 2 || ro >= 2 || rd >= 2,
      squeeze: ro >= 2 || ry >= 2,
      down: y1 - y0 > 0.5 * F,
      up: y0 - y1 > 0.4 * F,
      away: f1 - f0 > 0.4 * F || y1 - y0 > 0.4 * F || pa1 / pa0 > 1.15,
      side: rx >= 2,
      circle: path > 1.4 * F && rx >= 1 && ry >= 1,
      twist: range(roll) > 35,
      shake: rx >= 2 || rr >= 2,
      open: o1 - o0 > 0.25 || pairGrow > 0.5 * F,
      close: o0 - o1 > 0.2,
      change: range(roll) > 30 || range(op) > 0.3 || (pair && range(pair) > 0.5 * F),
      rock: rx >= 2,
      still: true,
      any: path > 0.4 * F,
    };
  }

  /* ---------- scoring a recording against a sign ---------- */
  function evaluate(frames, check) {
    const withBody = frames.filter(f => f.body);
    if (!withBody.length) return { error: "We couldn't see your face. Sit so your head and chest are in the picture." };
    const F = avg(withBody.map(f => f.body.F));
    const B = withBody[Math.floor(withBody.length / 2)].body;
    const tracks = [0, 1].map(n => frames.filter(f => f.hands[n] && f.body).map(f => ({ h: f.hands[n], p: f.hands[n].ref[check.ref], B: f.body })));
    const seen = tracks.filter(t => t.length >= frames.length * 0.25);
    if (!seen.length) return { error: "We couldn't see your hand. Keep it in the picture and try again." };

    const scoreTrack = (t, pair) => {
      const shapeHits = t.filter(x => check.shape.some(s => x.h.shapes.has(s))).length / t.length;
      const zoneHits = t.filter(x => inZone(x.p, check.at, x.B)).length / t.length;
      const mv = movement(t, F, B, pair);
      const counts = {}; t.forEach(x => { if (x.h.label) counts[x.h.label] = (counts[x.h.label] || 0) + 1; });
      const saw = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || null;
      const places = {}; t.forEach(x => { const z = whereIs(x.p, x.B); places[z] = (places[z] || 0) + 1; });
      const at = Object.keys(places).sort((a, b) => places[b] - places[a])[0];
      return { shapeOk: shapeHits >= 0.35, zoneOk: zoneHits >= 0.3, moveOk: check.move.some(m => mv[m]), saw, at };
    };

    let res;
    if (check.hands === 2) {
      const both = frames.filter(f => f.hands[0] && f.hands[1] && f.body);
      if (both.length < frames.length * 0.25) {
        const s = scoreTrack(seen[0]);
        return { ...s, shapeOk: false, handsSeen: 1, handsNeeded: 2, check };
      }
      const pair = both.map(f => dist2(f.hands[0].ref.center, f.hands[1].ref.center));
      const a = scoreTrack(tracks[0], pair), b = scoreTrack(tracks[1], pair);
      res = { shapeOk: a.shapeOk && b.shapeOk, zoneOk: a.zoneOk || b.zoneOk, moveOk: a.moveOk || b.moveOk, saw: (a.shapeOk ? b : a).saw, at: a.at, handsSeen: 2 };
    } else {
      const scored = seen.map(t => scoreTrack(t));
      res = scored.sort((x, y) => (y.shapeOk + y.zoneOk + y.moveOk) - (x.shapeOk + x.zoneOk + x.moveOk))[0];
      res.handsSeen = seen.length;
    }
    return { ...res, handsNeeded: check.hands, check };
  }

  return { supported, whyNot, start, stop, record, evaluate, setTarget: c => { target = c; }, SHAPE_NAMES, ZONE_NAMES, MOVE_HINTS, _readHand: readHand };
})();
