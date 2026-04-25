# Look Up, Kansas City — Project Handoff

**Workspace:** `/Users/brian.soetaert/Desktop/Claude Co-Work`
**Served from:** `/tmp/kc_site/` on port 7890 (see `.claude/launch.json` and `/tmp/serve_kc.py`)
**Audience:** the next Claude Code instance picking up the project

Brian is new to coding; this is a static HTML/CSS site about Kansas City architecture with an Art Deco aesthetic. Iterate conversationally. When in doubt, ask before making large structural changes.

---

## TL;DR

A handcrafted single-page art-deco landing page with a dense, interactive SVG skyline hero, plus ~120 detail pages (buildings, fountains, neighborhoods, history essays, two signature-page experiences, blog). v11 was huge in scope. v12 added essay scroll polish across 31 pages and hand-drawn SVG "specimens" on each of the 6 style pages. v13 shipped bespoke line-drawn **elevations** on all 20 building detail pages — each with a human scale figure, Liberty Memorial reference (for towers over 200 ft), a single labeled callout on the distinctive feature, and a grounded italic caption. Current focus is continuing to lift the quality floor deeper in the site with patterns that roll out to many pages at once.

Working docs:
- `HANDOFF.md` — this file, the canonical state for the next Code session
- `BRAINSTORM_SEED.md` — outgoing context to Claude Chat with candidate wow-moment ideas, refreshed each round

---

## Current state (at handoff)

### Homepage skyline hero (`index.html` + `style.css`)

The hero is an inline SVG (`viewBox="0 0 1600 600"`) rendered inside `.skyline-hero`. Its layer order (back → front):

1. **Defs** — gradients, Marriott mask, train clip-path, streetcar-shape `<g>`
2. **Sky layers** (`.tod-layer` cross-fading Dawn/Day/Dusk/Night on a 40s cycle, plus `.tod-stormy`, `.tod-snowy`)
3. **Sky stars**, **sky clouds** (6 varied, mixed speeds 130–380s, all scaled 1.35×), **sky birds** (4 flocks: solo/pair/trio/V-formation, Dawn→Dusk visibility, scaled 1.22×), **sky planes** (one plane L→R, scaled 1.25×)
4. **Celestial arc** (sun + moon along offset-path; apex at y=-440)
5. **Hannibal Bridge** (left-side truss bridge, x=0–230) with train inside a `<clipPath>` that limits the train to the bridge span so it fully disappears past Kauffman
6. **Fill buildings** (transparent backfills painted first): Crown Center area (removed), Federal Reserve, Commerce Tower, Bank of America, Hotel Phillips, 6× v11 additional backfills, new backfill above Union Station
7. **Interactive buildings** (order west→east):
   - Liberty Memorial (shift +675 — behind Union Station)
   - Kauffman Center (scaled 0.78 + translated)
   - Bartle Hall (shift −178)
   - KC Marriott bg (dimmed infill with 100-LED grid; has `<mask>` so foreground buildings cover it cleanly)
   - Municipal Auditorium (shift −190)
   - P&L / KC Power & Light (shift −278)
   - President Hotel (new — sits between P&L and Union Station; has rooftop sign "PRESIDENT" with marquee LED bulbs lit Dusk→Dawn)
   - 909 Walnut / Fidelity Bank
   - Town Pavilion (currently **hidden off-canvas** via shift −4000)
   - Western Auto Sign (taller building + halo arc + "WESTERN"/"AUTO" red neon text + down-arrow)
   - T-Mobile Center (was Sprint — wider stadium drum with curved roof + entrance arch)
   - City Hall (shift −165)
   - Jackson County Courthouse (shift +25, 5-unit overlap with City Hall)
   - 18th & Vine District (new skyscraper; rooftop sign with red stripes + green unicode treble clef 𝄞 + blue two-line "18TH &" / "VINE" text)
   - **Union Station** (front-most — moved to end of interactive buildings source order; symmetric profile around x=235 with barrel-vault pediment, three arched entryways, prominent Grand Hall clock face, colonnade verticals, base moldings, circular fountain in front with animated jet + side arcs)
8. **Bond Bridge** (right-side, elevated cable-stayed bridge over Missouri; blinking red aviation warning light at pylon top via `.bond-warning-light`)
9. **Ghost buildings** (toggled by `#ghost-toggle` → "Show what was lost")
10. **Streetcar tracks** (three tracks, varied pacing, different stop locations 820/560/1120; fade in/out at hill toes; ride the hill contour via Y offsets; clip-path on shape via defs)
11. **Skyline foreground** (trees + lamps, all sitting on hill contour — Y positions computed from the bluff curve). 5 trees in varied styles (layered, cypress, oak, conifer, doubled); 5 lamps
12. **Foreground rivers** (Kaw on left smaller, Missouri on right wider) — contains the earth band/bluff path (steep drops into rivers; peak y=550 at center)
13. **Ground ornament** hairline
14. **Weather overlays** (rain + lightning for Stormy, snowflakes for Snowy — 60 each)

### Skyline controls

Under the "Look Up, Kansas City" title:

- Phase legend: **Dawn · Day · Dusk · Night** (labels highlight during current phase; entire 40s cycle = 10s per phase, paused in Stormy/Snowy)
- Weather toggle (radio group): **Clear · Stormy · Snowy**
  - Stormy: dark sky, storm clouds, rain (28 drops), occasional lightning flash, all night-lights forced on
  - Snowy: muted plum-blue winter-night sky, drifting snowflakes, night-lights on
- "Show what was lost" checkbox toggles `.skyline-ghosts` overlay (demolished buildings)

### Two signature pages

- **`plaza-lights.html`** — SVG hero of 4 Plaza towers (Giralda, Clock Tower, Dome, Balcony Building) with "Turn on the lights" toggle; bulbs scale 2.1× + drop-shadow glow when lit; sky goes dusk → night
- **`fountains/fountain-day.html`** — 6 clickable KC fountains, "Turn on the fountains" toggle; sky/ground warm up; water sprays + ripples animate

### Other site-wide pieces

- **Navigation** (`<nav>`): top-level with dropdowns; "Plaza Lights" under The City, "Fountain Day" under Fountains (both with separator dividers in dropdown)
- **Card clickability**: `.card` pattern uses stretched-link `::after` on the title `<a>`; "Read more" CTAs were bulk-removed
- **Footer mini-skyline**: simplified 8-building gold silhouette injected into 115+ pages
- **Reading-time indicators**: 31 essay/blog pages have a `<span class="reading-time">` in the hero eyebrow
- **Fountain detail pages**: each has a small `.fountain-mini-wrap` animated SVG below the hero

---

---

## v12 updates (since v11 handoff)

### v12a — Essay scroll polish (rolled out to 31 pages)

Shared via `js/essay-enhance.js` (loaded on all pages with `.reading-time`: 26 history + 6 styles essays) plus a block of CSS at the bottom of `style.css`:

- **Sticky page-toc scroll-spy.** When a section enters the reading band (rootMargin `-18% 0px -55% 0px`), its `.page-toc-inner a[href="#id"]` gets `.is-active` with a gold color + animated gradient underline. Top-most intersecting section wins if several overlap.
- **Scroll-reveal** on `.detail-section`, `.detail-gallery`, `.history-pullquote`, `.image-detail`. Items get `.reveal-pending` on load (opacity 0, translateY 18px) then `.reveal-in` on intersection (0.85s ease). Above-the-fold items render immediately — no flash-of-fade on load.
- **Gallery stagger.** `.detail-gallery figure:nth-of-type(2)` and `(3)` transition-delay 0.12s / 0.24s for rhythm.
- **Smart anchor jumps.** `html { scroll-padding-top: 64px; } html:has(.page-toc) { scroll-padding-top: 108px; }` so clicking a TOC link lands the section heading below the sticky bar instead of under it.
- **Reduced-motion** — everything collapses to immediate reveal, smooth scroll disabled.

### v12b — Style specimens (6 pages)

Each of the six style pages gets a bespoke inline SVG ornament that draws itself via `stroke-dashoffset` animation. Inserted after the first `.deco-rule` ◆ separator inside `.detail-body`, before the first narrative `.detail-section`.

- **Art Deco** (`art-deco.html`) — stepped ziggurat + 7-ray sunburst + flanking chevrons + gilded apex diamond → links to `buildings/kc-power-and-light.html`
- **Streamline Moderne** (`styles/streamline-moderne.html`) — 3-ring porthole + 3 trailing speed-lines + ground line → links to `buildings/municipal-auditorium.html`
- **Spanish Colonial** (`styles/spanish-colonial.html`) — tile frame with 4 corner diamonds + arched opening with keystone masonry marks + chained iron lantern with flame glow → links to `plaza.html`
- **Gothic Revival** (`styles/gothic-revival.html`) — rose window, two stone rings, 8 radiating mullions, 4 pointed-arch diamonds in cardinal wedges, quatrefoil around a central hub → references Grace & Holy Trinity Cathedral (Wikipedia link — no local page exists)
- **Contemporary** (`styles/contemporary.html`) — crossed structural beams terminating at a bolted hexagonal plate + 2 tensile cables rising to triangular anchors → links to `buildings/kauffman-center.html`
- **Beaux-Arts** (`styles/beaux-arts.html`) — Corinthian capital: abacus, twin scroll volutes, floral boss with petals + glow, 3-leaf upper acanthus, 2 lower acanthus, 5 column flutes → links to `buildings/union-station.html`

Mechanics:
- **`pathLength="1"`** on every stroked element normalizes `stroke-dasharray: 1` / `stroke-dashoffset: 1` across shape sizes (circles, long lines, and short arcs all animate over the same visual duration)
- **Per-element `--order` CSS variable** drives cascade: `animation-delay: calc(var(--order, 0) * 0.2s + 0.25s)`, duration 1.55s → total reveal ~2.5–3s
- **`.specimen-fill`** class on the accent element (apex diamond, porthole center, flame, hex plate, rose quatrefoil, floral boss) gets a separate looping glow animation after the draw completes
- **Full `prefers-reduced-motion` override** — fully drawn on load, no animation

### v12b mobile replay

The draw-on-load animation is gated by a `.style-specimen.specimen-animate` class:

- **Default state = fully drawn** (no dasharray/offset/animation). Graceful no-JS / pre-scroll fallback.
- `js/essay-enhance.js` on page load: if specimen's top is in upper half of viewport, add class immediately. Otherwise observe (`IntersectionObserver`, rootMargin `0px 0px -8% 0px`, threshold 0.12) and add the class when it enters view.
- This means mobile readers see the draw **fresh when they scroll to it** rather than discovering a pre-drawn static image.

### Global cache bump

`style.css?v=12b` on all 115 HTML files. The file's version is authoritative in the served HTML — bump it any time you touch CSS.

---

## v13 updates (since v12 handoff)

### v13 — Building elevations (all 20 detail pages)

Each `buildings/*.html` detail page (20 in total — excludes hubs `boom-era.html`, `modern-era.html`, `stadiums.html` and the `compare.html` tool) now has a bespoke line-drawn **elevation** inserted right after the first `.deco-rule` ◆ separator inside `.detail-body`.

**Shared mechanics (same vocabulary as v12 style specimens):**
- ViewBox `0 0 500 600` for every elevation. Ground line at y=580. Tallest building (One KC Place at 624 ft) fills ~95% of the vertical space.
- Scale system: **1 unit ≈ 1.15 ft** applied to every building, so cross-page comparisons read correctly.
- Human scale figure at x=40, 22 units tall (artistically enlarged from the "true" 5 units for legibility — readable as a stick figure on all viewports).
- Liberty Memorial reference at x=95, true-scale 189 units tall. Added on any building over 200 ft (so not present on Kauffman Center, Municipal Auditorium, Union Station, T-Mobile Center, Midland Theatre, Nelson-Atkins, Soldiers & Sailors Memorial, or any stadium; explicitly omitted on the Liberty Memorial's own page).
- Callout = short gold leader line + terminal dot + glow fill (`.elevation-fill`) + right-flush text label at `x=498 text-anchor="end"`. Labels drawn after the building completes (animation delay ~2.6s).
- Text has a 6px matching-background `paint-order: stroke fill` halo so labels mask underlying leader lines — no "strike-through" when a long label crosses its own leader.
- Caption below the SVG: italic Playfair Display, 2-3 sentences of grounded fact tied to what the drawing shows. Avoid "not X, Y" phrasings — keep them factual.

**Animation:**
- Same `specimen-draw` + `specimen-glow` + `label-fade` keyframes from v12b.
- Gated by `.building-elevation-wrap.specimen-animate` class.
- Default state (no JS): fully drawn, graceful.
- `js/essay-enhance.js` observer selector is `.style-specimen, .building-elevation-wrap` — one unified IntersectionObserver adds `specimen-animate` on scroll-into-view with `rootMargin: '0px 0px -15% 0px'` + `threshold: 0.2`. No more "fire immediately" branch — every draw happens when the element scrolls into view, on any viewport.
- Reduced-motion override unchanged.

**The 20 elevations + KC tie-ins + signature callout:**

| # | Building | Height | Callout | Notes |
|---|---|---|---|---|
| 1 | Kansas City Power & Light | 476 ft | The Lantern | Big base + compressed setbacks + illuminated crown |
| 2 | Liberty Memorial | 217 ft | The Flame | Human-only (is its own reference). Plaza + plinth + tapered shaft |
| 3 | One KC Place | 624 ft | The Pitched Crown | Tallest. Glass slab + pitched hipped crown. Long label uses bent-up leader |
| 4 | City Hall | 443 ft | The Pyramid | Stepped Deco + observation-deck band + pyramid cap |
| 5 | Kauffman Center | ~160 ft | The Shells | Two asymmetric curved shells + foyer wall |
| 6 | Union Station | 95 ft | The Grand Hall | Wide Beaux-Arts with 3 arched entries and a clock face in the parapet |
| 7 | Bartle Hall | 298 ft | The Sky Stations | 4 pylons rise above the hall; aluminum disc sculptures at the tops |
| 8 | Municipal Auditorium | 130 ft | The Curve | Signature rounded NW corner (PWA Moderne). Leader bends up-and-right |
| 9 | Jackson County Courthouse | 354 ft | The Ziggurat | Stepped Art Deco; shares vocabulary with City Hall (same firm) |
| 10 | T-Mobile Center | 145 ft | The Roof Line | Arena drum with curved roof + central entry arch |
| 11 | Town Pavilion | 590 ft | The Postmodern Step | Tall shaft with a stepped crown that references 1930s Deco |
| 12 | Fidelity Bank (909 Walnut) | 440 ft | The Spire | Slender Art Deco with a setback crown + finial |
| 13 | Bryant Building | 205 ft | The Spandrels | Regular grid of window bays separated by bronze spandrel bands |
| 14 | Commerce Tower | 418 ft | The Slab | Pure International Style — no setbacks, no crown, regular grid |
| 15 | Soldiers & Sailors Memorial | 80 ft | The Obelisk | Small monument — the scale is the point. Human-only |
| 16 | Midland Theatre | ~110 ft w/ sign | The Marquee | Low theater + vertical sign tower + horizontal canopy |
| 17 | Nelson-Atkins | ~70 ft peak | The Colonnade | Wide Beaux-Arts — 8 Ionic columns across the south portico |
| 18 | Arrowhead Stadium | ~200 ft | The Scoreboard | Saddle-shaped upper rim + central scoreboard w/ arrowhead logo |
| 19 | CPKC Stadium | ~80 ft | The Canopy | Stadium base + dramatic cantilevered canopy on angled masts |
| 20 | Kauffman Stadium | ~100 ft | The Fountains | Bowl + crown-shaped scoreboard + flanking fountain cascades |

**Script injection:** `<script defer src="/js/essay-enhance.js"></script>` added to all 20 building detail pages (they didn't have it before — they got the elevation-observer wiring plus the v12a scroll-reveal as a side benefit on their existing `.detail-section` content).

**Cache bump:** `style.css?v=13e` on all 115 HTML files.

---

## File structure

```
/Users/brian.soetaert/Desktop/Claude Co-Work/
├── index.html                  # Homepage (big SVG hero)
├── style.css                   # All styles (~5,800 lines after v12)
├── js/
│   └── essay-enhance.js        # Scroll-spy, scroll-reveal, specimen in-view gate (v12)
├── plaza-lights.html           # Plaza lights signature page
├── fountains/
│   ├── fountain-day.html       # Fountain Day signature page
│   └── *.html                  # 6 fountain detail pages
├── buildings/                  # 20+ building detail pages
├── neighborhoods/              # 8 neighborhood pages
├── history/                    # ~30 history essays + topic pages
├── styles/                     # 6 style pages (note: art-deco.html is top-level)
├── visit/                      # walking tours + events
├── spaces/                     # parks + overlooks
├── blog/                       # blog posts
├── art-deco.html               # Top-level Art Deco style page (has v12 specimen)
├── V11_PLAN.md                 # Plan document for the v11 batch
├── CLAUDE_CHAT_CONTEXT.md      # Older context doc
├── BRAINSTORM_SEED.md          # Outgoing context to Claude Chat (next-round candidate wow moments)
└── HANDOFF.md                  # ← This file
```

**Served static copy lives in `/tmp/kc_site/`**. Rsync the workspace after each edit batch:

```bash
rsync -a --delete "/Users/brian.soetaert/Desktop/Claude Co-Work/" /tmp/kc_site/ \
  --exclude='.claude' --exclude='.git' --exclude='V11_PLAN.md' --exclude='CLAUDE_CHAT_CONTEXT.md'
```

---

## How to preview

The dev server config is at `.claude/launch.json`. Start the preview:

1. `preview_list` to see if server is running already
2. If not, `preview_start` with name `lookupkc` (port 7890, serves `/tmp/kc_site/`)
3. Rsync after each edit batch so the preview picks up changes
4. Reload with `preview_eval`: `window.location.reload()`

---

## Skyline building positions — cheat sheet

All buildings have original x-coordinates in the SVG polygon points; most are repositioned via `transform="translate(dx, 0)"` on their `<g data-building>` wrapper. Kauffman uses `transform="translate(-35, 123) scale(0.78)"`.

Rendered x-ranges after transforms:

| Building | Shift | Rendered x-range |
|----------|-------|-----------------|
| Hannibal Bridge | n/a | 0–230 |
| Kauffman Center | +scale(0.78) translate(-35,123) | ~230–340 |
| Bartle Hall | -178 | 320–442 |
| KC Marriott (bg) | -230 | 270–550 |
| Municipal Auditorium | -190 | 450–560 |
| P&L | -278 | 580–660 |
| President Hotel | 0 | 664–730 |
| Liberty Memorial | +675 | 720–805 |
| Union Station | +575 | 730–890 (and its fountain centered x=810, y=564) |
| OKP / One KC Place | -250 | 910–990 |
| 909 Walnut | +40 | 1000–1070 |
| Town Pavilion | **-4000 (hidden)** | off-canvas |
| Western Auto | +47 | 1075–1099 |
| T-Mobile Center | 0 | 1105–1195 |
| City Hall | -165 | 1205–1295 |
| Courthouse | +25 | 1285–1375 |
| 18th & Vine | 0 | 1370–1440 |
| Bond Bridge | n/a | 1440–1600 |

Hill shape (bluff path) — steep drop on both sides, gentle peak in middle:
```
M 0,600 L 0,584 Q 80,578 160,568 Q 220,560 400,556 Q 700,552 900,550
Q 1200,552 1440,560 Q 1475,566 1500,574 Q 1560,590 1600,598 L 1600,600 Z
```

Hill helper function (used to position trees/lamps):
- `hill_y(x)` — piecewise linear approximation
- Tree/lamp positions: trees at x=250/470/565/895/1335; lamps at x=350/580/870/1100/1340

---

## Stylesheet landmarks

CSS is one monolithic file with section comments. Useful greps:

| What | Approximate location |
|------|---------------------|
| Homepage hero base styles | `.skyline-hero` (two rules — line ~1963 and ~2095; isolation + tod-layer setup) |
| Phase cycle (40s) | `.tod-layer.tod-*`, `@keyframes tod-fade-*` |
| Weather toggle | `.weather-radio`, `.tod-layer.tod-stormy`, `.tod-layer.tod-snowy` |
| Birds | `.sky-birds`, `.sky-bird-flock`, `.flock-solo`/`pair`/`trio`/`v` |
| Clouds | `.sky-clouds`, `.sky-cloud-*`, `@keyframes cloud-drift-*` |
| Streetcar | `.fg-streetcar-track`, `.fg-streetcar-a/b/c`, `@keyframes streetcar-l2r-a/l2r-c/r2l` |
| Train + clip | `.bridge-train-a`, `@keyframes bridge-train-l2r` (clip via `#bridge-train-clip` in SVG defs) |
| Bridge warning light | `.bond-warning-light`, `@keyframes bond-blink` |
| Fountain animations | `.us-fountain-spray`/`-arc`, `.fm-spray`/`-pool`/`-droplet` |
| Marriott LEDs | `.marriott-led`, `@keyframes marriott-led-phase` + `-blink` |
| Plaza Lights bulbs | `.bulb`, `.light-string`, `@keyframes pl-bulb-twinkle` |
| Fountain Day sprays | `.fd-spray`, `@keyframes fd-spray-pulse` |
| Card clickability | `.card h3 a::after` (site-wide stretched link) |
| Footer mini-skyline | `.footer-mini-skyline` |
| Reading time | `.reading-time` |
| **v12 essay scroll-spy + reveal** | `.page-toc-inner a.is-active`, `.reveal-pending`, `.reveal-in`, `@keyframes toc-underline-fade` (bottom of file) |
| **v12 style specimens** | `.style-specimen`, `.style-specimen-svg`, `.style-specimen.specimen-animate`, `@keyframes specimen-draw`, `@keyframes specimen-glow` (bottom of file) |
| **v13 building elevations** | `.building-elevation-wrap`, `.building-elevation-svg`, `.elevation-fill`, `.building-elevation-wrap.specimen-animate ...`, `@keyframes elevation-label-fade`, `@keyframes elevation-accent` (bottom of file). Text uses `paint-order: stroke fill` + a 6px dark halo to mask underlying leader lines |
| Reduced-motion master block | `@media (prefers-reduced-motion: reduce)` near end of file |

---

## Conventions Brian cares about

- **Art Deco warm-gold-on-dark palette** — stick to it unless an element is deliberately different (Plaza: Spanish Colonial cream/terra-cotta; 18th & Vine sign: red/green/blue neon; Western Auto: red neon)
- **Motion should feel ambient, not demanding** — nothing should beg for attention. Long loops, brief on-screen windows, phase-tied visibility
- **Reduced-motion support** — every new animation needs a `prefers-reduced-motion` fallback
- **Accessibility** — foreground buildings have `<a>` + `<title>` + `aria-label`; backfills are `aria-hidden="true"`
- **Brian iterates visually** — expect many rounds of "can that be slightly bigger / closer / shifted". Ship small changes and verify in preview
- **Don't silently delete content** — Brian's been caught off-guard when I remove things. If something feels redundant, ask

---

## Known issues / open items

### Small
- **Town Pavilion is hidden off-canvas** (translate −4000). Not visible in current composition. Decision: keep hidden for now because it didn't fit spatially after the user wanted OKP/909W tight. Could bring it back later if desired.
- **Ghost-buildings** (Lost Kansas City toggle) — "Union Depot" and "Convention Hall" ghost overlays had shifts applied to match older Union Station/Municipal positions. "Old P&L" and "Jr League Coliseum" ghosts did NOT match any regex and are still at original coords — they'll float when the ghost toggle is on.
- **Bluff path / trees** — trees and lamps use a piecewise hill_y() approximation. If the hill path changes again, the Python regeneration script in iteration history can be re-run to recompute tree/lamp Y positions.
- **Building fills** are very transparent (rgba alpha ~0.08) during Day/Dusk. Marriott uses an SVG `<mask>` so its LEDs don't bleed through Kauffman/Bartle/Municipal. Any other bg building that grows LEDs will need similar treatment.

### Medium
- **Style.css version** — now `?v=13e` across all 115 HTML files (global bump script run during v13). Bump it anytime you touch CSS so the preview / deploy doesn't serve stale cached files.
- **Hero audit / gap audit** (v11 Tracks 7 + 8) — reports at `/tmp/hero-audit.md` and `/tmp/image-gap-audit.md`. Deep visual pass on heroes was deferred to v12.
- **18th & Vine sign details** — the unicode `𝄞` treble clef character requires a font that supports U+1D11E (most modern systems do; falls back reasonably). If it renders as a box for some users, swap in an inline SVG path.

### Bigger
- **Building fills are semi-transparent by design** — if a user ever asks "why can I see through that building," the answer is the CSS `.building-shape` animation (`@keyframes building-color-cycle`) uses low-alpha fills to keep the line-art aesthetic. Night phase uses rgba(12,12,20,0.75) which is mostly opaque.
- **Source order matters** — the SVG is complex and paint order = DOM order. Always insert new elements thoughtfully. When in doubt, grep for where similar elements live.

---

## Recent "last asks" from Brian before handoff

### End of v11 handoff
1. **Hero padding tighter** — done (1.1rem desktop / 0.5rem mobile). Can still go smaller if needed.
2. **Union Station ghost / flicker bug** — fixed. Cause was an orphaned duplicate of the Union Station SVG elements that had snuck in during an earlier iteration. They rendered at the raw coords (x=155–315) instead of shifted, and the `building-color-cycle` animation made them flicker. Removed.

### End of v12 session
3. **Workflow:** Brian alternates Claude Code (build) ↔ Claude Chat (brainstorm). Each Code session ends with an updated HANDOFF.md + BRAINSTORM_SEED.md to take back to Chat. Chat returns a spec-level brief, Code ships it.
4. **Commit summary convention:** after any large batch of work, end the response with a copy-pasteable GitHub commit summary in a fenced `text` block (imperative title ≤70 chars, blank line, bulleted body describing what changed, why, any caveats).
5. **Specimens shipped (v12b).** Chat's Pick #1 from the first brainstorm round was "Styles Specimens." All 6 are live with draw-on-scroll animation and KC building tie-ins.

### End of v13 session
6. **Caption voice:** Brian explicitly asked to avoid lyrical/AI-tropey phrasing in captions. **Especially avoid "not X, Y" constructions** ("a torch, not a tower"; "not a building, but a..."). Factual + specific + numeric + grounded observations read best. A little lyrical is OK if it's not in the classic AI patterns. Apply this to captions for any future line-art additions.
7. **Observer fix:** v12b's "fire immediately if in upper half of viewport" branch was too eager — on desktop it fired before the user could see the draw. Now every specimen and elevation waits for IntersectionObserver trigger (threshold 0.2 + rootMargin -15% bottom). This is the right default; don't re-add the immediate-fire branch.
8. **Elevations shipped (v13).** Chat's Pick #1 from the second brainstorm round. All 20 building detail pages have bespoke scale-consistent line-drawn elevations with a human figure, Liberty reference where applicable, labeled callout, and fact-grounded caption.

### End of v13 skyline refinement pass (latest)
9. **Homepage skyline refinements** — a long collaborative tuning session iterating directly in the preview:
   - **Hannibal Bridge** line weights bumped to match the Bond Bridge on the opposite side (0.5–0.6 → 0.8–0.9; opacity 0.3–0.4 → 0.4–0.5).
   - **Hannibal train** — locomotive moved from the back of the train to the front (right end, matching the L→R direction of travel). Lit interior windows added to every freight car (`.train-window` class, warm glow visible dusk→night).
   - **Western Auto sign** — halo and sign frame widened (rx/ry 14/24 → 22/23; frame 32×30 → 44×28) so the sign reads as rounder and the "WESTERN / AUTO" text is more legible.
   - **Union Station fountain** — reworked. Outer basin wider, water ellipse more saturated, low center pedestal, jet lowered from 16 units to ~11 units, side cascade arcs thicker + closer to the basin. Two subtle pool ripples on either side.
   - **Marriott mask** replaced with full-footprint bounding rects so foreground buildings (Kauffman, Bartle, Municipal) fully hide the Marriott LED grid where they overlap; only the parts *above* each overlapping building show. Reads as real depth.
   - **Bond Bridge traffic** — 10 tiny cars split between two tiers: `.bond-traffic-always` (a few cars visible through the whole cycle) and `.bond-traffic-day` (a larger group that fades out through night and returns just before dawn). Foreground cars (leaving the city) drive L→R; background cars (entering) drive R→L and fade out at x=1440 (the right edge of the 18th & Vine building) so they appear to "disappear into the city."
   - **Night window lights** added to Power & Light, 909 Walnut, and City Hall — sprinkled asymmetrically within each building's stepped silhouette (8 lights each, deliberately non-grid). `night-lights-visibility` keyframes extended so lights are on from dusk through end of night (not night-only).
   - **Ghost toggle removed** — the "Show what was lost" fieldset + checkbox were removed. Only the caption remains: *"Not every building on the skyline made it to today. Learn more at Lost Kansas City →"*
   - **Hero padding tightened** — `.skyline-hero` top padding 1.1rem → 0.55rem; `.skyline-controls` top margin 1.5rem → 0.6rem; `.phase-legend` top margin 1rem → 0.4rem; `.skyline-svg-container` margin-top 2rem → 0.75rem. Tighter on mobile too.
   - **Subtitle** changed from "See the beauty of the city — look it all up here." to **"Discover the beauty of the Paris of the Plains."**
   - **Streetcar Y-offset hill contour corrected** — Track A/B/C keyframes now use Y values that actually follow the bluff curve (was off by 4-8 units in the mid-to-right range). Streetcars no longer dip behind the hill.
   - **Hill walkers** — 5 tiny figures fading in along the bluff, walking a short stretch (~50-70 units at varied pace), fading out as if entering a doorway. Reinforces the walking-tour thread. Size calibrated to ~5.5 units tall so they read at viewport scale without crowding.
   - Cache bumped to `?v=13g` across all 115 HTML files.

10. **Skyline refinement pass #2 (same session)** — iterative tuning after first round of previewing:
    - **Marriott mask was broken in coord space** — my v13 bounding-rect version placed mask shapes in viewport coords, but `maskUnits="userSpaceOnUse"` actually uses the TARGET ELEMENT's local coord space (pre-transform). Marriott polygon is at local x=500-780; so mask shapes must live in that range too. Rewrote the mask with Kauffman/Bartle/Municipal overlap rects in Marriott-local space. LEDs now correctly hidden behind each foreground building.
    - **Bartle mask reverted to base + 4 individual pylons** (not a bounding rect) so Marriott LEDs peek through the gaps between pylons. Creates a nice glint of Marriott color between the Sky Station verticals.
    - **Bartle inner pylons shortened** — the inner pair (2, 3) were ~23 units taller than the outer pair; pulled them down to ~10-13 unit difference. Sky Station spheres and mask pylon slots repositioned to match. More of the Marriott LEDs visible between pylons.
    - **Building night lights pruned** — earlier pass added a full grid of 20+ windows per building (P&L, 909 Walnut, City Hall); reduced to 8 asymmetric sprinkled lights per building, all contained within each stepped silhouette.
    - **Banner plane added** (`.sky-plane-banner`) — an occasional flyover with a cream-and-gold banner reading "❤ KANSAS CITY ❤" (warm red hearts, dark text, gold pin-stripe). Enlarged relative to the regular plane so the text reads (scale 1.4). Crosses the full sky over ~33% of a 180s cycle. Reduced-motion: hidden.
    - **Hill walkers enlarged** twice (8 → 22 → ~28 units effective at scale 1) so they read on mobile.
    - **Streetcar Y-offset hill contour** — corrected keyframe values so streetcars stay ON the bluff curve, not behind it.
    - Cache bumped through `?v=13h` → `?v=13o` during iteration. Final: `?v=13o`.

### Caveats for next session
- **Banner plane spawn rate** is currently ~25% of a 180s cycle (visible every ~3 minutes). Brian wants this reduced to "relatively low" once he's fully confirmed it works. Extend to `360s` cycle with ~15% visible window for a ~6-minute cadence.

### Late v13 skyline tuning (same long session)
Additional iterations that happened after the above:
- **Banner plane moved to DOM position AFTER celestial-arc** so it fully paints over (blocks) the sun or moon when it passes in front. Regular plane-a stays in its original position behind celestial.
- **Banner sized down** (CSS scale 1.4 → 1.2, banner 126→112 wide, 24→22 tall). Hearts repositioned symmetrically so "KANSAS CITY" text isn't overlapped. Keyframes rewritten so the plane + banner fade in ONLY at the left viewport edge, cross at full opacity, and fade out ONLY at the right edge (full sky crossing).
- **Bartle inner pylons shortened** from +23u to +10-13u over the outer pair. Sky Station spheres and the mask's per-pylon slot rects repositioned to match the shorter pylons. Exposes more Marriott LEDs between pylons.
- **Streetcars scaled to 1.2** to visually match the enlarged hill walkers.
- **Union Station fountain rework #4 (final this session)** — Brian gave explicit direction: "reminiscent of the KC flag fountain." Silhouette now has a **visible stone pedestal base**, a **vertical filled water jet rising from it**, and **two filled water arcs peeling off the TOP of the jet and falling down to the pool rim** (not sweeping out horizontally from the middle). Reads as water with clear vertical motion + pool-return flow. Previous iterations (strokes-only, then horizontal sheets) both failed Brian's test; the flag-silhouette is the intent going forward.
- **Hill walkers enlarged a second time** (bumped again after first enlargement still read too small).

---

## v14 session — hero revival, Penn Valley Park scene, train choreography (2026-04-23)

Very long collaborative refinement pass on the homepage hero. Cache ended at `?v=14j`. Net result: the on-hill area reads as Penn Valley Park (Scout + Liberty + fountain + walking trails + peopled walkers), Kauffman has a panel-seam silhouette, Hannibal trains run a scripted alternating schedule, Bond cars have head/tail lights, planes have blinking nav lights at night, and the hero text is tighter on every size.

### New on-hill scene (inside `<g class="on-hill-layer">`)
- **Scout statue** (Penn Valley Park, 1914/bronze 1922) — line-drawn equestrian silhouette facing west, rider shading eyes with one hand. In front of Municipal Auditorium (viewport x≈500), sits higher on the hill than the bluff edge. Group transform: `translate(480, -18)` with inner wrapper `translate(20,572) scale(1.2) translate(-20,-572)`. Horse body, angular neck reaching left, two-strand tail, hoof ticks, feather, headband. Class `.scout-statue`.
- **Liberty Memorial** now at `translate(662, 10)` with nested `translate(70,573) scale(1.15) translate(-70,-573)` — scaled +15% around base, shifted slightly left so it's just left of the Pres / Union-Station boundary.
- **Hill trails** (`<g class="hill-trails">` — 4 dashed cream paths, painted BEFORE landmarks so walkers pass over):
  - Trail A: Scout → Liberty → Fountain (`M 498,568 Q 600,580 725,584 Q 775,580 815,566`)
  - Trail B: Fountain east, ending at hill crest `(1030,551)` to read as "going over the hill"
  - Trail C: Scout west toward Bartle/Municipal, endpoint `(305,561)` kept below hill top
  - Trail D: Standalone right-side path `(1100,552)` → `(1280,567)` — **left end at hill crest, right end safely above the Missouri river upper edge (~y=570 at x=1280)**
  - All y-coords constrained to stay at least 2-3u BELOW the hill silhouette top so dashes never float over sky.

### Hill walkers revamped
- **1-9** (lateral, along bluff) redrawn with hat + head + coat + arms + legs + hoof ticks. Six palette coat classes rotate across them:
  - A: gold coat / burgundy hat  ·  B: gold-light coat / gold hat  ·  C: rust coat / cream hat
  - D: slate coat / gold-light hat  ·  E: burgundy coat / gold hat  ·  F: cream coat / rust hat
  - Keeps the warm-gold Art Deco family with slate + burgundy as muted cool accents.
- **10-12** (vertical — up/down the hill toward viewer) added with keyframes that scale 0.55 → 1.4 as they approach the foreground (depth cue).
- CSS: `.hill-walker .walker-head/.walker-hat/.walker-coat/.walker-arm/.walker-leg` + `.walker-coat-A..F`. Reduced-motion fallbacks for 10-12 added.
- **Deferred**: walkers 13-15 that follow trails via `offset-path` or staged keyframes. Not blocked, just scoped out of this session.

### Kauffman Center silhouette
- Group transform y-offset `123 → 128` to kill the bottom-left corner peeking above the hill.
- Smooth Bezier shells replaced with **12- and 14-facet polylines** using `stroke-linejoin="round"` — gives the Safdie-panel-seam character without looking janky.
- **Curved glass lobby** arc added in front of the shells (signature feature): `M 330,560 Q 340,548 355,545 L 472,540 Q 484,542 490,554 L 490,560 Z` with a subtle horizontal seam line at y=551.

### Hannibal bridge trains — scripted alternating schedule
- **Single 120s master cycle** drives both trains. 8 slots × 15s each. Sequence: **L, L, R, R, R, L, R, R** (L×2, R×3, L×1, R×2 — fits the 1-to-3 consecutive-same-direction cap Brian asked for). Only one train is visible at a time; the other parks off-clip.
- `.bridge-train-a` (L→R): loco at right end (x=130-146) = lead. Keyframe parks it at `translateX(400)` during R-runs and at `translateX(-160)` waiting to enter.
- `.bridge-train-b` (R→L): **same silhouette mirrored horizontally** via `<g transform="scale(-1,1) translate(-146,0)">` so the loco ends up at the LEFT end = lead when moving right-to-left. Parks at `translateX(260)` (hidden by the `bridge-train-clip` region which only shows x=0..230 in hannibal-local coords). Since the clip region stops at x=230 and Kauffman begins at viewport x≈230, the R→L train visibly emerges from behind Kauffman onto the bridge (exactly what Brian asked for).
- translateX jumps (e.g. 260 → -160 resets) happen only while the train is already off-clip, so no visible teleport.
- **Also cleaned up malformed closing tags** around the old single-train block that had accumulated from earlier iterations.

### Bond bridge car lights (cars slightly larger to make room)
- **Outbound cars** (`bond-car-fg`, L→R): small red `class="bond-taillight"` rect at the back (left side x=0). **Always visible** — tail lights are always on when a car is running.
- **Inbound cars** (`bond-car-bg`, R→L): small warm-white `class="bond-headlight"` rect at the front (left side x=0). **Dusk + night only** via `animation: night-lights-visibility 40s linear infinite` (same gate as building night lights).
- Foreground cars: 5×3 → 5.4×3.2. Background cars: 4×2.2 → 4.4×2.4.

### Plane navigation lights (both planes)
- New `<g class="plane-nav-lights">` inside each plane with three blinking circles:
  - Red port-wing beacon (blink 1.4s, -0.1s)
  - Green starboard-wing beacon (blink 1.4s, -0.7s)
  - White forward strobe (short-pulse: on 88%–93% of a 1.1s cycle)
- Wrapper opacity gated via `night-lights-visibility` so lights only appear dusk + night. Children blink within the visible window.

### Hero spacing (title / tagline / toggles)
- `.homepage-title` margin 0.75→0.4rem desktop, **0.2rem mobile**
- `.homepage-tagline` margin 0.25→0.1rem desktop, **0.05rem mobile** + tighter clamp font size on mobile
- `.phase-legend` margin 0.45→0.25rem desktop, **0.1rem mobile** + mobile gap 0.45rem / font 0.6rem / letter-spacing 0.22em
- `.weather-legend` padding-top 0.35→0.2rem
- Lost Kansas City ghost-caption removed; hero ends directly at the marquee quote.

### Small things worth remembering
- **TOD debug-style hygiene**: if you inject `<style id="debug-tod">` for a screenshot, ALWAYS remove it at end-of-turn. Brian will notice if the cycle stops running. Use `document.querySelectorAll('style[id^="debug"]').forEach(n=>n.remove())` to clean up before ending.
- **Trail endpoints and hill top**: trails that are meant to "go over the hill" should terminate AT the hill top Y value for that X. Trails that stay on visible land should sit a few units below hill top. Keep reference interpolation points handy: hill top is y=560 at x=220, 556 at x=400, 552 at x=700, 550 at x=900, 552 at x=1200, 560 at x=1440.
- **Missouri river upper edge** (east side): `L 1020,600 Z` then `Q 1060,594 Q 1110,588 Q 1180,580 Q 1280,570 Q 1400,562 L 1500,558 L 1600,558`. At x=1280 the river upper is y=570; at x=1400 it's y=562 (very narrow sliver of land between hill top and river).

### Deferred — next session's pile
- **Streetcar disembark groups** (2, 3, 4; rare 5, 6; super rare 10). Needs: for each of the three streetcars (Track A stop at x=820 over 72s cycle, Track B at x=560 over 105s, Track C at x=1120 over 62s), spawn a small group that fades in at the stop x,y during the stop window (e.g. 19-24% of Track A's cycle), walks short distances outward, and fades out. For the RARE larger groups (5, 6), use a longer-period wrapper animation (e.g. 2×72s=144s) with a visible window every second cycle. For SUPER RARE 10-person groups, use 10×72s=720s-period wrapper with one 4-5s visible window per cycle. Each disembark person should have `animation-delay` matching the streetcar's delay so they emerge in sync.
- **Sun/moon passing behind everything**. Deferred from v13 and deferred again. Concrete plan for next session:
  1. Define a `<clipPath id="celestial-clip">` in SVG `<defs>`.
  2. Populate it with `<g>` wrappers that mirror each tall interactive building's transform, containing just the building's outermost shape path (with fill overridden to any non-transparent color — clipPath only cares about shape). Do this for: Kauffman (both shells), Bartle base + 4 pylons, Municipal Aud, P&L, President, 909 Walnut/Fidelity, Courthouse, Town Pavilion (currently hidden, skip), T-Mobile Center, City Hall, 18th & Vine, Union Station, Liberty Memorial (on-hill). Also Hannibal bridge truss and Bond bridge pylon.
  3. Use `clip-rule="evenodd"` so a full-canvas rect creates the unclipped sky area, and each building shape creates a hole.
  4. Apply `clip-path="url(#celestial-clip)"` to the `.celestial-arc` group.
  5. Verify sun at x≈300 and x≈1300 (low arc positions) no longer bleeds through buildings. Tune hole coordinates if any building shows a visible seam.
- **Trail-following walkers 13-15** (homepage). v14-deferred. **Note**: the trail-following walker idea *did* ship in v15, but on the Nichols fountain hero, not the homepage. If you want homepage walkers 13-15 following the on-hill trails, use the same staged-keyframe pattern as `.nichols-walker-path-*` (see style.css near the bottom — translate keyframes timed to match the trail curve).
- **Banner plane spawn rate** (carried over from v13): Brian OK'd it for now but still interested in reducing to a ~6 minute cadence eventually.

---

## v15 session — Nichols Memorial Fountain hero (2026-04-23)

Chat's Pick #1 for v15: restage v14's peopled-scene vocabulary around the J.C. Nichols Memorial Fountain, a second signature page after the homepage. Cache bumped globally to `?v=15a`. File: `fountains/jc-nichols.html`.

### What shipped

**The hero replacement.** The previous `.detail-hero` photo block was replaced with a new `<section class="nichols-hero-scene">` containing four layers in a 1600×600 SVG (same viewBox as homepage + `plaza-lights.html` + `fountain-day.html`):

1. **TOD backdrop** — same four `.tod-layer` divs (Dawn, Day, Dusk, Night) cross-fading on the 40s cycle, synced with the homepage.
2. **Plaza background architecture** — Giralda Tower replica (reused from `plaza-lights.html`, scaled 0.55 around base and translated to viewport x=1100, y=360) + two flanking cream-stucco Spanish Colonial facades. Uses Plaza palette exception (cream #D9CEB8 stucco, terra-cotta #A66046 tile roofs). TOD color shift via one new keyframe `nichols-plaza-bg-cycle` (filter `hue-rotate + saturate + brightness` per phase). Night-only warm window glows gated via the shared `.building-night-lights` class.
3. **The fountain (center, primary subject)** — wide gold line-art pool rim + inner step, TOD-cycling blue-grey pool water (via `river-color-cycle` filter), central stepped-octagonal pedestal with decorative bands + urn, four bronze equestrian figures: **Left (West) rearing facing left**, **Right (East) standing facing right (mirrored silhouette)**, **Front (South) 3/4 angle closest to viewer**, **Back (North) small silhouette peeking right of the pedestal**. Bronze palette: `rgba(178,108,52,0.88)` fill with `#6B3E22` outlines. Water: central filled vertical jet (KC-flag-fountain silhouette) + two side arcs peeling off the top falling to basin, four small mouth-jets from the horsemen, and drifting droplets. Jets use `fm-spray-pulse` grammar. Landscape lights (warm dots around rim) gated to night via `.building-night-lights`.
4. **Foreground plaza** — hairline gold paving grid + two dashed walking paths converging on the fountain (Path A from bottom-left, Path B from bottom-right) + three bench silhouettes + two terra-cotta planters flanking the fountain approach + **seven walkers**: three trail-followers (a couple on Path A arriving, a solo walker on Path B departing — 55s/48s cycles) and four static figures (adult + child near basin, a seated figure on the right-side bench with legs removed, a lateral walker east of Giralda). Walkers reuse the homepage `.hill-walker` + `.walker-coat-A..F` palette vocabulary; trail-followers animate via new `@keyframes nichols-walker-path-a/-a-2/-b`.

**Below the hero** — an italic v13-elevation-caption-voice sentence in Playfair Display: *"The afternoon crowd at Nichols. Four bronze horsemen at the compass points of the basin, the Giralda Tower at the eastern edge of the plaza, and the paths that converge here from every direction of the Country Club Plaza."*

**Mini fountain SVG** — the small v11 `.fountain-mini-wrap` that previously sat above the facts panel was **moved to the end of the detail-body** as a closing ornament (after a `.deco-rule` ◆). Kept, not deleted — Brian's call.

### New CSS (all at end of style.css)

- **Three wrapper classes** — `.nichols-hero-scene`, `.nichols-hero-backdrop`, `.nichols-hero-overlay` + `.nichols-hero-caption`.
- **Background architecture** — `.nichols-bg-arch` / `.nichols-bg-stucco` / `.nichols-bg-tile` / `.nichols-bg-ridge` / `.nichols-bg-cornice` / `.nichols-bg-window` / `.nichols-bg-spire` / `.nichols-bg-finial` / `.nichols-bg-window-glow` + `@keyframes nichols-plaza-bg-cycle`.
- **Fountain** — `.nichols-pool-rim-outer` / `.nichols-pool-rim-inner` / `.nichols-pool-water` / `.nichols-pool-ripple` / `.nichols-pedestal-step` (+ shaft/cap/urn/band/urn-lip) / `.nichols-bronze-body` / `.nichols-bronze-stroke` / `.nichols-bronze-plinth` / `.nichols-jet` (+ `-center` / `-horse`) / `.nichols-jet-arc` (+ `-left` / `-right`) + `@keyframes nichols-arc-flow` / `.nichols-jet-drop` (+ `-a/-b/-c/-d`) + `@keyframes nichols-drop-drift` / `.nichols-landscape-lights`.
- **Foreground** — `.nichols-paving` / `.nichols-path` (+ `-a/-b`) / `.nichols-planter-pot` / `-band` / `-shrub` / `.nichols-bench-plank` / `-leg` / `.nichols-static` / `.nichols-walker-path-a/-a-2/-b` + their 3 keyframes.
- **Reduced motion** — trail-followers park mid-path, jets freeze at scaleY(0.92), background-arch animation and filter disabled, night lights (landscape + window glows) hidden.
- **Responsive** — hero height 560 → 440 (≤900px) → 360 (≤640px); overlay max-width 58% → 70% → 88%; caption font-size tuned down on mobile.

### Implementation notes worth remembering

- **SVG sizing fix**: with `viewBox="0 0 1600 600"` and `preserveAspectRatio="xMidYMid slice"`, the SVG must be `position: absolute; inset: 0; width: 100%; height: 100%` on its container — otherwise the SVG collapses to its intrinsic aspect ratio and doesn't fill the scene height. Caught during Phase 2 verification.
- **Mobile crop**: at 375×360 (mobile hero), slice means the viewBox is scaled to fit height (scale 0.6) and the horizontal extremes get cropped (viewBox x≈487 to x≈1113 visible). The fountain + Giralda stay centered; the flanking facades get cropped, which is acceptable. Verified visually.
- **Giralda reuse**: the original path data from `plaza-lights.html` (lines 172-217) was wrapped in nested transforms `translate(780, -190)` outer → `translate(320, 550) scale(0.55) translate(-320, -550)` inner. Same pattern as v14 Liberty Memorial scaling-around-base. Do not redraw the Giralda from scratch if it needs to appear elsewhere — reuse the same nested-transform trick.
- **Bronze horse grammar**: the four horsemen are NOT a `<symbol>` reuse — each is an inline `<g>` with a slightly different pose (Left rearing with forelegs lifted, Right standing with mirrored body path, Front 3/4 wider body, Back smaller 3/4 rear-view). This allowed per-horse pose variation per the spec's "two rearing, two standing" note. Scout's stroke-width vocabulary (`#C9A84C`, 0.45-1.1) inspired the proportions but the fountain-scale is ~60% the size.
- **Walker palette hack**: Nichols walkers apply the `.hill-walker` base class for styling inheritance + palette (walker-coat-A..F), but NOT a specific `.hill-walker-N` number class, so they don't pick up the homepage-specific walker keyframes. Static walkers get `.nichols-static` which overrides the `.hill-walker { opacity: 0 }` base rule.
- **Pool water color cycle**: uses the existing `river-color-cycle` keyframe verbatim (filter `hue-rotate + saturate + brightness`). This was the cleanest way to tie the pool to TOD without introducing new keyframes — the river and the fountain pool are both "water" and read nicely on the same cycle.

### Deferred from v15

- **Other fountain detail pages** (`fountains/bacchus.html`, `firefighters.html`, `pomona.html`, `volker.html` — Meyer Circle shipped in v15.2 below). Each needs its own appropriate backdrop context. Not every fountain is at the Plaza — Pomona and Volker are elsewhere. Don't copy-paste the Plaza backdrop; pick an appropriate backdrop per fountain.
- **Sun/moon occluders** and **homepage trail-following walkers** — carried over from v14.
- **Banner plane spawn rate** — still at ~25% of 180s cycle on homepage. Brian OK'd it for now.

---

## v15.2 session — Meyer Circle Sea Horse Fountain hero (2026-04-23)

Extended the v15 peopled-scene pattern to a second fountain page in the same session (Brian wanted to keep momentum before planning the bigger Midtown signature scene). Cache bumped `?v=15a` → `?v=15b` globally. File: `fountains/meyer-circle.html`.

### What shipped

The v15 Nichols hero pattern restaged for the Meyer Circle Sea Horse Fountain on Ward Parkway. Four layers, same 1600×600 viewBox:

1. **TOD backdrop** — identical to Nichols (4 tod-layer divs cross-fading on the 40s cycle).
2. **Ward Parkway backdrop** — replaces Plaza architecture: two flanking mansion silhouettes (left is cream Spanish Colonial, reuses `.nichols-bg-stucco`/`-tile`/`-ridge`/`-cornice`/`-window`/`-window-glow` classes verbatim; right is **Tudor revival** with warm brick, steep double-pitch tile roof, front gable with half-timbering, rectangular mullioned windows — new `.meyer-bg-brick`/`-tile-dark`/`-stucco-tudor`/`-timber`/`-window-tudor`/`-window-glow-warm` classes) plus **nine boulevard tree silhouettes** (new `.meyer-bg-tree`/`-canopy`/`-trunk`/`-distant` classes; muted evergreen palette). Same `nichols-plaza-bg-cycle` filter keyframe drives TOD shifts.
3. **Sea horse fountain** — reuses Nichols fountain vocabulary with variations:
   - Pool rim + water + ripples: same `.nichols-pool-*` classes
   - Central pedestal: taller + more slender (60u shaft vs 44u), with three decorative bands, a tapered obelisk cap, and a **gold finial sphere** (`.meyer-pedestal-finial`). Reads vertical rather than the horseman-crown silhouette of Nichols.
   - Four bronze figures, all **sea horses** (hippocampi with coiled fish tails, no riders): left-facing and right-facing (mirrored via `scale(-1,1)`), plus a back sea horse peeking right of the pedestal and a slightly-smaller front sea horse in 3/4 view. Each has an S-curve neck-to-body path, coiled fish-tail flourish, mane crest strokes, and a mouth jet. All use `.nichols-bronze-*` classes directly.
   - Central water column + two side arcs + drifting droplets: identical to Nichols.
   - Landscape lights: 8 amber dots around rim (fewer than Nichols's 9), gated to night via `.building-night-lights`.
4. **Foreground** — boulevard median paving + a subtle traffic-circle curve hint + two dashed paths + two terra-cotta planters + two benches (one with seated figure) + five walkers (2 trail-followers using the Nichols `nichols-walker-path-a/-b` keyframes verbatim, plus 3 static: fountain observer, bench sitter, lateral walker). Reduced walker count from Nichols's 7 to Meyer's 5 since Meyer is a quieter boulevard scene.

**Below the hero** — italic caption: *"The Meyer Circle fountain at quiet hour. Four bronze sea horses around a Venetian pedestal, the Ward Parkway mansions beyond, and the boulevard paths threading between the trees that frame this traffic circle a mile south of the Plaza."*

**Mini fountain SVG** — moved from above the facts panel to the end of the detail-body as a closing ornament (same pattern as Nichols).

### CSS architecture change — wrappers shared via multi-selector

Updated all Nichols wrapper rules (`.nichols-hero-scene`, `-backdrop`, `-svg`, `-overlay`, `-caption` + responsive variants) to include Meyer equivalents via comma selectors:

```css
.nichols-hero-scene,
.meyer-hero-scene { … }
```

This keeps the CSS DRY for two pages but the approach doesn't scale to 4+ more fountain rollouts. **v16 should rename the shared classes to a generic namespace** (`.scene-hero`, `.scene-hero-backdrop`, etc.) and do the same for the inner fountain/foreground vocabulary (`.nichols-pool-*`, `.nichols-pedestal-*`, `.nichols-bronze-*`, `.nichols-jet-*`, `.nichols-path`, `.nichols-bench`, `.nichols-planter`, `.nichols-walker-path-*`, `.nichols-landscape-lights`) — these are genuinely shared "fountain scene grammar" now, not Nichols-specific. The `.nichols-bg-*` classes (Plaza architecture + Giralda) can stay Nichols-specific since they don't generalize.

### New CSS in v15.2

- **Sharing** — 6 wrapper rules updated to multi-selector (no new rules, just extra selectors).
- **Meyer-specific** — `.meyer-bg` + `.meyer-bg-mansion(-tudor)` + `.meyer-bg-brick`/`-tile-dark`/`-stucco-tudor`/`-timber`/`-window-tudor`/`-window-glow-warm` + `.meyer-bg-tree(-canopy/-trunk/-distant)` + `.meyer-pedestal-finial`.
- **Reduced motion** — one block for Meyer that parks the bg animation + hides night window glows.

### Notes / footguns for next agent

- **Sea horse silhouette** is simplified — reads as "small animal-like bronze form" at scene scale, not clearly as a hippocampus on close inspection. Refine the path data if Brian wants a more obvious fish-tail coil or head shape. The four shapes differ: L/R sides are mirrored profile, back is smaller rear-view, front is 3/4 view.
- **Tudor mansion palette** is documented as the second Plaza/Ward Parkway palette exception (after Plaza Spanish Colonial). Style guide precedent: only use brick+half-timber for Midtown/boulevard scenes where Tudor revival is historically accurate. Don't sprinkle it elsewhere.
- **Trail-follower reuse** — Meyer uses the same `nichols-walker-path-a/-b` keyframes verbatim. Path-A arrival coords (ending ~x=570) line up with the Meyer basin since both fountains are at viewport center x=800. If a future fountain has a different pool diameter or path geometry, new keyframes will be needed.

---

## v15.3 session — Meyer quality pass + Bacchus + Pomona (2026-04-23)

Same session as v15.2. Ran a quality pass on Meyer Circle, then shipped two more fountain pages using the same pattern. Cache bumped `?v=15b` → `?v=15c` globally.

### Meyer quality pass

1. **Sea horses rewritten** — each of the four now has a proper head (oval with snout), dorsal crest spikes (3 triangles along back), a coiled tail ending in a fluke fan, visible eye, and water jet from mouth. Scaled up to 1.1x. Reads clearly as a hippocampus at scene scale, not just a bronze blob.
2. **Tree variety** — replaced 4 of the 9 identical ovals with different forms: 2 pointed cypresses (narrow triangular canopy) and 2 spreading maples (wide rounded canopy with visible branch lines). Remaining 5 kept as oval ellipses for mixed-species read.
3. **Path visibility** — Meyer-specific rule bumps path stroke opacity from 0.48 to 0.58 and width from 1.6 to 1.75 so the dashed walking paths read better against the dark foreground.
4. **Central water column moved ABOVE the finial** (Brian feedback). The jet base was at y=426 (overlapping the obelisk tip + finial); moved to y=414 so the jet clearly emerges from above the finial sphere. Jet peak raised from y=358 to y=336. Side arcs start moved to (797,340)/(803,340) and their end points extended to y=544 so arcs fall visibly into the pool water (not ending mid-air above the rim).

### v15.3 — Fountain of Bacchus hero (fountains/bacchus.html)

- **Setting**: Country Club Plaza sculptural niche. Reuses the Nichols Plaza backdrop verbatim (Giralda + two cream-stucco facades).
- **Fountain**: Single bronze Bacchus figure (~84u tall) on a low stepped pedestal over a smaller pool (rx=200 vs Nichols 262). Bacchus holds a grape cluster raised in his right hand (water jet rises from cluster), wine cup in left, ivy crown on head, classical drapery. Side water arcs peel off the grape cluster and fall to pool on both sides.
- **Foreground**: lower density — one dashed path, one bench, two planters, three walkers (observer + bench sitter + trail-follower). Matches the site-text framing of Bacchus as "a discovered figure around a corner."
- **Caption**: *"Bacchus with his grape cluster raised, set into a corner of the Plaza streetscape. One walker passes, one sits on the bench — Nichols believed public sculpture should be discovered rather than announced."*
- **CSS**: `.bacchus-hero-scene` + related wrapper classes added to the shared multi-selector rules (same pattern as Meyer). No new inner classes — uses the "fountain vocabulary" directly.

### v15.3 — Pomona Fountain hero (fountains/pomona.html)

- **Setting**: Ward Parkway near Loose Park. Reuses the Meyer Circle backdrop (trees + cream Spanish Colonial mansion on left + Tudor revival mansion on right).
- **Fountain**: Single bronze Pomona figure on a low pedestal, cradling a fruit basket in both arms. Fruit rising from the basket (grapes, apples, pears suggested as circles); water jet rises from the basket center. Hair tied up in a classical bun. Side water arcs peel off the basket edges.
- **Foreground**: two dashed paths, two benches, two planters, four walkers (observer + bench sitter + two trail-followers).
- **Caption**: *"Pomona on her pedestal, fruit basket brimming in her arms, water rising from the harvest she holds. The boulevard mansions rise behind her, the walkers pass — a moment of Italian Renaissance bronze quietly at home on Ward Parkway."*
- **CSS**: `.pomona-hero-scene` + wrappers added to shared multi-selectors. No new inner classes.

### Feedback rules locked in

- **Center pillar placement (X AND Y)**: the center pedestal of every fountain should be at the **3D center of the pool** — both x=800 (pool cx) AND y=pool cy. Brian flagged during Meyer Circle review that the pillar appeared at the back rim of the basin rather than the middle. Initial geometry had pedestal step bottoms at y=524 (Meyer) and y=542 (Bacchus/Pomona), while pool cy was 548 and 558 respectively. **Fixed in v15.3** by wrapping each fountain's pedestal + figures + jets in a `<g transform="translate(0, N)">` where N = pool_cy − pedestal_step_bottom (Meyer: 24, Bacchus/Pomona: 16, Nichols retroactively: 22). This puts the pedestal base at the visual center of the ellipse, reading as "rising from the middle of the pool" in 3D. Pool rim and landscape lights stay outside the transform wrapper (they're at the rim, not the center). **For v16+ rollouts: always verify pedestal shaft is at viewBox x=800 AND pedestal base y equals pool ellipse cy** before shipping.

### Pattern now on ALL SIX fountain detail pages

v15 Nichols, v15.2 Meyer Circle, v15.3 Bacchus + Pomona, **v15.4 Volker + Firefighters**. Cache `?v=15d`. All six use the same four-layer pattern (TOD backdrop, architecture, fountain, foreground) and share wrapper CSS via multi-selector. Fountain vocabulary classes (`.nichols-pool-*`, `.nichols-pedestal-*`, etc.) are reused directly across all six — **v16 should rename these to `.scene-*`** (seven-selector multi-selectors are getting tedious).

### v15.4 — Volker + Firefighters

- **Volker** (`fountains/volker.html`): UMKC-inspired Collegiate Gothic backdrop (new palette — warm brick, limestone, slate roof) + classical urn-topped pedestal. The real fountain is a cascading waterfall, but this stylized rendering keeps the shared vocabulary and cues the campus context via Gothic tower silhouettes. Caption acknowledges the UMKC connection.
- **Firefighters** (`fountains/firefighters.html`): Penn Valley Park backdrop with the **Liberty Memorial reused verbatim from the homepage** (scaled 0.75, repositioned to appear as a distant landmark on the right). Park tree silhouettes flank the scene. Central pedestal has a bronze firefighter figure — helmet, turnout coat with reflective stripes, axe held at side. Solemn memorial tone.
- **New CSS classes**: `.volker-bg-brick`, `.volker-bg-limestone`, `.volker-bg-slate`, `.volker-bg-stone-band`, `.firefighter-reflective-stripe`. Liberty silhouette reused by embedding the homepage path data directly.

### CSS refactor target (still outstanding)

Every multi-selector in the shared wrapper CSS now lists four fountain page classes (`.nichols-*, .meyer-*, .bacchus-*, .pomona-*`). At 5+ pages this will become tedious. **v16 should rename** the shared wrapper classes to a generic `.scene-hero*` namespace and the fountain vocabulary classes (`.nichols-pool-*`, `.nichols-pedestal-*`, `.nichols-bronze-*`, `.nichols-jet-*`, `.nichols-path`, `.nichols-bench`, `.nichols-planter`, `.nichols-walker-path-*`, `.nichols-landscape-lights`, `.nichols-foreground`, `.nichols-paving`, `.nichols-static`) to a shared `.scene-*` namespace. Nichols-specific classes that can STAY named `.nichols-bg-*` + `.nichols-fountain` (Plaza architecture — doesn't generalize).

---

## v16 session — Midtown signature scene + CSS refactor + 3 building pages (2026-04-23)

v16 shipped in three phases during a single long Claude Code session. Cache bumped globally from `?v=15b` → `?v=16a` (no further bumps needed this session — `?v=16a` still current).

### v16a — CSS namespace refactor

Renamed the shared fountain-scene vocabulary from `.nichols-*` to a neutral `.scene-*` namespace so new signature scenes don't require updating multi-selectors every time. 12 shared classes + 5 keyframes renamed across `style.css`. The five fountain page HTML files (`jc-nichols.html`, `meyer-circle.html`, `bacchus.html`, `pomona.html`, `firefighters.html`) now use `.scene-pool-rim-*`, `.scene-pool-water`, `.scene-pedestal-*`, `.scene-jet`, `.scene-jet-drop`, `.scene-landscape-lights`, etc. Nichols-specific vocabulary (`.nichols-bg-*`, `.nichols-fountain`, `.nichols-path`, `.nichols-planter`, `.nichols-walker-path-*`) stayed as-is — those don't generalize.

### v16b — Three new building detail pages

All three shipped with v13-pattern elevations (human scale figure, Liberty Memorial reference for towers >200 ft, single labeled callout, italic caption). Files:

- `buildings/katz-drug.html` — 1934 Streamline Moderne corner store at 39th & Main. Cream stucco body with rounded right corner, rooftop KATZ neon sign. Elevation shows the rounded-corner Streamline massing + the neon sign as the labeled callout.
- `buildings/uptown-theatre.html` — 1928 Boller Brothers Spanish Colonial theatre at 37th & Broadway. Brick body with stepped parapet, arched second-story windows, horizontal entry canopy, and vertical UPTOWN marquee rising above the roofline. Elevation callout on the vertical marquee.
- `buildings/one-park-place.html` — ~220 ft modernist residential slab at 700 W 31st St. Glass curtain wall with continuous horizontal floor-banding, flat roof, podium base with landscaped circular drive. Crosses the Liberty Memorial 217-ft threshold. Elevation callout on the horizontal banding pattern.

All three are linked from the signature Midtown scene hero via `<a href="">` wrappers around their `<g data-building>` groups.

### v16c — Midtown neighborhood signature scene (the big one)

File: `neighborhoods/midtown.html`. Replaced the previous photo hero with an inline SVG signature scene using `viewBox="0 0 1600 600"` (same as homepage, plaza-lights, fountain-day, and the fountain signature scenes). Looks-north composition with the following layer order (back → front):

1. **TOD backdrop** — 4 `.tod-layer` divs cross-fading Dawn/Day/Dusk/Night on the shared 40s cycle.
2. **Sky** (`.midtown-sky-stars`, `.midtown-sky-clouds`) — stars + 2 drifting clouds with varied speeds.
3. **Hills** (`.midtown-hill-far` + `.midtown-hill-near`):
   - Far-hill ridge peaks at y=408-456 (curving)
   - Near-hill crest at **y=532-548** (raised from the original y=552-562). Buildings sit on the new elevated shelf, giving Brush Creek real foreground space.
4. **Kansas + Missouri Rivers** (Layer 2b2, new): distant water ribbons threaded ON the far-hill surface (y=448-478), NOT in the sky. Kansas flows in from west at y=472 rising NE to confluence at x=418, y=452 (Kaw Point — `<ellipse class="midtown-river-confluence">` + "Y"-junction detail path). Missouri enters west at y=448, passes through confluence, continues east across horizon. Current-hint tick marks on both rivers.
5. **Downtown silhouettes** — clustered, 3-depth-layer system (`.downtown-far`, `.downtown-mid`, `.downtown-near`) at x=440-614, y=414-475. Named landmarks in the cluster: Bartle Hall pylons, City Hall, 909 Walnut/Fidelity, Power & Light, Town Pavilion, One KC Place, plus Kauffman Center twin shells. **The Layer 3b "Plaza distant Clock Tower" was DELETED** after it kept rendering at x=546-576 inside downtown and reading as a massive downtown tower. The Mill Creek Clock Tower now exists only in Layer 3b2 (Plaza mid) with `transform="translate(122, 0)"` placing it between Giralda and Plaza facade B.
6. **Hill trees + hill houses + roads + cars**:
   - Hill trees scattered at y=538-568
   - **Residential hill houses now ~82 total organized into 8 named neighborhoods** (was 17 scattered): Hospital Hill (x=210-260), Old Westport (x=352-395), South Hyde Park (x=600-630), Hyde Park (x=820-864), Rockhill (x=1012-1052, raised to y=487-498 to clear highway), Volker (x=1095-1140, raised to y=491-502), Rockhill-Ridgeway (x=1212-1257), UMKC-Area (x=1432-1462). Each cluster has a front row + back row for depth. **Plus 26 tiny "deep back row" houses at y=460-472** across 7 additional clusters for atmospheric residential density.
   - **Left road** (`.midtown-road`) — gently winding dirt road curving from bottom-left up to downtown cluster. 5 KC houses (`.midtown-kc-house-*`) along it. 2 animated cars (`midtown-car-1/-2`) travel northward along the bezier path toward downtown, scale down with distance via `@keyframes midtown-car-north`.
   - **Right highway** (`.midtown-highway`) — meandering back ribbon from bottom-right curving all the way west to x=535, y=472 where it visibly connects to the foot of downtown. 2 animated cars (`.midtown-highway-car-1/-2`) via `@keyframes midtown-highway-west` (westbound) and `midtown-highway-east` (eastbound), scale down with distance.
7. **KCTV5 Tower** (Layer 3, `.midtown-kctv5`) — 1,042 ft guyed lattice steel broadcast tower. Mast at x=930, peak at y=62, base at y=446. Lattice cross-bracing narrows from bottom to top. Animated elements: FAA red peak beacon blinks (`@keyframes midtown-faa-blink`), multi-color LED segments along mast glow on at night via `@keyframes midtown-kctv5-led-on`. The biggest vertical anchor in the scene.
8. **Plaza cluster** (Layers 3b, 3b2, 3c):
   - Plaza distant = just the Dome building (Clock Tower deleted, see note above). At x=766-796, y=432-502.
   - Plaza mid (`.midtown-plaza-mid`, with `transform="translate(0, -20)"`) contains: density silhouette #1 (x=625-665), Mill Creek Clock Tower (shifted east), density #2, **new density silhouette filling the old clock position at x=670-708**, and wide Plaza facade B arcade (x=830-910).
   - Plaza Giralda (`.midtown-giralda`, with `transform="translate(0, -20)"`) — scaled 0.3 from plaza-lights.html geometry so the tower is ~1:8 ratio with KCTV5 (matches the real-life ratio between Plaza's 125-ft Giralda and KCTV5's 1,042 ft). Still the prominent central-cluster Plaza landmark but not dominating.
9. **Foreground buildings** (ALL now include `transform="translate(…, -20)"` so they sit on the elevated y=560 shelf):
   - **One Park Place** (`.midtown-oneparkplace`, `translate(36, -20)`) — modernist glass slab at x=106-216, 20 floors of banding + mullions + sprinkled night window glows. Anchors the left edge.
   - **Katz Drug** (`.midtown-katz`, `translate(0, -20)`) — at x=280-455 with rounded Streamline right corner. Rooftop KATZ neon sign with halo + flicker on at night.
   - **Uptown Theatre** (`.midtown-uptown`, `translate(0, -20)`) — at x=500-630 with stepped Spanish Colonial parapet + vertical UPTOWN marquee rising above roofline. Marquee neon on at night with halo.
   - **UMKC infill** (`.midtown-umkc-infill`, `translate(-80, -20)`) — single compact academic building between Nelson and Kauffman Garden (was two larger buildings at x=1420-1506; simplified when Kauffman Garden moved into that zone).
   - **UMKC Haag Hall** (`.midtown-haag-hall`, `translate(0, -20)`) — Collegiate Gothic tower at x=1516-1574. Crenellated parapet, tall Gothic arched windows, stone band mid-height.
   - **Nelson-Atkins** (`.midtown-nelson`, `translate(-180, -20)` — moved 80u further left this session) — long horizontal limestone mass with 6-column Ionic colonnade (evenly spaced, was 3+3), low triangular pediment, flanking wings with 8 pilasters + 6 rectangular wing windows, broad 6-step staircase, and `.midtown-nelson-entablature` stone band above AND below the portico (classical plinth). Ionic capital hints as thin ellipses above each column.
   - **Shuttlecocks** (`.midtown-shuttlecocks`, `translate(-180, -20)` — follows Nelson) — clean Bezier-cone silhouettes: round cork ball (circle), narrow collar (rect), smooth tapered feather cone (single `<path>`), 3 interior vein lines. One sways via `@keyframes midtown-shuttlecock-sway` (wrapped in nested sway-wrapper so the inner rotate transform isn't overridden by CSS animation); the other is static. Tipped jauntily at ±20° rotation.
10. **Kauffman Memorial Garden** (Layer 5, `.midtown-kauffman-park`, `transform="translate(380, -40)"`) — **MOVED this session from in-front-of-Nelson to east-of-Nelson** per Brian's geographic accuracy request (garden is on the NORTH/uphill side of Brush Creek, across from Nelson). Internal inner-coord bounds x=950-1190, y=560-597; after translate effectively at x=1330-1570, y=520-557 (20u above foreground buildings — properly uphill). Now contains: tiered fountain (lower wide pool + upper basin dish + pedestal + tall central jet + side-arc water falls + falling drops), stone terrace plinth, symmetric east/west **parterre flower beds** with cross-pattern + corner flower dots + center ornament, **pergola/rose arbor** (4 posts + 2 beams + climbing vine dots), **low boxwood hedges** framing parterre compartments, rounded ornamental topiary (sphere-on-stem), stone urn, 2 triangle topiary on outer flanks, 2 benches, 8 flower-bed rectangles, dashed path arcs.
11. **Peripheral trees** — left-edge tree at x=30 + right-edge tree at x=1570.
12. **Brush Creek** (Layer 7) — completely reworked this session:
    - **Meandering path** at y=572-596 (not straight). Dual bank hairlines + closed meandering water ribbon.
    - **Three-arch Plaza stone bridge** at x=730-790, y=568-588 (`.midtown-creek-bridge` / `.midtown-bridge-deck` / `.midtown-bridge-arch` / `.midtown-bridge-stone` / `.midtown-bridge-lamp` with corner lamp posts that glow at night + water reflection ellipse).
    - **Paved Plaza embankments** (`.midtown-creek-embankment`) at x=600-900 with balustrade posts + rails on both banks.
    - Reed clumps at varied x positions following the meander, 6 stepping stones in the water, 4 moonstreak reflections (vs 1 previously).
13. **Streetcar track + streetcar** (Layer 8) — **track moved from y=595-598 (in the water) to y=562-564 (elevated ground line, above creek, below building bases)**. Streetcar keyframes updated to `translate(x, 564)` so the car crosses the Plaza bridge and threads the foreground landscape rather than driving through water.
14. **Elevated ground hairline** at y=560 (was y=580).

### v16c new CSS (all in `style.css`)

- **Wrapper multi-selector** expanded: `.nichols-hero-scene, .meyer-hero-scene, .bacchus-hero-scene, .pomona-hero-scene, .firefighter-hero-scene, .midtown-hero-scene` and similar patterns for `.*-hero-backdrop`, `.*-hero-overlay`, `.*-hero-caption`.
- **Hill + topography**: `.midtown-hill-far`, `.midtown-hill-near`, `.midtown-hill-tree-canopy`, `.midtown-hill-tree-trunk`, `.midtown-hill-house-*`.
- **Downtown silhouettes**: 3-layer opacity system `.downtown-far`, `.downtown-mid`, `.downtown-near` inside `.midtown-downtown-silhouettes`.
- **KCTV5**: `.midtown-kctv5-mast/-strut/-diag/-rail/-guy`, `.midtown-kctv5-faa`, `.midtown-kctv5-led-*`, `@keyframes midtown-faa-blink`, `@keyframes midtown-kctv5-led-on`.
- **Plaza**: `.midtown-plaza-distant-*`, `.midtown-plaza-mid-*`, `.midtown-giralda-*` (all gold line-art, no cream-stucco palette exception like Nichols).
- **Named buildings**: `.midtown-opp-*`, `.midtown-katz-*`, `.midtown-uptown-*`, `.midtown-nelson-*` (with separate `-entablature`), `.midtown-haag-*`, `.midtown-shuttlecock-*` (with sway-wrapper + `@keyframes midtown-shuttlecock-sway`).
- **Neon signs**: `.midtown-katz-neon-*` + `.midtown-uptown-neon-*` with `@keyframes midtown-katz-neon-on` / `midtown-uptown-neon-on` (both with flicker at dawn/dusk transitions).
- **Roads + cars**: `.midtown-road`, `.midtown-road-center`, `.midtown-kc-house-*`, `.midtown-car-*`, `@keyframes midtown-car-north`.
- **Right highway**: `.midtown-highway`, `.midtown-highway-center`, `.midtown-highway-car-1/-2`, `@keyframes midtown-highway-west/-east`.
- **Streetcar**: `.midtown-streetcar-*`, `@keyframes midtown-streetcar-travel` (y=564).
- **Rivers**: `.midtown-river-kansas`, `.midtown-river-missouri`, `.midtown-river-confluence`, `.midtown-river-current`.
- **Creek + bridge**: `.midtown-creek-bank`, `.midtown-creek-water`, `.midtown-creek-moonstreak`, `.midtown-creek-reeds line`, `.midtown-creek-stones ellipse`, `.midtown-creek-embankment`, `.midtown-bridge-deck`, `.midtown-bridge-rail`, `.midtown-bridge-arch`, `.midtown-bridge-stone`, `.midtown-bridge-lamp`, `.midtown-bridge-reflection`.
- **Kauffman Garden**: `.midtown-park-hedge`, `.midtown-park-topiary`, `.midtown-park-path`, `.midtown-park-gate`, `.midtown-park-terrace`, `.midtown-park-terrace-rim`, `.midtown-park-flowerbed`, `.midtown-park-bench`, `.midtown-park-parterre-bed/-line`, `.midtown-park-flower`, `.midtown-park-ornament`, `.midtown-park-pergola-post/-beam`, `.midtown-park-hedge-low`, `.midtown-park-ornamental`, `.midtown-park-urn`, `.scene-jet-side`.

### Implementation notes worth remembering

- **TWO clock towers once existed in the scene** — the Mill Creek Clock Tower (Layer 3b2, Plaza mid) and a redundant "Plaza distant Clock Tower" (Layer 3b) which was the actual offender that kept rendering in the downtown cluster. Brian was frustrated through multiple passes because Claude kept moving the wrong one. The distant Clock Tower has been deleted. If a "clock tower in downtown" complaint comes back, it's something new — not this.
- **Layer-4 transform pattern**: every foreground building group has `transform="translate(dx, -20)"` where dx varies per building. The shared `-20` Y shift is how the elevated building shelf at y=560 was achieved without rewriting every y coordinate. If you add a new foreground building, include the `-20` in its transform or it'll look sunken into the creek.
- **Kauffman Garden translate is `(380, -40)`** — that's +380 X and -40 Y relative to its internal coords. The -40 (not -20) is intentional: the garden is 20u uphill of the buildings, matching its geographic "north side of the creek" position.
- **Nelson moved further left this session** — `translate(-100, 0)` → `translate(-180, -20)`. Shuttlecocks follow with the same transform. Kauffman Garden occupying the old Nelson-front zone is what required the shift.
- **Near-hill crest raised to y=532-548** — foreground buildings at y=560 base now sit BELOW the hill crest on screen, which is correct (they're in front of the hill). Hill is a backdrop silhouette, not the ground buildings stand on.
- **Rivers render BEFORE downtown silhouettes but AFTER the far-hill fill** — so the hill shows through faintly, and downtown cluster paints over the confluence area (perfect for "Kaw Point is behind downtown" framing).
- **Highway cars use distance-scale animation** (opacity + scale both reduce as the car heads west/north into the hills) — if you add another car, use the existing `midtown-highway-west/-east` keyframes as templates. Same pattern for the left-road `midtown-car-north`.
- **Preview is cached aggressively by both the dev server AND the browser** — when you make edits, rsync to `/tmp/kc_site/` AND reload the preview with `?v=<timestamp>` query on the page URL (not just the CSS). Brian pushed manually at end-of-session; no GitHub Pages URL inconsistencies surfaced.

### Deferred from v16 (next iteration candidates)

From Brian's mid-session feedback that didn't make it in yet:

- **More Plaza-area architecture on Brush Creek** — real Brush Creek Parkway has paved amphitheatres, tiered stone walls, and iconic foot-bridges beyond the single one we added. A second or third bridge, or a Plaza Fountain/amphitheatre element at x=600-700 might add Plaza-district authenticity.
- **Homepage-style polish for the Midtown scene** — Brian specifically mentioned matching the homepage's style more closely. Homepage-specific things the scene does NOT yet borrow: trail-following walkers, plane/bird fauna, streetcar disembark groups, ghost-toggle overlay of "what was lost," and the phase-legend + weather-toggle UI. Adding any of these would lift the scene to homepage parity.
- **Brush Creek reflections of Nelson/Garden** — the bridge already has a reflection ellipse. Extending reflections to the tall foreground buildings (OPP, Katz, Uptown, Nelson, Giralda) in the creek water would add depth and match the homepage river-reflection treatment.
- **Geographic nuance**: Brian asked for Kauffman Garden on the "north side" of the creek (done via the +380,-40 translate). Could extend this geographic-accuracy pass to other elements — e.g., the Plaza cluster should arguably be slightly west of where it is now relative to KCTV5.

### v16 carry-forwards (deferred from earlier sessions still pending)

All of these carry forward unchanged from v15:

- **Streetcar disembark groups** (homepage, not Midtown) — 2/3/4 person groups at the three homepage streetcar stops.
- **Sun/moon passing behind everything** (homepage) — clip-path plan was drafted in v15; still not implemented.
- **Trail-following walkers 13-15** (homepage) — Nichols shipped them but homepage walkers 13-15 not yet.
- **Banner plane spawn rate** (homepage) — Brian OK'd current rate for now.

---

## v17 session — Scene Gallery + Midtown polish + accuracy pass (2026-04-23)

v17 shipped across six iterative cache versions (?v=17a → ?v=17f) in one long session, responding to Brian's in-preview feedback.

### v17a — Scene Gallery (homepage headline)

New `.scene-gallery` section on `index.html`, inserted at the top of `<main>` between the marquee quote and the existing content sections. 6 miniature SVG tiles in a 3×2 desktop / 2×3 tablet / 1×6 mobile grid, each a 5:3 tile (viewBox 0 0 400 240) with its own TOD backdrop cycling in sync with the main homepage hero's 40s loop.

Tiles (source order):
1. **Downtown Skyline** — re-entry tile (href="#top"). Downtown silhouettes + 1 drifting cloud. Uses full TOD cycle.
2. **The Plaza at Night** — fixed dusk backdrop. Giralda + Clock Tower + Dome + Balcony Building + string lights with twinkling bulbs.
3. **Fountain Day** — fixed day backdrop. Two fountain silhouettes with animated jets + side arcs + 1 drifting cloud.
4. **J.C. Nichols Memorial** — full TOD cycle. Wide pool + stepped pedestal + 4 bronze horseman dots + Giralda background + stucco facade + 1 trail-following walker (16s cycle).
5. **Meyer Circle** — full TOD cycle. Pool + obelisk pedestal + 4 sea horse dots + boulevard tree variety (ellipse + cypress + maple) + central water jet.
6. **Midtown** — full TOD cycle. KCTV5 tower (central, with FAA red peak) + OPP slab + Katz with KATZ neon + Uptown with vertical marquee + Nelson colonnade + Haag Hall + shuttlecock dots + 1 drifting cloud.

Shared grammar: Each tile is a `<a class="scene-gallery-tile">` with a `<title>` first child in the SVG + descriptive `aria-label` on the anchor. Hover state: `scale(1.02) + gold glow`. Focus-visible state: same as hover for keyboard users. Reduced-motion: parks all cycling animations.

CSS added in one block at the bottom of style.css (~200 lines). Uses new `.scene-gallery-*` namespace. Reuses the existing `.tod-layer` + `.tod-dawn/day/dusk/night` keyframes so tile backdrops stay in sync with the hero's 40s cycle automatically — no new keyframes needed for the TOD cross-fade.

Gallery sits between `<main>` and the existing "Why This Site" intro section (line ~2000 in index.html). Does NOT replace "From the Blog" or "More to Explore" — additive.

### v17a Track B — Midtown walkers + bird flock

Brought Midtown to homepage peopled-scene parity. 6 walker groups (8 bodies total) + 1 V-formation bird flock. Uses existing `.hill-walker` + `.walker-coat-A..F` vocabulary. All placements listed in HTML comments (inside the `<g class="midtown-walkers">` group just before the closing `</svg>`).

Walker groups:
- **W1 couple** — trail-followers on south Plaza embankment, eastbound 55s loop. Two bodies (A + B), staggered 1.5s. `.midtown-walker-path-embankment-a/-b`.
- **W2 jogger** — trail-follower westbound on Kauffman Garden outer path, 42s loop. Slate palette (coat-D). `.midtown-walker-path-kauffman`.
- **W3 bridge walker** — trail-follower crossing the Plaza stone bridge, 32s loop with 40% visible window (12-13s on the bridge). `.midtown-walker-path-bridge`.
- **W4 seated figure** — static on east Kauffman Garden bench, `scene-walker-seated` class crops legs. Cream palette.
- **W5 parent+child** — static pair at Plaza bridge west abutment. Parent burgundy, child gold-light. Parent's arm points toward child.
- **W6 lateral walker** — static on mid-hill crest road. Rust palette.

Bird flock: `<g class="sky-birds midtown-birds">` containing `<g class="sky-bird-flock midtown-flock-v flock-v">` with 4 birds (lead/left/right/rear). Reuses the homepage's `.flock-v` layout verbatim. New `@keyframes midtown-bird-west-east` at 180s cycle (less frequent than homepage's 88-110s). Uses existing `bird-phase-visibility` gate → hidden at night.

### v17a Track C — JC Nichols fountain mini on Brush Creek

Miniature Nichols Memorial Fountain at x=640-720 on the south Plaza embankment, representing Mill Creek Park. `<g class="midtown-nichols-mini">` inserted between the creek layer close and streetcar system in midtown.html. Uses shared `.scene-*` vocabulary (pool rim, pedestal, jet, arcs, landscape lights) — **no new CSS classes**. In v17d the original 4 bronze horseman dots were replaced with a **single central person-shaped bronze statue** (arms raised, tiny torch/laurel orb on one hand via `.midtown-nichols-statue-torch`).

### v17a Micropatch — compare.html additions

Three new buildings inserted into `buildings/compare.html` in chronological order:
- **Uptown Theatre** (1928, ~55 ft + ~75 ft with marquee) — between Midland Theatre and Fidelity Bank
- **Katz Drug** (1934, ~35 ft) — between Jackson County Courthouse and Municipal Auditorium
- **One Park Place** (~1972, ~220 ft) — between City Hall and Town Pavilion, with a dashed `217 ft · Liberty` reference line across its face

ViewBox expanded 0 0 2400 1000 → 0 0 2720 1000. 11 existing buildings shifted right via `transform="translate(dx, 0)"` on their `<g data-building>` wrappers. No polygon rewrites. ARIA desc updated "sixteen" → "nineteen". "49-year gap" prose note rewritten to acknowledge OPP as the rare late-modernist exception.

### v17b — KCTV5 bulbs + KC Wheel debut

- KCTV5 tower's 9 rectangular LED blocks replaced with pinpoint bulbs scattered across the structure. First pass: 4 color classes (red/white/amber/cyan/green) with distinct blink patterns.
- **KC Wheel (Skyland KC Wheel)** added as new `<g class="midtown-kcwheel">` with static support structure + rotating inner group (rim + spokes + cabins + rim LEDs). Initial placement at x=290, y=500 (left of Katz). 75s rotation cycle. 12 cabins in 6 colors. 24 multi-color rim LEDs.
- BUG introduced: `transform: scale()` in `kctv5-bulb-twinkle` and `kcwheel-led-pulse` keyframes caused SVG circles to "cyclone" toward origin (0,0) since they had no `transform-origin` / `transform-box: fill-box`. Fixed in v17c.

### v17c — Bug fix + symmetric KCTV5 + scaled Wheel + density fill + statue

Responding to Brian's "flying specs in cyclone pattern" report + symmetry + scale feedback:

- **Cyclone bug fixed**: removed `transform: scale()` from both bulb keyframes. Now only opacity animates.
- **KCTV5 LEDs symmetric**: all accent bulbs now paired left/right across the mast centerline (x=930). Bulb sizes reduced (0.4-0.65 vs 0.55-1.1). Red FAA beacons + white strobes stay on centerline since the upper mast is thin.
- **KC Wheel shrunk + moved** to x=410, y=480 with r=13 (was r=22). Added 24 spoke LEDs at 35%/70% of each spoke. Kept 12 cabins. Reduced rim LEDs to 12.
- **Katz + Uptown shrunk** (~35% and ~25% horizontal reduction respectively) to reduce visual focus — Katz is no longer a functioning store.
- **Midtown commercial row density fill** added via `<g class="midtown-commercial-row">` with 3 small buildings: 3-story brick apartment (between OPP and Katz), 2-story corner shop with awning (between Katz and Uptown), narrower 3-story flat east of that. New `.midtown-commercial-*` CSS classes.
- **Nichols fountain shrunk** (pool rx 40→30) + 4 horseman dots replaced with single bronze person statue + torch orb.

### v17d — Accuracy pass + mobile viewport fix

Brian's real-life research pass: several landmarks were drawn inaccurately.

- **Uptown Theatre sign**: vertical roof marquee replaced with **horizontal UPTOWN blade sign** on the side of the building. Real Uptown has a horizontal marquee, not vertical.
- **Katz Drug clock tower**: added a corner clock tower (square body, circular clock face with hour ticks, finial cap, small square upper stage). New classes: `.midtown-katz-clockface`, `.midtown-katz-clockhand`, `.midtown-katz-clocktick`, `.midtown-katz-finial`, `.midtown-katz-clockhalo`, `.midtown-katz-clockglow`.
- **Katz cursive script signage**: "KATZ" block letters replaced with italic Playfair "Katz" approximating the cursive script. New classes: `.midtown-katz-script`, `.midtown-katz-script-neon`.
- **Katz triple-band parapet**: single cap line replaced with a multi-band Streamline parapet (4 horizontal lines wrapping the top).
- **KC Wheel improvements**: moved from (410, 480) to (360, 502); shrunk to r=8; support redesigned as short A-frame with base platform below wheel bottom edge (no more legs passing through the hub).
- **Mobile viewport fix**: new shared file `js/responsive-hero.js` includes on 8 pages (`fountains/*.html` + `fountain-day.html` + `neighborhoods/midtown.html`). It watches viewport width and toggles the SVG's `preserveAspectRatio` attribute between `xMidYMid slice` (desktop, fills container) and `xMidYMid meet` (≤640px, letterboxes the scene top/bottom so full width is visible). Fixes the "can't see left/right details on fountain detail pages" issue on mobile. The TOD layers fill the container behind the SVG so letterbox strips show sky color rather than black bars.

### v17e — More colorful KCTV5 + Nelson end pavilions + wheel repositioned

Responding to "flying specs during night" (already fixed in v17c) + "tower needs more color" + "Nelson pillars" + "wheel in water":

- **KCTV5 additions**: 22 new accent bulbs across 4 new color classes — magenta (`#E060D8`), pink (`#FF8AC0`), orange (`#FFA040`), blue (`#6BACE0`). All symmetric pairs. Total bulb count 35 → 55.
- **KCTV5 shorter + base out of water**: wrapped the `.midtown-kctv5` group in `transform="translate(0, 26) scale(1, 0.92)"`. Tower ~8% shorter, base rendered at y=560 (above creek water y=572+).
- **KC Wheel** moved to (420, 480) — up and right into the open sky gap between the left highway's top and downtown cluster.
- **Nelson columns thickened** from width 4 → 6 and capitals widened rx 3 → 4.
- **Nelson end pavilions added**: two new 26×62 rect pavilions at x=1178 and x=1516 flanking the wings. Each with a parapet cap (3u tall), one tall central window (8×22), and two small flanking ground windows (5×10). New `.midtown-nelson-endpavilion` CSS class. All 6 pavilion windows have night glows.

### v17f — KCTV5 further back + Nelson column centering

- **KCTV5 further back**: transform updated to `translate(93, 47) scale(0.9, 0.85)` — 10% thinner, 15% shorter. Base lifted from y=560 to y=540 (planted on the near-hill crest rather than the foreground ground line). Peak dropped from y=83 to y=100. Net rendered height 451px → 417px.
- **Nelson column centering**: column positions were skewing right (left margin 15u, right margin 6u). Recomputed to x=1299, 1322, 1346, 1369, 1392, 1415 — gaps of 23-24u each, **17u margin on both sides**. Ionic capital ellipses shifted to match new column centers.

### Caveats carrying forward

- **Scene width discrepancy** is still a live open question (see BRAINSTORM_SEED for v18 focus). Homepage uses `.skyline-svg-container { height: 40vh; min-height: 260px; max-height: 520px }`, which creates a short-and-wide container aspect. Midtown uses `.midtown-hero-scene { height: 560px }`, a taller container. Because both scenes use viewBox 1600×600 with `preserveAspectRatio="xMidYMid slice"`, they clip differently — homepage clips top/bottom, Midtown clips sides. When the homepage skyline scene is reused on `neighborhoods/downtown.html` (Brian's next plan), the width mismatch will come to a head and needs a cross-scene plan.
- **v17d responsive-hero.js** is the responsive-SVG mechanism for fountain + Midtown pages. Homepage skyline does NOT use this script — the homepage has its own container-height dance and has been tuned with `slice` clipping accepted. If that changes, add the script to index.html and the selector list.

### Global cache is now at `?v=17f` across 118 HTML files.

---

## v18 session — Focus A (downtown skyline reuse) + Focus B (18th & Vine perspective view) (2026-04-23)

v18 shipped in a single long session at cache `?v=18a`. Two big pieces + a course-correction mid-session.

### v18 Focus A — Homepage skyline reused on the Downtown neighborhood page

**Pattern adopted: "the scene owns its container."** Rather than forcing every neighborhood hero into one shared container spec, each scene keeps its own canonical container. The homepage skyline uses `.skyline-svg-container` (40vh / 260-520px, short-and-wide). The Downtown neighborhood page now reuses that exact scene + container, because the skyline composition was tuned for short-and-wide. Midtown continues to use `.midtown-hero-scene` (560px). Future neighborhood scenes get their own container spec matched to their composition.

**What shipped on `neighborhoods/downtown.html`:**
- The entire `<svg class="skyline-svg" viewBox="0 0 1600 600">...</svg>` block was copied verbatim from `index.html` into a new `<section class="skyline-hero skyline-hero-downtown">` section above the existing neighborhood detail content.
- The section's TOD backdrop (6 `.tod-layer` divs), phase legend, weather toggle (Clear/Stormy/Snowy), and interactive buildings all work identically to the homepage.
- Overlay customized for the neighborhood: eyebrow "Kansas City Neighborhoods" + h1 "Downtown / Kansas City" + tagline *"The view from the bluffs — the same skyline the homepage shows, while you read on."*
- Breadcrumb moved back above the hero (standard neighborhood-page convention).
- Ghost overlay NOT included (already removed from homepage during v13 refinement).
- **Weather toggle IDs are the SAME as the homepage** (`weather-clear`, `weather-stormy`, `weather-snowy`, `name="weather"`). This is the low-friction choice Brian approved — the two pages are independent DOM loads so there's no real conflict, and namespacing would have forced a CSS refactor with zero real benefit. If the pages ever share a DOM (iframe, MPA-to-SPA), revisit.

**New: `scripts/sync_skyline_scene.py`** — keep the homepage skyline SVG in sync on its reused pages. Source of truth is `index.html`'s `<svg class="skyline-svg" ...>...</svg>` block. Targets list (extensible): `neighborhoods/downtown.html`. Usage:
- `python3 scripts/sync_skyline_scene.py` — sync all targets
- `python3 scripts/sync_skyline_scene.py --check` — report drift, exit 1 if any drift found

The script ONLY rewrites the SVG block — it does NOT install the surrounding `.skyline-hero` wrapper, rewrite CSS, or touch the weather-toggle radios. Initial install on a new target is a one-time manual migration; ongoing SVG edits propagate via the script. **Run the script after any homepage skyline SVG edit.**

### v18 Focus B — 18th & Vine signature scene (perspective view)

**Major scope pivot mid-session.** Chat brief specced a flat elevation view ("standing at the intersection looking across the street"). ~80% of that was built before Brian flagged a better idea — a **perspective view looking WEST down 18th Street from The Paseo**. The flat SVG got scrapped and the page was rebuilt from scratch as a 1-point perspective composition. This gives the scene genuine depth, ties into the real-life pedestrian-plaza transformation underway at 18th & Vine, and is the site's first perspective view (homepage + Midtown + fountains are all flat elevations or plan views).

**File: `neighborhoods/18th-vine.html`.** Replaces the previous photo `.detail-hero` with a new `<section class="vine-hero-scene">` containing:

**Composition (perspective looking west down 18th from The Paseo):**
- Vanishing point at approximately (1000, 360) in the 1600×600 viewBox. Upper-middle-right of frame.
- **Foreground LEFT** (full-scale): Charlie Parker statue (bronze ~170u tall figure with fedora hat, playing alto sax — curved tube silhouette with flared bell, pearl keys, keyguard ring) on a stepped plinth + "CHARLIE PARKER" plaque + plaza floor + low retaining wall. Next to it, the big 18TH/VINE street sign post (tall pole with 18TH blade above VINE blade, finial ornament). Planter with shrub at far-left corner, bench on plaza.
- **Foreground RIGHT** (full-scale): **Paseo YMCA** (1914) — castellated stone "castle" silhouette rising from y=216 to y=540. Crenellated parapet with 12 crenellations, two corner turrets with their own mini-crenellations, three belt courses (stone horizontal banding), rusticated stone ground floor (with horizontal + vertical stone joint lines), three Romanesque-arched window groupings on the 3rd floor, rectangular double-hung windows with mullions on the 2nd floor, a central arched entry with keystone + double doors, "1914" cornerstone plaque, "PASEO YMCA" lintel above entry. This is the historical building where the Negro Leagues were founded in 1920.
- **Mid-ground LEFT receding** (south side of 18th): Mutual Musicians Foundation (gable-front bungalow with porch columns + arched upper window + MUTUAL MUSICIANS FOUNDATION sign), then Jazz Museum + Negro Leagues Baseball Museum (1997 modernist brick + glass with stepped parapet + glass strips + lit JAZZ MUSEUM sign), then Gem Theater at back (small cream terra-cotta with 3 upper Palladian windows + marquee canopy + vertical GEM blade sign rising above roofline).
- **Mid-ground RIGHT receding** (north side of 18th): Street Hotel (4-story brick with 4×4 window grid + cornice + street-level canopy + STREET HOTEL sign), then Vine Street Brewery (2-story brick commercial with window bands + storefront + VINE STREET BREWERY sign).
- **Vanishing point backdrop**: Arthur Bryant's faint silhouette with ARTHUR BRYANT'S sign, plus 4 small distant downtown silhouettes at low contrast.
- **Street**: Perspective pavement polygon receding to VP, near-viewer crosswalk bars in perspective (8 trapezoidal stripes), dashed centerline receding, left + right curb hairlines converging at VP, left + right sidewalks flaring toward viewer, below-frame ground plane for foreground elements.
- **Streetlamps**: 4 lamps at decreasing scales (foreground lamp ~180u tall, mid lamps ~110u, far lamp ~78u) for depth cue.
- **Musicians** (mid-distance, on the left sidewalk near the crosswalk): sax player, upright bass player, trumpet player. All silhouettes with warm bronze instruments.
- **Walkers**: 4 walkers on staged perspective-scaling keyframes — one foreground walker grows toward the viewer via scale 0.5→1.6, one left-mid and one right-mid walker recede scale 0.6→1.3, one deep-distance walker stays small 0.45-0.85. Reuses `.hill-walker` + `.walker-coat-A..F` palette.
- **Night effects** (gated to dusk→dawn via shared `.building-night-lights` class, same 40s cycle): window glows on MMF (every window lit — jam session feel), YMCA Romanesque arched windows (selective — reading-room look), YMCA rectangular upper windows, Street Hotel window grid (sprinkled asymmetric), Vine Street Brewery windows + lit sign, Gem Theater lit sign + halo, Jazz Museum lit sign + halo, streetlamp halos (4 lamps, radial gradient halos scaled by distance), 18TH/VINE signpost lit text overlay, Paseo YMCA lintel lit.
- **Music notes** (`♫` `♪` `♯`) drifting up from the roof of Mutual Musicians Foundation — 3 notes, staggered 12-14s drift cycles with fade, night-only via `.building-night-lights`.

**Below the hero** — italic caption: *"The intersection at jazz hour. The Gem Theater's blade sign burning warm, the Mutual Musicians Foundation lit from within, Charlie Parker cast in bronze on the plaza — and the downtown skyline on the far horizon beyond."*

**CSS added** (~430 lines at bottom of `style.css`): `.vine-hero-scene` + `.vine-hero-backdrop` + `.vine-hero-svg` + `.vine-hero-overlay` + `.vine-hero-caption` wrappers (responsive 560→440→360 heights); `.vine-sky-stars`, `.vine-sky-clouds`, `.vine-cloud-a/-b`; `.vine-horizon-building`, `.vine-bryants-*`; `.vine-street`, `.vine-street-recede`, `.vine-sidewalk-*`, `.vine-curb`, `.vine-street-centerline`, `.vine-crosswalk polygon`; `.vine-building-body` (+.vine-deep), `.vine-building-accent`, `.vine-building-brickline`, `.vine-building-window`, `.vine-building-door`; `.vine-gem-facade`, `.vine-gem-canopy`, `.vine-gem-blade-frame`, `.vine-gem-blade-text` (+ -neon); `.vine-mmf-body`, `.vine-mmf-porch-*`, `.vine-mmf-sign`; `.vine-museum-mass`, `.vine-museum-glass`, `.vine-museum-entry-frame`, `.vine-museum-sign-*` (+ -lit); `.vine-brewery-sign` (+ -lit + text); `.vine-plaza-floor`, `.vine-plaza-wall`, `.vine-statue-plinth`, `.vine-statue-label`, `.vine-statue-body`, `.vine-statue-hat`, `.vine-statue-sax-tube`, `.vine-statue-sax-neck`, `.vine-statue-sax-bell`, `.vine-statue-sax-key`, `.vine-statue-sax-keyguard`; `.vine-streetsign-pole`, `.vine-streetsign-blade`, `.vine-streetsign-text-big` (+ -lit), `.vine-streetsign-finial`; `.vine-ymca-*` (body, crenellations, turret, beltcourse, rustication, window, window-rect, mullion, entry, keystone, plaque, lintel); `.vine-streetlamp-*` (with size variants `.vine-streetlamp-mid` / `-far`); `.vine-musician-*` (body, hat, sax, sax-key, bass-*, trumpet-*); `.vine-walker-path-fg/-left-mid/-right-mid/-deep` + 4 perspective-scaling keyframes; `.vine-night-window-warm`, `.vine-night-glass-warm`, `.vine-night-sign-lit`, `.vine-lamp-halo-glow`, `.vine-lamp-core-lit`, `.vine-neon-halo-*`, `.vine-music-note-*` + `@keyframes vine-note-drift`; `.vine-bench-*`, `.vine-planter-*`; plus a comprehensive `prefers-reduced-motion` override block.

**Wiring:**
- `js/responsive-hero.js` selector list expanded to include `.vine-hero-svg`.
- `<script defer src="../js/responsive-hero.js"></script>` added to `neighborhoods/18th-vine.html`.
- TOD backdrop uses the shared `.tod-layer` vocabulary on the 40s cycle, auto-syncing with homepage hero + all other signature scenes.

**Scene Gallery swap**: The homepage Scene Gallery's Tile 5 (previously Meyer Circle) was replaced with an 18th & Vine tile — a miniature perspective street view in the 400×240 tile viewBox showing: perspective pavement triangle, VINE signpost + Parker figure foreground-left, YMCA castle with crenellations + arched windows foreground-right, receding silhouettes, streetlamp, musicians cluster, ARTHUR BRYANT's silhouettes near VP. Meyer Circle remains reachable via the Fountains dropdown.

### Mid-session pivot

~80% through Phase 2 of the flat-elevation build (Phase 1 structure + Phase 2 musicians/walkers shipped; Phase 3 neon mid-edit), Brian proposed a perspective view. This was a better idea — genuinely unique composition, ties to real-life pedestrian-plaza transformation — so the whole SVG was scrapped and rebuilt. Net loss of ~1.5 hours of flat-view work, net gain of a much more visually interesting scene.

**Take-away for future sessions**: don't lock in scrolling-complete builds before the composition is validated. Quick-and-dirty first drafts of the OVERALL composition (even crude block-out stand-ins) let Brian see the layout and redirect before detail work. Would have saved the flat-elevation effort.

### Implementation notes worth remembering

- **Perspective geometry**: VP at (1000, 360). Left curb: (0, 560) → VP. Right curb: (1600, 560) → VP. Street pavement polygon is the pentagon-ish area below y=560 + the receding triangle above. Near-viewer sidewalks FLARE OUT below-frame to give the foreground elements (Parker plaza, YMCA base) a natural ground plane.
- **Building scale by distance**: foreground elements (Parker, YMCA, VINE sign) are at full SVG scale; mid-ground elements progressively smaller per depth; deep-distance elements at ~30-40% scale at the VP. Walkers use `transform: scale()` in keyframes with the scaling tied to progression along the path.
- **Perspective crosswalk**: 8 trapezoidal polygon stripes between the near curb and a far crosswalk line — each stripe gets narrower at its far end. Uses `fill: rgba(245,235,210,0.22)` + a thin stroke for the white-ish crosswalk paint effect.
- **Parker sax**: Don't use a single filled path for a saxophone shape — it reads as a blob. Instead use a stroke-only tube (`.vine-statue-sax-tube`, stroke-width 3) for the body curve, a separate filled bell shape (`.vine-statue-sax-bell`) at the terminus, a thin neck (`.vine-statue-sax-neck`), pearl-key circles along the tube, and an octave keyguard ring. This gives a proper alto sax silhouette at scene scale.
- **Paseo YMCA crenellations**: drawn as individual 14×16 rects positioned above the parapet line (y=200) with 12u gaps between. Corner turrets at the far left + far right are 20×32 rects with their own miniature 3-rect crenellation groups. Not a single path — many discrete rects gives a cleaner "battlements" read.
- **Rusticated stone hatching**: a small `<g>` of horizontal + vertical line segments at varied positions across the ground floor of the YMCA, at 0.45 stroke-width / 0.28 opacity. Suggests masonry joints without looking like graph paper.
- **Music notes**: `<text>` elements with unicode musical glyphs (`♫` = U+266B, `♪` = U+266A, `♯` = U+266F) drifting up from MMF's roof area. `@keyframes vine-note-drift` scrolls them -42u while fading to 0 opacity. Gated to night via `.building-night-lights` wrapper.
- **Walker perspective scaling**: the `.vine-walker-path-fg` walker comes from (560, 440) at scale 0.5 and grows to (1380, 600) at scale 1.6 over 42s — rendering as "approaching the viewer from down the street." The other three walker paths scale 0.6→1.3 or stay small in the distance. Don't confuse these with the homepage's `.hill-walker-N` classes which use different keyframes.
- **Sync script architecture**: the script uses a regex to find `<svg class="skyline-svg"[^>]*>` through the next `</svg>`. This works because the homepage has exactly one SVG with class `skyline-svg`. If you ever add a second SVG with that class (e.g. an inline scene-gallery miniature that happens to use the same class name), the regex will match the first one. Watch for this if you extend the class vocabulary.

### Deferred from v18

- **Ghost toggle for 18th & Vine** (demolished buildings overlay). Brian chose to skip this for v18 so the scene ships with only known-accurate buildings. Candidate demolished buildings for a future v18b if desired: Eblon Theater, Lincoln Electric Building, early residential tenements from the 1920s district footprint. Historically uncertain — Brian's local knowledge should drive the selection.
- **Vine Street Brewery facade accuracy**: rendered as a generic brick commercial warehouse. Could be refined if Brian has reference photos.
- **Mutual Musicians Foundation exterior**: rendered as a gable-front brick building with porch columns. Accurate to the "small converted Victorian home with porch" type, but the real MMF's exact window pattern and proportions could be refined.
- **Arthur Bryant's at VP**: rendered as a tiny silhouette + sign. Acceptable at perspective scale but deliberately small.

### v18 carry-forwards (deferred from earlier sessions still pending)

All of these carry forward unchanged from v17:
- **Sun/moon occluders** (homepage) — clip-path plan drafted in v15; still not implemented.
- **Homepage walkers 13-15** (trail-following along the on-hill trails).
- **Banner plane spawn rate** — still at ~25% of 180s cycle on homepage. Brian OK'd current rate.
- **Midtown water reflections** (Brush Creek) — extending bridge reflection pattern to Nelson/Giralda/OPP/Katz/Uptown.
- **Midtown ghost overlay** — Lost Kansas City content for Midtown.
- **Streetcar disembark groups** (homepage) — 2/3/4 person groups at streetcar stops.

### Global cache is now at `?v=18a` across 118 HTML files.

### v18b/v18c — Mid-session reworks of 18th & Vine scene

Between the v18a perspective view ship and end-of-session, Brian gave two substantive course corrections that drove full reworks:

**v18b — Pull the camera back.** The original v18a scene placed Parker statue + VINE signpost in immediate foreground-left and YMCA as a full-height foreground-right element, with the street receding between them. Brian proposed moving the viewer back (east of The Paseo on 18th, looking west), so The Paseo itself becomes the foreground cross-street and the whole district sits across the road. Net composition change:
- Foreground is now The Paseo roadway (N-S crossing street with center median + median trees + crosswalk + near sidewalk + far sidewalk + near/far curb hairlines).
- Across The Paseo: Sign Building with the **real iconic 18TH & VINE DISTRICT neon sign** attached to its east-facing wall (red neon "18th &" cursive + green neon treble clef + big bold red neon "VINE" + white "DISTRICT" banner — drawn per the attached-sign photo Brian sent, NOT a street-corner signpost).
- Paseo YMCA pulled back to mid-right (smaller than v18a but still prominent with crenellations + turrets + Romanesque arched windows + rusticated base + "PASEO YMCA" lintel + "1914" plaque).
- Continuous street wall: buildings on the south side (Sign Building → commercial infill → Jazz Museum → Gem Theater with blade → far commercial) and north side (YMCA → commercial infill → Street Hotel → commercial infill → Vine Street Brewery) are now adjacent with no gaps between them.
- Arthur Bryant's silhouette + downtown silhouettes at VP (~810, 340).

**v18c — Parker bust across Paseo + higher-quality people.** Brian's follow-up: Parker should be on the EAST side of The Paseo (accurate location for the real memorial at 17th & Paseo) — moved into mid-ground position to the LEFT of the sign building, scaled smaller. Replaced Parker figure with just a HEAD sculpture (bust with head + shoulders + hair + closed-eye features), matching the real 17-foot-tall bronze head. Also upgraded all people silhouettes:
- Musicians (sax, upright bass, trumpet): brimmed fedora with hat band, skin-toned head with eye/mouth hints, collar + shirt + tie visible, suit jacket with lapels, articulated arms with hand dots, legs with stance, shoes. Sax has curved tube + flared bell + pearl keys. Bass has F-holes + bridge + tailpiece + 3 strings + tuning pegs + endpin. Trumpet has mouthpiece cup + 3 valve posts + tuning slide loop + flared bell.
- Walkers: 4 figures at varied perspective distances (FG walker grows approaching viewer, 2 mid-ground walkers cross the district sidewalk, 1 deep walker near VP). Each has brimmed hat + hat band + skin-toned head + neck + coat with lapels + shirt + tie + arms + hands + legs + shoes. Coat colors: burgundy / gold / rust / cream.

### Implementation notes for v18b/c

- **Iteration pattern was costly**: original flat view was built then scrapped for perspective (v18 mid-session). Then perspective v18a was reworked for pulled-back camera (v18b). Then Parker was relocated + quality lifted (v18c). Each iteration was ~1.5 hours of work. Lesson for future scene builds: show the user a rough block-out (crude shapes at depth, no detail) and validate composition BEFORE building detail. Three rounds of detailed-then-scrapped work in one session is not sustainable.
- **Perspective geometry**: VP at (~810, 340) — slightly LEFT of center, different from v18a's (1000, 360). Shifted because the pulled-back camera reveals more horizontal expanse.
- **The Paseo foreground**: simulated with horizontal pavement bands + central median + median trees — NOT a receding surface (The Paseo crosses the view, so it's just a horizontal strip). Crosswalk zebra stripes mark where 18th continues west.
- **Sign building placement**: at x=260-420 (wide), with the attached sign panel at x=272-408 (VINE letters huge, DISTRICT strip below). The sign is both the structural feature AND the anchor of the scene.
- **Parker memorial (v18c)**: bust-only on a brick plinth at mid-ground position x=138-200, y=398-492. Scaled smaller than v18a/b versions. Hair + closed-eye features drawn with strokes.
- **People quality**: all figures now have 15+ shape elements each (was 7 in v18a). Coat colors set via `.vine-walker-coat-*` modifier classes, with arm fill cascaded via `.vine-walker-path-*` selectors so arms match coat. Fedora hat is a universal detail (jazz-era convention).
- **Scene Gallery tile** (homepage) still shows the v18a composition in the tile miniature — hasn't been reworked for v18b/c/d changes. Acceptable since the tile is a small preview and reads as "jazz district scene" regardless. Can refine in v19 if desired.

**v18d — Sign accuracy + receding detail + second cross-street.** Brian flagged the sign still didn't match the photo + the receding buildings needed more quality + a smaller second cross-street for geography. Fixed:
- **Sign accuracy**: reworked the 18TH & VINE DISTRICT sign to match the real sign's layout. "18th &" is now SMALL red cursive at top-LEFT (not center). Treble clef is BIGGER green at top-RIGHT. "VINE" is MASSIVE (54px block letters) dominating the center. "DISTRICT" banner is WIDER than the panel, extending past its sides (like the real sign's banner). Two-layer day/night approach unchanged.
- **Receding building detail**: added cornice + parapet + brick course hairlines to Lincoln-style commercial row; added a "LINCOLN BLDG" small lit sign; added GEM marquee bulb strip under the canopy (lit at night via building-night-lights); added a church spire silhouette (back-left) and a water tower silhouette (back-right) for density. More passes still needed on deeper buildings — flagged as v19 work.
- **18th & Vine cross-street signpost**: Brian requested that the actual "18th & Vine" intersection be visible in the scene (one block west of The Paseo) with a real street-corner signpost — same grammar as the earlier vine-streetsign pattern. Added a small cross-street pavement patch perpendicular to the receding 18th Street at y≈452, with its own crosswalk zebra bars, and a small street-corner signpost at the NW corner (vertical pole + 18TH blade + VINE blade + finial + base). This grounds the scene's geography: buildings EAST of Vine (between Paseo and Vine) vs WEST of Vine (next block) have a clear spatial anchor.

### Implementation notes for v18d

- **District sign typography**: match the real photo carefully. "18th &" uses italic Playfair 15px, red (220,70,50). Clef uses Playfair 30px, green (70,200,120). "VINE" uses Josefin Sans 900-weight 54px, red. "DISTRICT" uses Josefin Sans 700-weight 12px with 0.28em letter-spacing, cream on black. Night-lit versions add drop-shadow filters.
- **Second cross-street**: a horizontal trapezoid crossing the receding 18th pavement. Pavement polygon: `700,446 796,446 800,462 696,462`. Crosswalk bars perpendicular to the direction of travel. The small signpost uses `.vine-streetsign-*-small` classes with thinner strokes + smaller fonts (5.5px for blade text).
- **Geographic anchoring**: the 18th & Vine cross-street gives the scene a real-world coordinate. Buildings east of it = between Paseo and Vine block. Buildings west of it = next block westward (where Jazz Museum, Gem Theater historically sit). This is a useful reference for future iterations adjusting building positions for geographic accuracy.
- **Building layout per Brian's v18d geographic direction**:
  - LEFT side (south of 18th) east-to-west: Sign Building (at 18th & Paseo SW corner) → **Blue Room** at the 18th & Vine SE corner with its iconic red cursive neon "Blue Room" sign → [cross-street] → **Negro Leagues + Jazz Museum** (relabeled combined lit sign) → commercial row → Lincoln Building + far-back silhouettes → church spire
  - RIGHT side (north of 18th) east-to-west: Paseo YMCA (at 18th & Paseo NE corner) → commercial infill → Street Hotel → **Gem Theater with iconic vertical GEM blade sign** (MOVED from left side per Brian's direction) → far-back silhouettes → water tower
  - Gem was previously on the left (south side). Moved to right (north side) because Brian placed it there for geographic accuracy.
- **Blue Room iconic sign**: red cursive italic Playfair text "Blue Room" on a dark panel. Night-lit version adds drop-shadow glow. Approximates the real Blue Room's neon sign style.

**v18e — Final session polish** (last iteration, Brian's late-session feedback):
- **Paseo/18th intersection**: broke the central median + lane hairlines + curbs at x=620-790 to create a clear "turn-in" to the district. Added rounded curb corners at all 4 intersection corners. Added crosswalks at both north and south sides of Paseo (where pedestrians cross 18th). The intersection now reads as an actual 4-way intersection, not a continuous boulevard with a crosswalk painted on top.
- **18th & Vine cross-street**: widened from a small trapezoid patch to a proper cross-street. Vine pavement now extends left to x=648 and right to x=852 past 18th's curbs, with curb corners at the 4 sub-intersection corners and small crosswalks at the east/west sides.
- **Residential density at VP**: replaced the downtown silhouettes at the vanishing point with small residential house silhouettes (gable fronts + shotgun flats) and three tiny tree dots, matching the real context of residential density around 18th & Vine.
- **Arthur Bryant's moved to LEFT**: repositioned from the VP center to back-left (x=366-432, y=408-442) with its own brick silhouette + ARTHUR BRYANT'S sign strip. Behind/west of the Negro Leagues + Jazz Museum in the receding south row.
- **Vine Street Brewing promoted to front-right**: renamed former infill-north-a to `vine-brewery` with a bold "VINE ST BREWING" sign. Position x=1080-1180 (between YMCA and Street Hotel — toward-the-front right side per Brian's direction).
- **Mutual Musicians Foundation (Local 627) moved to right side** per Brian's direction: inserted at x=930-1000 between Street Hotel and Gem Theater. Gable-front brick bungalow with porch, arched upper window, "LOCAL 627" sign, window glows for night "jam session" feel.
- **Gem Theater moved further back**: from x=850-930 to x=810-880 (smaller + further west on the right side). GEM blade at x=840-850 is smaller but still iconic.
- **District sign (last iteration)**: stroke-outlined text for a more authentic neon-tube look. "VINE" letters are now outlined rather than solid red fill, mimicking neon tube construction. "18th &" + clef also use stroke-outline. Night-lit versions keep fill + drop-shadow for glow. Added art-deco-ish panel frame (gold-stroked dark backer + thin inner border).

### Implementation notes for v18e

- **Intersection geometry**: Paseo intersection at y=492-572 breaks open at x=620-790 (18th crossing). Cross-street at 18th & Vine at y=446-462 extends Vine pavement from x=648-852 (wider than 18th's curbs). Both use curb corner rounds for realism.
- **Building order (final, right side east-to-west)**: Paseo YMCA (1180-1380) → Vine Street Brewing (1080-1180) → Street Hotel (1000-1080) → Mutual Musicians Foundation (930-1000) → Gem Theater (810-880) → far-back silhouettes.
- **Building order (final, left side east-to-west)**: Sign Building with DISTRICT neon (260-420) → Blue Room (440-540) → [cross-street at 696-800] → Jazz Museum + Negro Leagues (320-440) → Arthur Bryant's (366-432, back layer) → Lincoln Building silhouette + commercial row + church spire + residential density silhouettes.
- **Residential density VP**: 13 small house silhouettes (gable fronts + flat bungalows) + 3 tree silhouettes clustered at y=364-388. Replaces the earlier downtown silhouettes.
- **Neon-tube text technique**: `fill: none; stroke: rgba(220,70,50); stroke-width: 2.4; paint-order: stroke;` on `.vine-district-sign-vine`. Gives outlined letters that read as neon tube construction. Night-lit version uses both fill + stroke + drop-shadow for the "lit" look.

### Deferred from v18 (priority for v19 session)

Brian explicitly flagged these during v18e as still needing work — they're the priority targets for v19:

1. **Receding buildings quality pass** — Brian noted that quality "drops as it goes back farther" in the scene. The foreground buildings (Sign Building with neon, YMCA castle, Blue Room, Vine Street Brewing) have good detail. But the mid-to-back buildings (MMF, Gem Theater, Lincoln Building, church spire silhouette, residential density) get progressively less detailed. Next session should upgrade: more architectural articulation on the mid-ground buildings, distinctive features on each (MMF front porch detail, Lincoln Building cornice, church spire with cross + clocks, etc.).
2. **District sign neon-tube accuracy** — Brian still wants the big VINE sign to more closely match the real photo. The stroke-outline approach is closer but could use: proper red glow (currently dropshadow), precise letter proportions matching the real sign, maybe an outer frame/border matching the real panel edges.
3. **Building street alignment** — Brian noted "everything needs to have a pass on how to align with the street more realistically." Some buildings may be floating slightly above or sinking below the sidewalk line. Need to audit each building's base-y coordinate vs the wall-line formula to ensure consistent grounding.
4. **Ghost toggle** — still deferred from v18a.
5. **Scene Gallery tile** — still shows the v18a composition, not the pulled-back v18b-e version.
6. **Left-side mobile clipping** — at narrow desktop viewports (<1300px), Parker + sign building start getting clipped on the left. Fixable by shifting all left-side elements another 50-100 units right, OR by changing the container aspect ratio.

### v18f — Final session additions (10+ iteration rounds total)

Brian's rapid-fire feedback continued through the session with more adjustments:

- **Intersection realism**: removed the "extra rectangle below the road" (near-sidewalk strip) so The Paseo pavement extends to the bottom of the scene. Moved mid-distance streetlamp (Lamp C) from the middle of the road to the south sidewalk. Widened the 18th & Vine cross-street with pavement extending north and south of 18th (short trapezoidal extensions) to create visible "spaces through the buildings" where Vine Street continues beyond the immediate intersection.
- **Arthur Bryant's to LEFT back**: moved from VP area to x=366-432, y=402-442 (back-left in the south-side receding row, with its own brick silhouette + "ARTHUR BRYANT'S" sign).
- **Residential density at VP**: replaced the earlier downtown silhouettes at the vanishing point with 13 small house silhouettes (gable fronts + flat bungalows) + 3 tiny trees. **Extended residential density** across the whole background — added rows of house silhouettes on the far-left (x=40-232), behind-south-side (x=240-530), behind-north-side (x=850-1078), and far-right (x=1406-1598). All at low contrast so they read as BACKGROUND texture suggesting residential neighborhoods surrounding the district.
- **Blue Room sign overhaul** — per Brian's reference photo: redesigned as VERTICAL "BLUE" letters in blue neon outline + piano-keys strip + "ROOM" banner + curved chase bulbs on the right edge. Later shrunk to width 28 (was 48) mounted at the RIGHT corner of the Blue Room facade so it doesn't overtake the building. Chase bulbs animate with 1.6s cycle, 8-step stagger. Only the chase bulbs flash dramatically at night; the BLUE letters + ROOM glow subtly.
- **Gem Theater refined** — per Brian's reference photo: green neon outlined GEM letters (was gold), art-deco blade shape with flared cap + curved flourish + red half-circle accent below letters, red horizontal marquee strip on the canopy. Classical arched upper window with keystone. MOVED farther west (x=886-950, was x=810-880) per Brian's "farther up the street".
- **District sign final pass**: stroke-outlined text on "VINE" (neon tube look, not solid fill). "18th &" small red cursive top-left, green treble clef top-right, massive outlined "VINE" center, wider "DISTRICT" banner. Art-deco panel frame with gold stroke.
- **Charlie Parker head refined**: better anatomy — defined jawline, rounded skull, full hair mass with texture, ear hints, proportional features, subtle face shading via stroke opacity.
- **Second cross-street treatment**: widened to span x=580-920, with short perpendicular pavement extensions both north (toward VP) and south (toward FG) so Vine Street visually continues beyond 18th. Curb corners rounded at all 4 intersection corners. Zebra crosswalks at east + west entry points.
- **Building rearrangement (right side)**: per Brian's final direction —
  - Gem Theater moved from right-front to FARTHER WEST (x=886-950).
  - Mutual Musicians Foundation is now FIRST on the right after Vine (x=804-876, immediately west of the cross-street).
  - Vine Street Brewing stays front-right (x=1080-1180) toward the viewer.
  - Street Hotel stays west of Brewing (x=1000-1080).
  - Paseo YMCA stays FG-right (x=1180-1380).
- **Negro Leagues Baseball Museum as separate building**: added at x=548-620 on the south side (RIGHT of Blue Room in scene coords) with its own modernist brick-and-glass mass + baseball silhouette accent + "NEGRO LEAGUES" lit sign. Jazz Museum relabeled to just "JAZZ MUSEUM" (was combined "NEGRO LEAGUES · JAZZ MUSEUM").
- **Blue Room building facade**: updated to include storefront details + brick courses + upper windows; building sign mounted at right corner, not centered.

### Implementation notes for v18f

- **Blue Room sign technique**: vertical BLUE letters use `font-family: Josefin Sans; font-weight: 800; fill: none; stroke: rgba(100,180,240)`. Night-lit version adds fill + bright glow. Chase bulbs use 8 named delay classes (-0s to -1.4s) on a 1.6s `steps(1)` keyframe that toggles bright/dim. Piano keys rendered as `<rect>` bg + `<line>` dividers + 2 short black-key rects.
- **Gem Theater art-deco blade**: layered composition — main panel rect + cap trapezoid above + curved flourish path (stroke-only) + red half-circle accent + green-neon-stroked GEM letters. Night-lit overlays add drop-shadow glow in matching green.
- **Cross-street extensions**: north spur `polygon points="700,446 796,446 790,420 706,420"` + south spur `polygon points="696,462 800,462 810,492 686,492"` — creates the visual effect of Vine St continuing beyond 18th.
- **Residential density classes**: `.vine-residential-left`, `.vine-residential-right`, `.vine-residential-south-back`, `.vine-residential-north-back` — each is a `<g>` containing 6-11 small house paths + 3-5 tree circles, all using `.vine-horizon-building` fill for low-contrast backdrop treatment.
- **NLB Museum**: `.vine-nlb-body` mass + stepped parapet + `.vine-nlb-ball` baseball circle with stitch lines. Night-lit version adds `.vine-nlb-ball-lit` class + halo.
- **Paseo intersection turn-in**: median broken at x=0-620 and x=790-1600 (gap at 18th crossing). Lane hairlines similarly broken. Curb corner rounds at 4 intersection corners. 18th's east + west curbs descend from the corner into Paseo and continue past the frame bottom (y=600). Crosswalks span the full Paseo width at the far-side intersection.

### Deferred from v18 (TOP priorities for v19) — "THE DOCKET"

Brian flagged these as needing more work. Items in rough priority order:

1. **18TH & VINE DISTRICT sign — full redesign pass per reference photo**. Brian flagged specific issues still not matching the real sign even after multiple iterations:
   - **Missing red horizontal rule lines**: The real sign has decorative red linear bars/rules framing the "18th &" at the top and flanking the "VINE" in the middle (looks like horizontal red pinstripe lines). Not present in current rendering.
   - **Wrong colors for "VINE"**: current rendering uses red-stroke outlined "VINE". Real photo shows the VINE letters are **white/coral/pinkish neon** (not red), with the letters outlined in a lighter color and red linear accents nearby.
   - **"18th" typography**: real sign has "18" larger with "th" smaller in a superscript-like position. Current rendering has "18th &" as uniform-size cursive. Need to split into "18" + small "th" + "&" composition.
   - **Letter proportions/sizes**: the real VINE takes up the full width dominantly; "18th &" is relatively small. Green treble clef is a specific size/position. Current proportions are close but not quite right.
   - **"DISTRICT" banner**: real sign has vertical red bars flanking the "DISTRICT" word on the black banner. Missing in current.
   - **Panel configuration/mounting on the building**: the real sign has a specific art-deco frame with angled corners + specific backer geometry. Need to match more precisely.
2. **Geographic rearrangement — "Vine intersection should cut in front of the Blue Room"**: Brian wants Blue Room WEST of the cross-street (past it, deeper into the scene) to match real-life geography where Blue Room is inside the American Jazz Museum at 1600 E 18th (WEST of Vine St). v18f partially addressed this by moving the left-side buildings closer to the cross-street, but the full "past the intersection into the distance" treatment still needs work. Buildings should visibly line up along the receding 18th Street west of Vine.
3. **Receding building quality pass** — Brian noted quality drops as buildings go back. Mid-to-back buildings (MMF, Gem, Lincoln, church spire, residential silhouettes) need upgraded architectural detail.
4. **Street alignment audit** — buildings need consistent grounding on the sidewalk line (no floating or sinking into pavement).
5. **Scene Gallery tile** — homepage tile still shows v18a early composition, not the final v18f layout.
6. **Left-side clipping fix** — Parker + sign building clip at narrow desktop widths (<1300px).
7. **Ghost toggle** — historical demolished buildings overlay.
8. **Blue Room sign** — vertical BLUE + chase bulbs is shipped, but may want further refinement per additional reference photos.
9. **Gem Theater sign/building** — green neon blade + art-deco flourish shipped, but the real photo shows more ornate terra-cotta facade details that could be further refined.

### Session retrospective

v18 took 10+ iterations of the 18th & Vine scene. The pattern that consumed the most time: Brian would give detailed feedback (e.g., "Blue Room on the left"), I'd implement it, rsync + preview, he'd give the next refinement. Each round was ~15-25 minutes. **Lesson for future scene builds**: always validate the OVERALL composition (crude block-out with placeholder text for each element) BEFORE detail work, so big structural changes (camera position, building order, sign style) happen once in the rough and the detail work flows from a settled composition. The 4 perspective-composition reworks (flat→perspective→pulled-back→pulled-back-with-Parker-moved→further-building-rearrangement) burned most of the session. Shipping earlier and iterating as v18b, v19, v20 might have been cleaner.

### Deferred from v18

- **More passes on receding buildings** — Brian explicitly flagged this for future sessions. Back-of-the-scene buildings (deep west of the Vine Street cross-street) are still simpler than the foreground. Candidates for v19: better window articulation on the Jazz Museum + NLB mass, more architectural character on the church spire + water tower silhouettes, a Boulevard Brewing-esque industrial smokestack silhouette, Black Archives of Mid-America building, historical building signage, more window/sign detail on the Street Hotel and Vine Street Brewery.
- **Ghost toggle** for 18th & Vine — still deferred from v18a. Historical Lost KC buildings in the district.
- **Scene Gallery tile** — still shows the v18a original composition, not the v18b/c/d reworked version. Update in v19 with the new pulled-back layout + attached neon sign + smaller-scale YMCA.
- **Mobile/narrow-viewport clipping** — the sign building + Parker cluster toward the left of the viewBox and gets clipped at narrow desktop widths (viewport ≤1300). The responsive-hero.js meet-mode helps at mobile (≤640), but desktop at 800-1300 clips the left side. Acceptable for now since the sign is the PRIMARY feature and remains visible; Parker clips somewhat. Could rework if Brian flags it.

---

## v19 session — 18th & Vine polish + district sign redesign + Paseo sign + cardinals corrected (2026-04-23)

v19 shipped at `?v=19a` (bumped in 118 HTML files). Focused on the 18th & Vine scene per Chat's v19 brief. Key deliverables:

### District sign redesign (the top priority, 4+ iteration rounds before this)

Rebuilt the `<g class="vine-district-sign">` block at lines ~717-759 of `neighborhoods/18th-vine.html`:

- **Panel** — chamfered upper corners via path (M 268,252 L 412,252 L 420,260 L 420,392 L 260,392 L 260,260 Z). Dark backer, NO outer frame.
- **5 evenly-spaced horizontal red-neon pinstripe rules** at world y=264, 287, 310, 333, 355 running the panel width x=268-412. The bottom rule sits immediately above the DISTRICT banner.
- **"18"** at x=276, y=298 in **Josefin Sans 900** (same font-family as VINE, normal-style not italic). Font-size 32, hollow red stroke.
- **"th"** superscript at x=309, y=283, also Josefin Sans 900, font-size 15, hollow red stroke.
- **Large green treble clef** at x=392, y=288, text-anchor=end, Playfair Display font-size 56, hollow green stroke. Positioned so its descender tail clears the top of VINE (7u gap). Clef acts as the ampersand — there is NO "&" glyph on the sign.
- **Massive VINE** at x=340, y=350, text-anchor=middle, Josefin Sans 900 font-size 54. **Hollow light-blue neon** (`stroke: rgba(165,212,238,0.95)`) — NOT red, NOT cream-white. Per Brian's reference photo.
- **DISTRICT banner** at x=250, y=364, w=180, h=18 (extends past panel sides). Flanking red vertical bars at x=293,384 w=3 h=14. Gold uppercase "DISTRICT" text at x=340, y=377.

Technique: letters use `fill: none; paint-order: stroke` so the red rules pass through letter interiors for authentic layered-neon effect. Night-lit overlay (inside `.vine-night-effects building-night-lights` group) mirrors base-layer geometry with bright fills + drop-shadow filters. Halo circle behind clef at cx=378, cy=270, r=30.

### Geographic block-out comment at SVG head

Added a ~65-line comment block right after the `<desc>` tag (before Layer 1 Defs) at `neighborhoods/18th-vine.html` line ~139. Documents:
- Cardinal orientation (viewer looks EAST; LEFT-of-view = NORTH side of 18th; RIGHT = SOUTH)
- x-ranges of every landmark on each side (FG → horizon order)
- Vine cross-street pavement bounds (x=648-852, y=446-462)
- VP position (810, 340)
- Depth tier policy (foreground full detail, mid = cornice + window grid + one feature, etc.)
- **v19b targets** explicitly marked for pending repositioning

This is the canonical layout reference for the scene. When moving buildings, update the block-out. **Adopt this pattern for all future neighborhood scenes** — put a comment at the SVG head documenting layout.

### Cardinal direction correction

Brian called out mid-session: the viewer is looking EAST (not west as earlier handoff/docs claimed). The horizon is EAST. Fixed in:
- `<title>` text (line 135)
- `<desc>` text (line 136)
- `<p class="vine-hero-caption">` (below the SVG)
- Block-out comment's LEFT/RIGHT↔NORTH/SOUTH assignments

The SVG geometry itself doesn't change — only the descriptive text needed correction. Internal code comments (e.g., "receding west") still use west-leaning language in places; not priority to chase down every instance.

### Receding-band quality pass (A.3)

- **MMF (x=804-876)**: added gable-peak pediment bracket (path at 834-846, 428-434) + distinctive half-circle transom window above the rectangular 2nd-floor pane (`.vine-mmf-transom` new class) with `.vine-mmf-transom-sill` horizontal accent between the transom and the lower pane. Central mullion line.
- **Street Hotel (now at x=1080-1180 after swap)**: added `.vine-hotel-cornice` class (stroke-width 0.9, more prominent than generic brickline) at roofline + small `.vine-hotel-roofline-sign` "STREET HOTEL" text at y=353.
- **Gem Theater (x=886-950)**: added denticulation row along the upper parapet (14 `.vine-gem-dentil` rects at y=433 with 4u spacing) + converted the 2 flanking rectangular upper windows to `.vine-gem-arched-window` Palladian arches matching the central arched window's pattern. Now reads as a proper 3-arch Palladian row.

CSS for these new classes appended to bottom of `style.css` in a v19 block (labeled "v19 — Receding-band quality pass (A.3)").

### Street Hotel ↔ Vine Street Brewing swap

Per Brian's geography correction: Street Hotel lines the Paseo next to YMCA; Brewery is closer to Vine. Swapped the identity-carrying signs within the existing `.vine-hotel` and `.vine-brewery` `<g>` blocks (classes kept for CSS reference consistency).

- `.vine-hotel` now wraps the building at x=1080-1180 (was Brewery's position) with STREET HOTEL roofline sign.
- `.vine-brewery` now wraps the building at x=1000-1080 (was Hotel's position) with VINE ST BREWING facade sign (rect + text at y=410-418).

### Blue Room body visibility fix

`.vine-blue-room-body` fill alpha bumped from 0.22 → 0.62 in `style.css` (line 9717). Brian flagged the Blue Room disappearing in daytime — now the building body is visible behind the sign panel, so the sign reads as "mounted on a building" rather than floating in the sky.

### FG Paseo street sign

New `<g class="vine-paseo-streetsign">` block inserted before `.vine-cross-streetsign` (line ~514). FG-scale vertical pole + THE PASEO blade (x=762-814, y=482-494) + 18TH perpendicular blade (x=790-826, y=498-508) + finial. Inline-styled (no new CSS classes). Signifies the foreground horizontal cross-street so the viewer knows which street is which.

### Scene Gallery tile refresh (A.5)

Rebuilt Tile 5 (18th & Vine) in `index.html` (lines ~2263-2352). Out went the v18a street-level composition with VINE signpost; in came a new 400×240 miniature centered on the v19 district sign (scaled-down: 5 red rules, "18" + "th" superscript, green clef, hollow light-blue VINE, DISTRICT banner with flanking bars). Parker bust at FG-left, Paseo YMCA castle at FG-right (crenellations + 4 arched windows + entry arch + PASEO YMCA lintel), receding mid-ground buildings hinted, Paseo foreground band with zebra crosswalk, streetlamp glow.

### Deferred from v19 — v19b/v20 targets

- **Building repositioning** (Brian's geography correction): Gem should be DEEPER than MMF on the south side past Vine; NLB should move past Vine on the north side; Bryant's should go to the deepest north-side position near the VP; MMF should shift to align with Vine east edge. These are coordinate-heavy and best iterated with visual review. See BRAINSTORM_SEED v19b section.
- **Mobile clipping fix (A.4)** — deferred per brief's explicit deferral order. Shift of sign-building group requires also shifting its night-effect child elements, which are currently in a separate layer at the end of the SVG.
- **Ghost toggle** — bundle with West Bottoms v20 (same mechanism serves both scenes).
- **View Transitions API** from Chat's v19 Section C.1 — 2-3 hour task; candidate v19.5 or v20.

### Implementation notes worth remembering

- **Neon-tube text technique**: `fill: none; stroke: ...; stroke-width: ...; paint-order: stroke` gives hollow letters that read as neon tube construction. The district sign's VINE, 18, th, and clef all use this. For night-lit overlay versions, add a solid `fill` for glow + `drop-shadow(0 0 Xpx ...)` filter. Letters layered ON TOP of the pinstripe rules (rules drawn first in source order) let the red rules show through letter interiors for authentic 1940s-era layered-neon look.
- **Rule spacing**: 5 horizontal rules spaced 23u apart in world-y (rule 1 at y=264, rule 5 at y=355). These are fixed reference lines the text elements position relative to.
- **Font-family consistency**: "18" and VINE both use Josefin Sans 900 (was Playfair Display for "18th" pre-v19) — Brian's feedback that they should be the same font. Clef stays Playfair (specific glyph availability).
- **Chamfered panel path**: `M 268,252 L 412,252 L 420,260 L 420,392 L 260,392 L 260,260 Z` — upper-left and upper-right corners have 8u chamfer (12u in the normalized 200×160 local system, scaled by 0.875 for world y and 0.8 for world x). Lower corners are square.
- **Label swap pattern**: when two buildings exchange positions/identities, swap the SIGN TEXT inside their existing `<g>` blocks rather than shuffling the blocks themselves. Class names like `.vine-hotel` and `.vine-brewery` stay as internal references — only the user-visible signage determines what building the viewer reads it as.

---

## v20 session — 18th & Vine full-session iteration (cars, park, night life, food carts, composition tuning) (2026-04-23)

v20 ran LONG. Started with Chat's v20 brief (Focus A composition repositioning + Focus B Blue Room fixes + Focus C baseball complex + Focus D ghost toggle) and ended with a substantially revised scene after dozens of iterative corrections. `?v=20a` bumped across 118 HTML files.

### Composition repositioning (Focus A — iterative)

Four buildings repositioned through several rounds of back-and-forth with Brian to nail their perspective placement on the 2D scene:

- **MMF**: now at `translate(218, 51.8) scale(0.8)` — sits just east of the Vine cross-street on the south (right) side of 18th, reads as "at the NE corner of 18th & Vine" visually. Its night-effects wrapped in matching transform so lit windows stay anchored.
- **Arthur Bryant's**: `translate(400, 64.1) scale(0.7)` — sits in the upper-left portion of the scene, past the Vine intersection on the north side, with a flat rectangular body (was slanted/awkward before). Body alpha bumped from 0.24 → 0.65 and stroke from 0.8 → 1.3 for visibility at 0.7× scale.
- **NLB Museum**: redesigned FROM SCRATCH (not just repositioned). The old "Jazz Museum" brick block at x=490-550 was hidden. NLB is now a proper replica of the Museums at 18th & Vine facade — central RED brick tower with the distinctive SUNBURST sculpture (semicircle arc + 5 radiating rays + 5 musician-figure silhouettes) and two GREEN glass wings flanking, projecting marquee awning carrying the joint `NEGRO LEAGUES / JAZZ MUSEUM` two-line sign, glass entry doors with a mullion. Placed at `translate(248.7, 52.6) scale(0.78)`, with its `<g>` MOVED in source order to render BEFORE Blue Room so Blue Room is visibly in front.
- **Gem Theater**: `translate(197.4, 68.2) scale(0.7)` — deeper past Vine on the south side, higher up so it's above the Vine pavement. Night-effects wrapped in matching transform.
- **Blue Room**: `translate(-15, -16)` — pulled west into the corner spot, sits on the north side at the Vine corner with its vertical BLUE + piano-keys + ROOM sign clearly readable.

**Key lesson surfaced**: iterative coordinate nudges worked but cost ~15 rounds. The underlying issue was that the scene's perspective isn't a rigorous 2-point projection — baselines are organic per-building. For v21 West Bottoms scene, authoring a canonical "perspective baseline formula" before placing buildings would avoid this back-and-forth entirely.

### Blue Room fixes (Focus B)

- **Ghost sign**: the night-lit overlay + piano-key dividers + blacks + chase bulbs were all stranded at pre-v18f positions around `x=508-532`, rendering as a second Blue Room flashing to the west of the real one at night. Repositioned all elements to the current panel at `x=678-696`. Chase bulbs now curve down the right edge of the panel at `x=698-700`.
- **Piano keys**: moved to the BOTTOM of the sign (base layer order now `BLUE → ROOM → piano keys`). Keys 4 narrow dividers + 2 black-key rects fit in the 14u-wide pianokeys-bg.

### Buildings redesigned/added

- **Vine Street Brewing**: rebuilt per the reference photo as a single-story castellated limestone building with a SCALLOPED PARAPET (5 shallow arches across the top), 4 arched window bays flanking a central arched entry, finial balls at outer corners, horizontal stone band, rusticated-stone hatch hints, `VINE ST BREWING` sign banner above the entry. Moved west from x=1080-1180 to x=920-1016 (closer to Vine intersection).
- **Workhouse Castle** (real landmark at 2001 Vine): added as a distant backdrop element with two round crenellated towers, central body with two rows of arched windows, horizontal belt course, right wing extension. Positioned at `translate(323.4, 75) scale(0.85)` — right of MMF, upper-middle area.
- **NLB Museum**: rebuilt from scratch per the real facade (see Composition section above).

### Instruments quality pass (Focus B addendum)

All three main musicians' instruments rebuilt for readability:

- **Alto sax**: clean smooth S-curve body as a single brass stroke, proper neck crook + mouthpiece, flared bell as a rotated ellipse with dark throat shadow, 6 pearl keys along the tube, octave-key lever on the neck, neck-strap cord running from the player's neck down to the sax.
- **Upright bass**: proper figure-8 body (upper bout + waist + lower bout), more pronounced S-curve F-holes with eye-dots, arched bridge, tapered neck with fingerboard rails, volute-spiral scroll, 4 pegs arranged on the pegbox, 4 strings running from pegs to tailpiece, endpin spike.
- **Trumpet**: proper mouthpiece cup + lead pipe to a rectangular valve block with 3 circular valve buttons, U-shaped tuning-slide loop below, main tube to a conical flared bell with dark throat shadow, water key tab.

### The Paseo — cars + road markings (Focus D — new)

- **Cars on the Paseo**: 5 vintage vehicles animated driving across the Paseo — maroon sedan, cream coupe (eastbound upper lane at y=505, scales 1.9 and 1.7), dark green sedan (westbound lower lane at y=570, scale 1.9), red coupe (eastbound), tan delivery van (westbound, scale 1.7). Durations staggered 28-38s with offset delays so vehicles spread out and don't stack.
- **Direction fix**: original car graphics draw headlight on the LEFT side. Eastbound cars were initially positive-scale → facing backwards. Flipped all scales: east cars get `scale(-N, N)`, west cars get `scale(N, N)`. Cars now face the direction they're driving.
- **Lane positioning**: upper lane y=505 (between Paseo top y=492 and median top y=526), lower lane y=570 (below median bottom y=538). All cars stay off the median.
- **Painted road line**: solid white edge line added at `y=595` across the full scene width, marking the south pavement boundary.
- **Stop line at Paseo/18th turn-in**: replaced the old dense zebra crosswalk with a solid white stop-line rectangle at `x=620-790, y=490` (2.5u tall).
- **Lane hairlines**: now continuous across the full Paseo (previously broken at the intersection), at y=510 and y=554.
- **Cleanup**: removed the 18th-curbs-descending-into-Paseo lines at x=610 and x=800 that read as "random downward lines through the median."

### Vine Street extension + intersection crosswalks

- **Vine Street**: extended from the old x=648-852 strip to the full scene width `x=200-1600`, giving the scene a proper horizontal dividing line with lane centerline dashes + continuous curbs (gapping only at the 18th crossing).
- **4-way intersection crosswalks** at 18th & Vine, reoriented per Brian's real-world convention:
  - Crossing 18th (pedestrians N-S) → VERTICAL zebra stripes, 14-15 narrow bars per crosswalk, north side at y=438-445 and south side at y=463-470.
  - Crossing Vine (pedestrians E-W) → HORIZONTAL zebra stripes, 5 stacked bars per crosswalk, inside the Vine pavement at y=447-461, west + east of the 18th intersection.
- **Cross-streetsign**: moved from the NW corner to the SE corner at pole `x=795, y=478` (south sidewalk, east of Vine pavement).

### Street signage

- **Paseo signpost**: planted in the median at `x=560, y=476-538`, with only the `THE PASEO` blade (removed the `18TH` blade).

### Music + life (Focus E — night atmosphere, TOD gating)

Massive expansion of the "district feels alive" layer:

- **Main musicians**: moved to the sidewalk above the Paseo at `translate(200, 124) scale(0.7)` — feet around y=490 (just above Paseo top), cluster x=275-340. Off the street, next to 18th.
- **Second jazz band** at the Gem Theater (quartet with sax + trumpet + upright bass + DRUMMER on kit with bass drum + snare + hi-hat + ride cymbal + stool + drumsticks). Placed at `translate(832, 414) scale(0.56)`, gated night-only via `.vine-walker-jammer` opacity class.
- **Night jammers** (musicians carrying instrument cases — sax case, trumpet case, guitar with strap on back): 12+ walker figures distributed along sidewalks at varied x-positions, visible during dusk/night via `.vine-walker-jammer-opacity` keyframes. Represent the 1:30am-5am jam-session crowd pouring into the district clubs.
- **Walker sidewalks**: additional static walkers placed along 18th N/S sidewalks + Vine N/S sidewalks at various depths/scales (0.45-0.65).
- **Paseo walker gate**: the existing FG walker (`.vine-walker-path-fg`) that uses the Paseo crosswalk is now wrapped in `.vine-paseo-walker-gate` with opacity animation that hides the walker during dawn/day/dusk and shows only during night (75-100% of TOD cycle).
- **Music notes TOD-gated** (moved OUT of the `.vine-night-effects` building-night-lights group so their individual TOD classes work independently of the night-only parent):
  - Over main musicians (always visible)
  - Over Blue Room + Gem (`.vine-notes-dusk-night`) — visible 50-100% of cycle
  - Over MMF (`.vine-notes-night-dawn`) — visible 75-100% + 0-25% of cycle (late-night jam + early dawn)
  - Over Vine Street Brewing (`.vine-notes-day-dusk-night`) — visible 25-100% of cycle (hidden during dawn only)
  - Music-note font-size bumped DOWN to 10px so notes don't cover the musicians; 6 note variants (a..f) with varied drift durations (10-16s), delays (-2 to -9.4s), and drift distances/directions for natural randomization.
- **Bryant's smokestack**: small chimney on top of Bryant's roof with 3 staggered smoke puffs animating upward. Smoke visible only during Dawn + Day (via `.vine-notes-dawn-day` opacity) — represents the BBQ pit smoking through the morning.

### Food cart vendors

- **Hot dog cart** on the Paseo median at `translate(925, 530) scale(1.4)`, between the trees at x=830 and x=1020. Red cart body + white HOT DOGS sign + yellow scalloped umbrella + male vendor in apron behind cart + 3 staggered smoke puffs rising from the grill. Visible during NIGHT + DAWN only (custom `.vine-food-cart-vendor` TOD class).
- **Pretzel cart** on the Paseo sidewalk at `translate(585, 494) scale(1.2)`, right of the main musicians near the 18th & Vine sign. Dark blue cart + white PRETZELS sign + yellow umbrella + female vendor with hair bun + 2 steam puffs. Visible at night via `.vine-walker-jammer` class.

### Left-background park scene (unified replacement of earlier disjointed bits)

Replaced 2 disjointed baseball diamonds + scattered recreation vignettes with ONE cohesive **PARADE PARK** scene occupying `x=14-346, y=358-432`:

- Large green park patch (trapezoidal ground plane)
- Chain-link back fence with 9 fence posts + 3 field-light standards with warm bulbs
- Main baseball field: trapezoidal infield dirt + pitcher's mound + home plate + chalk foul lines
- 10 player silhouettes (batter swinging, catcher crouched, pitcher winding up, 4 infielders, 3 outfielders) + baseball in flight
- Bleacher on the first-base line with 3 spectators
- Batting practice cage with net hatching + batter
- Basketball half-court with backboard + rim + 3-point line + free-throw key + 2 players + ball in flight + kid watching
- 3 perimeter trees with trunk + canopy
- `PARADE PARK` sign in the corner
- Couple + kid with glove walking through

All the earlier disjointed pieces (Monarchs stadium, church, old baseball diamonds, neighborhood-rec dog walker, kids playing tag) are now hidden via `style="display:none"` (code retained for potential v21 reference).

### Orphan cleanup

- Old Jazz Museum `.vine-museum` brick mass HIDDEN (pre-redesign block; NLB now carries the joint sign)
- Lincoln Building `.vine-far-commercial-south` HIDDEN
- Monarchs Municipal Stadium `.vine-monarchs-stadium` HIDDEN
- Commercial infill `.vine-infill-south-a` HIDDEN (was floating left of the sign building)
- `.vine-deep-row` silhouettes HIDDEN (overlapped Gem/MMF after repositioning)
- Orphan night windows at x=1006-1158 from pre-v19 building positions REMOVED
- Old museum sign below the district sign ("NEGRO LEAGUES · JAZZ MUSEUM" at x=328, y=410) REMOVED (both day + night versions)
- Mid-street lamp at x=720 HIDDEN (was in the 18th pavement)
- Deep walker `vine-walker-path-deep` HIDDEN (animation crossed 18th pavement)

### Other

- **Sign Building + District Sign** shifted +36u right (two rounds of "a little to the right toward the band") — now at `translate(36, 0)`. Night overlay wrapped in matching transform.
- **Tagline**: now reads "The neighborhood that made the music that made America" (evolved from "Show what was lost" → "The music that made America" → current).
- **STREET HOTEL roofline text**: removed per Brian's direction.
- **Blue Room body alpha** bumped from 0.22 → 0.62 earlier in session (first regression that surfaced at dawn of v20 — it had been the cause of Blue Room disappearing in daytime from v19 carry-over).

### v20 implementation notes worth remembering

- **TOD opacity patterns** (40s cycle = 10s per phase): Dawn 0-25%, Day 25-50%, Dusk 50-75%, Night 75-100%. Most TOD-gated classes defined: `.vine-notes-dusk-night`, `.vine-notes-night-dawn`, `.vine-notes-day-dusk-night`, `.vine-notes-dawn-day`. These live OUTSIDE `.vine-night-effects` because that wrapper uses `.building-night-lights` which is itself opacity-gated to dusk/night — nesting TOD-gated children inside double-gates and breaks visibility during dawn/day.
- **Multi-animation pattern**: SVG elements CAN have multiple CSS animations (e.g., a drive-translate + an opacity-cycle) via comma-separated `animation-name`/`animation-duration`. But if the keyframes CONFLICT on the same property (e.g., both animate opacity), unpredictable results. The night-jammer uses `vine-walker-jammer-opacity` + `vine-jammer-shuffle` which don't conflict (one animates opacity, the other transform-Y).
- **Car facing direction**: the car model has headlight at local x=-34. Positive scale keeps car facing left (west); negative X scale flips it to face right (east). Rule: eastbound cars get `scale(-N, N)`, westbound get `scale(N, N)`.
- **Perspective scale gotcha**: when wrapping a building in `transform="translate(Tx, Ty) scale(s)"`, the building's night-effect overlays (in the separate LAYER 14 night group) do NOT scale with the building. Solution: wrap the corresponding night-effect elements in a nested `<g>` with the SAME transform. Done for MMF, Gem, and district sign in this session.
- **Source order for perspective layering**: SVG has no z-index. To render Blue Room in front of NLB, NLB's `<g>` must appear BEFORE Blue Room's in source. Moved the NLB block in this session.
- **Music note drift randomization**: 6 keyframe variants (drift-a..drift-f) with different durations, opacity ramps, and drift directions (x offsets -8 to +7, y offsets -34 to -50) combined with per-instance negative animation-delays make the note streams feel randomized.
- **Iteration cost**: this session had 40+ feedback rounds. Many small coordinate nudges. The discipline from v19 ("block-out before detail") held up for architectural items (building redesigns succeeded) but broke down on position-tuning (the 4 Focus A buildings took 15 rounds to land). Lesson: for subpixel visual fit, accept it's iterative and don't try to math it perfectly the first time.

### Deferred from v20 (for Chat → v21)

- **Ghost toggle pattern** — Monarchs stadium was meant to be the initial test case but was shelved when Brian pivoted to baseball fields. Pattern not built. **Carry forward to v21** as West Bottoms' stockyards + Union Depot ghosts.
- **`/history/kc-monarchs.html` stub page** — never created (Monarchs stadium shelved). Not needed now.
- **Night-jammer walker animation** — jammers have a subtle `vine-jammer-shuffle` up-and-down motion but don't actually walk along paths. Could be enhanced with proper per-jammer walk-paths.
- **True TOD-based car density** — attempted via `.vine-car-day-heavy` class with dual animation (opacity + drive), but the opacity-cycle caused cars to fade in/out mid-drive (Brian saw them as "blocks"). Removed the dual animation; all 5 cars now drive continuously. Density-by-TOD would need a different architectural approach (e.g., extra car instances that spawn only during specific TOD phases via per-car opacity timing that matches their drive cycle).
- **Mobile clipping fix (A.4 from v19)** — still deferred.
- **Cache** at `?v=20a`.

---

## v21 session — West Bottoms signature scene + canonical ghost toggle pattern (2026-04-24)

v21 was a single-pass autonomous build session. West Bottoms went from a text-only
detail page to a full signature scene. The canonical ghost toggle pattern landed
for real. Cache bumped `?v=20a` → `?v=21a` across 117 HTML files. Brian's 18th &
Vine polish concerns were surfaced but deferred to v22 per his call.

### Focus A — 18th & Vine check-in response

Brian's assessment: "rough shape is there" but needs polish. Key items (all DEFERRED):

- **Background fill** — VP area feels empty. Needs more visual weight.
- **Overall polish** — small alignment / detail items.
- **Style saturation grappling** — Brian unsure whether dense warm look suits close-up neighborhoods. West Bottoms now sits at the opposite density axis, making the contrast a design decision rather than an accident.
- **Proportions** — explicitly deferred by Brian. Big project.
- **Jammer count** — Brian said it feels lower than expected. Diagnosed: ~19 jammers in markup (brief undercounted), TOD-gated to fade in 22s-40s of the 40s cycle at opacity 0.92-0.95. Not a bug. They read as "crowd texture" rather than countable individuals at distance.
- **Music note crescendo** across 5 buildings — confirmed intentional. Leave as-is.

### Focus B — West Bottoms signature scene

Camera stands on the 12th Street Viaduct, looking NW and down into the basin.
Tonal target: QUIETER and more ATMOSPHERIC than 18th & Vine. No jammers, no food
carts, no music notes, no walkers. Animation is atmospheric (steam plume, distant
train, river shimmer, lamp halos, haunted glow) not performative.

**Composition (viewBox 0 0 1600 600, all layered back-to-front):**

- **Livestock Exchange Building** (1910, ANCHOR) — x=560-790, y=232-420. Nine stories of buff brick over rusticated limestone base, central projecting bay, mansard roof with 3 dormers + flagpole finial, 7-row × 8-column window grid, subset lit at night. Cornice sign reads "LIVESTOCK EXCHANGE".
- **Mosaic (Kemper) Arena** — x=100-340, y=330-434. Distinctive saddle-roof silhouette via quadratic-curve inverted catenary, exposed truss stubs, banded facade, 2 entry doors. "KEMPER" stencil as ghostly gold signage (historical name persisting).
- **Warehouse row** — 6 surviving brick buildings x=800-1180, varied heights/rooflines. One has Romanesque arched upper frieze.
- **Haunted district** — x=40-220 (FG-left). Dark brick warehouse bulk with crenellated roofline, bricked-over upper windows, arched haunted-attraction entrance. EDGE OF HELL + THE BEAST marquee signs with subdued red neon (TOD-gated + 4.2s pulse).
- **Antique row** — x=1250-1510 (FG-right). 4 narrow brick storefronts (varied heights, one with pediment), FIRST WEEKENDS banner suspended across middle, warm ground-floor glow at night.
- **12th Street Viaduct** — foreground S-curve, cubic-bezier path from (1320,368) down to (0,548). Railing + 6 lamp posts along far edge, dashed centerline.
- **Hereford bull statue** — on plinth at (1060, 410). Side-view silhouette with white face + horns + breed patches. "HEREFORD" on plinth.
- **Stockyards ghost** — `.scene-ghost-building` L-shaped footprint with internal pen divisions at x=400-880. Revealed when toggle checked.
- **Sky** — sooty industrial tint overlay (rgba(40,28,20,0.42)) at top 220px. Stars visible at night.
- **Distant downtown KC silhouette** — x=1080-1460, y=172-220 opacity 0.38. Liberty Memorial + P&L + One KC Place + Town Pavilion + Commerce Tower + T-Mobile drum + Bartle pylons.
- **Far-bank industrial stack** — x=138-148 with 3 offset steam puffs rising (6.4s cycle, staggered 0s/2.1s/4.0s delays).
- **Kansas River** band at y=218-252 with 22s shift animation.
- **Distant train** — locomotive + 4 cars crawling east-to-west at y=202-220, 108s cycle, opacity 0.55, TOD-independent.
- **Near-bank rail line** at y=252-266 with 32 tie marks + 3 static boxcars at x=900-1150, y=414-450.

### Focus C — Canonical ghost toggle pattern

Pure-CSS using `:has()`. No JS. Pattern is now universal — any `*-hero-scene`
container can adopt it.

```css
.scene-ghost-building {
  opacity: 0;
  transition: opacity 400ms ease;
  pointer-events: none;
}
.scene-ghost-building path, .scene-ghost-building rect, .scene-ghost-building polygon,
.scene-ghost-building polyline, .scene-ghost-building line, .scene-ghost-building circle,
.scene-ghost-building ellipse {
  fill: none !important;
  stroke: var(--gold);
  stroke-width: 1.3;
  stroke-dasharray: 4 3;
  vector-effect: non-scaling-stroke;
}
[class*="-hero-scene"]:has(.scene-ghost-toggle-input:checked) .scene-ghost-building {
  opacity: 0.62;
  pointer-events: auto;
}
```

Toggle UI: hidden checkbox `.scene-ghost-toggle-input` + styled pill-button label
`.scene-ghost-toggle-label` with ::before indicator that fills in when checked.
Focus-visible outline via `:has()`. Respects `prefers-reduced-motion`.

Applied to West Bottoms stockyards ghost. **18th & Vine's Municipal Stadium ghost
(stubbed v20 with `style="display:none"`) is ready to activate** — one-char change
+ wire the toggle UI into the 18th & Vine overlay (the existing input + label are
there but the label is currently being used as the scene tagline "The neighborhood
that made the music that made America", so the separation needs a quick redo).

### Focus D — Scene Gallery tile swap

- J.C. Nichols tile OUT (still reachable via Fountains nav dropdown).
- West Bottoms tile IN. Uses `scene-gallery-tile-dusk` for industrial-evening mood.
- Stylized miniature: viaduct S-curve, Livestock Exchange focal, Mosaic saddle, warehouse row, Hereford bull silhouette on deck, distant KC skyline, 4 lamp posts. No text/signage at tile scale.

### New landmark stub pages (7)

- `/buildings/livestock-exchange.html`
- `/buildings/mosaic-arena.html`
- `/landmarks/hereford-bull.html` (new directory)
- `/bridges/12th-street-viaduct.html` (new directory)
- `/districts/west-bottoms-haunted.html` (new directory)
- `/districts/west-bottoms-antiques.html`
- `/history/kc-stockyards.html`

Each stub: full nav + breadcrumb + gradient hero + 2-3 factual content paragraphs + "in progress" note + related links. Honestly flagged as stubs. All served 200 OK.

### v21 implementation notes worth remembering

- **`:has()` ghost toggle works in modern browsers** — `CSS.supports('selector(:has(*))')` confirmed in Chrome preview. No JS fallback needed.
- **`/tmp/kc_site/` dev server mirror is separate from project directory** — first attempt to preview the new scene showed stale content because edits only landed in the project dir. Fix: `rsync -av --exclude='.git' --exclude='.DS_Store' project/ /tmp/kc_site/`. Run after edits; consider making `/tmp/kc_site` a symlink for future sessions.
- **TOD-gated sibling layers** — lamp halos, haunted glow, night window glows all live in independent `<g class="westbottoms-night-glow">` / `<g class="westbottoms-haunted-glow">` groups, NOT nested inside a parent `.westbottoms-night-effects`. Per v20 retro.
- **Steam plume animation** — 3 circles with `animation-delay` 0s/2.1s/4.0s on a 6.4s ease-out cycle. Translates up 38px + scales 0.55→2.1 + opacity 0→0.55→0.3→0. Reads as continuous rising steam without synchronization artifacts.
- **SVG `<a>` clickability** — wrapping a `<g>` in `<a href="...">` works in modern browsers but add explicit `cursor: pointer;` if you want hover indication. Keyboard-accessible (Tab + Enter) without extra work.
- **Canonical geographic block-out comment at SVG head** — now established for both 18th & Vine (v19) and West Bottoms (v21). Pattern: cardinal orientation, key geometry, landmark x/y ranges, depth tier policy. Future scenes should carry the same.
- **Autonomous-mode pitfalls** — took a long pass writing SVG before first preview verification. The server cache delay turned this into a Scary Moment. Lesson: even in Auto mode, run a preview screenshot after the first ~30 mins of edits to catch server/cache issues early.

### Deferred from v21 (for Chat → v22)

Priority order based on Brian's v21 Focus A feedback:

1. **18th & Vine background fill** — VP area feels empty. Candidates: second row of residential stepping up a slope, moon occluded by building silhouettes, distant train at horizon (reuse West Bottoms' pattern), 2-3 taller silhouettes for east-side density.
2. **18th & Vine polish** — unspecified by Brian; likely small alignment / window glow / detail items surfaced during a walkthrough.
3. **Activate 18th & Vine Municipal Stadium ghost** — trivial now that the pattern exists. One-char change + toggle UI separation.
4. **18th & Vine saturation calibration** — if Brian wants it dialed back on specific elements.
5. **18th & Vine proportions** — explicitly deferred by Brian. Big project.
6. **Mobile clipping fix on 18th & Vine** (v19 deferral, still open).
7. **West Bottoms polish** — likely review items: Livestock Exchange window grid density on narrow viewports, mansard proportion (currently 10% vs real-world 15%), viaduct S-curve amplitude, Hereford bull detail, haunted red glow amplitude, downtown skyline prominence, atmospheric walkers on antique row. None flagged by Brian yet; waiting for review.
8. **OpenGraph images bundle** — 30-min quick win, didn't land in v21.
9. **Advanced queue (unchanged)** — View Transitions API, Popover API, scroll-driven animations, color-mix TOD crossfades, keyboard audit, prefers-contrast, street sign CSS refactor, TOD-based car density, night-jammer walk paths.

### v22 recommendation

**Option A — 18th & Vine polish pass.** Brian flagged specific concerns during
v21 Focus A. Following through while the feedback is fresh beats stacking a third
signature scene. Plan: background fill (60-90m) + small polish (30-45m) +
Municipal Stadium ghost activation (15m) + optional saturation calibration (30m).
Budget ~3-4 hours.

Alternatives: new signature scene (Crossroads or Quality Hill as counter-axes),
homepage polish mini-session, OG image bundle. Any could be v22.

- **Cache** at `?v=21a`.

---

## v22 session — West Bottoms quality pass (grounding, river, scene items) (2026-04-24)

v22 was a mid-day polish session. Brian rejected the v21 recommendation (18th & Vine polish)
and instead chose West Bottoms quality pass. Per his words: "It looks a little messy at the
moment. It's definitely starting to come together, but I want to get a pass to make it look
more like a real place, and then start working on 'scene' items as well."

### What landed

**Grounding fix (priority):** The v21 scene had building bases floating ABOVE or coinciding
WITH the viaduct's top edge — the viaduct read as the ground rather than as a bridge over a
basin. Added a new `LAYER 7.5: Basin floor` at y=266-448 (bottom edge follows viaduct's top
curve exactly so there's no gap). Buildings now visibly sit ON the basin floor, with the
viaduct clearly BRIDGING OVER it. Basin floor has warm-brown `#4A3E30` fill with subtle
striations (distant rail spurs) and a warm highlight top edge (catches river-reflected
light). This was the single biggest fix — the spatial logic of the scene now holds.

**River rework** (Brian's other named concern: "the river is kind of blocky, and just ends.
Need to make sure that that the river is a nice part of the scene, as the river is why the
west bottoms exists in the first place"):

- Replaced the rectangular river with a meandering band that curves across the scene and
  extends OFF-FRAME both sides (via cubic-bezier path from x=-60 to x=1700).
- Near-bank curve + far-bank curve, each with subtle S-shape; near-bank has a muddy warm
  highlight line.
- Gentle ripple curves (8 thin + 3 stronger flow lines) replacing the old straight rippled
  lines. Curves follow the implied flow.
- **Rail truss bridge** silhouette spanning x=920-1200 at y=202-222 — distinctive
  triangulated top chord + 6 diagonal braces + vertical posts + pier legs extending into
  the water with faint reflections.
- **Small barge** at x=380-422, y=234-246 — suggests working river.
- Far-bank shadow strip (darker water abutting the far bank).

**Building polish pass:**

- **Mosaic (Kemper) Arena** — replaced subtle diagonal truss marks with 3 prominent exposed
  steel masts rising above the saddle roof, each with X-braced caps. Added connecting
  cables between mast peaks (following roof curve) + diagonal tension cables anchoring
  masts to building base. Added vertical panel seams (precast concrete segmentation) and
  a third horizontal band. Arena now reads architecturally vs. cartoon-saddle silhouette.
- **Hereford bull** — enlarged 1.9x via `transform="translate(1053, 377) scale(1.9)"`.
  Plinth enlarged proportionally (x=1024-1082, y=410-470). HEREFORD inscription bumped
  font-size 3.5→5 and weight 400→600. Bull now legibly reads on the viaduct deck.
- **Haunted signage (EDGE OF HELL / THE BEAST)** — panels enlarged 36×12 → 56×22 and
  48×10 → 52×22. Double-border neon effect (outer stroke + inner stroke). Text bumped
  font-size 5→8–9, weight 400→700. Signs read as neon marquees vs. pixel noise.
- **Distant KC skyline** — opacity 0.38 → 0.55 so it has presence on the horizon.
- **Lamp halos** — radii reduced from 28-32 → 20-24 so they don't dominate the scene
  at night.

**Scene items (new):**

- **Industrial water tower** at x=1196-1244, y=250-360 — spherical tank on 4 tapering
  legs with cross-bracing, finial on top, "KC" painted on tank (faded white), ladder up
  one leg. Classic KC industrial silhouette.
- **Utility/telephone pole line** — 5 poles across the basin floor at x=380, 540, 870,
  1080, 1340 with crossarms + insulator caps + sagging catenary power lines between them.
  Makes the basin read as an actual industrial district vs. an empty field.

**No building-position changes.** Grounding was fixed by adding basin floor context, not
by shifting buildings. Less risk of cascading coordinate issues.

### v22 implementation notes worth remembering

- **Basin floor layering** — basin floor goes AFTER rail lines (LAYER 7) and BEFORE
  buildings (LAYER 8+) so buildings occlude basin correctly. The basin floor's bottom
  edge uses the EXACT same path data as the viaduct's top edge curve, so when both
  render there's no visible gap. If you adjust the viaduct S-curve in the future, update
  the basin floor path to match.
- **River path symmetry** — near-bank curve and far-bank curve use mirrored control
  points so the river reads as a consistent-width band that meanders, not as a wedge
  that tapers. If tweaking: keep the two curves parallel-ish.
- **Transform-based scaling (Hereford bull)** — `translate(cx, cy) scale(s)` in the
  inner `<g>` scales local coords around origin-then-translates. To keep bull legs at
  deck level after scaling, math: `ty = deck_y - s * leg_bottom_local_y`.
- **Painted faded signage technique** — use `rgba(240,220,180,0.35)` fill on `Playfair
  Display` text with `font-weight:700` + slight rotation via `transform="rotate(-1.5 cx cy)"`
  to suggest hand-painted faded brick ads. Not used in v22 (ran out of scope) but the
  utility pole shadow + basin texture already hint at the density.

### Deferred from v22 (for Chat → v23)

**West Bottoms remaining polish** (if Brian still sees messiness):
- Livestock Exchange may still feel over-articulated on narrow viewports; could simplify
  upper 2 stories to silhouette at mobile breakpoint.
- Painted faded signage on a warehouse face (planned for v22 but not added — cleanest
  way is text overlaid on W5 or W6 with `rgba` fill + rotation).
- Additional scene items candidates: smokestack cluster (multiple chimneys instead of
  one), railroad signal masts, parked truck on viaduct deck, a single pedestrian figure
  on the viaduct (Brian deferred in v21 brief but may want it now), additional rail
  spurs branching off the near-bank line.
- Viaduct deck surface texture — currently a smooth gradient; could add faint asphalt
  variation or weather streaks.

**Still deferred from v21 (never touched in v22):**
- 18th & Vine background fill
- 18th & Vine overall polish
- 18th & Vine saturation calibration
- 18th & Vine proportions (big project)
- 18th & Vine Municipal Stadium ghost activation (trivial now — just needs UI wiring)
- 18th & Vine mobile clipping fix (v19 legacy)

**Advanced queue (unchanged):** View Transitions API, Popover API, scroll-driven animations,
color-mix TOD crossfades, keyboard audit, prefers-contrast, street sign CSS refactor,
TOD-based car density, night-jammer walk paths.

### v23 recommendation

**Option A — 18th & Vine polish pass.** Same recommendation as for v22, still true now.
Brian's v21 concerns remain outstanding. West Bottoms is in a much better place after v22
— can be iterated later. 18th & Vine is now the scene most in need of attention.

**Option B — Second West Bottoms polish mini-session.** If Brian reviews the v22 output
and still sees things he wants tightened (painted ads, mobile clipping, stray artifacts),
~60-90m of focused polish could land. Not a full session.

**Option C — New signature scene.** Crossroads (dense/performative axis) or Quality Hill
(quiet/architectural axis as a counter-shot to West Bottoms). Full-build session, ~4.5h.

- **Cache** still at `?v=21a`. NOT bumped this session — CSS was not modified, only
  `neighborhoods/west-bottoms.html`. Bump `?v=22a` if any CSS changes land in v23.

---

## v23 session — Viaduct foreground polish + 18th & Vine baseball integration + background fill (2026-04-24)

v23 shipped at `?v=23a` (bumped across 125 HTML files — first CSS-touching bump since
v21). Two focuses delivered end-to-end per Chat's v23 brief, plus a substantive baseball
rework driven by Brian's in-session feedback.

### Focus A — West Bottoms 12th Street Viaduct polish (industrial pipe direction)

Brian chose "more industrial" over art-deco balusters (Q1) and "simple near-railing"
over cropping-off-frame (Q2). Five edits in `neighborhoods/west-bottoms.html`:

1. **Basin-floor shadow** — new LAYER 14.5 just before the viaduct deck. Feathered
   `feGaussianBlur stdDeviation=5` filter on a path hugging the viaduct's top S-curve
   and extending 18u up into the basin. Opacity 0.42, warm-dark `#1C1208`. The viaduct
   no longer reads as "painted on the basin" — the deck edge now casts a shadow into
   the basin above it. Filter added to LAYER 1 defs as `#wb-viaduct-shadow`.
2. **Far-edge industrial pipe railing upgrade** (LAYER 16). Kept the 13 existing post
   positions but thickened stroke 0.7→1.1 with `linecap=round` for a pipe feel. Added
   rivet caps (small filled circles with inner stroke) at each post top. Doubled the
   horizontal rail — upper pipe (stroke 1.15) + lower pipe (stroke 0.8, 4u below).
   Kickplate strip (stroke 1.6, opacity 0.55) along the deck edge at the base of
   posts. Gunmetal-gray palette (`#2A241C` / `#3C362F`) — no gold accents.
3. **Simple near-edge railing** (new group in LAYER 16 after lamp posts). 8 sparse
   posts along the camera-side near-edge curve (spacing ~200u, 12u tall, stroke 1.2).
   Single top rail follows the existing "near-edge sidewalk line" curve. Rivet caps.
   Low profile so it reads as "bridge has a near-railing" without obscuring the
   basin view.
4. **Deck surface detail** — inside LAYER 15. Added a darker edge-thickness strip
   (`stroke #1C1510` width 1.7 opacity 0.7) running just below the existing top-edge
   highlight — gives the deck a readable concrete-cap. 3 short vertical "pier tick"
   lines at x=1000/1120/1220 suggesting girder tops peeking at the receding
   mid-to-far right. 5 diagonal expansion-joint marks across the deck perspective.
5. **Lamp posts + centerline NOT touched** — brief called for optional calibration;
   the v21 positions (bases grounded at deck level, heads above the new top rail)
   still read correctly. Existing pavement-seam centerline preserved.

### Focus B — 18th & Vine baseball rework (Brian's in-session ask)

Brian flagged early that "baseball accents don't flow with the scene" — the v20
Parade Park live-game (batter + pitcher + catcher + 4 infielders + 3 outfielders +
ball in flight + basketball court + batting cage) was a daytime sporting-event
energy colliding with the night jazz district. The Municipal Stadium ghost (the
REAL historical Monarchs tie) was stubbed `display:none` and un-utilized. Fixed
with a 3-tier layering that gives baseball three distinct reads:

**Tier 1 — Parade Park toned to atmospheric silhouette.** Replaced the active
`.vine-park-scene-v2` game (lines 439-541) with a quieter field: kept infield dirt,
mound, home plate, chalk lines + empty bleacher. Replaced the 10-figure live game
with 2 distant kid silhouettes playing catch (tiny ball between them). Removed
the basketball half-court + batting cage entirely. Reads as "there's a ballpark
up the hill" not "live game in progress."

**Tier 2 — Municipal Stadium ghost activated as MOCK position.** Removed
`style="display:none"` from `.vine-monarchs-stadium`. Wrapped in
`transform="translate(64, 51) scale(0.7)"` so the ghost renders in the upper-left
sky ABOVE Parade Park — reads as "ghost of the historical stadium floating over
where today's park sits." Inline `style="opacity: 0.55;"` overrides the canonical
ghost-building opacity:0 default so the mock is visible without the toggle. Brian
approves position → remove inline opacity + wire the `.scene-ghost-toggle-input`
UI in a follow-up pass.

**Tier 3 — "KANSAS CITY MONARCHS" painted ghost-sign on Street Hotel upper wall.**
New `<g class="vine-monarchs-mural">` inside the Street Hotel group. 3 lines:
small "KANSAS CITY" at y=362, large "MONARCHS" at y=372, tiny italic "BASEBALL
CLUB" at y=378. Faded period-ad palette `rgba(240,220,180, 0.28–0.42)` Playfair
Display, different weights. Reads as paint-on-brick, always visible regardless
of TOD. Ties baseball permanently into the built fabric.

Net effect: baseball now has 3 distinct reads — contemporary-quiet (Parade Park
silhouette), historical-memory (Stadium ghost), permanent-fabric (mural) —
without shouting. All three point at the Negro Leagues history the scene is built
around.

### Focus B — 18th & Vine background fill (brief's B.1)

New LAYER 2.5 in `neighborhoods/18th-vine.html` between sky clouds (line 294) and
VP residential density (line 296). Four sub-groups:

- **Moon** (`.vine-moon building-night-lights`) at (1462, 145) r=20, night-gated.
  Three small crater circles for texture.
- **East-side tall silhouettes** (`.vine-east-density`) — 5 taller shapes at
  x=1410-1544 extending from y=340 up to y=146 at the tallest peak. One
  silhouette (x=1460-1484) occludes ~30% of the moon's right side. Mini lit
  windows on the tall one via `.building-night-lights`.
- **Stepped residential row** (`.vine-residential-stepped`) — 16 simple house
  silhouettes spanning x=180-480 and x=1080-1358 at y=336-358, stepping up the
  bluff BEHIND the existing vine-residential rows. Chimneys on 6 houses, 3
  trees interspersed. New CSS class `.vine-horizon-building-far` uses lower
  opacity fill (0.38) for depth layering.
- **Distant train** (`.vine-distant-train`) — locomotive + 3 freight cars
  crawling east-to-west along horizon y=172-180. 150s cycle, opacity 0.5,
  TOD-independent. Reused the `westbottoms-distant-train` pattern from v21.
  New `@keyframes vine-distant-train-crawl` in style.css.

### CSS added (bottom of style.css, ~40 lines)

`.vine-horizon-building-far`, `.vine-horizon-tree-far`, `.vine-horizon-chimney`,
`.vine-east-density-tall`, `.vine-distant-train-body` + `@keyframes
vine-distant-train-crawl` + reduced-motion override.

### Cache + rsync

Bumped `style.css?v=21a → ?v=23a` across 125 HTML files. Rsynced to `/tmp/kc_site/`.

### Implementation notes worth remembering

- **Shadow filter on basin floor**: `<filter id="wb-viaduct-shadow" x="-2%" y="-10%"
  width="104%" height="130%"><feGaussianBlur stdDeviation="5"/></filter>` — the
  bounding box expansion is critical or the blurred shadow clips at the filter
  region edges. If you change the shadow path to be taller, expand the height %.
- **Near-rail vs far-rail depth**: far rail posts at 12u tall, near rail posts at
  12u tall too. But near-rail stroke 1.2 (slightly thicker than far 1.1) because
  the near rail is CLOSER to the viewer in perspective — compensating for the
  automatic compression at small rendered screen scale.
- **Street Hotel mural y-positioning**: upper wall zone y=362-378 is tight (16u
  between cornice at y=356 and first window row at y=378). MONARCHS font-size 7
  fits; anything larger overlaps windows. If the mural needs to be bolder, move
  the text UP to y=358-370 (on top of the cornice line, then window area
  stays clean).
- **Monarchs ghost transform math**: `translate(tx, ty) scale(s)` where inner-coord
  (ix, iy) renders at (ix*s + tx, iy*s + ty). At scale 0.7 with tx=64, ty=51:
  stadium's internal (80, 184) → (120, 180.8); (220, 312) → (218, 269.4). Reading
  as upper-left sky above Parade Park's y=358-432 footprint.
- **Building-night-lights on the ghost**: the moon + its crater circles and the
  tall silhouette window dots are wrapped in `.building-night-lights` so they
  only appear at dusk+night. Per v20 note, this class uses
  `animation: night-lights-visibility 40s linear infinite` which opacity-gates to
  75-100% of TOD cycle.

### Deferred from v23 (for Chat → v24)

- **Wire Municipal Stadium ghost toggle UI** (currently MOCK visible via inline
  opacity:0.55). After Brian approves the position, remove inline opacity and
  wire up a `.scene-ghost-toggle-input` + `.scene-ghost-toggle-label` per the
  canonical v21 pattern. Decide: share 18th & Vine's existing ghost toggle with
  the Monarchs stadium (both use `.scene-ghost-building`), or add a separate
  toggle for finer control.
- **18th & Vine saturation calibration** — still deferred (per v23 brief, this
  benefits from fresh eyes between sessions).
- **18th & Vine mobile clipping fix** — still deferred, needs nested-group refactor.
- **18th & Vine proportions rework** — still deferred, big project.
- **Painted warehouse signage on West Bottoms** — candidate atmospheric item.
- **Pedestrian on West Bottoms viaduct** — Brian deferred in v21 brief; could
  fit naturally now that the viaduct reads as a proper structure.
- **OpenGraph images bundle** — 30-min quick win, didn't land in v23.
- **`view-timeline` parallax on essay pages** — v24 advanced-web-design candidate.
- **View Transitions API** — still the biggest polish available, probably its
  own dedicated session.

### v23 carry-forwards from earlier sessions

- Sun/moon occluders (homepage) — still deferred.
- Homepage trail-following walkers 13-15.
- Banner plane spawn rate — Brian OK'd current cadence.
- Midtown water reflections + ghost overlay.
- Streetcar disembark groups on homepage.

- **Cache** now at `?v=23a` across 125 HTML files.

---

## v24 session — UYA anchor on 18th & Vine + West Bottoms Beaux-Arts/right-edge/TOD-bug + Crossroads planning brief (2026-04-24)

v24 shipped three focuses per Chat's v24 brief. Cache bumped `?v=23a → ?v=24a`
across 125 HTML files.

### Focus A — Urban Youth Academy anchor on 18th & Vine

Real UYA at 1616 E 17th Terrace rendered as a long-horizontal building with a
contemporary saturated mural wall, paired with a parking lot extending Vine
Street's western terminus. Adds a **4th temporal register** to the scene's
baseball arc: Negro Leagues ghost ↔ Parade Park silhouette ↔ Monarchs ghost-sign
↔ **Urban Youth Academy present-day**. Inserted inside the existing `.vine-vp`
group, paints before foreground buildings so 18th Street's south-side row
(Blue Room, Sign Building) occludes UYA's right edge at low cost.

- **Building**: 190u wide × 47u tall. Brick base (`#8A3A24`) + cream stucco
  upper (`#D9CEB0`) + warm-dark shingle low-peak gable (`#5E564F`). Cornice
  line between base and stucco. Entry door centered below mural.
- **Field-light poles**: 3 tall verticals with cluster ellipse heads rising
  behind the building (implies ballfield continues). Night-gated warm glows.
- **Mural**: 5 vignettes across the stucco wall, separated by thin vertical
  bands. Palette: Royals blue (`#004687`), grass green (`#2B7A3A`), red
  (`#CC2936`), gold (`#FFBF0F`), cream base (`#F5E9D3`). Motifs: batter
  silhouette + "KC" text, crown, runner, baseball diamond, fielder + ball.
  Saturated and contemporary — deliberately contrasts with the desaturated
  period-ad Monarchs ghost-sign on Street Hotel.
- **Wall-washer lights**: 3 downward-pointing fixtures on the roofline
  casting warm pools onto the mural at night (gated via `.building-night-lights`).
- **Parking lot**: asphalt rectangle 200u × 46u extending Vine Street's western
  terminus. 6 stall stripes, top bumper line, 3 parked cars (rust-red pickup,
  slate sedan, cream/tan SUV) sized for silhouette-scale reading.
- **Park integration**: dashed pathway connecting UYA lot west to Parade Park,
  low chain-link fence along lot's back edge, 2 trees (one between UYA and
  Parade Park, one at lot's east edge), 1 bench along the west pathway.

**Viewport-visibility reposition (important)**: UYA originally drawn in internal
coords at x=40-230 (geographically accurate north-of-18th west position).
Clipped off-screen at ≤1400px desktop viewports due to `preserveAspectRatio="xMidYMid slice"`.
Wrapped the three UYA groups (`.vine-uya`, `.vine-uya-lot`, `.vine-uya-park`)
in `transform="translate(400, 0)"` to shift them +400u to the right —
rendered at x=440-630, fully visible on all common desktop widths. Sign
Building (rendered at x=296-456) occludes UYA's left edge (paint order).

### Focus B.1 — TOD animation hard-reset bug fix

Brian reported: *"there appears to be a hard reset in the animation flow that
maybe is tied to TOD cycle."* Diagnosed: `@keyframes westbottoms-night-glow-fade`
and `@keyframes westbottoms-haunted-glow-fade` in `style.css` both ended at
opacity 0.95 / 0.7 at 100% but looped back to opacity 0 at 0% — creating a
visible SNAP at every 40-second cycle boundary.

**Fix:** added a fade-down tail through 92% → 100% so opacity hits 0 at the
loop boundary and returns to 0 at next-loop-start. Canonical pattern (matches
`night-lights-visibility` used across other scenes):

```css
@keyframes westbottoms-night-glow-fade {
  0%, 50%   { opacity: 0; }
  55%       { opacity: 0.25; }
  75%       { opacity: 0.92; }
  92%       { opacity: 0.95; }   /* peak */
  100%      { opacity: 0; }      /* fade-down to match 0% — continuous loop */
}
```

Same pattern applied to `westbottoms-haunted-glow-fade`. Brian verifies visually
on his end (the fix is a CSS-only change).

### Focus B.2 — Right-edge viaduct gap fill

The v21/v23 viaduct terminated at (1320, 368) with the triangular area above its
right edge reading as "vanishes into nothing." Picked Brian's option (i) — viaduct
continues past one more half-visible pier into a distant-bluff silhouette behind.

New LAYER 14.6 `.westbottoms-viaduct-extension` inserted between shadow (14.5)
and deck (15):

- **Distant bluff silhouette**: irregular ridge path at x=1300-1600, y=322-448
  (Quality Hill context — the real-life terminus of the 12th Street Viaduct).
  Warm-dark (`#3E3020`) at opacity 0.62.
- **Bluff top ridge hairline**: thin warm line catches TOD-reflected light.
- **Bluff industrial/tree silhouettes**: 2 triangular trees + 2 small smokestacks
  atop the bluff (dark warm `#2E2418` at 0.7 opacity).
- **Additional half-pier**: octagonal-tapered pier body at x=1388-1410, y=382-448,
  stepped Beaux-Arts plinth base at y=444-450, cornice cap at top.
- **Deck continuation stub**: thin slab riding on the new pier, extending the
  deck visually past its previous terminus.
- **Segmental arch hint**: curve from the new pier back to the existing deck
  terminus.

Reads as "viaduct continues east toward Quality Hill and terminates at the bluff."

### Focus B.3 — Beaux-Arts viaduct identity

New LAYER 14.7 `.westbottoms-viaduct-beauxarts` — adds real-world 12th Street
Viaduct architectural character to the deck's far edge. Keeps all v23 elements
(pipe railing, rivets, double rail, kickplate, near-rail, shadow, pier ticks,
expansion joints) unchanged.

- **Cornice strip**: warm-limestone hint (`rgba(162,136,96,0.7)`, stroke 1.6u) running
  the full length of the deck's far edge, offset 3u below the existing
  concrete-edge highlight. Warmth nudge from the gunmetal palette, not full
  shift — per Brian's Q3 direction.
- **Drip-shadow line** just below the cornice for depth.
- **7 octagonal pier ticks**: rectangular pier bodies with stepped-plinth bases
  at varying scale (larger near viewer, smaller at perspective). Chamfered
  corners implied via 2u top-inset lines on the largest pier.
- **6 recessed spandrel panels**: thin-stroked rectangles between consecutive
  piers, sitting below the cornice. Reads as carved stonework at scale.
- **6 segmental arches**: shallow Q-curves between adjacent piers, matching the
  spandrel rhythm.

All in gunmetal-gray palette (`#3C342A`, `#2C2620`, `#1E1810`) with warm-limestone
cornice as the only palette departure.

### Focus C — Crossroads planning brief

Created `/CROSSROADS_PLANNING_v24.md` at repo root. Document-only (no code).
Covers scene identity, POV decision (street-level south down Baltimore), TOD
target (First Friday evening), landmark inventory (Grinders, Crossroads Hotel,
21c Museum Hotel, Town Topic, RecordBar, rail bridge, notable mural), palette
(warm brick + 5 saturated pops), mural plan (5 slots × motif categories),
energy-level plan (dense/performative), animation plan, risks/open-questions,
and a 3-round phased build plan (block-out → detail → polish) spanning v25/v26/v27.

### Files touched in v24

- `style.css` — TOD keyframe fix + UYA CSS (~80 new lines)
- `neighborhoods/18th-vine.html` — UYA building + lot + park integration + transforms
- `neighborhoods/west-bottoms.html` — viaduct extension (LAYER 14.6) + Beaux-Arts
  identity (LAYER 14.7)
- `CROSSROADS_PLANNING_v24.md` — new planning document
- 125 HTML files — cache bump `?v=23a → ?v=24a`

### Implementation notes worth remembering

- **TOD keyframe continuity**: any keyframe ending non-zero at 100% creates a
  visible snap at the loop boundary. Canonical fix: add a 100% breakpoint at 0
  opacity, with peak at 92% or similar. Check all `@keyframes *-fade` rules in
  `style.css` for this pattern if bug ever resurfaces.
- **UYA transform wrap**: `.vine-uya`, `.vine-uya-lot`, `.vine-uya-park` all
  need matching `transform="translate(400, 0)"`. If one group's transform gets
  removed, that group's elements will ghost back to the west-side unseen zone.
  For child-coord children referenced from outside (e.g., night-effect overlays
  in another layer), wrap THEM in matching transforms too.
- **UYA + Sign Building paint order**: Sign Building paints AFTER UYA in source
  order, so it correctly occludes UYA's left edge where they overlap. Don't
  reorder.
- **Beaux-Arts pier placement**: piers are at internal x positions tightening
  with perspective (96, 284, 478, 680, 880, 1080, 1270). This matches the
  deck's S-curve, so piers sit where the deck passes through each x.
- **Right-edge extension pier vs. v23 near-rail pier ticks**: these are
  separate elements. The v23 pier ticks are on the DECK surface (subtle
  girder-tops implied). The v24 extension pier is a FULL pier silhouette past
  the deck's terminus. Don't conflate.
- **Viewport clipping is a scene-design constraint**: placing signature elements
  in the clipped zones (internal x < 333 at 1400px viewport) results in invisible
  content for most desktop users. Work within the visible internal x range of
  ~333-1267 for 1400px, or accept clipping and rely on mobile `meet` mode to
  show the full scene.

### Deferred from v24 (for Chat → v25)

Carried forward per Brian's v24 brief:

- **West Bottoms expansion** — roads, walking paths, pedestrians, trucks,
  scale figures, living scene. v25's dedicated focus.
- **Crossroads implementation round 1 (block-out)** from the v24 planning doc.
- **Monarchs Stadium ghost toggle wiring** — still deferred; position will
  settle with more scene development.
- **OpenGraph images bundle** — 30-min quick win, still deferred.
- **Saturation calibration** on 18th & Vine food-cart glow + Parade Park lights
  + brightest night windows.
- **Mobile clipping fix** — structural DOM refactor.
- **Proportions rework** on 18th & Vine.
- **`view-timeline` parallax** on essay pages.
- **View Transitions API** cross-page morphing.
- All v23 carry-forwards remain.

### Cache

`style.css?v=24a` across 125 HTML files.

---

## Tips for the next agent

- **Whenever Brian sends a screenshot, look at it carefully** — there's often a subtle "that thing right there" he's pointing at. Ask if you can't identify it.
- **If he says "the clock tower looks wrong"** — there are TWO clock towers in the KC architectural vocabulary (Mill Creek Clock Tower on the Plaza, and historically there was also a Courthouse Clock Tower which doesn't exist in these scenes). The Midtown scene's Mill Creek Clock Tower lives in Layer 3b2 Plaza mid. And as of v17d, **Katz Drug has its own corner clock tower** — so there's now a THIRD clock tower in play. If Brian says "the clock tower", ask which one.
- **Bulk edits are best done with Python scripts** run via Bash. HTML files are long, cache bumps touch 118 files, and many edits are parallel (e.g. applying shifts to multiple building groups).
- **When shifting buildings**, use `transform="translate(dx, dy)"` on the `<g data-building>` wrapper. Don't rewrite polygon points unless you need to change the silhouette itself.
- **The Midtown scene elevated building pattern**: every foreground building group has `translate(dx, -20)` to sit on the y=560 shelf. Kauffman Garden has `(380, -40)` because it's 20u further uphill. If adding a new Midtown building, match the pattern.
- **Don't use `transform: scale()` on SVG circles without setting `transform-origin: center; transform-box: fill-box;`** — default origin is (0,0) of the SVG, so scaled circles visually fly toward the top-left. This caused the v17b "cyclone" bug. Opacity-only animations are safer for pinpoint bulbs.
- **Mobile viewport behavior** depends on the `js/responsive-hero.js` script which toggles `preserveAspectRatio="slice"` ↔ `"meet"` at 640px. Fountain pages + Midtown + **18th & Vine (v18)** now use this. If you create a NEW signature scene, add its selector to the script and include the script tag on the new page.
- **"The scene owns its container" pattern (v18)**: when reusing a scene on a new page, copy the scene with its ORIGINAL container spec. The homepage skyline uses short-and-wide (`.skyline-svg-container`, 40vh / 260-520px) because its composition was tuned for that. The Downtown neighborhood page therefore inherits the same container. Midtown uses 560px because its vertical landmarks need the height. Don't try to normalize all scenes to one container — you'll compromise a composition that was purpose-tuned. New neighborhood scenes earn their own container spec matched to their composition.
- **Sync script (v18)**: `scripts/sync_skyline_scene.py` propagates the homepage skyline SVG to reused pages (currently just Downtown). Run it after any homepage skyline SVG edit. `--check` flag reports drift without writing. Only touches the `<svg class="skyline-svg">...</svg>` block — not wrappers, CSS, or page chrome.
- **Scene perspective (v18 18th & Vine)**: the 18th & Vine scene is the site's first perspective view. Vanishing point at (1000, 360). Near-viewer sidewalks flare BELOW y=560 to give the foreground FG-left Parker plaza and FG-right YMCA castle a natural ground plane. If you add more perspective scenes, build the perspective block-out FIRST (crude shapes at depth) and validate with Brian before adding detail — locking in detailed artwork before composition is validated is the failure mode that caused the v18 flat-to-perspective pivot.
- **Bump the `style.css?v=…` querystring on ALL HTML files** whenever you change CSS. Easiest: `cd project && grep -rl "v=OLD" --include="*.html" . | xargs sed -i '' 's/v=OLD/v=NEW/g'`. Currently at `?v=24a`.
- **The preview server serves from `/tmp/kc_site/`** — always rsync after edits (excludes `.claude`, `.git`, `V11_PLAN.md`, `CLAUDE_CHAT_CONTEXT.md`, `HANDOFF.md`, `BRAINSTORM_SEED.md`).
- **For new animated elements**, always add a `@media (prefers-reduced-motion: reduce)` rule.
- **Ghost buildings and backfills** on the HOMEPAGE have non-obvious dependencies on interactive building positions. The Midtown scene doesn't have ghost buildings.
- **Brian alternates Code ↔ Chat**: code sessions end with updated HANDOFF.md + BRAINSTORM_SEED.md. Chat returns a spec brief for the next code session.
- **After any big batch of work, end the response with a copy-pasteable GitHub commit summary** in a fenced `text` block (imperative title ≤70 chars, blank line, bulleted body).

Good luck. He's a great collaborator — ask questions, move in small steps, verify visually.
