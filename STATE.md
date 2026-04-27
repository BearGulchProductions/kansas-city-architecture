# Look Up KC — Session State
_Updated: 2026-04-25 · Read this first. One screen. ~40 lines._

---

## Current version
**Cache:** `?v=25b` across 125 HTML files (Crossroads Round 1 block-out + detail work)
**Script cache:** `?v=17e` on all HTML files that load `responsive-hero.js`
**Last CSS touch:** v25 (Crossroads hero scene styles added)
**Last JS touch:** `js/responsive-hero.js` v17e — `.crossroads-hero-svg` added to SELECTOR list
**Last SVG touch:** Crossroads building detail pass (2026-04-26): 8 buildings detailed, Southwest Boulevard geometry initiated

## Last shipped
- **v18f** — 18th & Vine signature scene (perspective, final polish)
- **2026-04-25 session** — xMidYMax crop fix (all 9 scene pages), fountain SVG attribute
  consistency, 18th & Vine left-side clip fix (xMinYMax slice at 641–900px)
- **2026-04-26 session (early)** — mobile gap fix (v17e JS): removed `xMidYMid meet` on mobile,
  all breakpoints now use `slice` so sky backdrop never letterboxes. 18th & Vine uses
  `xMinYMax slice` on mobile+medium to keep Parker Memorial in frame. Midtown tower beacon 
  fix: transform `translate(93,93) scale(0.9,0.77)` clears clipping at 1920px.
- **v25 (2026-04-26 session early)** — Crossroads Round 1 block-out complete: full SVG scene
  in `neighborhoods/crossroads.html` (13 elements). CSS styles added. Scene Gallery
  tile added to homepage (tile 7 of 7). Cache bumped to ?v=25b across 125 HTML files.
  CROSSROADS_ROUND_1_DECISIONS.md Q1 corrected: north-facing.
- **v26 (2026-04-26 session late)** — Crossroads Round 2 building detail: Town Topic (marquee 
  sign structure), Grinders (brick coursework + loading doors), TWA (window grid + rocket detail), 
  RecordBar (blank brick + signage), Crossroads Hotel (extensive window grid), 21c Museum 
  (ornamental cornice + arched windows), Kauffman (glass facade + TWO iconic curved shells), 
  Bartle Hall (spire count 5→4). Southwest Boulevard road geometry initiated (diagonal triangle, 
  needs crosswalk endpoint refinement). No cache bump yet — work in progress.

## Top-5 Docket (priority order)
1. ~~**v25 Crossroads Round 1**~~ — DONE (2026-04-26). Scene live at neighborhoods/crossroads.html.
   Brian reviews → calls adjustments → Round 2 detail begins per NEXT_SESSION_PLAN.md.
2. **18th & Vine sign accuracy** — VINE letters wrong color/proportions, missing red rule lines.
   Needs Brian's reference photo. See HANDOFF §v18 docket item #1.
3. **18th & Vine geographic pass** — Blue Room should be west of cross-street (inside district).
4. **Building alignment audit** — some 18th & Vine buildings may float/sink on sidewalk line.
   Visual pass: Brian loads page, flags offenders.
5. ~~**Scene Gallery 18th & Vine tile**~~ — DONE (v19, updated in a prior session).

## Known landmines
- `scripts/sync_skyline_scene.py` must be run after ANY homepage skyline SVG edit —
  it propagates changes to `neighborhoods/downtown.html`. Don't forget.
- CSS cache: bump `?v=XX` in ALL 118 HTML files whenever style.css changes.
  Grep: `style.css?v=` to find + replace. No partial bumps.
- `responsive-hero.js` (v17e) covers: nichols, meyer, bacchus, pomona, volker, firefighters,
  fountain-day, midtown, vine, westbottoms SVGs. All breakpoints use `slice` (no `meet`).
  18th & Vine gets `xMinYMax` on mobile+medium; all others get `xMidYMax`. Add new scene
  SVGs to SELECTOR list AND add `?v=17e` script tag to the new HTML page.
- 18th & Vine VP is at (810, 340) — different from v18a's (1000, 360). Don't confuse them.
- Marriott mask uses local coord space (maskUnits="userSpaceOnUse"). If touching Marriott,
  see HANDOFF §v13 refinement pass #2 for the coord-space trap.
- Town Pavilion is hidden off-canvas (translate −4000). Not a bug.

## HANDOFF section pointers (for deep dives)
| Topic | HANDOFF section |
|---|---|
| Homepage skyline full spec | §Homepage skyline hero + §v14 |
| Nichols fountain scene | §v15 |
| Meyer / Bacchus / Pomona / Volker / Firefighters | §v15.2–v15.4 |
| Midtown scene | §v16c + §v17 |
| 18th & Vine scene (full history) | §v18 + §v18b–v18f |
| Crossroads planning | CROSSROADS_PLANNING_v24.md §10 + appendix |
| Crossroads decisions (v25 scope) | CROSSROADS_ROUND_1_DECISIONS.md |

## GitHub
Repo: `BearGulchProductions/kansas-city-architecture`
Pages URL: `https://beargulchproductions.github.io/kansas-city-architecture/`
(Pages may need enabling in repo Settings → Pages → Deploy from main / root)

---
_Append a dated update block at the end of each session. Don't rewrite — append._
