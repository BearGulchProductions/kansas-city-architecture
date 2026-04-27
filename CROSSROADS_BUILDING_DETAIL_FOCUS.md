# Crossroads Scene — Building Detail & Realism Pass

**Session Focus:** Improve building facade authenticity and visual depth. Positioning iteration continues; models remain moveable.

**Date:** 2026-04-26  
**SVG File:** `neighborhoods/crossroads.html` (`.crossroads-hero-svg`)  
**Reference Planning:** `CROSSROADS_PLANNING_v24.md` (landmark inventory, palette, mural plan, energy cues)  
**Positioning Doc:** `CROSSROADS_ROUND_2_GEOGRAPHY.md` (POV lock notes; Brian has validated placement is solid enough to move forward)

---

## Where We Are

✓ **Positioning:** North-facing POV (looking up Baltimore from 20th-21st) is locked in. Kauffman left, Western Auto right-background becoming hidden, downtown skyline at vanishing point, street-level crowd energy. Quick adjustments made this Cowork round brought composition into alignment. **Status: solid enough for detail work.**

✓ **Block-out:** Basic building silhouettes are in place.

🔄 **Next:** Building facades, detail, realism, visual hierarchy.

---

## What "Building Detail & Realism" Means This Round

Not "perfect photorealism" — this is still a stylized SVG scene. But moving from placeholder geometry to:

1. **Brick coursework & material variation** — buildings should read as brick warehouses, not plain rectangles
2. **Window grids** — varied window patterns (small warehouse windows, larger storefront glazing, rooftop rhythm variations)
3. **Signage that reads** — iconic building signs (Grinders logo area, RecordBar name, Town Topic marquee text)
4. **Architectural features** — loading dock doors, cornices, roofline complexity, material transitions
5. **Depth layering** — foreground buildings richer detail, mid-ground simplified, background silhouette-only (matches pattern from 18th & Vine)
6. **Light/shadow articulation** — subtle shading to clarify depth and material (brick tone variation, window glass reflection hints)

---

## Quick Audit: Which Buildings Need Detail Work?

Check the current `.crossroads-hero-svg` and note status of each landmark:

| Landmark | Location in SVG | Current detail level | Priority | Notes |
|---|---|---|---|---|
| **Grinders / Grinders West** | Left mid-ground (~x=200–320) | ? | HIGH | Converted warehouse + patio area implied; should show loading doors or distinctive facade |
| **21c Museum Hotel** | Mid-background left (~x=480–580) | ? | HIGH | Former Savoy building; distinctive historical facade is the hook |
| **Crossroads Hotel** | Right mid-ground (~x=950–1200) | ? | HIGH | Contemporary brick-glass; rooftop bar element; Crossroads brand mark visible |
| **Town Topic Hamburgers** | Foreground right (~x=1220–1320) | ? | MEDIUM | Tiny diner, iconic silhouette; renders great at small scale; red neon marquee text |
| **RecordBar** | Deep mid-background left (~x=380–440) | ? | MEDIUM | Music venue; signage-carrying (store name legible) |
| **Rail bridge / freight viaduct** | Deep background (~x=600–900) | ? | MEDIUM | Arched silhouette; critical for "crossroads" identity (rail crossroads) |
| **Mural walls** | Various positions | ? | HIGH | 5 mural slots planned; abstracted motifs, not literal reproductions |
| **Streetcar** | Crossing foreground | ? | MEDIUM | KC Main Street extension; one unit mid-cycle |

**Task:** Inspect current SVG and fill in "Current detail level" column. What's there already? What's missing?

---

## Building Detail Pattern Reference

Check these existing scene pages for the detail approach we're using site-wide:

- **18th & Vine:** Medium-depth building treatment. Charlie Parker bust plinth, Blue Room neon panels, Paseo YMCA castle crenellations, brick wall texture on Jazz Museum, window grids on mid-ground buildings. Foreground gets articulation; background is silhouette.
- **West Bottoms:** Warehouse detail treatment. Brick loading dock doors, horizontal coursework, simple window patterns, roofline rhythm. Heavy rust/sediment atmosphere.
- **Midtown:** Mixed character (Plaza cream + residential). One Park Place glass slab, Katz neon rooftop, Uptown vertical marquee, Nelson-Atkins colonnade.

**Crossroads should land somewhere between 18th & Vine's mural-focused energy and West Bottoms' warehouse authenticity.**

---

## Specific Detail Priorities for This Session

### Priority 1: Establish Brick & Window Grammar

- **Foreground buildings (Town Topic, near mural walls):** Full brick coursework (horizontal lines at regular intervals), distinct window mullions (small panes or grid pattern), door openings with shadow depth
- **Mid-ground buildings (Grinders, Crossroads Hotel):** Simplified coursework (every 3rd–5th course implied), larger window grid (fewer, bigger panes), signage-readable rooflines
- **Background buildings (RecordBar, 21c):** Minimal coursework suggestion, window grid hinted (small), silhouette-first

**Palette reference:** Brick warm #A04A2A (base), highlight #B8A885 (stone/light brick), shadow #6B2F1F (deep brick shadow)

### Priority 2: Iconic Signage (Legible at Scene Scale)

- **Town Topic:** Red neon marquee text — keep it clean, readable. "TOWN TOPIC" or abbreviation "T T" in classic diner neon style
- **Grinders:** Logo/signage area on building face — doesn't have to be exact, but "GRINDERS" should be parseable if someone's looking for it
- **RecordBar:** Building face signage showing the venue name — music-forward aesthetic
- **Crossroads Hotel:** Brand mark or signage readable on upper building face — contemporary, not nostalgic

**Note:** Signage should feel *integrated* (painted/affixed to building), not floating on top. Use SVG `<text>` or shaped letter-forms embedded in the facade.

### Priority 3: Architectural Distinctiveness

- **Grinders:** Show converted-warehouse character — loading dock doors proud, brick honest, maybe a patio cornice or awning suggestion
- **21c Museum Hotel:** Historical facade recognition (former Savoy building character) — ornamental cornice detail, arched window pattern suggests early 1900s commercial
- **Crossroads Hotel:** Contemporary feel — clean lines, glass + brick mix, rooftop-bar silhouette (even if small, it should read as occupied/lit at dusk)
- **Town Topic:** Iconic diner silhouette — corner entry, large front windows, tiny scale that reads as "beloved neighborhood anchor"
- **RecordBar:** Music venue aesthetic — blank brick wall with bold signage (the wall IS the statement)

### Priority 4: Depth Articulation Through Light/Shadow

- **Foreground buildings (Town Topic):** Shadows on window recesses, brick-to-brick shadow lines, door frame depth
- **Mid-ground (Grinders, hotel):** Subtle shading on upper floors, window glass tone variation (lit vs. unlit suggestions)
- **Background (RecordBar, rail bridge):** Silhouette-primary; minimal internal shading; suggest distance through opacity reduction

**Technique reference:** Check 18th & Vine's shading approach on the Paseo YMCA and Blue Room neon panels. Similar depth cues should work here.

---

## Mural Walls — Context & Approach

Five mural slots are planned in the composition (see `CROSSROADS_PLANNING_v24.md` §6 for full spec). This session: ensure mural placement is secure and initial abstraction is locked.

| Mural | Wall position | Motif | Palette | Status |
|---|---|---|---|---|
| **M1 — Left FG primary** | Tall brick wall, ~60–200u wide × 220u tall | Abstract geometric (triangular/hexagonal interlocks) | Teal + hot orange + mustard | ? |
| **M2 — Left mid** | Grinders wall, ~80u × 120u | Typographic (oversized letters: "&" or decorative) | Cobalt on cream | ? |
| **M3 — Right mid** | Crossroads Hotel side wall, ~120u × 100u | Figurative (silhouettes: musicians/dancers/workers) | Hot orange + magenta + cream | ? |
| **M4 — Background alley** | Narrow band between buildings, ~30u × 80u | Nature (abstract plant/flower forms) | Greens + magenta + mustard | ? |
| **M5 — Deep background** | Tiny wall, ~40u × 40u (low contrast) | Abstract color wash | All 5 pop colors blended | ? |

**Questions for Brian:**
- Are the mural positions locked, or do they need fine-tuning based on building placement?
- Is M2 the "&" glyph, "KC" treatment, or purely visual shapes? (See `CROSSROADS_PLANNING_v24.md` §9, open question #4)
- Should murals have fine detail (brush strokes, pattern density) or stay bold/flat? (Recommendation: bold/flat so they read at small scale and don't compete with building detail)

---

## Crowd & Street Life Density

Current planning calls for:

- **8–12 pedestrian silhouettes** along sidewalk/crosswalk/food-truck line (clusters of 1–3, gaps between)
- **Food truck queue:** 3–5 figures (makes the truck feel like a destination)
- **Grinders patio:** 2 figures seated
- **Corner musician:** 1 figure at streetcar stop
- **2 parked cars** on street
- **1 bicycle** locked to sign post (tiny detail)
- **1 dog** on leash (humanity cue)
- **Streetcar crossing foreground:** 1 KC Streetcar unit per 28s cycle

**Audit:** Which of these are in the current SVG? Which are placeholders vs. detailed? Prioritize getting the core crowd figures in before adding polish details like the dog/bicycle.

---

## Animation Status Check

Reference `CROSSROADS_PLANNING_v24.md` §8. Current animation status unknown; audit SVG for:

- **Streetcar crossing** — 28s cycle, one per loop ✓/✗/? 
- **Car westbound on Baltimore** — 38s cycle ✓/✗/?
- **Cloud drift** — 180s cycle, 1–2 clouds ✓/✗/?
- **Bird flock (day/dawn only)** — reuse homepage pattern ✓/✗/?
- **Gallery window glows (dusk/night gated)** — fade in at dusk ✓/✗/?
- **String lights twinkle** — dusk/night only ✓/✗/?
- **Food truck steam puffs** — dusk only ✓/✗/?
- **Streetlamp halos** — night only ✓/✗/?
- **Neon signs** — dusk/night gated ✓/✗/?

Don't overhaul animations yet; just audit what's wired and what's missing. If animations are placeholder-level, building detail work is higher priority.

---

## Session Workflow

### Step 1: Audit Current State
- Open SVG in browser, inspect with DevTools
- Fill in the status tables above ("Current detail level," animation checkboxes)
- Screenshot if helpful: what does the scene look like right now?

### Step 2: Pick First Building (Recommend: Grinders or Town Topic)
- Decide: are we adding detail to existing shapes, or rebuilding from geometry up?
- Reference the detail pattern from 18th & Vine or West Bottoms
- Add brick coursework, window grid, loading doors, signage area

### Step 3: Iterate & Refine
- Brian reviews screenshot at mobile (640px) and desktop
- Feedback: "more detail here," "less there," "signage not reading," etc.
- Code refines

### Step 4: Roll Out Pattern
- Once one building is nailed, apply similar detail grammar to the next (different architectural style, but same depth-based approach)
- Parallelize: Code can work on building A while Brian screenshots and reviews building B placement

---

## Key CSS Classes / SVG Patterns to Reference

From existing scenes:

- **Brick color + shading:** `fill="#A04A2A"` + shadow `fill="#6B2F1F"` for depth
- **Window grid:** Use SVG `<rect>` groups with regular spacing, thin strokes for mullions
- **Signage:** `<text>` elements or path-based letter forms; ensure `font-family` and `font-size` scale predictably
- **Light/shadow:** Use opacity layers and subtle path overlays; avoid harsh black shadows (use brown shadow `#6B2F1F`)
- **Coursework:** Horizontal `<line>` elements every 10–20px (adjusts per building scale)

**Pattern example from 18th & Vine:**
```svg
<!-- Brick coursework: horizontal lines suggesting brick courses -->
<g class="brick-coursework">
  <line x1="0" y1="120" x2="300" y2="120" stroke="rgba(201,168,76,0.15)" stroke-width="0.8"/>
  <line x1="0" y1="140" x2="300" y2="140" stroke="rgba(201,168,76,0.15)" stroke-width="0.8"/>
  <!-- ... repeat at intervals ... -->
</g>

<!-- Window grid -->
<g class="window-grid">
  <rect x="20" y="40" width="30" height="35" fill="#D4A574" stroke="#6B2F1F" stroke-width="1.5"/>
  <!-- ... repeat for multi-pane windows ... -->
</g>
```

---

## Notes & Posture for Iteration

- **Positioning stays flexible:** As building detail gets added, the geometry may need fine-tuning (a more detailed building might shift by 10–20px). That's normal. Keep the SVG model move-able.
- **Detail doesn't dictate placement:** If a building looks better 30px to the left after detail work, move it. The composition is still evolving; detail work informs placement choices.
- **Murals are the anchor:** Focus detail work on the buildings; murals should be bold, high-saturation, and *static*. No animation on mural content—they're the frame that the scene dances around.
- **Mobile readability:** At 640px viewport width, the scene crops hard. Ensure key landmarks (Grinders, Crossroads Hotel, Town Topic) are still readable when the viewport is narrow. Mural walls should remain visible in mobile crop.

---

## Questions for Claude Code

1. **Current detail state:** What's in the SVG now? Can you audit and fill in the status tables above?
2. **First building to detail:** Which of the landmark buildings is in the best shape to receive detail work first? (Recommend one with clear architectural character — Grinders or Town Topic)
3. **Mural finalization:** Are the mural wall positions final, or do they need repositioning based on building placement?
4. **Signage style:** Should signage be bold/flat (reads from a distance) or detailed/dimensional (reads close)? Reference 18th & Vine's Blue Room neon for flat approach; West Bottoms' loading dock doors for structural approach.

---

## Next Steps (Likely Sequence)

1. **This session:** Audit current state, detail 1–2 flagship buildings (Grinders + Town Topic or Crossroads Hotel)
2. **Next session:** Roll out detail pattern to mid-ground buildings (RecordBar, 21c); finalize mural walls
3. **Following session:** Background elements (rail bridge articulation), crowd figures, animation pass

But stay flexible — if detail work on building A surfaces placement issues, adjust building B's position before moving forward. That's why models stay moveable.

---

**Ready to dig in? Start with the audit, then pick your first building.**
