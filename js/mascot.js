/* Pictures that are drawn in code: Peak (the mascot) and the toy blocks used on the Basics tab.
   Peak is a friendly mountain. The gear you buy in Rewards is drawn on top of it, everywhere it appears.
   This file only draws. Which gear is worn comes from the saved state (S.rw.on, see app.js). */

// Gear you can buy with coins. `slot` is where it goes, and one item per slot can be worn.
const GEAR = [
  { id: "beanie",   name: "Cozy beanie",    slot: "head", price: 30 },
  { id: "goggles",  name: "Snow goggles",   slot: "face", price: 40 },
  { id: "scarf",    name: "Warm scarf",     slot: "neck", price: 40 },
  { id: "backpack", name: "Trail backpack", slot: "back", price: 60 },
  { id: "flag",     name: "Summit flag",    slot: "hand", price: 80 },
  { id: "crown",    name: "Golden crown",   slot: "head", price: 150 },
];
const GEAR_SLOT_NAME = { head: "Head", face: "Face", neck: "Neck", back: "Back", hand: "Hand" };

const GEAR_ART = {
  // drawn behind the body
  backpack: `<rect x="1" y="80" width="25" height="32" rx="9" fill="#e6a93c" stroke="#b9801a" stroke-width="3"/><path d="M13.5 85v21" stroke="#b9801a" stroke-width="3" stroke-linecap="round"/>`,
  // drawn on top of the body
  scarf: `<path d="M15 99Q56 111 97 99L100.5 111Q56 123 12 111Z" fill="#ff7a6b" stroke="#e2584a" stroke-width="2.5" stroke-linejoin="round"/><path d="M78 113L87 128L74 126L70 115Z" fill="#ff7a6b" stroke="#e2584a" stroke-width="2.5" stroke-linejoin="round"/>`,
  goggles: `<path d="M34 84H26M78 84H86" stroke="#20313a" stroke-width="3" stroke-linecap="round"/><path d="M53.5 84h5" stroke="#20313a" stroke-width="3" stroke-linecap="round"/><circle cx="44" cy="84" r="9.5" fill="#bfe3ff" fill-opacity=".55" stroke="#20313a" stroke-width="3"/><circle cx="68" cy="84" r="9.5" fill="#bfe3ff" fill-opacity=".55" stroke="#20313a" stroke-width="3"/>`,
  beanie: `<path d="M41 37Q44 15 56 8Q68 15 71 37Z" fill="#2f4f73" stroke="#1f3a57" stroke-width="2.5" stroke-linejoin="round"/><path d="M38.5 33H73.5Q75.5 42 72.5 42H39.5Q36.5 42 38.5 33Z" fill="#3b6e98" stroke="#1f3a57" stroke-width="2.5" stroke-linejoin="round"/><circle cx="56" cy="7" r="5.5" fill="#fff" stroke="#cfe0f2" stroke-width="2"/>`,
  crown: `<path d="M42 39L44 21L51 30L56 13L61 30L68 21L70 39Z" fill="#e6a93c" stroke="#b9801a" stroke-width="2.5" stroke-linejoin="round"/><circle cx="56" cy="33" r="2.6" fill="#ff7a6b"/>`,
  flag: `<path d="M95 106V52" stroke="#6b4b1f" stroke-width="3" stroke-linecap="round"/><path d="M96.5 52L111 58.5L96.5 65Z" fill="#e6a93c" stroke="#b9801a" stroke-width="2" stroke-linejoin="round"/>`,
};

// Peak. `on` is { slot: gearId } for what is worn.
function peakSvg(size = 112, mood = "happy", on = {}) {
  const worn = id => Object.values(on).includes(id) ? GEAR_ART[id] : "";
  const mouth = mood === "sad" ? `<path d="M49 99q7-7 14 0" fill="none" stroke="#20313a" stroke-width="3.2" stroke-linecap="round"/>`
    : `<path d="M49 94q7 7 14 0" fill="none" stroke="#20313a" stroke-width="3.2" stroke-linecap="round"/>`;
  return `<svg class="mitt" width="${size}" height="${Math.round(size * 130 / 112)}" viewBox="0 0 112 130" aria-hidden="true">
    <ellipse cx="56" cy="123" rx="40" ry="5.5" fill="#000" opacity=".08"/>
    ${worn("backpack")}
    <path d="M8 116Q6 122 14 122H98Q106 122 104 116L62 16Q56 6 50 16Z" fill="#7ea6d3" stroke="#3b6e98" stroke-width="3" stroke-linejoin="round"/>
    <path d="M56 8L62 16L104 116Q106 122 98 122H56Z" fill="#5f8dbf" opacity=".45"/>
    <path d="M50 16Q56 6 62 16L74.5 46L66 41L58 51L50 41L37.5 46Z" fill="#fff" stroke="#cfe0f2" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="44" cy="84" r="5.5" fill="#20313a"/><circle cx="68" cy="84" r="5.5" fill="#20313a"/>
    <circle cx="45.8" cy="82.2" r="1.8" fill="#fff"/><circle cx="69.8" cy="82.2" r="1.8" fill="#fff"/>${mouth}
    <circle cx="37" cy="94" r="4.2" fill="#ff9d94" opacity=".55"/><circle cx="75" cy="94" r="4.2" fill="#ff9d94" opacity=".55"/>
    ${worn("scarf")}${worn("goggles")}${worn("beanie")}${worn("crown")}${worn("flag")}</svg>`;
}

// A toy block with a letter or number on it. Used as the icon for each Basics section.
function blockSvg(glyph, color = "#609bd7", dark = "#3b6e98", size = 56) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 56 56" aria-hidden="true"><rect x="5" y="9" width="46" height="42" rx="10" fill="${dark}"/><rect x="5" y="5" width="46" height="42" rx="10" fill="${color}"/>
    <rect x="9" y="8" width="38" height="8" rx="4" fill="#fff" opacity=".28"/>
    <text x="28" y="35" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-weight="700" font-size="${String(glyph).length > 2 ? 17 : 24}" fill="#fff">${glyph}</text></svg>`;
}
