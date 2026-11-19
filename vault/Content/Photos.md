# Pictures (sign, letter and number drawings)

Since 2026-11-18 every sign, letter and number has a black line drawing in one style, stored in the app (no internet needed):

- `img/signs/<sign id>.svg`: the 43 signs, plus `you`, `home`, `soon` (only in phrases). FINISH in the phrases uses `finish.svg` (the ALL DONE picture).
- `img/abc/<letter id>.svg` (a to z) and `img/abc/n1.svg` ... `n10.svg`.
- Source: the team's "ASL Sign Illustration Collection" PDF (generated images). The two overview sheets were cut into tiles, the labels removed, and each tile traced to SVG (potrace), so they stay sharp at any size. Signs come from overview sheet 2; letters and numbers from overview sheet 1 (larger tiles, same style).
- `js/signs.js`: `signPic(id)`, `abcPic(x)`, `HANDSHAPE_DRAWINGS` (handshape -> letter/number/sign picture: A C K S T W Y letters, Flat = B, 5 (open) = 5, Index = 1, ILY = I LOVE YOU; Claw and Flat-O have none), `PHRASE_PICS`.
- Shown in: lesson Watch frame, sign-guide cards, Today's real moment, the phrase rows (`phraseStrip()`: one small picture per word), hints and the cheat sheet, Basics letter/number cards, Spell a word, letter practice (after "Show me the steps"), word practice (after "Show the handshapes") and the letter camera check. Not in read-and-pick questions (it would give the answer away).

**Known mismatches with the written steps** (the steps are right; the pictures need replacing): HUNGRY, SLEEP, HAPPY, SAD, HOT, CAREFUL, TIRED, BATH, BED, MOM, GRANDMA, GRANDPA, FRIEND, STOP, POTTY, SHOES, WANT, HURT. Letters and numbers look right but have not been checked by a Deaf signer.
