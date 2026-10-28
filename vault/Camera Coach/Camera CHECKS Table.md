---
type: reference
tags: [camera, reference]
---

# Camera CHECKS Table

Every entry of `CHECKS` at the bottom of `js/signs.js` (one per sign id). Format explained in [[CHECKS Format]].

**Two-handed (19):** more, finish, want, bath, book, sad, scared, hurt, tired, love, baby, friend, play, ball, help, stop, careful, wait, shoes
**One-handed (24):** eat, drink, milk, water, hungry, brush, bed, sleep, ily, happy, mad, mom, dad, grandma, grandpa, dog, please, thanks, sorry, yes, no, hot, come, potty

| id | hands | shape (any) | at | ref | move (any) |
|---|---|---|---|---|---|
| [[EAT]] (`eat`) | 1 | flatO | mouth | tips | repeat |
| [[DRINK]] (`drink`) | 1 | C, claw | mouth | center | any |
| [[MILK]] (`milk`) | 1 | fist, C, claw | body | center | squeeze |
| [[WATER]] (`water`) | 1 | W, flat | chin | index | repeat |
| [[MORE]] (`more`) | 2 | flatO, fist | body | tips | repeat |
| [[ALL DONE]] (`finish`) | 2 | 5, flat | body | center | twist, shake |
| [[HUNGRY]] (`hungry`) | 1 | C, claw | chest | center | down |
| [[WANT]] (`want`) | 2 | 5, claw, flat, C | body | center | close, change |
| [[BATH]] (`bath`) | 2 | fist | chest | center | repeat |
| [[BRUSH TEETH]] (`brush`) | 1 | index | mouth | index | side, repeat |
| [[BOOK]] (`book`) | 2 | flat, 5 | body | center | change, open, twist |
| [[BED]] (`bed`) | 1 | flat, 5 | cheek | center | still |
| [[SLEEP]] (`sleep`) | 1 | 5, flat, flatO, claw | face | center | down, close |
| [[I LOVE YOU]] (`ily`) | 1 | ILY | any | center | still |
| [[HAPPY]] (`happy`) | 1 | flat, 5 | chest | center | repeat, circle |
| [[SAD]] (`sad`) | 2 | 5, flat | face | center | down |
| [[MAD]] (`mad`) | 1 | claw, 5, C | face | center | any, close |
| [[SCARED]] (`scared`) | 2 | 5, fist, claw, flat, C | chest | center | open, change |
| [[HURT]] (`hurt`) | 2 | index | any | index | repeat, twist |
| [[TIRED]] (`tired`) | 2 | flat, claw, C, 5 | chest | tips | any, change, down |
| [[LOVE]] (`love`) | 2 | fist | chest | center | still |
| [[MOM]] (`mom`) | 1 | 5, flat | chin | thumb | repeat |
| [[DAD]] (`dad`) | 1 | 5, flat | forehead | thumb | repeat |
| [[BABY]] (`baby`) | 2 | flat, 5, C | body | center | rock, side |
| [[GRANDMA]] (`grandma`) | 1 | 5, flat | chin | thumb | away, repeat |
| [[GRANDPA]] (`grandpa`) | 1 | 5, flat | forehead | thumb | away, repeat |
| [[FRIEND]] (`friend`) | 2 | index, fist, claw, C | body | index | change, twist, any |
| [[PLAY]] (`play`) | 2 | Y | body | center | shake, twist |
| [[BALL]] (`ball`) | 2 | C, claw, flatO | body | tips | repeat |
| [[DOG]] (`dog`) | 1 | flat, 5, flatO, fist, two, index | body | center | any |
| [[HELP]] (`help`) | 2 | thumbsup, fist, flat, 5 | body | center | up |
| [[PLEASE]] (`please`) | 1 | flat, 5 | chest | center | circle, repeat |
| [[THANK YOU]] (`thanks`) | 1 | flat, 5 | chin | tips | away, down |
| [[SORRY]] (`sorry`) | 1 | fist, thumbsup | chest | center | circle, repeat |
| [[YES]] (`yes`) | 1 | fist | body | center | repeat |
| [[NO]] (`no`) | 1 | two, flatO, index | body | tips | squeeze, repeat, close |
| [[STOP]] (`stop`) | 2 | flat, 5 | body | center | down |
| [[HOT]] (`hot`) | 1 | claw, C, 5 | mouth | center | away, down, twist |
| [[CAREFUL]] (`careful`) | 2 | two, index | body | center | repeat |
| [[WAIT]] (`wait`) | 2 | 5, flat, claw, C | body | center | any, still |
| [[COME]] (`come`) | 1 | index, fist, claw | body | index | close, any |
| [[POTTY]] (`potty`) | 1 | fist | body | center | shake, side |
| [[SHOES]] (`shoes`) | 2 | fist | body | center | repeat |

## Signs that only need a pose/place (movement can't fail)
Movement `still` is always true in `movement()`, so these never fail on motion: [[BED]], [[I LOVE YOU]], [[LOVE]], [[WAIT]].

## Signs with no location requirement (`at:"any"`)
[[I LOVE YOU]], [[HURT]]
