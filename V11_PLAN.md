# Look Up, Kansas City — v11 Plan
## Motion, Signature Pages, and the Image Layer

*Drafted 2026-04-22 for Claude Code. Scope: homepage skyline dynamism (streetcar loop / birds / clouds / background rivers), full silhouette accuracy pass, two new toggle-driven signature pages (Plaza Lights + Fountain Day), site-wide card clickability UX, photo audit + image gap audit, and advanced-design extensions for pages without signature features.*

---

## What this batch is

Four streams of work running in parallel.

**Stream A — Skyline motion and completion.** v10/v10.1 gave us a layered atmospheric scene with a coherent time-of-day system. v11 makes it feel alive: a streetcar crosses once a loop, occasional birds arc across the sky, slow clouds drift during daytime, and the rivers get a second presence as subtle background glimmers between distant buildings to communicate their geography. Plus we finish the silhouette accuracy work v10 deferred.

**Stream B — Two new signature pages.** `plaza-lights.html` gets an SVG hero of Plaza towers with a "Turn on the lights" toggle that triggers Christmas lights and a night-sky shift. `fountains/fountain-day.html` gets an SVG hero with iconic KC fountains — toggle the fountains on (water sprays) and each fountain is clickable through to its detail page. Both pages echo the homepage's time-of-day toggle pattern but for specific KC events.

**Stream C — Images.** A systematic audit of every hero image across the site (composition, resolution, framing, object-position tuning) and a gap audit flagging pages without adequate body imagery — with suggested Wikimedia sources.

**Stream D — UX and advanced design polish.** Card clickability upgrade site-wide (entire card clickable, not just "read more"), plus a menu of advanced-design opportunities for detail pages that currently have just hero + prose (animated fountain SVGs, mini compare-heights, before/after sliders, reading-time estimates, sticky TOCs).

No new top-level nav items; two new pages slot into existing dropdowns. Site grows from ~122 to ~124 pages.

---

## Global notes for Claude Code

- Homepage SVG viewBox stays `0 0 1600 600`. New motion elements fit inside existing frame.
- Bump `style.css?v=` after CSS changes. Rsync to `/tmp/kc_site/`.
- All new animations respect `prefers-reduced-motion`. Any new state in the `@media (prefers-reduced-motion: reduce)` block should be added alongside the existing v10 master block.
- Tracks 1–3 modify `index.html` + `style.css`. Track 4 adds one new page. Track 5 adds one new page. Track 6 is bulk CSS + targeted HTML edits across ~100 pages. Tracks 7–8 are audit + targeted edits. Track 9 is opportunistic per-page enhancements.
- Pre-flight for every track: read the relevant section of `/Users/brian.soetaert/Desktop/Claude Co-Work/index.html` or target file BEFORE editing. Don't work from this plan alone — the current SVG paths are the source of truth.

---

# STREAM A — Homepage skyline motion and completion

## Track 1 — Skyline dynamism (new motion layer)

All elements are pure CSS-animated SVG. All are "ambient, not distracting" — long loops with extended off-screen / hidden periods so the scene stays primarily architectural.

### 1A — Streetcar loop
v10 added a still streetcar silhouette at x=690. This promotes it to a looping motion element.

- Move the existing `.fg-streetcar` group to its own `<g class="fg-streetcar-track">` wrapper at ground line (around y=555 reference).
- `animation: streetcar-cross 52s linear infinite`.
- Keyframes — streetcar spends most of the loop off-screen:
  - 0%: `translateX(-120px)` (hidden off left)
  - 8%: `translateX(-120px)` (still hidden)
  - 22%: `translateX(1680px)` (crossed entirely to the right)
  - 100%: `translateX(1680px)` (parked off-right until loop restarts)
- Effective on-screen window: roughly 14% of the 52s cycle — ~7 seconds visible, 45 seconds absent. Feels like a real streetcar that happens to pass by occasionally.
- Window gleams inside the streetcar participate in the existing `night-lights-visibility` keyframe so it lights up at night like everything else.
- Direction: left-to-right is fine. Don't bother with an alternating direction — it's a one-way illusion, not a simulation.
- Route: the streetcar should appear to travel on the ground line in front of the buildings but behind the foreground trees/lamps. So its SVG source-order position: after ground fade, before foreground trees/lamps. Adjust layer order in the documented SVG-layer-order comment block accordingly.

**Reduced motion:** streetcar is parked at its v10 location (x=690) with no animation. Keep the still silhouette exactly as v10 had it.

### 1B — Bird flock
A small V-formation of birds crosses the sky occasionally. Uses `offset-path` for a gentle arcing trajectory.

- New `<g class="sky-birds">` containing 4 bird shapes (small dark-grey Vs made from two short strokes).
- Each bird is a separate small `<g>` element positioned relative to the group. Flock spacing: lead bird at front, two birds trailing at 45° angles behind, one more behind them.
- The whole `<g class="sky-birds">` has `offset-path: path("M -80,180 Q 600,80 1400,140 L 1700,160")` — enters top-left area, dips slightly, exits top-right. Lower arc than the sun/moon path so birds cross the sky at medium altitude.
- `animation: birds-cross 75s linear infinite`. On-screen window ~18%, so ~13 seconds visible every 75 seconds. Stagger from the streetcar so they don't always co-occur.
- Each individual bird also gets a subtle `bird-flap` animation — `transform: scaleY(0.6)` → `scaleY(1.0)` on ~0.35s loop. Flaps should be slightly offset per-bird via `animation-delay` so the flock doesn't flap in lockstep.
- Visibility by phase: birds appear during Dawn (their main window, migration hour) and Day phases. Hidden during Dusk and Night. Tied to the 28s phase cycle via a `bird-phase-visibility` keyframe — opacity 1 at 0–50% of cycle, 0 during 50–100%.

**Reduced motion:** birds hidden entirely.

### 1C — Slow rolling clouds
Sparse, ambient cloud drift during daytime. Subtle — must never compete with the buildings.

- New `<g class="sky-clouds">` with 3 cloud shapes. Each cloud is a compound `<path>` of overlapping ellipses (classic stylized cloud silhouette), filled with `rgba(245, 239, 224, 0.18)` (cream at very low opacity).
- Each cloud gets its own `animation: cloud-drift-N 180s linear infinite` with different durations per cloud (180s, 220s, 260s) so they drift at slightly different speeds, giving parallax-like depth within the cloud layer itself.
- Drift direction: all left-to-right. Each cloud starts off-left, drifts across, exits off-right, loops.
- Staggered `animation-delay` ensures they're never all visible simultaneously nor all gone simultaneously.
- Visibility by phase:
  - Dawn: 0.4 opacity (pink-tinted via `filter: hue-rotate` is too much — just cream)
  - Day: 1.0 opacity (full visibility, they're the main atmospheric element)
  - Dusk: 0.5 opacity (fading, dusk sky takes over)
  - Night: 0.08 opacity (very faint, don't compete with stars)
  - Controlled via `cloud-phase-opacity` keyframe on the `.sky-clouds` group.

**Reduced motion:** clouds parked at a fixed position, no drift.

### 1D — Atmospheric touches (optional, only if 1A–1C land well)
Stretch goals — try and drop if they don't add:
- **Liberty Memorial flag** — a tiny flag flapping at the top of Liberty Memorial's shaft. One `<path>` with a 3-keyframe `flag-wave` animation (subtle). Small enough to not pull focus.
- **Lights flickering inside one window** — on a single office tower, have one window light toggle on/off on a very long loop (like someone working late). Subtle character detail.

Both are nice-to-haves. Drop if scope tightens.

### Acceptance for Track 1
- Motion is ambient, not demanding. Nothing "dances."
- Over a 3-minute observation, the eye should notice but not track the motion.
- Reduced motion disables all new animations.
- Layer order correctly maintained — streetcar stays behind trees/lamps, birds stay below sun/moon altitude, clouds stay above buildings but below sun/moon.

---

## Track 2 — Complete silhouette accuracy pass (finish v10 deferred)

v10 shipped 4 of the 10 accuracy refinements. Finishing the other 6 now.

### 2A — Fidelity Bank Building slenderness
- Current silhouette (909 Walnut at x=956–1030) reads as a generic setback deco block.
- Target: narrow the base footprint by ~15% (pull edges inward). The slenderness-to-height ratio is the tell — real Fidelity is notably thin for its 35 stories.
- Three clear tiers of stepped setbacks in the upper third. Topped by a narrow lantern with a short spire. The lantern should be narrower than the setbacks below it.
- Hover label: "Fidelity Bank Building (909 Walnut)".

### 2B — Liberty Memorial flame bowl widening
- Current: flame circle is about the same width as the tower shaft.
- Target: flame bowl clearly wider than the shaft (ratio ~1.5× shaft width). Distinctive "torch on a stick" profile from distance.
- Tower shaft should read as more tapered — narrower at top than bottom by a clear margin. Currently it's close to parallel-sided.
- Optional detail: four small marks at the bowl base hinting the four guardian sphinxes. Tiny — don't overdo.

### 2C — Bartle Hall pylon height variation
- Current: 4 pylons at identical heights.
- Target: slight variation — the two inner pylons taller than the outer two by ~15 units. Matches the real Bartle profile.
- Sphere caps: current solid spheres should be stroke-only circles or circles with 2 crossed inner lines hinting at the perforated skeletal structure. R.M. Fischer's actual Sky Stations are not solid balls.

### 2D — Jackson County Courthouse ziggurat emphasis
- Current: stepped deco but flat.
- Target: stronger three-tier ziggurat profile where each tier is visibly narrower than the last. Pyramidal stacking reads more clearly from the homepage viewing distance.
- Total height unchanged. Must remain visibly shorter than City Hall (which is to its east at x=1370–1460 — Courthouse is 332 ft, City Hall is 443 ft).

### 2E — Union Station central raised bay
- Current: wide horizontal Beaux Arts block with colonnade hint lines, uniform height.
- Target: wide block with a central raised bay corresponding to the Grand Hall's barrel-vaulted interior. The central 30–40% of Union Station's footprint rises ~12–15 units higher than the wings.
- Clock face: small circle (r=3) on the central bay where the actual Grand Hall clock would be, in `var(--gold)` at 0.6 opacity.
- Colonnade hint lines stay on either side of the raised bay (not under it).

### 2F — T-Mobile Center flattening
- Current: arena roof curve reads too dome-like.
- Target: flatter curve. Real arena roofs are gentle. Reduce curve amplitude by ~40%.
- Add a subtle horizontal band at the base of the curve hinting the roof-meets-wall line.

### Acceptance for Track 2
- Two people who know KC should be able to identify each named building by silhouette alone.
- No x-range changes to any building.
- Night-lights groups (v9 Track 2D) still align correctly to the updated silhouettes. Where they don't, reposition the night-light window rects / flame elements to match new silhouette.
- Hover labels and click-through URLs unchanged.

---

## Track 3 — Rivers wrapping around the back of the city

The v10.1 foreground rivers at the bottom corners are good — keep them. This track adds a secondary, subtler river presence *behind* the skyline to communicate the geographic truth: the Missouri flows along downtown's north edge, so from a south-looking vantage, there really is water behind the buildings.

### 3A — Background river glimmer
- New `<g class="skyline-back-rivers" aria-hidden="true">` drawn AFTER the sky/celestial/stars but BEFORE the buildings (so it paints behind buildings).
- Narrow horizontal river band visible at y=~220–240, stretching across most of the SVG width.
- Treatment: very thin river strip (height ~8 units), extremely soft treatment — base color `rgba(201, 168, 76, 0.15)` with a light horizontal gradient suggesting movement.
- Because it's behind the buildings, the taller buildings (One KC Place, City Hall, P&L, Fidelity) will occlude it, so only the gaps between buildings show river. That's exactly right — you'd see river glimpses between downtown towers from a south-looking bluff view.
- Must not compete with sun/moon arc. Keep y-range strictly below celestial arc and above the tallest building roofline.

### 3B — Time-of-day integration
Back rivers participate in the same `river-color-cycle` animation as foreground rivers — same hue/saturation filter shifts, same night moonstreak timing.

**Night moonstreak:** the back river gets a single horizontal silver streak that animates opacity 0→0.5→0 over the Night window of the 28s cycle. Positioned along the visible band.

### 3C — "Wrapping" suggestion via atmospheric perspective
To reinforce that these aren't floating stripes but actual river geography in the distance:
- Back river fades slightly toward the edges (left and right) via linear gradient masks, as if disappearing into atmospheric haze.
- Optional: a very faint vertical haze band between back-river-altitude and the tallest building rooftops to reinforce the "distant, hazy horizon" read.

### 3D — No hover, no click, no label on back rivers
The foreground rivers (v10.1) handle the interactive/clickable behavior. Back rivers are pure atmosphere. `aria-hidden="true"` on the group. Keep it quiet.

### Acceptance for Track 3
- At default Day state, look up from any angle — there's a faint sense of water visible through gaps between downtown towers.
- At Night, a subtle silver moonstreak glimmers between buildings.
- The two river presences (foreground and background) don't feel contradictory. Foreground rivers read as "here in the immediate landscape," background river reads as "continuing around the far side of the city." That's the geographic truth.
- Foreground rivers from v10.1 remain exactly as they are. Do not alter them.

---

## Track 4 — SVG layer order update

Update the documented layer-order comment block at the top of the homepage skyline SVG to reflect v11 additions:

Back to front (v11):
1. Defs (gradients) + atmospheric glow
2. `<g class="sky-stars">` — twinkling stars, night-only
3. `<g class="sky-clouds">` — rolling clouds, day-dominant
4. `<g class="sky-birds">` — occasional flock, dawn/day
5. `<g class="celestial-arc">` — sun + moon on arc
6. `<g class="skyline-back-rivers" aria-hidden="true">` — distant river glimmer (NEW)
7. Fill buildings — atmospheric background
8. Interactive buildings — with v10 + v11 refinements
9. `<g class="skyline-ghosts">` — dashed demolished buildings, toggled
10. Building night-lights (inside each interactive building)
11. `<g class="skyline-foreground">` — trees, lamps, streetcar-track wrapper
12. `<g class="fg-streetcar-track">` — looping streetcar (NEW motion wrapper)
13. `<g class="skyline-foreground-rivers">` — Kaw + Missouri at bottom corners (v10.1)
14. `<rect fill="url(#ground-fade)">` — ground edge gradient
15. `<g class="skyline-ground-ornament">` — deco hairline + diamond

---

# STREAM B — Two new signature pages

## Track 5 — Plaza Lights page

A deeper page celebrating the Country Club Plaza's Thanksgiving Night lighting ceremony — a KC tradition since 1930 (the Plaza has been lit every Thanksgiving Night for nearly a century, and the lights stay up until mid-January).

**File:** `plaza-lights.html` at site root.
**Nav placement:** Add as a 5th item to the **The City** dropdown, after City Overlooks. New dropdown order: The Plaza, Parks & Blvds, Ward Parkway, City Overlooks, **Plaza Lights**.
**Also linked from:** `plaza.html` (a prominent card linking to the new page), `visit/events.html` (add to events listing), homepage "More to Explore" rotation when appropriate seasonally.

### 5A — Page structure
Standard detail-page template with a custom signature hero replacing the usual `.detail-hero` photo.

```html
<div class="plaza-lights-hero">
  <div class="plaza-lights-overlay">
    <span class="eyebrow">A Kansas City Tradition · Since 1930</span>
    <h1>Plaza Lights<br /><span>The Night After Thanksgiving</span></h1>
    <p class="homepage-tagline">The switch gets flipped. The city shows up to watch.</p>
  </div>
  <div class="plaza-lights-toggle-wrap">
    <fieldset class="plaza-lights-toggle">
      <legend class="visually-hidden">Toggle Plaza Lights</legend>
      <input type="checkbox" id="plaza-lights-on" />
      <label for="plaza-lights-on">Turn on the lights</label>
    </fieldset>
  </div>
  <div class="plaza-lights-svg-container">
    <!-- SVG below -->
  </div>
</div>
```

### 5B — The SVG
ViewBox `0 0 1600 600`. Same dimensions as the homepage skyline for visual rhyme.

**Buildings to include (3–5 iconic Plaza structures):**
- **Giralda Tower replica** (tall, square tower with arched windows and small spire — model after the actual Seville cathedral tower)
- **Clock Tower** at 47th & Mill Creek (stepped stone tower with clock face)
- **Seville Square tower** (the one with the dome, off 47th)
- **Balcony Building** (wide horizontal facade with iconic wrought-iron balconies and tile roof)
- **Plaza Medical / Mill Creek Building** (lower, Spanish tile roof, arcaded ground floor)

Each building drawn in a warm Spanish Colonial palette — terra cotta roof tiles, cream stucco walls, wrought-iron accents. Different palette from the homepage skyline's gold-on-dark.

**Sky backdrop:** two states driven by the toggle:
- Lights OFF: pre-ceremony state. Late afternoon dusk sky — deep blue-purple gradient. Buildings visible but unlit.
- Lights ON: ceremony night. Dark sky with stars emerging. Every building outlined in Christmas light strings.

### 5C — Light strings
This is the signature element. Each building gets one or more `<g class="light-string">` paths following its rooflines, window frames, arches, and tower spires.

- A light string is an SVG `<path>` with `stroke-dasharray` creating dash-and-gap segments suggesting wire-and-bulb spacing.
- Over each dash, a small `<circle r="2.5">` for each bulb, alternating warm red/green/gold colors.
- Hidden by default: `.plaza-lights-hero .light-string { opacity: 0; transition: opacity 1.4s ease-in }`.
- Toggled on: `body:has(#plaza-lights-on:checked) .plaza-lights-hero .light-string { opacity: 1 }`.
- Each bulb has a subtle `bulb-twinkle` animation (gentle opacity pulse, 2–4s loop, staggered per bulb via `animation-delay: calc(var(--i, 0) * 0.08s)`). The twinkle should be very subtle — lights look alive but not blinking.
- Transition is deliberately slow (1.4s) so the user feels the moment of illumination.

### 5D — Night sky transition
When lights toggle on:
- Sky backdrop gradient shifts from dusk blue-purple to deep night navy.
- A star field fades in (use same pattern as homepage — 15–20 stars with staggered twinkle delays).
- Plaza streetlamps along the ground line fade on with warm orange glow.
- All transitions use `transition` properties (not keyframe animations) so they feel smooth and manual, tied to the user's toggle action.

### 5E — Interactive Plaza towers (click-through)
Each major tower is wrapped in `<a>` and routes to relevant pages:
- Giralda replica → `plaza.html#towers` (or the specific Plaza page anchor)
- Clock Tower → `plaza.html` main
- Seville Square → `seville.html` (the Spanish Colonial reference page)
- Balcony Building → `plaza.html`
- Hover spotlight pattern identical to homepage (other towers dim to 0.2 opacity on hover of one)

### 5F — Content below the hero
The page body contains:
- **The Ceremony** — the Thanksgiving Night ritual: 80-year-old tradition, crowds, the mayor flipping the switch (or whoever does it each year), the moment of illumination.
- **History** — 1930 origin story, the original small strand, the gradual expansion to today's 80 miles of light bulbs, the one year it was cancelled (research: 2001 post-9/11, a few weeks of delay).
- **What You See** — architectural highlights that are especially enhanced by the lights (Giralda's arches, the domes, the tile roofs).
- **When to Go** — Thanksgiving Night for the ceremony itself, any evening through mid-January for the lights.
- **Related** — Plaza, Seville, The Night Before Thanksgiving (if essay is added later).

Length target: 900–1200 words. Match history-essay voice from the existing Plaza essay.

### 5G — Reduced motion
- Lights still toggle (a checkbox is not motion).
- Transition duration drops to 0.01s (effectively instant).
- Bulb twinkle disabled — bulbs stay at full opacity without pulsing.
- Star twinkle disabled.

### 5H — Acceptance for Track 5
- Toggle is instantly understood. The moment of illumination feels cinematic.
- Each Plaza tower is recognizable as Plaza architecture (terra cotta, tile, arches).
- Clickable towers route correctly.
- Page renders correctly on mobile (SVG scales, toggle is tappable, content readable).

---

## Track 6 — Fountain Day page

A page celebrating Fountain Day — the annual April ceremony marking the start of fountain season, when KC's fountains are turned on for the warm months. Mirrors the Plaza Lights pattern: SVG hero with iconic fountains, toggle to turn them on, each fountain clickable through to its detail page.

**File:** `fountains/fountain-day.html`.
**Nav placement:** Add as a new item under the **Fountains** dropdown, after the 6 individual fountain pages. New dropdown order: All Fountains, Nichols Memorial, Meyer Circle, Bronze Boar, Crown Center, Firefighters, Children's Fountain, **Fountain Day**.
**Also linked from:** `fountains.html` (prominent card), `visit/events.html`.

### 6A — Page structure
Similar to Plaza Lights — standard detail-page template with a custom signature hero replacing the usual photo hero.

### 6B — The SVG
ViewBox `0 0 1600 600`. Each fountain rendered at its own scale, arranged along the horizontal in a park-like landscape (suggested ground, sky, distant trees).

**Fountains to include (6, each clickable):**
- **J.C. Nichols Memorial Fountain** — the signature 4 bronze equestrian figures. Horses are tricky to draw simply — go semi-abstract, focus on the water forms rising from each horse.
- **Meyer Circle Sea Horse Fountain** — bronze sea horses spouting water.
- **Bronze Boar Fountain** — simpler, single boar silhouette with water streaming.
- **Crown Center Fountain** — contemporary stepped design with water cascades.
- **Firefighters Memorial Fountain** — bronze figures with water arcs.
- **Children's Fountain** — bronze children, water spraying.

Each drawn simply but identifiably. Scale them so the largest (Nichols) is clearly bigger than the smallest (Boar). Arrange geographically if possible, otherwise just visually balanced.

**Sky backdrop:** two states driven by the toggle:
- Fountains OFF: early spring morning. Sky pale grey-blue. Ground tone dull brown (early April still-brown grass). No water visible — fountains are sculptural but dry.
- Fountains ON: spring afternoon. Sky warmer blue. Ground greens slightly (color shift to warmer tone). Water sprays from each fountain.

### 6C — Water animation
Each fountain has a `<g class="fountain-water">` hidden by default, containing:
- Primary water sprays as `<path>` elements with upward arcing curves (think parabolas).
- Water droplets as small ellipses filling the paths — use `stroke-dasharray` on the path with short dashes to suggest droplet form.
- Pool water at the base — an ellipse with animated `filter: blur` or pulsing opacity to suggest rippling.

Animation: `animation: fountain-spray 3s ease-in-out infinite`:
- `0%`: water sprays at low amplitude, pool low opacity
- `50%`: water sprays at full height, pool full opacity, ripples visible
- `100%`: back to low

Water paths have a very pale blue-cream color with high transparency to feel aqueous. Not solid blue.

### 6D — Toggle and interaction
- `<fieldset class="fountain-day-toggle"><input type="checkbox" id="fountains-on" />` with label "Turn on the fountains".
- `body:has(#fountains-on:checked) .fountain-day-hero .fountain-water { opacity: 1 }`.
- Transition 1.0s ease (water "comes on" smoothly — which is how real fountains are turned on each year, a gradual filling and spray).

### 6E — Clickable fountains
Each fountain's `<g class="fountain-shape">` wrapped in `<a>`:
- Nichols Memorial → `fountains/nichols-memorial.html`
- Meyer Circle → `fountains/meyer-circle.html`
- Bronze Boar → `fountains/bronze-boar.html`
- Crown Center → `fountains/crown-center.html`
- Firefighters → `fountains/firefighters.html`
- Children's → `fountains/childrens.html`
- (Adjust URLs based on actual filenames. Check the `fountains/` directory first.)

Hover spotlight pattern identical to other signatures (other fountains dim to 0.2 opacity on hover).

### 6F — Content below the hero
- **Fountain Day** — the tradition, when it happens (second Tuesday of April per some sources; verify), how it works (city crews go around turning on dozens of fountains over a single ceremonial day).
- **The City of Fountains** — KC's claim as having "more fountains than any city except Rome." The history of this identity: what it says about civic imagination, how Kessler and Nichols both used fountains, the role of the Fountain Fund.
- **What to See on Fountain Day** — which fountains are the must-sees, where to watch the turning-on if possible.
- **Winter Mode** — the other side: fountains are shut off around October and drain for winter. Many get seasonal decorations (Christmas at Meyer Circle, etc.).
- **Related** — All Fountains, The Plaza, Civic Imagination essay.

Length target: 800–1000 words.

### 6G — Reduced motion
- Water sprays fixed at mid-height with no pulsing.
- Ripples on pool disabled.
- Other transitions still work.

### 6H — Acceptance for Track 6
- Toggle feels satisfying — water turns on with real sense of filling.
- Each fountain is identifiable (or labeled on hover).
- Clicking routes correctly to each fountain's detail page.
- Ground color shift and sky shift happen smoothly with the toggle.

---

# STREAM C — Images

## Track 7 — Hero image composition audit

Systematic pass across every page with a `.detail-hero` image.

### 7A — Methodology
1. Grep all HTML files for `class="detail-hero"` to produce a full list of pages.
2. For each page, record:
   - Current image URL (usually Wikimedia Commons)
   - Current `object-position` value (usually `center X%`)
   - Image dimensions (can check via HEAD request or Wikimedia API)
   - Subject of the image (what building / person / location)
3. Evaluate each on:
   - **Resolution adequacy** — image should be ≥1600px wide for full-bleed hero.
   - **Composition** — is the subject centered in frame once `object-fit: cover` crops? Is the hero's visible window well-composed?
   - **Focus point** — does `object-position` actually frame the subject correctly? Many were set during original build without being re-checked against the cropped hero window.
   - **Grain/compression** — does the image look sharp or is it visibly pixelated / over-compressed?

### 7B — Produce audit report
Before making any changes, generate an audit report at `/tmp/hero-audit.md` with a table:

| Page | Current URL | Resolution | Current object-position | Issues | Recommendation |
|------|-------------|------------|-------------------------|--------|----------------|
| buildings/power-and-light.html | ... | 2400x1600 | center 40% | subject top-heavy, crown cut off | change to `center 25%` |
| history/truman.html | ... | 1200x800 | center 30% | resolution low, visible grain at full-bleed | find replacement image |
| ... | ... | ... | ... | ... | ... |

Claude Code can use `web_search` + `web_fetch` on Wikimedia Commons to find better alternatives where needed. Prefer images ≥2400px wide when available.

### 7C — Apply fixes
Work through the audit list, apply `object-position` tweaks or swap image URLs. For each change, preview the result at desktop + mobile widths before committing.

**Priority order:**
1. Pages with visible grain at full-bleed (resolution issues) — hardest to miss.
2. Pages where the subject is cut off by the hero window (framing issues).
3. Pages where the composition could be stronger (refinement).

### 7D — Acceptance
- No hero image shows visible compression artifacts at full-bleed 1440px width.
- Every hero's subject is clearly framed in the visible hero window.
- Audit report committed to `/tmp/hero-audit.md` for future reference.

---

## Track 8 — Image gap audit + gap-filling

Many detail pages currently have just a hero image + prose. A targeted pass adds in-body imagery where it would strengthen the page.

### 8A — Identify candidate pages
1. Grep all HTML files that have `.detail-hero` but NO `.detail-gallery`, `.before-after-panels`, or any other `<img>` in the body.
2. Grep all HTML files with low word count (likely stubs or short pages).
3. Cross-reference with the editorial priority list:
   - **Essays with no body images:** race-and-the-city, jazz-and-architecture, civic-imagination, buck-oneil-monarchs, walt-disney-kc, kessler (has SVG, but no photos), pendergast, truman, nichols-legacy.
   - **Stub pages (2-paragraph holding copy):** railroad-boom, mid-century, contemporary, battle-of-westport, great-flood-1951. These probably won't get expanded in v11 — image additions wait for content expansion.
   - **Building detail pages with no galleries:** most of the 13 building pages. Each could use a 2-4 image gallery (detail shots, crown close-up, historical photo, interior).
   - **Neighborhood pages:** most have just hero + text. Each could use a 2-3 image gallery showing signature streets, buildings, iconic views.
   - **Fountain detail pages:** each could use detail shots + historical imagery.
   - **Style pages** (`styles/art-deco.html`, etc.) — galleries showing examples would reinforce the pedagogical goal.

### 8B — Produce gap audit report
Generate `/tmp/image-gap-audit.md` with a ranked list: page path, current image count, recommended additions, suggested Wikimedia searches.

Example row:
```
## buildings/power-and-light.html
- Current: 1 image (hero only)
- Recommended: 3-image gallery
  1. Crown close-up at night (iconic illuminated lantern)
  2. Lobby Art Deco detail (elevators, brass)
  3. 1931 historical photo (construction or opening)
- Wikimedia search: "Kansas City Power and Light Building"
```

### 8C — Gap-filling pass
Work through the highest-value gaps. **Don't try to fill every gap in v11** — pick ~15 priority pages and do those well. Strong candidates for v11:
- The 6 fountain detail pages (they particularly benefit from multiple angles)
- The 13 building detail pages (crown + interior + historical where available)
- The 7 neighborhood pages (street/signature views)
- The 3 highest-traffic history essays (race-and-the-city, civic-imagination, pendergast)

For each gap filled:
- Add a `.detail-gallery` block with 2–4 images
- Captions (brief, italic, warm-grey)
- Wikimedia attribution in `credits.html`

### 8D — Acceptance
- Both audit reports exist on disk.
- At least 15 pages receive image additions.
- `credits.html` updated with new attributions.
- No broken image URLs introduced.

---

# STREAM D — UX and advanced design polish

## Track 9 — Site-wide card clickability

Currently many card components have a "Read more" link while the card itself (image, heading, description) is not clickable. This track makes the entire card a click target.

### 9A — Technical approach
Use the CSS `::after` stretched-link pattern. The primary link inside each card gets a pseudo-element that extends to cover the whole card. Secondary links (if any) inside the card remain individually clickable via `position: relative; z-index`.

```css
.card-clickable {
  position: relative;
}
.card-clickable .card-primary-link::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
}
.card-clickable .card-secondary-link,
.card-clickable .card-tag {
  position: relative;
  z-index: 2;
}
.card-clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
```

Preserves semantic HTML, keeps existing markup mostly unchanged, works with keyboard (Tab reaches the primary link, Enter activates it — screen readers announce the primary link text).

### 9B — Card classes to upgrade
Grep for all card-like class names in `style.css` and HTML. Expected list (verify via grep):
- `.hub-card` (homepage, hub pages)
- `.blog-post-card`, `.blog-featured-card`
- `.era-card`, `.figure-card`, `.theme-card`, `.episode-card`
- `.reading-entry`
- `.start-track`
- `.neighborhood-card` (if exists — check `neighborhoods.html`)
- `.detail-gallery img` wrappers — skip; galleries aren't clickable cards in the same sense
- Any `.card-grid > div` that currently wraps link content

For each class:
1. Add `card-clickable` class (or equivalent direct styling) to the CSS rule.
2. Ensure the primary `<a>` inside has class `card-primary-link` (or apply the `::after` to whatever the primary link already is via a more specific selector).
3. Verify no secondary link is broken (cards with multiple links need the secondary z-index fix).
4. Add hover state (`transform: translateY(-2px)` + shadow).

### 9C — Important: remove "Read more" as it becomes redundant
With the whole card clickable, "Read more →" at the bottom of cards becomes redundant. Either:
- Remove the "Read more" link text entirely (cleanest — the card title is the affordance).
- OR keep "Read more" but style it as a visual indicator only (no longer the click target, just a hint the card is interactive).

Lean toward removing it. Where the card includes multiple navigation paths (like a main page link plus a category link), keep both but style one as primary.

### 9D — Accessibility
- Primary link must have meaningful text (not just "Read more" — should name the destination: "The Plaza" / "The Kaw and the Missouri" / etc.). Audit each card's link text.
- `aria-label` on cards that use a wrapper structure isn't needed since the link itself has text.
- Keyboard focus: the primary link gets a visible focus ring even when `::after` overlays. Keep focus styles on the `<a>` itself.
- Touch: card hover effect (`translateY`) triggers on mobile tap — this is fine, feels tactile.

### 9E — Acceptance
- Every card-style component clickable across its full area.
- No card has broken nested links.
- Keyboard tab order still sensible.
- Hover lift visible at desktop widths.
- Mobile tap registers on whole card.

---

## Track 10 — Advanced design additions for pages without signature features

A menu of improvements that can be applied to detail/essay pages that currently only have hero + prose. Claude Code picks the subset that makes the strongest impact in the time available. Each is relatively self-contained.

### 10A — Fountain SVG animations on detail pages
Each of the 6 fountain detail pages gets a small animated SVG near the top, just below the hero — a stylized version of THAT specific fountain with gentle water animation. Mini version of the Track 6 concept, page-specific.

- ViewBox ~`0 0 400 400`. Centered on the page, max-width 400px.
- Water animation same pattern as Track 6 (spray + pool ripple, 3s loop, ease-in-out).
- Always on (not toggled — these pages are about the fountain, always).

### 10B — Mini "Where this ranks" compare-heights on building detail pages
Each of the 13 building detail pages gets a small vertical-comparison SVG near the end of the page showing how this building stacks up against:
- Tallest in KC (One KC Place, 624 ft) for reference top
- Shortest in the comparison set (for reference bottom)
- This building highlighted

- ViewBox `0 0 400 500`. Three columns: tallest, this building, shortest.
- Subtle gold-on-dark styling matching the homepage.
- Links out to `buildings/compare.html` for the full comparison.

### 10C — Reading time estimates on long essays
Add a small "~X min read" indicator to the hero overlay of essays and long-form pages.

- Pure CSS won't compute word counts, but Claude Code can calculate each page's word count once and hardcode it.
- Pattern: `<span class="reading-time">9 min read</span>` in the hero overlay area.
- Styling: small, warm-grey, right-aligned in the eyebrow line.
- Apply to: all history essays, all blog posts, long style pages.

### 10D — Sticky TOC sidebar for long essays
Pages with multiple `.detail-section[id]` elements get a sticky sidebar TOC on desktop (>1200px width).

- The `.detail-section` headings auto-populate the TOC (or, since we're hand-authoring, write them explicitly per page).
- Current section auto-highlights using `:target` or via scroll-driven animation with `animation-timeline: view()` applied to each section.
- Mobile (<1200px): sidebar collapses to a small "jump to section" dropdown at the top of the content, or just hides.
- Only apply to essays with 5+ sections. Short essays don't need it.

### 10E — Before/after slider for then/now content
Draggable CSS slider for comparing two images (same frame, different eras). Pure CSS + a range input.

- Pattern: two images absolutely-positioned in the same container, top image's `clip-path: inset(0 CALC from right)` tied to the slider value via `--slider-pos` CSS custom property.
- Drag handle styled as a vertical gold bar with a centered grab marker.
- Apply to pages where there's a clear then/now pair:
  - `history/lost-kansas-city.html` (Convention Hall then/now)
  - `history/urban-renewal.html` (various sites)
  - `neighborhoods/quality-hill.html` (mansion era vs. today)
  - `neighborhoods/18th-vine.html` (already has the Then/Now district SVG — would duplicate; skip)
- Each slider needs a matched image pair. If the matched pair doesn't exist, skip that page.

### 10F — Interactive Kessler boulevard timeline slider
On `history/kessler.html`, add a draggable timeline slider below the existing boulevard network SVG. As the user drags the slider from 1893 → 1926, boulevards progressively appear on the map based on their construction date. Pure CSS + range input; each boulevard has a `data-year` and CSS rules show/hide based on slider value.

### 10G — Custom cursors on signature pages
Subtle custom cursors on a few key pages:
- `plaza.html` and `plaza-lights.html` — small Spanish tile diamond cursor
- `art-deco.html` — gold chevron cursor
- `fountains.html` and fountain detail pages — small water-droplet cursor

Implementation: `cursor: url('/cursors/tile.svg'), auto;` with SVG files in `/cursors/`.

Light touch — if any feel gimmicky during implementation, drop them. Default cursor is also fine.

### 10H — Parallax on hero across more pages
v9 Track 3A has hero h1 scroll-reveal. Extend to more detail pages. Also extend Track 3B (lost-building fade) pattern to other relevant scroll moments. This was Track 6 of v10 but was deferred — retry here with smaller scope.

### 10I — Footer mini-skyline (deferred from v10 Track 8)
Add a tiny `<svg>` of the site's skyline signature to the site footer on all pages. Builds identity cohesion site-wide.

- ViewBox `0 0 800 80`. Simplified version — 8 building silhouettes in gold stroke at 70% opacity.
- Bulk update all ~122 pages via perl or Python script.
- Hidden on print.

### 10J — Building silhouette dropcaps (deferred from v10 Track 9)
Each building detail page opens with a small SVG silhouette of that building as a dropcap-adjacent element. Deferred from v10. Revisit here as scope permits.

### Acceptance for Track 10
- Claude Code picks 4–6 items from this menu and ships them. Not all are required in v11 — pick the highest-impact.
- Strong candidates for v11: 10A (fountain animations), 10C (reading time), 10E (before/after slider on 2-3 pages), 10I (footer mini-skyline).
- Defer the rest explicitly to v12.

---

## Suggested implementation order for v11

1. **Track 2** (accuracy pass) — finish what v10 deferred. Low-risk SVG path edits. Do first.
2. **Track 3** (background rivers) — depends on nothing, isolated SVG addition. Do early.
3. **Track 1** (streetcar/birds/clouds) — builds on Tracks 2–3 being in place. Do after.
4. **Track 4** (SVG layer order documentation update) — just a comment block update reflecting Tracks 1–3.
5. **Track 7 and 8** (image audits) — can run in parallel with other tracks. Audit first, fixes second.
6. **Track 9** (card clickability) — CSS + targeted HTML. Affects many pages but is mechanical.
7. **Track 5** (Plaza Lights page) — new page, self-contained.
8. **Track 6** (Fountain Day page) — new page, mirrors Track 5 pattern.
9. **Track 10** — opportunistic picks from the menu.

If scope has to cut, Tracks 1D (atmospheric touches), 10's non-core items, and Track 8 beyond the top 5–10 pages are the most deferrable.

---

## Deferred / noted for v12

- **PNG fallback favicons** and **default OG image** — still needs image-generation tooling.
- **Seasonal variants** — winter snow, summer green, autumn color on the homepage skyline.
- **Weather variants** — rain, storm.
- **Track 6 v10 (scroll parallax across hero layers)** — hold for dedicated attention.
- **More neighborhood pages** (Hyde Park, Waldo, Volker).
- **More building pages** (Bryant, Commerce Tower, Soldiers & Sailors).
- **RSS feed automation** — currently hand-maintained.
- **Photo credits deep audit** — still lingering from v6.
- **Site-wide time-of-day persistence** — hard without JS, defer.

---

## Open questions for Brian before implementation

1. **Plaza Lights nav placement:** The City dropdown as the 5th item, or under Visit > Events, or both?
2. **Fountain Day nav placement:** Fountains dropdown as a 7th item, or under Visit > Events?
3. **Plaza Lights building list:** 3–5 Plaza towers is my recommendation. Any specific Plaza structures you feel must be included? (I went with Giralda replica, Clock Tower, Seville Square tower, Balcony Building, Plaza Medical.)
4. **Fountain Day fountain list:** 6 fountains is my recommendation based on existing detail pages. If any of the 6 detail pages don't exist, adjust the list — any must-includes I missed?
5. **Card clickability — remove "Read more"?:** My recommendation is yes, remove redundant "Read more" text. Confirm or keep it as a visual cue?
6. **Track 10 priority picks:** I'd target 10A (fountain animations), 10C (reading time), 10E (before/after slider), 10I (footer mini-skyline) for v11. Sound right, or is there something in the menu (10B / 10D / 10F / 10G) you'd prioritize higher?
7. **Image audit scope:** Full site in v11, or top 20 priority pages only? Full audit might be large enough to justify its own batch.
8. **Bird phase visibility:** I set birds for Dawn + Day only. Should they also appear at Dusk (some real bird species like swallows peak at dusk)?
