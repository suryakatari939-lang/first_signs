/* ---------- Alphabet, numbers and fingerspelling content ----------
   Descriptions are for a right-handed signer, palm facing the person you are signing to.
   Left-handed? Mirror everything. */
const ABC_GROUPS = [
  { id: "fist",  name: "Closed fists", tip: "Six letters are fists. They only differ by where the thumb is, so watch the thumb." },
  { id: "round", name: "Round shapes", tip: "C stays open like a cup. O closes the circle." },
  { id: "point", name: "Pointing finger", tip: "Direction matters: G points sideways, Q points down. D, L and X change the thumb or finger. Z draws a shape." },
  { id: "two",   name: "Two-finger letters", tip: "U is together, V is apart, R is crossed, H lies sideways. K and P add the thumb." },
  { id: "open",  name: "Fingers up", tip: "B is a flat hand, W is three fingers, F is the OK sign." },
  { id: "pinky", name: "Little finger and thumb", tip: "I and J use the pinky. J draws a hook in the air. Y spreads the thumb and pinky." },
];

// id, ch = what is shown, g = group (also used to pick look-alike answers in the quiz), q = search word for the video link
const LETTERS = [
  { id:"a", ch:"A", g:"fist",  hand:"Make a fist with your thumb resting along the side of your index finger, pointing up.", hook:"The thumb stands up beside the fist, like the point of a capital A." },
  { id:"b", ch:"B", g:"open",  hand:"Hold your four fingers straight up and together, with your thumb folded across your palm.", hook:"A flat board with the thumb tucked in." },
  { id:"c", ch:"C", g:"round", hand:"Curve your hand into the shape of the letter C, thumb and fingers open.", hook:"Your hand is the letter." },
  { id:"d", ch:"D", g:"point", hand:"Point your index finger up. Curl the other fingers to touch your thumb, making a small circle.", hook:"The straight finger is the stem of a d and the circle is its belly." },
  { id:"e", ch:"E", g:"fist",  hand:"Curl your fingertips down toward your palm and tuck your thumb underneath, so the fingertips rest on it.", hook:"The fingers curl down like a little roof over the thumb." },
  { id:"f", ch:"F", g:"open",  hand:"Touch the tips of your thumb and index finger to make a circle. Hold the other three fingers up and spread.", hook:"It is the \"OK\" sign." },
  { id:"g", ch:"G", g:"point", hand:"Point your index finger and thumb sideways, parallel, as if showing a small gap. Curl the other fingers. Your palm faces in.", hook:"Show how small something is, sideways." },
  { id:"h", ch:"H", g:"two",   hand:"Hold your index and middle fingers together, pointing sideways. Thumb tucked in.", hook:"Two fingers lying down like the bar across an H." },
  { id:"i", ch:"I", g:"pinky", hand:"Make a fist and stick your little finger straight up.", hook:"The little finger is the dot of an i." },
  { id:"j", ch:"J", g:"pinky", hand:"Make the I handshape (little finger up).", move:"Draw a J in the air with your little finger: down, then curve into a hook.", hook:"I plus a hook." },
  { id:"k", ch:"K", g:"two",   hand:"Point your index finger up and your middle finger out at an angle. Press your thumb against the middle finger.", hook:"A V with the thumb propped in the middle." },
  { id:"l", ch:"L", g:"point", hand:"Stick out your thumb and index finger at a right angle. Curl the other fingers.", hook:"Your thumb and finger draw an L." },
  { id:"m", ch:"M", g:"fist",  hand:"Make a fist and tuck your thumb under your first three fingers (index, middle and ring).", hook:"M has three legs, so three fingers go over the thumb." },
  { id:"n", ch:"N", g:"fist",  hand:"Make a fist and tuck your thumb under your first two fingers (index and middle).", hook:"N has two legs, so two fingers go over the thumb." },
  { id:"o", ch:"O", g:"round", hand:"Curve all your fingers so the tips touch your thumb, making a round O.", hook:"Your fingers make the shape of an O." },
  { id:"p", ch:"P", g:"two",   hand:"Make the K handshape, then tip your hand so your fingers point down.", hook:"K tipped over to point downward." },
  { id:"q", ch:"Q", g:"point", hand:"Make the G handshape, then turn your hand so your index finger and thumb point down.", hook:"G pointing down, like the tail of a Q." },
  { id:"r", ch:"R", g:"two",   hand:"Cross your middle finger over your index finger and hold them up.", hook:"Fingers crossed, as if wishing for luck." },
  { id:"s", ch:"S", g:"fist",  hand:"Make a fist with your thumb wrapped across the front of your fingers.", hook:"The thumb crosses in front like a seat belt." },
  { id:"t", ch:"T", g:"fist",  hand:"Make a fist and tuck your thumb between your index and middle fingers, so the thumb tip peeks out.", hook:"T for tucked." },
  { id:"u", ch:"U", g:"two",   hand:"Hold your index and middle fingers straight up and together. Your thumb holds down the other two fingers.", hook:"Two fingers standing together." },
  { id:"v", ch:"V", g:"two",   hand:"Hold your index and middle fingers up and spread them apart. Thumb holds down the other two.", hook:"U with the fingers apart. The peace sign." },
  { id:"w", ch:"W", g:"open",  hand:"Hold your index, middle and ring fingers up and spread. Your thumb holds down your little finger.", hook:"Three fingers make a W." },
  { id:"x", ch:"X", g:"point", hand:"Make a fist and bend your index finger into a hook.", hook:"A hooked finger, like a pirate's hook." },
  { id:"y", ch:"Y", g:"pinky", hand:"Stick out your thumb and little finger. Curl the other three fingers.", hook:"The thumb and little finger are the two arms of a Y." },
  { id:"z", ch:"Z", g:"point", hand:"Point your index finger.", move:"Draw a Z in the air: across, diagonally down, then across again.", hook:"Trace the letter with your finger." },
];
LETTERS.forEach(l => { l.q = l.ch.toLowerCase(); });

const NUMBERS = [
  { id:"n1",  ch:"1",  g:"num", q:"one",   hand:"Point your index finger up. Fold the other fingers into your palm with the thumb across them.", hook:"One finger for one." },
  { id:"n2",  ch:"2",  g:"num", q:"two",   hand:"Hold your index and middle fingers up and spread. Thumb holds down the other two fingers.", hook:"Two fingers up, like a peace sign." },
  { id:"n3",  ch:"3",  g:"num", q:"three", hand:"Stick out your thumb, index finger and middle finger. Fold the other two fingers down.", hook:"In ASL the thumb counts: thumb, pointer, middle." },
  { id:"n4",  ch:"4",  g:"num", q:"four",  hand:"Hold four fingers up and spread. Fold your thumb across your palm.", hook:"Four fingers, thumb tucked away." },
  { id:"n5",  ch:"5",  g:"num", q:"five",  hand:"Spread all five fingers open.", hook:"A full open hand." },
  { id:"n6",  ch:"6",  g:"num", q:"six",   hand:"Touch your thumb to your little finger. Hold the other three fingers up.", hook:"Six starts at the little finger." },
  { id:"n7",  ch:"7",  g:"num", q:"seven", hand:"Touch your thumb to your ring finger. Hold the other three fingers up.", hook:"The thumb moves one finger over." },
  { id:"n8",  ch:"8",  g:"num", q:"eight", hand:"Touch your thumb to your middle finger. Hold the other three fingers up.", hook:"The thumb moves one more finger over." },
  { id:"n9",  ch:"9",  g:"num", q:"nine",  hand:"Touch your thumb to your index finger. Hold the other three fingers up.", hook:"The thumb ends at the pointer. It looks like the F handshape." },
  { id:"n10", ch:"10", g:"num", q:"ten",   hand:"Make a fist with your thumb pointing up.", move:"Shake or twist your fist slightly.", hook:"Thumbs-up with a little wiggle." },
];
const NUMBER_TIP = "Numbers 6 to 9 use the same pattern: the thumb touches a different finger each time, moving from the little finger (6) toward the pointer (9). Hold your palm toward the person you are talking to.";

// Words to try in "Spell a word": names, places and double letters (words with their own sign should be signed instead).
const SPELL_WORDS = ["SAM", "ANNA", "MAYA", "ZOE", "LUCAS", "PIZZA", "TEXAS"];
const SPELL_TIPS = [
  "Hold your hand near your shoulder, palm toward the person you are talking to. Keep it still while the fingers change shape. Only J and Z move.",
  "Say or mouth the word while you spell it, so your child links the word, your lips and the handshapes.",
  "Spell smoothly, at the speed you would say the word, with no big pauses between letters.",
  "Double letters (like NN or ZZ): bounce your hand slightly, or slide it a little to the side, instead of forming the letter again.",
  "Fingerspelling is for names, places and new words. If a word has its own sign (like MILK or BOOK), sign it instead.",
];
