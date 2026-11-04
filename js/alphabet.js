/* ---------- Alphabet, numbers and fingerspelling content ----------
   Descriptions are paraphrased from the published guides in ABC_SOURCES and checked against each other
   (the `src` codes on each item say which ones back it up; see vault/Content/Alphabet Sources and Verification.md).
   For a right-handed signer. Palm faces the viewer except G and H (turned sideways) and P and Q (pointing down).
   Left-handed? Mirror everything. */
const ABC_SOURCES = [
  { id:"HK",  name:"Helen Keller Services: ASL handshapes described", url:"https://helenkeller.org/asl-handshapes-described" },
  { id:"W",   name:"Wikipedia: American manual alphabet", url:"https://en.wikipedia.org/wiki/American_manual_alphabet" },
  { id:"WB",  name:"Wikibooks: ASL Fingerspelling 1", url:"https://en.wikibooks.org/wiki/American_Sign_Language/Fingerspelling_1" },
  { id:"SSM", name:"Signing Savvy: Common Fingerspelling Mistakes", url:"https://www.signingsavvy.com/article/251/Common+Fingerspelling+Mistakes+New+Signers+Make" },
  { id:"SSH", name:"Signing Savvy: How to Fingerspell", url:"https://www.signingsavvy.com/blog/405/How+to+Fingerspell" },
  { id:"SSN", name:"Signing Savvy: Signs That Are Close But Not the Same (Numbers)", url:"https://www.signingsavvy.com/article/389/Signs+That+Are+Close...+But+Not+the+Same+—+Numbers" },
  { id:"SA",  name:"Start ASL: Sign Language Alphabet", url:"https://www.startasl.com/american-sign-language-alphabet/" },
  { id:"HS",  name:"Handspeak: ASL alphabet", url:"https://www.handspeak.com/learn/408/" },
  { id:"LP",  name:"Lifeprint (ASL University): Numbers 1-10 discussion", url:"https://lifeprint.com/asl101/pages-layout/numbersdiscussion.htm" },
  { id:"BG",  name:"US Bridge Federation: Review the ASL numbers", url:"https://usbgf.org/courses/pip-counting-with-art-benjamin/lessons/review-the-american-sign-language-numbers/" },
  { id:"AB",  name:"ASL Bloom: TEN", url:"https://aslbloom.com/signs/ten" },
];

const ABC_GROUPS = [
  { id: "fist",  name: "Closed fists", tip: "Six letters are fists. They only differ by where the thumb is, so watch the thumb." },
  { id: "round", name: "Round shapes", tip: "C stays open like a cup. O closes the circle. Both face the person you are signing to." },
  { id: "point", name: "Pointing finger", tip: "Direction matters: G points sideways, Q points down. D, L and X change the thumb or finger. Z draws a shape." },
  { id: "two",   name: "Two-finger letters", tip: "U is together, V is apart, R is crossed, H lies sideways. K and P are the same handshape: P is K with the wrist dropped." },
  { id: "open",  name: "Fingers up", tip: "B is a flat hand, W is three fingers, F is the OK sign. F and D look alike, so check which finger touches the thumb." },
  { id: "pinky", name: "Little finger and thumb", tip: "I and J use the little finger. J draws a hook in the air. Y spreads the thumb and little finger." },
];

// id, ch = what is shown, g = group (also used to pick look-alike answers in the quiz), q = the plain word for the character,
// src = which ABC_SOURCES back the description
const LETTERS = [
  { id:"a", ch:"A", g:"fist",  src:["HK","W"],            hand:"Make a fist with your thumb resting against the side of your index finger, pointing up.", hook:"The thumb stands up beside the fist, like the point of a capital A." },
  { id:"b", ch:"B", g:"open",  src:["HK"],                hand:"Hold your four fingers straight up and together, with your thumb folded across your palm.", hook:"A flat board with the thumb tucked in." },
  { id:"c", ch:"C", g:"round", src:["HK","WB","SSM","SA"],hand:"Curve your fingers and thumb into the shape of a C. Face it toward the person you are signing to, not turned sideways.", hook:"Your hand is the letter." },
  { id:"d", ch:"D", g:"point", src:["HK","HS"],           hand:"Point your index finger up. Touch your thumb tip to the tip of your middle finger, with your other fingers curved in toward the thumb.", hook:"The straight finger is the stem of a d and the circle is its belly." },
  { id:"e", ch:"E", g:"fist",  src:["HK","SSM","WB"],     hand:"Bend your four fingers down so the fingertips rest on top of your thumb, which lies across underneath. Keep it closed, not open.", hook:"The fingers curl down like a little roof over the thumb." },
  { id:"f", ch:"F", g:"open",  src:["HK","SA"],           hand:"Touch the tip of your thumb to the tip of your index finger to make a small circle. Hold your other three fingers straight up (apart or together).", hook:"It is the \"OK\" sign." },
  { id:"g", ch:"G", g:"point", src:["HK","W","WB","SSM"], hand:"Turn your hand sideways, palm toward your body. Extend your index finger straight out with your thumb parallel to it. Curl your other fingers into your palm.", hook:"Show how small something is, sideways." },
  { id:"h", ch:"H", g:"two",   src:["HK","W","WB","SSM"], hand:"Turn your hand sideways, palm toward your body. Extend your index and middle fingers together. Keep your other fingers and thumb in a fist.", hook:"Two fingers lying down like the bar across an H." },
  { id:"i", ch:"I", g:"pinky", src:["HK"],                hand:"Make a fist, with your thumb closed against your index finger, and stick your little finger straight up.", hook:"The little finger is the dot of an i." },
  { id:"j", ch:"J", g:"pinky", src:["W","SA"],            hand:"Make the I handshape (little finger up).", move:"Twist your wrist so your little finger draws the curve of a J in the air: down, then curve into a hook.", hook:"I plus a hook." },
  { id:"k", ch:"K", g:"two",   src:["HK","W","SSM"],      hand:"Point your index finger up and angle your middle finger out from it. Rest your thumb against the side of the middle finger. Palm faces forward.", hook:"A V with the thumb propped in the middle." },
  { id:"l", ch:"L", g:"point", src:["HK"],                hand:"Point your index finger up and stick your thumb straight out to the side. Curl your other fingers into your palm.", hook:"Your thumb and finger draw an L." },
  { id:"m", ch:"M", g:"fist",  src:["HK","SA","SSM"],     hand:"Make a fist with your thumb under your first three fingers (index, middle and ring), so the thumb tip shows between your ring and little fingers.", hook:"M has three legs, so three fingers go over the thumb." },
  { id:"n", ch:"N", g:"fist",  src:["HK","SA","SSM"],     hand:"Make a fist with your thumb under your first two fingers (index and middle), so the thumb tip shows between your middle and ring fingers.", hook:"N has two legs, so two fingers go over the thumb." },
  { id:"o", ch:"O", g:"round", src:["HK","SSM","WB"],     hand:"Curve your fingers and thumb so the tips meet in a round O. Face it toward the person you are signing to and keep it rounded, not flat.", hook:"Your fingers make the shape of an O." },
  { id:"p", ch:"P", g:"two",   src:["W","SA","SSM"],      hand:"Make the K handshape, then drop your wrist so your middle finger points toward the floor.", hook:"K tipped over to point downward." },
  { id:"q", ch:"Q", g:"point", src:["W","SA"],            hand:"Make the G handshape (index finger and thumb straight and parallel), then point them toward the floor.", hook:"G pointing down, like the tail of a Q." },
  { id:"r", ch:"R", g:"two",   src:["HK"],                hand:"Cross your index and middle fingers and hold them up. Keep your other fingers and thumb in a fist.", hook:"Fingers crossed, as if wishing for luck." },
  { id:"s", ch:"S", g:"fist",  src:["HK","W"],            hand:"Make a fist with your thumb across the front of your index and middle fingers.", hook:"The thumb crosses in front like a seat belt." },
  { id:"t", ch:"T", g:"fist",  src:["HK","SA","HS"],      hand:"Make a fist with your thumb tucked under your index finger, so the thumb tip shows between your index and middle fingers.", hook:"T for tucked." },
  { id:"u", ch:"U", g:"two",   src:["W"],                 hand:"Hold your index and middle fingers straight up and together. Your thumb holds down the other two fingers.", hook:"Two fingers standing together." },
  { id:"v", ch:"V", g:"two",   src:["HK"],                hand:"Hold your index and middle fingers up and apart. Keep your other fingers and thumb in a fist.", hook:"U with the fingers apart. The peace sign." },
  { id:"w", ch:"W", g:"open",  src:["SSN"],               hand:"Hold your index, middle and ring fingers up and apart. Touch your thumb to your little finger.", hook:"Three fingers make a W." },
  { id:"x", ch:"X", g:"point", src:["HK"],                hand:"Make a fist and bend your index finger into a hook.", hook:"A hooked finger, like a pirate's hook." },
  { id:"y", ch:"Y", g:"pinky", src:["HK"],                hand:"Stick out your thumb and little finger wide. Curl the other three fingers against your palm.", hook:"The thumb and little finger are the two arms of a Y." },
  { id:"z", ch:"Z", g:"point", src:["W","SA","SSM","HS"], hand:"Point your index finger (a 1 handshape). Use the index finger, not the little finger.", move:"Draw a Z in the air as you would write it: across the top, diagonally down, then across the bottom.", hook:"Trace the letter with your finger." },
];
LETTERS.forEach(l => { l.q = l.ch.toLowerCase(); });

const NUMBERS = [
  { id:"n1",  ch:"1",  g:"num", q:"one",   src:["HK","LP","BG"],       hand:"Point your index finger up and fold the other fingers into your palm, with your thumb closed over the middle finger. Palm toward you when counting.", hook:"One finger for one." },
  { id:"n2",  ch:"2",  g:"num", q:"two",   src:["LP","BG"],            hand:"Hold your index and middle fingers up and apart (the V handshape). Hold the other fingers down with your thumb. Palm toward you when counting.", hook:"Two fingers up, like a peace sign." },
  { id:"n3",  ch:"3",  g:"num", q:"three", src:["HK","SSN","BG"],      hand:"Stick out your thumb, index finger and middle finger, spread apart. Fold your other two fingers into your palm. Palm toward you when counting.", hook:"In ASL the thumb counts: thumb, pointer, middle." },
  { id:"n4",  ch:"4",  g:"num", q:"four",  src:["HK","BG"],            hand:"Hold four fingers up and spread. Fold your thumb against your palm. Palm toward you when counting.", hook:"Four fingers, thumb tucked away." },
  { id:"n5",  ch:"5",  g:"num", q:"five",  src:["HK","BG"],            hand:"Spread all five fingers open, with the thumb out to the side. Palm toward you when counting.", hook:"A full open hand." },
  { id:"n6",  ch:"6",  g:"num", q:"six",   src:["HK","SSN","LP","BG"], hand:"Touch your thumb to your little finger. Hold your index, middle and ring fingers up and spread. Palm faces forward.", hook:"Six starts at the little finger." },
  { id:"n7",  ch:"7",  g:"num", q:"seven", src:["HK","SSN","BG"],      hand:"Touch your thumb to your ring finger. Hold your index, middle and little fingers up and spread. Palm faces forward.", hook:"The thumb moves one finger over." },
  { id:"n8",  ch:"8",  g:"num", q:"eight", src:["HK","SSN","BG"],      hand:"Touch your thumb to your middle finger. Hold your index, ring and little fingers up and spread. Palm faces forward.", hook:"The thumb moves one more finger over." },
  { id:"n9",  ch:"9",  g:"num", q:"nine",  src:["HK","SSN","LP","BG"], hand:"Touch your thumb to your index finger, making a small loop. Hold your middle, ring and little fingers up and spread. Palm faces forward.", hook:"The thumb ends at the pointer. It is the same shape as the letter F." },
  { id:"n10", ch:"10", g:"num", q:"ten",   src:["AB","BG"],            hand:"Make a fist with your thumb sticking up. Palm faces out.", move:"Twist your hand at the wrist back and forth.", hook:"Thumbs-up with a little wiggle." },
];
const NUMBER_TIP = "Counting 1 to 5 on their own, signers usually keep the palm toward themselves. In a longer number (like a phone number) the palm turns forward. Numbers 6 to 10 face forward. For 6 to 9 the thumb touches a different finger each time, moving from the little finger (6) toward the pointer (9).";

// Words to try in "Spell a word": names, places and double letters (words with their own sign should be signed instead).
const SPELL_WORDS = ["SAM", "ANNA", "MAYA", "ZOE", "LUCAS", "PIZZA", "TEXAS"];
const SPELL_TIPS = [
  "Use your dominant hand, held in front of your dominant shoulder at about shoulder height (guides vary between shoulder and upper chest), palm toward the person you are talking to. Keep it fairly still and don't bounce between letters. Only J and Z move.",
  "Say or mouth the word the way you would say it in English, not letter by letter, so your child links the word, your lips and the handshapes.",
  "Keep an even speed and make each handshape clear before you try to go fast. Pause briefly between words.",
  "Double letters (like NN or ZZ): make a slight bounce, or slide your hand a little to the side (away from the middle of your body), instead of forming the letter again.",
  "Fingerspelling is mainly for names, titles, brands and words with no established sign. If a word has its own sign (like MILK or BOOK), sign it. Many places have their own signs too.",
];

/* Easy-word lessons: a path from 3-letter words to names. `letters` = the letters first introduced in that lesson
   (so by lesson 7 all 26 have been taught). Every word only uses letters taught up to and including its lesson.
   The order and word choice are our own teaching design (not from a published ASL curriculum). */
const WORD_LESSON_INTRO = "Short words first. Each lesson adds a few letters, and every word only uses letters you have already learned. Say or mouth the word while you spell it, and keep practising common letter combinations until they feel automatic. These are practice words: in real life, use the sign when a word has one (we flag those).";
const WORD_LESSONS = [
  { id:"l1", title:"Lesson 1: first words",        letters:"AINPST", blurb:"Six letters make six little words. Start here.", words:["SAT","PAT","TIP","PIN","NAP","ANT"] },
  { id:"l2", title:"Lesson 2: more letters",       letters:"MDC",    blurb:"Three new letters, and the first six keep coming back.", words:["CAT","CAN","MAP","MAD","DIP","DAD"] },
  { id:"l3", title:"Lesson 3: round letters",      letters:"BHO",    blurb:"O is a round shape, H lies sideways, B is a flat hand.", words:["BAT","HAT","HOT","DOT","POT","MOM"] },
  { id:"l4", title:"Lesson 4: everyday words",     letters:"EGR",    blurb:"E stays closed, G points sideways, R has crossed fingers.", words:["BED","RED","BIG","PIG","DOG","HEN"] },
  { id:"l5", title:"Lesson 5: four more letters",  letters:"ULKF",   blurb:"U, L, K and F open up longer words.", words:["SUN","BUS","CUP","FUN","MILK","FLAG"] },
  { id:"l6", title:"Lesson 6: W, Y, J and V",      letters:"WYJV",   blurb:"J is the first letter that moves.", words:["YES","WET","JAM","VAN","JET","BOY"] },
  { id:"l7", title:"Lesson 7: the last letters",   letters:"QXZ",    blurb:"Q, X and Z finish the alphabet. Z moves too.", words:["BOX","FOX","SIX","MIX","QUIZ","ZIP"] },
  { id:"l8", title:"Lesson 8: double letters",     letters:"",       blurb:"No new letters. Practise the small bounce or slide for double letters.", words:["BALL","DOLL","BOOK","MOON","BEE","ZOO"] },
  { id:"l9", title:"Lesson 9: names and places",   letters:"",       blurb:"Fingerspelling matters most for names. Finish by spelling your child's name.", words:["SAM","ANNA","MAYA","ZOE","LUCAS","TEXAS"] },
];
