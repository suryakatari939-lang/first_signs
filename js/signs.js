/* ---------- Content ---------- */
const ROUTINES = [
  { id: "meal", name: "Mealtime", time: "Breakfast, lunch, dinner" },
  { id: "bed", name: "Bath & bedtime", time: "Evening" },
  { id: "feel", name: "Feelings", time: "Any time" },
  { id: "family", name: "Family", time: "Any time" },
  { id: "play", name: "Play & manners", time: "Daytime" },
  { id: "safe", name: "Safety & getting out", time: "On the go" },
];

// hand = handshape, where = location, move = movement. One hand means your dominant hand.
const SIGNS = [
  // Mealtime
  { id:"eat", r:"meal", w:"EAT", hand:"Flat-O: fingertips pressed together on the thumb.", where:"At your lips.", move:"Tap the fingertips to your mouth twice.", hook:"You're putting a bite of food in your mouth.", say:"\"Time to EAT!\" when the plate goes down." },
  { id:"drink", r:"meal", w:"DRINK", hand:"C-hand, as if holding a cup.", where:"In front of your chin.", move:"Tip the 'cup' up toward your mouth.", hook:"Sip from an invisible cup.", say:"Ask \"DRINK?\" while holding up their cup." },
  { id:"milk", r:"meal", w:"MILK", hand:"Loose fist (C to S).", where:"At your side, about chest height.", move:"Squeeze and open the fist two or three times.", hook:"Milking a cow.", say:"Sign it right before you hand over the bottle or cup." },
  { id:"water", r:"meal", w:"WATER", hand:"W-hand: index, middle and ring fingers up, palm to the side.", where:"Index finger at your chin.", move:"Tap the chin twice.", hook:"W for water, at the mouth where you drink it.", say:"\"WATER or MILK?\"" },
  { id:"more", r:"meal", w:"MORE", hand:"Both hands in flat-O.", where:"In front of your chest.", move:"Tap the fingertips of both hands together twice.", hook:"Adding more pieces onto the pile.", say:"Pause before refilling. Wait for a reach, look, or sign." },
  { id:"finish", r:"meal", w:"ALL DONE", hand:"Both hands open (5-hands), palms toward you.", where:"In front of your chest.", move:"Twist both wrists out so palms face away. Shake once or twice.", hook:"Shaking off crumbs: nothing left.", say:"Sign it as the plate comes away, every meal." },
  { id:"hungry", r:"meal", w:"HUNGRY", hand:"C-hand, palm toward you.", where:"Upper chest.", move:"Slide down once to your stomach.", hook:"Food traveling down an empty tummy.", say:"\"You HUNGRY?\" with eyebrows raised (that's how ASL asks yes/no)." },
  { id:"want", r:"meal", w:"WANT", hand:"Both hands open, palms up, fingers slightly bent.", where:"In front of you.", move:"Pull toward your body while curling the fingers into claws.", hook:"Pulling something you want toward you.", say:"\"WANT apple?\" Hold the apple near your face so they see both." },
  // Bedtime
  { id:"bath", r:"bed", w:"BATH", hand:"Both A-hands (fists, thumbs on the side).", where:"On your chest.", move:"Rub up and down on your chest.", hook:"Scrubbing with a washcloth.", say:"Sign BATH before you turn on the water." },
  { id:"brush", r:"bed", w:"BRUSH TEETH", hand:"Index finger, like a toothbrush.", where:"In front of your teeth.", move:"Move side to side.", hook:"Your finger is the toothbrush.", say:"Brush together and sign first." },
  { id:"book", r:"bed", w:"BOOK", hand:"Both flat hands, palms pressed together.", where:"In front of your chest.", move:"Open them like the covers of a book.", hook:"Opening a book.", say:"Let them pick: hold up two books and sign BOOK." },
  { id:"bed", r:"bed", w:"BED", hand:"One flat hand.", where:"Against your cheek, head tilted.", move:"Rest your cheek on your palm.", hook:"Your hand is the pillow.", say:"\"BOOK, then BED.\"" },
  { id:"sleep", r:"bed", w:"SLEEP", hand:"Open 5-hand closing to a flat-O.", where:"In front of your face.", move:"Draw down over your face as the fingers close. Let your eyes close too.", hook:"Pulling down your eyelids.", say:"Sign it slowly at lights out." },
  { id:"ily", r:"bed", w:"I LOVE YOU", hand:"Thumb, index and pinky up; middle and ring folded down.", where:"Held up in front of you, palm out.", move:"Hold it still, or give it a little shake.", hook:"It combines I, L and Y.", say:"The last thing they see before you leave the room." },
  // Feelings
  { id:"happy", r:"feel", w:"HAPPY", hand:"Flat hand, palm on your chest.", where:"Chest.", move:"Brush upward in small circles, twice.", hook:"Joy bubbling up.", say:"Name their feeling when you see it: \"You HAPPY!\"" },
  { id:"sad", r:"feel", w:"SAD", hand:"Both open 5-hands, palms toward your face.", where:"In front of your face.", move:"Move both hands down slowly. Let your face look sad.", hook:"Tears or a face falling.", say:"Your face is part of the sign. Match the feeling." },
  { id:"mad", r:"feel", w:"MAD", hand:"Claw hand (5-hand with fingers bent).", where:"In front of your face, palm in.", move:"Pull out a little while tensing the fingers. Frown.", hook:"An angry face scrunching up.", say:"\"You MAD. Okay. WAIT, then we try again.\"" },
  { id:"scared", r:"feel", w:"SCARED", hand:"Both fists, then open 5-hands.", where:"In front of your chest.", move:"Burst both hands open toward each other, as if startled.", hook:"A jump of fright.", say:"Use it during storms, doctor visits, or loud noises." },
  { id:"hurt", r:"feel", w:"HURT", hand:"Both index fingers pointing at each other.", where:"Near the place that hurts (head, tummy, knee).", move:"Jab the fingertips toward each other twice, or twist them.", hook:"Pain stabbing right there.", say:"Sign it at the sore spot. They learn to tell you where." },
  { id:"tired", r:"feel", w:"TIRED", hand:"Both bent hands, fingertips on your upper chest.", where:"Upper chest.", move:"Roll the hands down so they droop. Let your shoulders sag.", hook:"Your body running out of energy.", say:"\"You TIRED? BED soon.\"" },
  { id:"love", r:"feel", w:"LOVE", hand:"Both fists.", where:"Crossed over your heart.", move:"Hug them to your chest.", hook:"Hugging something you love.", say:"\"Mommy LOVE you.\"" },
  // Family
  { id:"mom", r:"family", w:"MOM", hand:"Open 5-hand.", where:"Thumb on your chin.", move:"Tap the chin twice.", hook:"Female signs are often near the chin.", say:"Sign it every time you hand the baby to Mom." },
  { id:"dad", r:"family", w:"DAD", hand:"Open 5-hand.", where:"Thumb on your forehead.", move:"Tap the forehead twice.", hook:"Male signs are often near the forehead.", say:"\"DAD home!\" when the door opens." },
  { id:"baby", r:"family", w:"BABY", hand:"Arms cradled, one resting on the other.", where:"In front of your body.", move:"Rock side to side.", hook:"Rocking a baby.", say:"Use it for dolls, siblings, and baby animals." },
  { id:"grandma", r:"family", w:"GRANDMA", hand:"Open 5-hand, as in MOM.", where:"Starts with thumb on chin.", move:"Move forward in two small hops.", hook:"MOM, one generation further out.", say:"Teach Grandma too. More signers means more language." },
  { id:"grandpa", r:"family", w:"GRANDPA", hand:"Open 5-hand, as in DAD.", where:"Starts with thumb on forehead.", move:"Move forward in two small hops.", hook:"DAD, one generation further out.", say:"Show photos on the phone and sign who it is." },
  { id:"friend", r:"family", w:"FRIEND", hand:"Both index fingers hooked.", where:"In front of your chest.", move:"Hook the fingers together, flip, and hook again.", hook:"Two people linked together.", say:"Point to the child at the park, then FRIEND." },
  // Play & manners
  { id:"play", r:"play", w:"PLAY", hand:"Both Y-hands (thumb and pinky out).", where:"In front of you.", move:"Shake both hands by twisting the wrists.", hook:"Wiggly and fun.", say:"\"WANT PLAY?\" with raised eyebrows." },
  { id:"ball", r:"play", w:"BALL", hand:"Both curved hands, like holding a ball.", where:"In front of your chest.", move:"Tap the fingertips together twice.", hook:"The shape of a ball.", say:"Sign it, then roll it. Wait for them to sign before the next roll." },
  { id:"dog", r:"play", w:"DOG", hand:"Flat hand, then a finger snap.", where:"At your thigh.", move:"Pat your thigh, then snap.", hook:"Calling a dog to come.", say:"Picture books are full of dogs. Point, then sign." },
  { id:"help", r:"play", w:"HELP", hand:"Thumbs-up fist resting on your other flat palm.", where:"In front of your chest.", move:"Lift both hands up together.", hook:"Giving someone a lift.", say:"Teach them to ask: wait for HELP before you open the jar." },
  { id:"please", r:"play", w:"PLEASE", hand:"Flat hand, palm on your chest.", where:"Chest.", move:"Rub in a circle.", hook:"A polite, warm feeling.", say:"Model it yourself: \"BOOK, PLEASE.\"" },
  { id:"thanks", r:"play", w:"THANK YOU", hand:"Flat hand, fingertips at your chin.", where:"Chin.", move:"Move the hand forward and down toward the person.", hook:"Blowing a kiss of thanks.", say:"Sign it to them often. They copy what they see." },
  { id:"sorry", r:"play", w:"SORRY", hand:"A-hand (fist, thumb on the side).", where:"On your chest.", move:"Rub in a circle.", hook:"Like PLEASE, but with a fist.", say:"When you make a mistake, sign SORRY to them too." },
  { id:"yes", r:"play", w:"YES", hand:"S-hand (fist).", where:"In front of you.", move:"Bend the wrist up and down, like a head nodding.", hook:"Your fist is a nodding head.", say:"Nod your head while you sign it." },
  { id:"no", r:"play", w:"NO", hand:"Index and middle fingers out, thumb open.", where:"In front of you.", move:"Snap the two fingers down onto the thumb.", hook:"A mouth snapping shut on 'no'.", say:"Shake your head with it." },
  // Safety
  { id:"stop", r:"safe", w:"STOP", hand:"Both flat hands. One palm up, the other on its edge.", where:"In front of your chest.", move:"Chop the edge down onto the flat palm once, sharply.", hook:"A gate slamming down.", say:"Practice it as a game first so it works in a real moment." },
  { id:"hot", r:"safe", w:"HOT", hand:"Claw hand.", where:"Starts at your mouth.", move:"Twist quickly away and down.", hook:"Spitting out food that's too hot.", say:"Sign HOT near the stove, the bath tap, and soup." },
  { id:"careful", r:"safe", w:"CAREFUL", hand:"Both K-hands (index up, middle out, thumb between).", where:"Stacked in front of your chest.", move:"Tap the top hand on the bottom one twice.", hook:"Stacking things carefully.", say:"\"CAREFUL, HOT!\"" },
  { id:"wait", r:"safe", w:"WAIT", hand:"Both open hands, palms up, one in front of the other.", where:"Off to one side, in front of you.", move:"Wiggle the fingers.", hook:"Fingers drumming while you wait.", say:"Use it at crosswalks and at the store line." },
  { id:"come", r:"safe", w:"COME", hand:"Index fingers pointing out.", where:"In front of you.", move:"Curl them back toward you, like beckoning.", hook:"'Come here' with a finger.", say:"Get down to their eye level first so they can see you." },
  { id:"potty", r:"safe", w:"POTTY", hand:"T-hand (thumb tucked between index and middle fingers).", where:"In front of your shoulder.", move:"Shake side to side.", hook:"T for toilet.", say:"Sign it every time you go, long before training starts." },
  { id:"shoes", r:"safe", w:"SHOES", hand:"Both S-hands (fists), palms down.", where:"In front of your chest.", move:"Knock the thumb sides together twice.", hook:"Clicking your heels together.", say:"\"SHOES on, then go outside.\"" },
];

const PHRASES = {
  meal:   [["WANT MORE MILK?", "Do you want more milk?"], ["EAT FINISH?", "Are you all done eating?"], ["HUNGRY? WANT EAT?", "Are you hungry? Want to eat?"]],
  bed:    [["BATH, BRUSH TEETH, BOOK, BED.", "Bath, teeth, story, bed. Sign the plan before you start."], ["SLEEP. I LOVE YOU.", "Goodnight, I love you."]],
  feel:   [["YOU SAD? HURT?", "Are you sad? Are you hurt?"], ["YOU TIRED. SLEEP SOON.", "You're tired. Sleep soon."], ["MOM LOVE YOU.", "Mommy loves you."]],
  family: [["DAD HOME!", "Dad's home!"], ["GRANDMA COME?", "Is Grandma coming?"]],
  play:   [["WANT PLAY BALL?", "Want to play ball?"], ["HELP PLEASE.", "Help, please."], ["THANK YOU!", "Thank you!"]],
  safe:   [["STOP! WAIT.", "Stop! Wait."], ["CAREFUL, HOT.", "Careful, that's hot."], ["SHOES, COME.", "Shoes on, come on."]],
};

const HANDSHAPES = [
  ["Flat-O", "Fingertips together, touching the thumb. EAT, MORE"],
  ["C", "Hand curved like the letter C. DRINK, HUNGRY"],
  ["5 (open)", "All five fingers spread. MOM, DAD, ALL DONE"],
  ["A", "Fist with the thumb along the side. BATH, SORRY"],
  ["S", "Fist with the thumb across the front. YES, SHOES"],
  ["Claw", "Spread fingers, bent. MAD, HOT"],
  ["Y", "Thumb and pinky out. PLAY"],
  ["W", "Index, middle and ring up. WATER"],
  ["K", "Index up, middle out, thumb between. CAREFUL"],
  ["T", "Thumb tucked between index and middle. POTTY"],
  ["ILY", "Thumb, index, pinky up. I LOVE YOU"],
  ["Index", "Just the pointer finger. BRUSH TEETH, HURT, FRIEND"],
];

/* What the camera coach looks for in each sign.
   hands: how many hands the sign uses
   shape: handshapes that count (see SHAPE_NAMES in camera.js)
   at:    where the sign happens: mouth, chin, forehead, cheek, face, chest, body, any
   ref:   which part of the hand must be in that place: tips, index, thumb, center
   move:  movements that count: repeat, squeeze, down, up, away, side, circle, twist, shake, open, close, change, rock, still, any */
const CHECKS = {
  eat:     { hands:1, shape:["flatO"], at:"mouth", ref:"tips", move:["repeat"] },
  drink:   { hands:1, shape:["C","claw"], at:"mouth", ref:"center", move:["any"] },
  milk:    { hands:1, shape:["fist","C","claw"], at:"body", ref:"center", move:["squeeze"] },
  water:   { hands:1, shape:["W","flat"], at:"chin", ref:"index", move:["repeat"] },
  more:    { hands:2, shape:["flatO","fist"], at:"body", ref:"tips", move:["repeat"] },
  finish:  { hands:2, shape:["5","flat"], at:"body", ref:"center", move:["twist","shake"] },
  hungry:  { hands:1, shape:["C","claw"], at:"chest", ref:"center", move:["down"] },
  want:    { hands:2, shape:["5","claw","flat","C"], at:"body", ref:"center", move:["close","change"] },
  bath:    { hands:2, shape:["fist"], at:"chest", ref:"center", move:["repeat"] },
  brush:   { hands:1, shape:["index"], at:"mouth", ref:"index", move:["side","repeat"] },
  book:    { hands:2, shape:["flat","5"], at:"body", ref:"center", move:["change","open","twist"] },
  bed:     { hands:1, shape:["flat","5"], at:"cheek", ref:"center", move:["still"] },
  sleep:   { hands:1, shape:["5","flat","flatO","claw"], at:"face", ref:"center", move:["down","close"] },
  ily:     { hands:1, shape:["ILY"], at:"any", ref:"center", move:["still"] },
  happy:   { hands:1, shape:["flat","5"], at:"chest", ref:"center", move:["repeat","circle"] },
  sad:     { hands:2, shape:["5","flat"], at:"face", ref:"center", move:["down"] },
  mad:     { hands:1, shape:["claw","5","C"], at:"face", ref:"center", move:["any","close"] },
  scared:  { hands:2, shape:["5","fist","claw","flat","C"], at:"chest", ref:"center", move:["open","change"] },
  hurt:    { hands:2, shape:["index"], at:"any", ref:"index", move:["repeat","twist"] },
  tired:   { hands:2, shape:["flat","claw","C","5"], at:"chest", ref:"tips", move:["any","change","down"] },
  love:    { hands:2, shape:["fist"], at:"chest", ref:"center", move:["still"] },
  mom:     { hands:1, shape:["5","flat"], at:"chin", ref:"thumb", move:["repeat"] },
  dad:     { hands:1, shape:["5","flat"], at:"forehead", ref:"thumb", move:["repeat"] },
  baby:    { hands:2, shape:["flat","5","C"], at:"body", ref:"center", move:["rock","side"] },
  grandma: { hands:1, shape:["5","flat"], at:"chin", ref:"thumb", move:["away","repeat"] },
  grandpa: { hands:1, shape:["5","flat"], at:"forehead", ref:"thumb", move:["away","repeat"] },
  friend:  { hands:2, shape:["index","fist","claw","C"], at:"body", ref:"index", move:["change","twist","any"] },
  play:    { hands:2, shape:["Y"], at:"body", ref:"center", move:["shake","twist"] },
  ball:    { hands:2, shape:["C","claw","flatO"], at:"body", ref:"tips", move:["repeat"] },
  dog:     { hands:1, shape:["flat","5","flatO","fist","two","index"], at:"body", ref:"center", move:["any"] },
  help:    { hands:2, shape:["thumbsup","fist","flat","5"], at:"body", ref:"center", move:["up"] },
  please:  { hands:1, shape:["flat","5"], at:"chest", ref:"center", move:["circle","repeat"] },
  thanks:  { hands:1, shape:["flat","5"], at:"chin", ref:"tips", move:["away","down"] },
  sorry:   { hands:1, shape:["fist","thumbsup"], at:"chest", ref:"center", move:["circle","repeat"] },
  yes:     { hands:1, shape:["fist"], at:"body", ref:"center", move:["repeat"] },
  no:      { hands:1, shape:["two","flatO","index"], at:"body", ref:"tips", move:["squeeze","repeat","close"] },
  stop:    { hands:2, shape:["flat","5"], at:"body", ref:"center", move:["down"] },
  hot:     { hands:1, shape:["claw","C","5"], at:"mouth", ref:"center", move:["away","down","twist"] },
  careful: { hands:2, shape:["two","index"], at:"body", ref:"center", move:["repeat"] },
  wait:    { hands:2, shape:["5","flat","claw","C"], at:"body", ref:"center", move:["any","still"] },
  come:    { hands:1, shape:["index","fist","claw"], at:"body", ref:"index", move:["close","any"] },
  potty:   { hands:1, shape:["fist"], at:"body", ref:"center", move:["shake","side"] },
  shoes:   { hands:2, shape:["fist"], at:"body", ref:"center", move:["repeat"] },
};

/* Real photos of signs and handshapes from Wikimedia Commons (freely licensed).
   The app loads them from Commons, so they only show when the computer is online.
   Each file's page on Commons lists its author and license. */
const COMMONS = "https://commons.wikimedia.org/wiki/";
const photoSrc = file => COMMONS + "Special:FilePath/" + encodeURIComponent(file.replace(/ /g, "_")) + "?width=360";
const photoPage = file => COMMONS + "File:" + encodeURIComponent(file.replace(/ /g, "_"));
const SIGN_PHOTOS = {
  eat:    { file: "ASL FlatO@Mouth-PalmBack.jpg", caption: "Flat-O hand at the mouth" },
  drink:  { file: "ASL C@NearMouth-TipUp.jpg", caption: "C-hand near the mouth" },
  want:   { file: "ASL Claw5@InsideChesthigh-PalmUp-Claw5@InsideChesthigh-PalmUp WANT 1.jpg", caption: "Both hands, palms up, fingers curling in" },
  ily:    { file: "ASL ILY@Side-PalmForward.jpg", caption: "I LOVE YOU, palm out" },
  thanks: { file: "ASL OpenB@Chin-PalmBack.jpg", caption: "Starting position at the chin" },
};
const HANDSHAPE_PHOTOS = {
  "Flat-O": "ASL FlatO@Side-PalmForward.jpg",
  "C": "ASL C@NearChin.jpg",
  "5 (open)": "ASL 5@Chest-PalmBack.jpg",
  "A": "ASL A@Forehead.jpg",
  "S": "ASL S@Side-PalmForward.jpg",
  "Claw": "ASL Claw5@NearNose-PalmBack.jpg",
  "Y": "ASL Y@Side.jpg",
  "K": "ASL K@Side-PalmForward.jpg",
  "ILY": "ASL ILY@Side-PalmForward.jpg",
  "Index": "ASL 1@Side-PalmForward.jpg",
};
