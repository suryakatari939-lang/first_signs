---
type: camera
tags: [camera, zones, landmarks]
---
# Zones and Body Landmarks

Implemented in `readBody`, `inZone`, `whereIs` (`js/camera.js:53–104`). All coordinates in **pixels** of the video frame. **`F`** = face width (the unit for every distance threshold, so it works at any camera distance).

## `readBody(results, W, H)`
Returns `null` if neither face nor pose landmarks exist.

**With face landmarks (MediaPipe FaceMesh indices):**
- `mouth` = mean of landmarks 13 and 14 (inner lips)
- `chin` = 152, `forehead` = 151
- `cheeks` = [50, 280]
- `F` = distance between 234 and 454 (face sides)
- `box` = bounding box of *all* face landmarks

**Fallback with pose only** (face not found): eyes = mean of pose 2 & 5, mouth = mean of pose 9 & 10, `F` = distance between ears (7, 8); `chin = mouth + 0.7 * (mouth − eyes)`, `forehead = eyes − 0.6 * (mouth − eyes)`, cheeks = mean(ear, mouth) per side, box from ears and forehead/chin.

**Shoulders:** pose 11 & 12 if both `visibility > 0.4`; otherwise estimated at `chin.y + 0.9F`, `chin.x ± F`.

## `inZone(pt, zone, B)` thresholds (all × F)
| Zone | Test |
|---|---|
| `mouth` | within 0.6 of mouth |
| `chin` | within 0.6 of chin **or** within 0.35 of mouth |
| `forehead` | within 0.65 of forehead |
| `cheek` | within 0.65 of either cheek |
| `face` | inside face box expanded by 0.35 on all sides |
| `chest` | `y` between `chin.y + 0.15` and `shoulderY + 2`, `x` within shoulder span ± 0.5 |
| `body` | `y > chin.y − 0.3` (anything from chin level down) |
| `any` (default) | always true |

## `whereIs(pt, B)` — best name for feedback
Nearest of mouth / chin / forehead / cheek(L) / cheek(R); if within 0.6F return it; else `face` if in face zone; else `chest` if in chest zone; else `body`. Used for the live line and "Your hand was <where>" feedback. (`whereIs` never returns `any`.)

## Overlay guide (`draw`)
For `target.at` ∈ mouth/chin/forehead/cheek: dashed circle radius 0.5F at that anchor (for `cheek`, only the *second* cheek point `cheeks[1]`). `chest`: rectangle from shoulders. `face`: face box. `body` and `any`: no guide.

## Which hand point is tested
`CHECKS[id].ref` chooses: `tips` (mean of thumb/index/middle tips), `index` (tip 8), `thumb` (tip 4), `center` (mean of wrist + 4 knuckles: 0,5,9,13,17). See [[CHECKS Format]].

Back to [[Camera Coach Overview]].
