# Crossroads — Signature Scene Planning Brief

**Version:** v24 planning document
**Author:** Claude Code (from v24 Focus C)
**Date:** 2026-04-24
**Purpose:** Creative north star for v25's first implementation round. No code, no SVG, no CSS. Intent + composition only.

---

## 1. Scene identity in one paragraph

Crossroads is where KC's 19th-century freight-and-brick bones meet contemporary creative reuse. It's warehouses converted into galleries with the original loading-dock doors left proud; it's brick walls painted top-to-bottom with murals bigger than the buildings they sit on; it's sidewalks that are empty at lunch and packed three-deep on First Friday. The scene identity is *color against brick, crowd against quiet, new against old.* Where West Bottoms carries its industrial past as sediment (dust, basin, viaduct shadow) and 18th & Vine carries its past as music (jazz-hour lights, neon district signs, horn silhouettes), Crossroads carries its past as **canvas** — the brick walls are the medium, and everything painted on them is contemporary signal. The scene has to show that tension in a single frame.

---

## 2. POV decision

**Recommended:** Street-level looking SOUTH down Baltimore from roughly 18th Street, with the Crossroads Hotel on the right mid-ground, a dense mural wall on the left foreground, a food truck (maybe two) on the near-right sidewalk, and the Western Auto sign + downtown skyline terminating the view.

**Why this POV:**
- Puts two signature Crossroads moves in the same frame: mural wall (left FG) + contemporary hospitality/creative reuse (Crossroads Hotel right mid).
- Frames the downtown skyline at the vanishing point — visual bridge back to the homepage scene, which the site doesn't otherwise do.
- Street-level matches Brian's stated counter-axis ("dense/performative") — the viewer is *in* the crowd, not above it.
- The Western Auto sign at the deep vanishing point ties Crossroads back to a recognizable KC landmark and gives the perspective a pull.

**Rejected alternatives:**
- *Looking east from 20th & Baltimore toward Grinders / the mural district:* considered, but Grinders' back patio with the string lights is hard to read at street scale without feeling like a diorama. Grinders is better as a landmark tile in the scene, not the focal point.
- *From the freight/rail bridge looking down at the district:* this would echo the v24-deferred Quality Hill looking-down pattern. Better to reserve the "looking down into" POV for Quality Hill so we don't burn it twice.
- *Pure interior First Friday crowd:* beautiful idea, but dense crowds at street scale are hard to render believably at SVG silhouette scale. Crowd energy should be suggested (figures, queues, food-truck lines) not shown as a literal mass.

**VP target:** Downtown skyline silhouette at around x=900–1000, y=290–340 in a 1600×600 viewBox. Roughly upper-center-right. Leaves room for the hotel on the right and the mural wall on the left to claim visual weight without competing with the VP.

**Foreground height budget:** Murals on the left FG should reach y=280 or higher (tall building walls). Street and sidewalk occupy the bottom ~180u. Buildings on the right (Crossroads Hotel + mid-ground commercial) occupy y=240–480 with the signature signage on their upper floors.

---

## 3. TOD target

**Recommended:** **First Friday evening** — roughly 30 minutes after sunset on a warm summer night. Sky is deep dusk-blue, mural walls catch some residual warmth plus gallery spill-light, string lights are active, food-truck windows glow warm, gallery storefronts are lit, streetcar headlight visible.

**Why:**
- Crossroads' identity peaks on First Fridays. Rendering it at anything else is rendering an adjacent neighborhood.
- Dusk → night transition is the TOD where murals read MOST — the colors are still saturated enough to pop, and the gallery lights just starting to come on add the contrast that makes the scene feel like a moment.
- Gives the TOD cycle a "high peak" at dusk/night rather than the more even distribution of 18th & Vine's always-on jazz district. Different scene, different TOD emphasis.

**Fallback if First Friday evening feels too narrow:** **Golden hour** (late-afternoon warm light raking across the mural walls at a low angle). This gives full mural saturation without requiring night lighting, and lets the scene read clearly at any TOD the viewer happens to see first. The downside: less of a "moment" — more of a "pretty day in the district" — less distinctive.

**Brian decision needed:** First Friday evening (moment-specific, slightly risky) vs. Golden hour (broader appeal, less distinctive). My recommendation is First Friday evening for the signature moment, with the standard 40s TOD cycle showing the full day-night transition but with dusk/night as the visually richest phases.

---

## 4. Landmark inventory

The scene should carry 6–8 specific, recognizable Crossroads landmarks. Rough in-frame positions are suggestions; v25 will negotiate final placement during block-out.

| Landmark | Rough position | Notes |
|---|---|---|
| **Grinders / Grinders West** | Left mid-ground at ~x=200–320, y=360–460 | Converted warehouse with patio, string lights, outdoor seating implied. Gets its own mural on one wall. |
| **The Crossroads Hotel** | Right mid-ground at ~x=950–1200, y=240–480 | Contemporary brick-and-glass. Rooftop pool is the memorable feature but too small to render — instead, show a lit rooftop bar element. |
| **21c Museum Hotel** | Mid-background left at ~x=480–580, y=280–460 | Recognizable by the pair of yellow penguin sculptures (but those are interior — skip at scene scale). Use the distinctive historical facade (former Savoy building) as the recognition cue. |
| **Town Topic Hamburgers** | Foreground right at ~x=1220–1320, y=420–500 | Tiny classic diner. Small, bright, 24-hour. One of KC's most photographed buildings. Renders great at small scale. |
| **RecordBar** | Deep mid-background, left, at ~x=380–440, y=340–430 | Music venue. Signage-carrying. |
| **Rail bridge / freight-era viaduct** | Deep background at ~x=600–900, y=260–300 | The tracks that give the neighborhood its name — "the crossroads" is the rail crossroads. Signature arched bridge silhouette in the distance. Critical for identity. |
| **A specific notable mural — recommend Jacob Burmood geometric work on the Western Ave wall** | Left FG at ~x=60–280, y=280–500 | A real painted wall (abstracted, not copied). Large-scale geometric work. |
| **Streetcar extension** | Crossing the foreground at y=470–500 | KC Streetcar Main Street extension runs through Crossroads. One streetcar mid-cycle in the scene. |

**Brian decision needed:** any of these landmarks to swap or add? Notable omissions worth considering: **Lulu's Noodles** (iconic but small), **Screenland Armour** (cinema, great signage), **Charlie Hustle Brand** (merchandise, but not a physical landmark worth drawing). Town Pavilion and One KC Place are visible from Crossroads and could terminate the VP distance — might be worth including to create the visual bridge to the homepage.

---

## 5. Palette

Crossroads' palette is **warm brick + saturated pops.**

**Primary base:**
- Brick warm: #A04A2A (existing scene palette — same vocabulary as the basin rail row + West Bottoms warehouses)
- Limestone: warmer than West Bottoms' industrial gray (#B8A885 or similar)
- Asphalt/street: #2A2620 (same as the UYA lot palette we shipped in Focus A)

**Mural color pops** (saturated, contemporary, FIVE SLOTS):
- **Teal/cyan:** #00A5B5 — contemporary-cool, reads as "new against old"
- **Hot orange:** #E55934 — contrasts against brick warmth, pops at dusk
- **Mustard:** #E8B830 — period-nostalgic warmth, shared vocabulary with existing scenes
- **Magenta:** #C84A8E — contemporary-signal, less-used in existing scenes
- **Cobalt:** #2958B5 — contrasts with both brick and murals

**Night accents:**
- String lights: warm cream #F5E9D3 (shared with homepage + 18th & Vine)
- Gallery spill: warm peach #E8C89A
- Food truck cook-light: warm amber #E8B830

**Palette differentiation from other scenes:**
- **18th & Vine** is saturated but the saturation lives in SIGNS (neon red/green/blue district sign, fluorescent Blue Room panels, chase bulbs). Crossroads puts saturation in WALLS — murals dominate.
- **West Bottoms** is desaturated warm-brown + steel gunmetal + limestone. Crossroads borrows the brick but reverses the signal — Crossroads' brick is the *base* that lets the saturation pop, where West Bottoms' brick is the *event*.
- **Midtown** is mixed character (Plaza cream + Art Deco + residential). Crossroads is tighter in identity — it's the mural scene.

---

## 6. Signature color-pop mural plan

3–5 painted walls in-scene, abstracted (not literal reproductions). Each mural should be visibly different in motif category so the scene reads as "a neighborhood full of art" rather than "one artist's portfolio."

| Mural slot | Wall | Motif category | Palette | Abstracted reference |
|---|---|---|---|---|
| **M1 — Left FG primary** | Tall brick wall, 60–200u wide × 220u tall | **Abstract geometric** — large triangular/hexagonal interlocks, scale dominates | Teal + hot orange + mustard | Jacob Burmood-inspired, Western Ave wall |
| **M2 — Left mid (Grinders wall)** | Med brick wall, 80u × 120u | **Typographic** — oversized letter forms (abstract, not full words) spelling out character: "&" or "KC" or decorative ligature | Cobalt on cream | Imagine "A" or "&" as a shape sculpture |
| **M3 — Right mid (Crossroads Hotel side wall)** | Wide brick wall, 120u × 100u | **Figurative** — silhouettes of musicians / dancers / workers in warm tones against dark backer | Hot orange + magenta + cream | Street art figurative style |
| **M4 — Background alley strip** | Narrow band visible between buildings, 30u × 80u | **Nature** — abstract plant/flower forms, green + magenta | Greens + magenta + mustard | Rooftop garden mural vibe |
| **M5 — Deep background (distant, low-contrast)** | Tiny wall, 40u × 40u at low contrast | **Abstract painting** — wash of colors, legibility sacrificed for depth | All 5 pop colors blended | Implies "there are MORE murals beyond the frame" |

**Renders-at-scene-scale test:** at 1600px-wide scene downscaled to 800px, each mural should be at least 15px tall in the rendered viewport. M1 (tall) will dominate. M5 (deep) is a whisper.

---

## 7. Energy-level plan

Brian's framing: *dense/performative.* Achieved through accumulation of cues, not one loud element.

**Crowd density:**
- 8–12 pedestrian silhouettes distributed along the sidewalk + crosswalk + food-truck line. Not a single blob — clusters of 1–3, gaps between clusters. Walkers + static figures mixed.
- A queue of 3–5 people at a specific food truck (makes the truck feel like a destination).
- 2 figures seated at Grinders' outdoor patio.
- 1 street musician on the corner of the streetcar stop.

**Signage density:**
- Storefront sign at every building face that's visible (Grinders logo, RecordBar sign, Town Topic marquee, gallery window painted letters, Crossroads Hotel brand mark).
- Gallery window stickers implied via small rectangles with varied colors.
- A-frame sidewalk signs on 2–3 sidewalks ("FIRST FRIDAY" with an arrow, "OPEN", "CLOSED" etc — abstract, not legible at scene scale but present as shapes).

**Light sources:**
- Gallery windows warm-glowing at dusk/night (cream fills).
- String lights strung across the Grinders patio (reuse the `.pl-bulb-twinkle` pattern from Plaza Lights).
- Food truck order windows glow warm amber at dusk.
- 4 streetlamps of the KC mid-century Art Deco type, warm halos at night.
- A single gallery projector throwing light onto a wall implied by a bright rectangle on an otherwise dim building face.

**Street life:**
- 1 KC Streetcar crossing the foreground once per cycle (28s loop at most) — reuse the existing streetcar grammar from the homepage.
- 2 parked cars on the street.
- 1 bicycle locked to a sign post (tiny, but it's the kind of detail that reads as "people live here").
- 1 dog on a leash somewhere (humanity cue).

**No jammers.** Crossroads isn't late-night jazz. The crowd is earlier-evening gallery-goer + food-seeker, not 2am musicians with instrument cases. Keep the walker silhouettes VARIED in coat color (use the existing `.walker-coat-A..F` palette) but read as daytime-evening, not post-midnight.

---

## 8. Animation plan

**Always-on ambient (no TOD gating):**
- Streetcar crossing foreground — 28s cycle, one per loop
- A single car westbound on Baltimore — 38s cycle
- Gentle cloud drift in the sky — 180s cycle, 1–2 clouds
- Bird flock at dawn/day only — reuse homepage flock vocabulary

**TOD-gated (dusk/night):**
- Gallery window glows fade in at dusk, full at night (reuse `night-lights-visibility` keyframe)
- String lights twinkle at dusk + night (reuse `pl-bulb-twinkle`)
- Food truck cook-light glow (amber, steady, night-only)
- Streetlamp halos
- Neon storefront signs (Town Topic is the iconic one — red neon on white-tiled walls)

**Dusk-specific small moments:**
- Food truck steam puffs (reuse West Bottoms' `westbottoms-steam-rise` pattern)
- One plant-pot lamp flicker on a gallery patio (tiny, specific detail — the kind of thing you'd notice only if you're really looking)

**DO NOT animate:**
- Walker figures (keep static) — except 1–2 trail-followers moving along the sidewalk in keeping with 18th & Vine's jammer walker pattern. Don't add 10 moving walkers; the scene is dense with stills, not moving chaos.
- The mural itself. Murals should be fully saturated and STILL. Any animation on the murals would feel like cheese. The murals are the anchors; the scene moves around them.

---

## 9. Risks & open questions

**Risks where this scene could go wrong:**

1. **Mural abstraction vs. recognition tension.** Real Crossroads murals are specific artistic works. If we render them too literally, we risk copyright discomfort and loss of charm. If we abstract too far, the scene reads as "generic street art" and loses Crossroads' specific identity. **Mitigation:** match abstraction level to what Brian did for the Negro Leagues Museum (recognizable enough to point-and-name, abstracted enough that no single artist is copied).

2. **Street-level POV feels cramped on mobile.** 1600×600 viewBox cropped to 375px wide mobile viewport will clip hard on both sides. The mural wall + hotel sides might both get lost. **Mitigation:** V25 round 1 block-out should render both mobile meet-mode AND desktop slice-mode, and place the key landmarks within the mobile-visible inner range.

3. **Downtown skyline at the VP risks looking like the homepage.** If the distant buildings read as "the homepage skyline, smaller" then the scene feels derivative. **Mitigation:** use mid-height buildings at the VP (not the full homepage skyline roster), emphasize 2–3 specific ones (Commerce Tower + P&L), keep opacity low enough to read as "distant".

4. **Crowd density is hard to get right.** Too few walkers and the scene feels empty. Too many and it looks cartoonish. Brian's 18th & Vine jammer count (~19) lands about right for "dense background crowd." For Crossroads' street-level POV, probably 8–12 walkers + 3–5 food truck queue is the density target.

5. **First Friday evening TOD is NARROW.** The scene looks strongest for ~8 of the 40 TOD cycle seconds. Rest of the cycle, it's just "a warehouse district." **Mitigation:** accept this — the peak moment is the whole point. Add golden-hour as a secondary strong moment (murals catch warm raking light).

**Open questions for Brian before v25 round 1:**

1. **POV:** approve street-level looking south down Baltimore?
2. **TOD:** First Friday evening (narrow, distinctive) vs. golden hour (broad, less peak)?
3. **Landmarks:** list above acceptable? Any swaps?
4. **Mural slot #2 typographic character:** "&" glyph, "KC" treatment, or leave as purely visual?
5. **Downtown skyline at VP:** yes or no? (Creates visual bridge to homepage but risks feeling derivative.)
6. **Container height:** match 18th & Vine's 560px or go taller (640px+) to let murals breathe?

---

## 10. Phased build plan

If Crossroads gets **3 rounds** across v25 / v26 / v27, here's a workable phasing:

### Round 1 — Block-out (v25)

**Goal:** composition validation. Crude shapes, no detail. Brian + Code align on what goes where.

- TOD backdrop (4 layers, canonical 40s cycle)
- Street pavement polygon with VP
- 3 foreground building rectangles (Grinders, Crossroads Hotel, Town Topic) with placeholder labels
- 1 deep building silhouette at VP
- Streetcar on track at foreground
- 5 placeholder murals as flat color rectangles (no motifs yet)
- Sky + 1 cloud
- 2 streetlamps
- 5 walker silhouettes (reusing `.hill-walker` + `.walker-coat-A..F`)
- Scene hero wrapper (canonical `.crossroads-hero-scene` + overlay + caption)
- Scene Gallery tile on homepage (reuse existing tile grammar, add Crossroads tile)

Budget: 3–4 hours. Brian reviews and redirects BEFORE round 2 commits to detail.

### Round 2 — Detail (v26)

**Goal:** architectural character on foreground + mural rendering + landmark recognition.

- Detailed building facades (brick courses, windows, cornices, signage, storefronts)
- Actual mural motifs abstracted (the 5 mural slots get their patterns)
- Landmark signage (Grinders, Town Topic, RecordBar, Crossroads Hotel brand mark)
- Gallery storefronts with painted-letter window stickers
- Food truck with cook window + steam
- Rail bridge silhouette at deep background
- String lights across Grinders patio
- A-frame sidewalk signs, streetlamp fixtures
- Night-gated light vocabulary (gallery windows, food truck glow, streetlamp halos, mural wall washers)

Budget: 4–5 hours. Brian reviews and redirects.

### Round 3 — Polish (v27)

**Goal:** density + life + ambient animation + small surprises.

- 8–12 walker silhouettes distributed correctly (clusters, not spread)
- Food truck queue (3–5 figures)
- Street musician on corner
- Patio seated figures at Grinders
- Bicycle locked to signpost, dog on leash
- Plane overhead (reuse homepage banner plane vocabulary — maybe it says "FIRST FRIDAY" on the banner?)
- Bird flock at dawn/day
- Streetcar + car animations tuned
- Cache bump + HANDOFF append
- Crossroads as a permanent stop on the nav + Scene Gallery

Budget: 2–3 hours. Ship.

**Total across 3 rounds: 9–12 hours.** That's roughly 3 sessions at Brian's usual budget.

---

## Appendix — what NOT to do

- Don't copy any single mural artist's work. Abstract or invent.
- Don't render First Friday as a literal First Friday event (no "FIRST FRIDAY" banner at the hero). Let it be suggested through lighting, crowd density, and atmosphere.
- Don't use a perspective view more aggressive than 18th & Vine's. Crossroads is STREET-LEVEL but the perspective should be GENTLE — 1-point perspective with a long depth, not a dramatic fisheye.
- Don't try to cram all 8 landmarks into one frame. 5–6 is plenty. Frame composition > completeness.
- Don't add jammers / music notes / food-cart vendors that are 18th & Vine signature moves. Crossroads' signature moves are MURALS + GALLERY LIGHTS + STREETCAR + FOOD TRUCKS. Different vocabulary, different neighborhood.
- Don't build the scene at the SAME container height (560px) as 18th & Vine + Midtown unless the composition justifies it. Crossroads might benefit from slightly taller (640px) to let mural walls breathe. Review during round 1.
- Don't wire the Scene Gallery tile for Crossroads until the scene is through round 2. A tile based on round 1 block-out would be stale.

---

**End of Crossroads planning brief.**
