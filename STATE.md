# Look Up KC — Session State
_Updated: 2026-04-25 · Read this first. One screen. ~40 lines._

---

## Current version
**Cache:** `?v=18a` across 118 HTML files
**Last CSS touch:** v18 (no CSS changed today — only SVG attributes + JS)
**Last JS touch:** `js/responsive-hero.js` — three-mode aspect ratio logic (2026-04-25)

## Last shipped
- **v18f** — 18th & Vine signature scene (perspective, final polish)
- **2026-04-25 session** — xMidYMax crop fix (all 9 scene pages), fountain SVG attribute
  consistency, 18th & Vine left-side clip fix (xMinYMax slice at 641–900px)

## Top-5 Docket (priority order)
1. **v25 Crossroads Round 1** — CLEARED TO BUILD. Block-out only, 3–4 hrs.
   All decisions locked in CROSSROADS_ROUND_1_DECISIONS.md. Read that file first.
2. **18th & Vine sign accuracy** — VINE letters wrong color/proportions, missing red rule lines.
   Needs Brian's reference photo. See HANDOFF §v18 docket item #1.
3. **18th & Vine geographic pass** — Blue Room should be west of cross-street (inside district).
4. **Building alignment audit** — some 18th & Vine buildings may float/sink on sidewalk line.
   Visual pass: Brian loads page, flags offenders.
5. **Scene Gallery 18th & Vine tile** — still shows v18a composition, not final v18f.

## Known landmines
- `scripts/sync_skyline_scene.py` must be run after ANY homepage skyline SVG edit —
  it propagates changes to `neighborhoods/downtown.html`. Don't forget.
- CSS cache: bump `?v=XX` in ALL 118 HTML files whenever style.css changes.
  Grep: `style.css?v=` to find + replace. No partial bumps.
- `responsive-hero.js` covers: nichols, meyer, bacchus, pomona, volker, firefighters,
  fountain-day, midtown, vine, westbottoms SVGs. Add new scene SVGs to SELECTOR list.
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
