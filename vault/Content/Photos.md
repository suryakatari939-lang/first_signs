# Pictures (handshape drawings)

Since 2026-11-18 the app shows **line drawings of handshapes only, no photos of people** (Ramani's request). Defined in `js/signs.js`:

- `HANDSHAPE_DRAWINGS`: drawings from the public-domain "Sign language X.svg" manual alphabet on Wikimedia Commons, loaded through `Special:FilePath` (need internet; offline the figure removes itself). Used: A, C, K, S, T, W, Y, and B for `Flat`. Ramani asked for pictures from that site only (no drawings made for the app), and the series has nothing for `5 (open)`, `Claw`, `Flat-O`, `ILY` or `Index`, so signs with those handshapes show the written steps without a picture.
- `drawingFor(s)` in `js/app.js` picks the drawing of a sign's first handshape (`signShapes(s)[0]`). It is used in the lesson **Watch** frame, on sign-guide cards, in the Learn "Today's real moment" card, in hints and in the Practice cheat sheet.
- `photoSrc(file)` turns a Commons file name into a `Special:FilePath` URL.
- All drawings sit in white boxes with a thin border (`.photo.drawing img`, `.lframe`, `.sotd-word`).

The drawings show the handshape, not the whole sign (location and movement are in the written steps). The old `SIGN_PHOTOS` (EAT, DRINK, WANT, I LOVE YOU, THANK YOU) and the photo versions of the handshapes were removed. Credits are in `README.md` under "Picture credits".
