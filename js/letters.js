/* Letter recognizer: a small neural network (210 -> 64 -> 26) that names the ASL letter
   from the 21 hand points MediaPipe gives us. Weights live in models/letters.json,
   trained by ml/train_letters.py in the source repo (suryakatari939-lang/TSA_softwaredev_surya-Anish, ml/). Nothing in this repo calls it until the camera check is merged in; see ai-transfer/NOTES.md.
   Input is the 210 distances between every pair of hand points (x,y), divided by the wrist-to-middle-knuckle
   length, so tilt and left/right hand don't matter. Pass the video size so x and y are in the same units.
   Usage:  await LetterModel.load();  LetterModel.predict(handLandmarks, 1280, 720)  // [{letter, p}, ...] best first */
const LetterModel = (() => {
  let M = null;

  // Same features as ml/train_letters.py: all 210 pair distances in x,y, over the wrist-to-middle-knuckle length.
  function features(lm, W = 1, H = 1) {
    const P = lm.map(l => [l.x * W, l.y * H]), s = Math.hypot(P[9][0] - P[0][0], P[9][1] - P[0][1]) + 1e-9, f = [];
    for (let i = 0; i < 21; i++) for (let j = i + 1; j < 21; j++) f.push(Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]) / s);
    return f;
  }
  function forward(x) {
    const h = M.b1.map((b, j) => { let a = b; for (let i = 0; i < x.length; i++) a += x[i] * M.W1[i][j]; return a > 0 ? a : 0; });
    const z = M.b2.map((b, k) => { let a = b; for (let j = 0; j < h.length; j++) a += h[j] * M.W2[j][k]; return a; });
    const mx = Math.max(...z), e = z.map(v => Math.exp(v - mx)), t = e.reduce((a, b) => a + b, 0);
    return e.map(v => v / t);
  }
  async function load(url = "models/letters.json") {
    if (!M) M = await (await fetch(url)).json();
    return M;
  }
  function setModel(m) { M = m; }                      // for tests and Node
  function predict(lm, W = 1, H = 1, top = 3) {
    if (!M || !lm || lm.length !== 21) return [];
    const p = forward(features(lm, W, H));
    return M.labels.map((letter, i) => ({ letter, p: p[i] })).sort((a, b) => b.p - a.p).slice(0, top);
  }
  return { load, setModel, predict, _features: features, info: () => M && { trainedOn: M.trained_on } };
})();
