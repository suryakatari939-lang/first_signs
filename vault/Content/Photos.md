# Photos

Real sign and handshape photos come from Wikimedia Commons (category "American Sign Language"), defined in `js/signs.js`:

- `SIGN_PHOTOS`: photos on sign cards for EAT, DRINK, WANT, I LOVE YOU, THANK YOU (start position).
- `HANDSHAPE_PHOTOS`: photos in the Routines tab's handshape cheat sheet (no photo yet for W and T).

`photo()` in `js/app.js` loads each image through `Special:FilePath` and links to its Commons file page, which lists author and license. Images load from the internet, so offline the figure removes itself.

Not yet checked: each file's license and author, and whether every photo matches the sign exactly (files were chosen by their handshape@location names). Verify before the competition and add credits to the documentation.
