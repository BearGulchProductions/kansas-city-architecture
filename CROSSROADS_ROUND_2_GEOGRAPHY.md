# Crossroads Round 2 — Geography Lock-In (pre-facade)

**Source:** Cowork-Opus diagnosis after Code's Round 1 → Round 2 handoff brief
**Date:** 2026-04-25
**Status:** RECOMMENDATION + open validation items. Do NOT start Round 2 facade detail until POV is locked and inventory is verified.

---

## The conflict diagnosed

The v24 planning brief §2 specified POV as **"looking SOUTH down Baltimore from roughly 18th Street."**

Code's Round 1 block-out placed Bartle Hall pylons + 21c Museum Hotel + downtown skyline at the vanishing point, and noted "Kauffman between 21c and VP." All three of those landmarks sit NORTH of 18th & Baltimore in real KC — behind the viewer in a south-facing shot. So the Round 1 layout is implicitly **north-facing** while the brief says south-facing.

This worked at block-out scale (placeholder rectangles tolerate ambiguity), but Round 2 facade detail (windows, brick courses, signage) will expose every relative-position mismatch. We need to lock POV first.

---

## Recommendation: officially flip to NORTH-facing POV

**New POV:** street-level looking NORTH up Baltimore from roughly 20th-21st Street. Gentle 1-point perspective.

### Why this is the right answer

1. **It's what Round 1 already block-out'd.** The current building positions only make geographic sense under a north-facing POV. Flipping the POV declaration aligns the spec with what's been built.
2. **The brief's intent survives.** §2 wanted "downtown skyline + Western Auto at the VP terminating the view" as a visual bridge to the homepage. North-facing genuinely puts the downtown skyline at the VP (it's actually north of Crossroads). The brief was groping toward a geographically true frame; we're just naming it correctly.
3. **Kauffman Center sits correctly LEFT.** Kauffman is at 16th & Broadway, west of Baltimore — when facing north, west is the left side of the frame. Matches Round 1.
4. **TWA Building sits correctly RIGHT.** TWA Corporate Headquarters at 1735 Baltimore is on the east side of Baltimore — when facing north, east is the right side of the frame. Matches Round 1.
5. **Bartle Hall pylons + downtown skyline at VP is geographically true.** Both are north of Crossroads at the literal vanishing point of a north-up-Baltimore view.

### Cost of the flip — what drops or relocates

- **Western Auto Sign** (21st & Grand) sits SOUTHEAST of the new POV — behind the viewer's right shoulder. Drops from this scene. Candidates for relocation: a future "East Crossroads" or "Grand Boulevard" signature scene; or an inset detail elsewhere; or use it as the primary anchor for its own scene (it's iconic enough — see Polish List addition below).
- **Crossroads Hotel** (2101 Central) sits SOUTH of 21st — behind the viewer. Drops from this scene's foreground. Consider keeping in name only as a sidewalk-level signage tease (e.g., a sign visible at the start of the frame as the viewer "leaves" the hotel walking north), but don't render the whole building.

### What stays — proposed inventory under the new POV

(Verify all addresses and viewshed via the Chat cassette below before locking.)

| Landmark | Real address | Frame position |
|---|---|---|
| Bartle Hall pylons | 13th & Wyandotte (Convention Center north expansion) | Deep VP (north), low contrast silhouette |
| Downtown skyline (2–3 towers) | Power & Light District / CBD | Deep VP, ≤30% opacity, behind pylons |
| 21c Museum Hotel | 219 W 9th St (need verification) | Mid-deep distance, slightly west of center |
| Kauffman Center | 1601 Broadway | Left mid-ground (west) |
| TWA Building (with Moonliner if applicable) | 1735 Baltimore | Right mid-ground (east) — **verify rocket location** |
| RecordBar | 1520 Grand Blvd | Right deep mid-back (east, far) |
| Grinders | 417 E 18th St | Right foreground (east, close) |
| Town Topic Hamburgers | 1900 Baltimore (need to confirm which location) | Left or right foreground depending on which Town Topic is depicted |
| Rail bridge silhouette | Various Crossroads viaducts | Deep background, thin stroke |
| KC Streetcar | Main Street alignment | Foreground crossing |
| 5 mural slots | per v24 brief §6 | Per Round 1 layout, motifs filled in Round 2 |

---

## Open validation items — Chat cassette for small-model lookup

Run this in a small-model Chat window with web search. The answers come back to this doc and feed Round 2.

===PASTE BELOW INTO CHAT===

I'm building an illustrated map of Kansas City's Crossroads Arts District for a personal site. I need real-street accuracy on landmark placements before I draw facade detail. POV is street-level looking NORTH up Baltimore Avenue from roughly 20th-21st Street.

For each landmark below, please return: confirmed street address, cardinal direction from 20th & Baltimore, and whether it would be visible in a north-facing view from that POV (yes / no / partially / behind viewer).

1. Kauffman Center for the Performing Arts
2. Bartle Hall sky pylons (the four white pylons with sky stations)
3. 21c Museum Hotel (Kansas City location specifically)
4. TWA Building / TWA Corporate Headquarters (KC, with the Moonliner rocket replica — confirm whether the rocket is at the building or at Crown Center plaza)
5. RecordBar (current location, confirm address)
6. Grinders / Grinders West
7. Town Topic Hamburgers (there are multiple locations — confirm which is in Crossroads and which is the iconic one)
8. Western Auto Sign / Western Auto Lofts
9. Crossroads Hotel
10. Power & Light Building (downtown skyline anchor)
11. Commerce Tower (downtown skyline anchor)
12. Town Pavilion (downtown skyline anchor)

Also: name 2-3 OTHER signature exterior landmarks within Crossroads (between 16th-22nd Streets, Broadway-Grand Blvd) that would be visible in a north-facing view from 20th & Baltimore and have recognizable exterior signage or massing. Examples I might be missing.

Please return the answer as a compact table I can paste into a planning doc. No prose narrative — just the data.

===END PASTE===

---

## What gets locked once Chat returns

When the small-model lookup returns:

1. Update the inventory table above with verified addresses and visibility flags
2. Drop any landmark flagged "behind viewer"
3. Add any "OTHER signature landmarks" Chat surfaces if they fit the composition
4. **Brian + Cowork lock the final inventory** before Code starts Round 2 facade work

---

## Polish List addition (drafted for separate file)

Add to `POLISH_LIST.md`: **"Western Auto Sign as future signature scene anchor"** — the Western Auto Sign + Lofts is iconic enough to anchor its own future signature scene (or a Grand Blvd-axis composition). Don't lose it just because it's geographically incompatible with the Crossroads north-facing frame.

---

## What Code can do RIGHT NOW (parallel track while geography validates)

These items are independent of Crossroads geography and don't burn cycles waiting on the lookup. Pick whichever has the cleanest plan available.

1. **Sun/moon clip-path implementation** — plan exists in HANDOFF.md (per the v18 docket). Code can read the plan and execute solo; no external validation needed.
2. **18th & Vine sign accuracy fix** — spec already exists at `SIGN_18TH_AND_VINE_SPEC.md`. Code reads spec, audits current SVG against the checklist, applies corrections. No external validation needed.

Both are "Code solo" items. Either one keeps Code productive while the Crossroads geography lookup runs.

Items that require Brian's screenshots before Code can act (queued, not parallel-track):

3. Building alignment audit on existing scenes (need Brian's screenshots flagging floaters)
4. Scene Gallery tile update to show v18f composition (need confirmation of current state)
5. Geographic arrangement on 18th & Vine — Blue Room west of cross-street (this is a separate 18th & Vine docket item; might fold into the sign accuracy pass)

---

**End of Round 2 geography lock-in doc.**
