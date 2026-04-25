# Crossroads Round 1 — Decisions Lock-in (v25 prep)

**Source:** brainstormed in Cowork using `CROSSROADS_PLANNING_v24.md` as input
**Date:** 2026-04-25
**Status:** recommendations + locked Round 1 scope; Brian to confirm 3 small overrides before Code starts v25

---

## Answers to the 6 open questions from the v24 planning brief §9

### Q1 — POV: approve street-level looking south down Baltimore?
**APPROVE.** The brief's rationale is sound: mural wall (left FG) + Crossroads Hotel (right mid) + skyline VP all in one frame, street-level matches the dense/performative axis, Western Auto pulls the eye down the line. Add one constraint: keep perspective GENTLE 1-point (per the appendix's "what NOT to do"). No fisheye, no aggressive low angle. Frame should feel like a person standing on the sidewalk.

### Q2 — TOD: First Friday evening (narrow peak) vs. golden hour (broader)?
**First Friday evening (dusk-into-night), full 40s TOD cycle running.** The narrow-peak risk (R5 in the brief) is acknowledged and acceptable — every other peak scene on the site (Plaza Lights, 18th & Vine jazz hour, Meyer Sea Horse) commits to a moment. Crossroads' identity is its dusk-night moment; rendering golden hour would render an adjacent neighborhood. Golden hour stays as a fallback only if a technical block-out problem forces it.

### Q3 — Landmark inventory: acceptable as-is, or swaps?
**Two adjustments:**
- **Add Western Auto sign to the formal inventory** at x=900–1000, y=290–340. The brief mentions it as the VP terminator but doesn't list it. It IS the VP, and it's one of KC's most iconic landmarks — promote to inventory status.
- **Keep 21c Museum Hotel.** Screenland Armour is in North KC, not the Crossroads — geographic error by Cowork. 21c IS in the Crossroads and renders via its exterior: contemporary facade, large "21c" signage, converted historic building massing. The interior penguins are irrelevant at scene scale; the building reads fine from the exterior.
- **Town Pavilion / One KC Place at VP: YES, but as low-contrast silhouettes only** — 2–3 tower forms at ≤30% opacity, behind Western Auto. Visual bridge to homepage without recreating the homepage skyline.

### Q4 — Mural slot M2 (typographic): "&" / "KC" / pure visual?
**The "&" glyph as shape sculpture.** Reasons: it's the literal "and" of the crossroads concept (subtle visual pun); it works as a 2D shape without needing legibility; it's culturally legible in KC (coffee shop logos, gallery branding); it gives the mural set typographic variety vs. M1 (geometric), M3 (figurative), M4 (nature), M5 (abstract). "KC" is too on-the-nose. Pure visual loses the typographic category.

### Q5 — Downtown skyline at VP: yes or no?
**YES, with strict constraints.** 2–3 signature towers only (Commerce Tower + Power & Light Building + Town Pavilion), ≤30% opacity, render as silhouette stroke only, NO chase-light signage at this scale. The visual bridge to the homepage scene is worth the risk. Render small enough that they read as "tower forms in haze," not "the homepage skyline relocated."

### Q6 — Container height: match 560px or go to 640?
**640px.** Crossroads is a vertical scene (mural walls reach high). 560 forces compression; 640 gives 80u more for mural top edge without compressing street life. The 18th & Vine 560 was tuned for a horizontal jazz-hour composition; Crossroads is a different shape brief. Risk: more vertical at TOD-night feels empty — fill with sky birds (dawn/day) and stars (night).

---

## Locked Round 1 build list (block-out only — no detail)

**Composition target:** 1600 × 640 viewBox · street-level looking south down Baltimore · gentle 1-point perspective · VP at x≈940, y≈320.

**Elements (block-out shapes only — flat fills, no motifs, no facade detail):**

1. TOD backdrop, 4 layers, canonical 40s cycle (sky, distant haze, mid haze, near tone)
2. Street pavement polygon converging on VP (x=940, y=320); Baltimore receding south
3. Sidewalk strips on both sides
4. Foreground building rectangles + placeholder labels:
   - Grinders (left mid, x=200–320, y=360–460)
   - Crossroads Hotel (right mid, x=950–1200, y=240–480)
   - Town Topic Hamburgers (far right FG, x=1220–1320, y=420–500)
   - Screenland Armour (left mid-back, x=480–580, y=320–460) — *replaces 21c per Q3*
   - RecordBar (deep mid-back left, x=380–440, y=340–430)
5. Deep VP elements:
   - Western Auto sign silhouette (x=900–1000, y=290–340) — block-out as flat rectangle with "WA" placeholder text
   - 2–3 downtown towers as low-contrast silhouettes behind Western Auto, ≤30% opacity
6. Rail bridge silhouette at deep background — identity-critical (the literal "crossroads" reference); include from block-out as a thin stroke
7. KC Streetcar on track at FG, y=470–500 (reuse homepage streetcar grammar)
8. 5 placeholder murals as FLAT COLOR RECTANGLES (no motifs):
   - M1 left FG, x=60–280, y=280–500, fill = teal placeholder `#00A5B5`
   - M2 left mid (Grinders side wall), x=200–320, y=380–460, fill = cobalt `#2958B5`
   - M3 right mid (Hotel side wall), x=920–1040, y=300–400, fill = hot orange `#E55934`
   - M4 background alley strip, x=560–600, y=350–420, fill = green
   - M5 deep background, x=860–900, y=360–400, fill = blended-pop placeholder
9. Sky: 1 cloud (180s drift cycle); stars at TOD-night phase
10. 2 streetlamps (KC Art Deco type, no halo yet)
11. 5 walker silhouettes (`.hill-walker` grammar, `.walker-coat-A..F` palette) distributed in clusters
12. Scene hero wrapper using canonical `.crossroads-hero-scene` + overlay + caption pattern
13. Scene Gallery tile on homepage — placeholder thumbnail only (will refresh in Round 2)

**Hard constraints — what is NOT in Round 1:**
- No mural motifs (just colored rectangles)
- No detailed building facades (just fill rectangles in brick base color)
- No animated lights (TOD backdrop animation only)
- No crowd density (5 walkers, not 10–12)
- No food truck (Round 2 element)
- No string lights (Round 2 element)
- No Town Topic neon (Round 2 element)
- No streetlamp halos (Round 2 element)

**Round 1 budget:** 3–4 hours. Brian reviews at end of Round 1, redirects before Round 2.

---

## Brian's confirmed calls (2026-04-25) — ALL LOCKED, v25 cleared to start

1. **21c Museum Hotel stays** — Screenland is North KC, not Crossroads. Geographic error corrected.
2. **640px container height** — approved.
3. **"&" glyph for M2** — approved.

All 6 open questions answered. v25 Round 1 is cleared to build.

---

## Handoff to Code (v25 Round 1 session start)

Read order:
1. **This file first** — captures all Round 1 decisions
2. `CROSSROADS_PLANNING_v24.md` §10 Round 1 build plan + the appendix "what NOT to do" list
3. Skip §1–§9 of the planning brief unless a specific question arises — the conclusions are captured here

Don't re-derive any of the 6 open questions — they're answered above.

---

**End of decisions doc.**
