# Look Up, Kansas City — Claude Chat Context File
*Last updated 2026-04-22 — v7 batch largely shipped (Tracks 1, 2, 3 partial, 4, 5 done; Track 6 partial; site ~115 pages).*

---

## What This Project Is

**Look Up, Kansas City** is a pure HTML/CSS architecture and history guide to Kansas City. No JavaScript frameworks, no build tools, no CMS — just `.html` files and one `style.css`, served statically. Built by Brian (new to coding) using Claude Code.

**Live preview server:** `http://localhost:7890` — served from `/tmp/kc_site/` via a Python static server. Working directory is `/Users/brian.soetaert/Desktop/Claude Co-Work/`. After editing files, run:
```bash
rsync -a --delete --exclude='.claude' --exclude='.git' "/Users/brian.soetaert/Desktop/Claude Co-Work/" /tmp/kc_site/
```

The browser caches `style.css` aggressively. To verify CSS changes in the preview, force-reload by appending a query param to the stylesheet link via `preview_eval`.

**Cache-bust pattern:** `index.html` uses `<link rel="stylesheet" href="style.css?v=5" />`. Bump this version whenever making CSS changes that need to propagate to the deployed GitHub Pages site — browsers will re-download the file on next visit rather than serving stale cache. Other pages use unversioned `style.css` links, which GitHub Pages cache-invalidates on file mtime change (usually within 10 minutes of a push). For critical fixes, update root-level pages to also use `?v=N`.

---

## Site Structure — ~102 Pages (after v6 full completion)

### Top-Level
- `index.html` — Homepage with interactive SVG skyline illustration + **time-of-day toggle (Dawn/Day/Dusk/Night)**
- `start-here.html` — Three reading tracks: Architecture, History, Visitor's
- `reading.html` — Annotated bibliography
- `404.html` — Editorial "Lost Kansas City" themed not-found page with vanished-building SVG
- `history.html` — **Redesigned in v6** as a 4-category master hub (Eras / Figures / Themes / Episodes) with flat "All History Pages" index below
- `art-deco.html` — Art Deco style overview (has `.page-toc` secondary nav)
- `plaza.html`, `overlooks.html`, `spaces.html`, `fountains.html` — hub pages
- `seville.html` — Spanish Colonial / Plaza-influence reference

### Sections
| Directory | Pages |
|-----------|-------|
| `buildings/` | boom-era, modern-era, stadiums (hubs) + 13 building detail pages + `compare.html` signature SVG |
| `fountains/` | 6 fountain detail pages |
| `history/` | **~30 pages** after v6 — see History section breakdown below |
| `neighborhoods/` | 7 neighborhood pages |
| `spaces/` | 3 pages (parks-boulevards, ward-parkway, loose-park) |
| `styles/` | 6 architectural style pages |
| `visit/` | 6 visit pages — 4 walking tour pages with inline SVG route maps + World Cup 2026 |

### History Section (restructured in v6)

The History nav was collapsed from 12 items to 5. Content lives under the old filenames (no renames). The four category hubs route users into the content.

**Nav dropdown (5 items):** Timeline, Eras, Figures, Themes, Episodes

**Category hubs (new in v6):**
- `history/eras.html` — 7 era cards
- `history/figures.html` — 6 figure cards
- `history/themes.html` — 6 theme cards
- `history/episodes.html` — 5 episode cards

**Eras (chronological, 7 pages):**
- `founding.html` · `westport.html` · `railroad-boom.html` (stub) · `boom.html` · `mid-century.html` (stub) · `urban-renewal.html` · `contemporary.html` (stub)

**Figures (people, 6 pages):**
- `pendergast.html` · `truman.html` · `nichols-legacy.html` · `kessler.html` (new full essay) · `walt-disney-kc.html` (new full essay) · `buck-oneil-monarchs.html` (new full essay)

**Themes (6 pages):**
- `lost-kansas-city.html` · `the-river.html` · `streetcar.html` (new hub consolidating the two streetcar pages) · `race-and-the-city.html` (new full essay — highest editorial priority) · `jazz-and-architecture.html` (new full essay) · `civic-imagination.html` (new full essay)
- Note: `streetcar-historic.html` and `streetcar-modern.html` still exist as companion essays; the streetcar hub links to both.

**Episodes (5 pages):**
- `battle-of-westport.html` (stub) · `convention-hall-fire.html` (new full essay) · `union-station-massacre.html` (new full essay) · `great-flood-1951.html` (stub) · `1968-riots.html` (new full essay)

**Plus:** `timeline.html` (unchanged — the full chronological timeline)

**Stubs shipped with minimal placeholder content** (5 pages): railroad-boom, mid-century, contemporary, battle-of-westport, great-flood-1951. Each has a 2-paragraph placeholder and Related links. The filenames and URLs are in place so the hubs link correctly; the content is queued for future writing passes.

---

## CSS Architecture

**File:** `style.css` (~2,800 lines), no preprocessor.

**CSS Custom Properties:**
```css
--gold: #C9A84C
--gold-light: #E8C96A
--dark: #1A1610
--black: #080604
--cream: #F5EFE0
--warm-grey: #8C7E6A
```

**Fonts:** Playfair Display (headings/display), Josefin Sans (body/labels/nav)

**Key component classes:**
- `.detail-hero` — full-width photo hero (520px height, `object-fit: cover`)
- `.detail-body` — main content wrapper (max-width ~740px, centered)
- `.detail-facts` — horizontal fact strip
- `.detail-section` — content section block (with `id` triggers `#` hover anchor indicator)
- `.detail-gallery` — 2-column photo grid
- `.history-pullquote`, `.history-dropcap`, `.history-masthead` — newspaper-style page chrome
- `.before-after-panels` — pure CSS THEN/NOW comparison grid
- `.troost-map` + `.troost-map-svg` — wrapper for inline SVG maps (also reused for walking tours)
- `.page-toc` — sticky secondary nav (z-index: 100)
- `.start-track`, `.reading-entry` — reading track / bibliography blocks
- `.compare-buildings-wrapper` + `.compare-buildings-svg` — Track 1 horizontal-scrolling comparison
- `.compare-building` — wrapper `<g>` for each building in the comparison; `:has()` powers the spotlight dim
- `.skyline-controls` — Track 2 time-of-day radio toggle (Dawn/Day/Dusk/Night)
- `.building-crown-light` — P&L crown light, hidden by default, animated on dusk/night
- `.mobile-nav-toggle` + `.mobile-nav-button` — Track 4 hamburger pattern (≤900px breakpoint)
- `.visit-walking-tour` — body class on walking tours; print stylesheet uses it for per-stop page breaks

**Critical z-index values:** `nav` is `z-index: 300` so dropdowns paint above `.page-toc` (`z-index: 100`).

**Skyline SVG quirk:** the homepage skyline `<svg>` uses `preserveAspectRatio="xMidYMax slice"` so building bases stay anchored to the container bottom regardless of viewport size.

---

## Site-Wide Markup (every page has)

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#1A1610" />
  …fonts, OG, stylesheet…
</head>
<body>
  <input type="checkbox" id="mobile-nav-toggle" class="mobile-nav-toggle" aria-label="Toggle navigation" />
  <label for="mobile-nav-toggle" class="mobile-nav-button" aria-hidden="true"><span></span><span></span><span></span></label>
  <nav>… 8 dropdowns …</nav>
  …
</body>
```

The favicon is at `/favicon.svg` (a stylized gold diamond on dark). Web manifest at `/site.webmanifest` makes the site installable PWA-style.

---

## Navigation Structure (all ~102 pages)

Every page shares the same nav. The nav has **9 top-level items** after v6 — Home, Styles, Buildings, Fountains, The City, History, Neighborhoods, **Blog** (single link, no dropdown), Visit.

Dropdowns:

- **Styles:** Art Deco, Spanish Colonial, Beaux Arts, Gothic Revival, Streamline Moderne, Contemporary, Materials & Details
- **Buildings:** Boom Era 1900s–40s, Modern Era, Stadiums, Compare Heights
- **Fountains:** All Fountains + 6 individual fountains
- **The City:** The Plaza, Parks & Blvds, Ward Parkway, City Overlooks
- **History (v6 restructure — 5 items):** Timeline, Eras, Figures, Themes, Episodes
- **Neighborhoods:** Downtown, Midtown, Crossroads, 18th & Vine, West Bottoms, Westport, Brookside
- **Blog** (single link, no dropdown) → `/blog/index.html`
- **Visit:** Start Here, Walking Tours, Further Reading, World Cup 2026

Root-level pages use paths like `buildings/city-hall.html`; subdirectory pages use `../buildings/city-hall.html`.

**Bulk nav updates** use perl in-place multiline replacement — see prior batches for working patterns. **Important:** if adding a new page, double-check that pages created during the same session don't end up with duplicate nav entries (the perl regex matches whatever pattern is in the page already).

---

## Signature Components (the headline pieces)

### 1. Compare Heights — `buildings/compare.html`
A horizontal-scrolling SVG diagram showing 16 major Kansas City buildings drawn at the same vertical scale on a common ground line. Uses a `viewBox="0 0 2400 1000"` SVG with:
- Buildings rendered as gold-line silhouettes (no/subtle fill)
- Common ground line at y=900
- Height gridlines every 100 ft (scale: 1.25 units/ft)
- Demolished buildings (Original Union Depot 1878, Convention Hall 1900) drawn in dashed lines
- 6-foot human figure for scale at the far left
- `<a>` wrappers link each building to its detail page; `:has()` spotlight dims others on hover
- Wrapper has `overflow-x: auto; min-width: 1800px` for mobile horizontal scroll

### 2. Homepage Skyline SVG — `index.html`

**Rebuilt after v5.** ViewBox `0 0 1600 600`, `preserveAspectRatio="xMidYMax meet"` (the `meet` is important — `slice` caused edge buildings to get cropped on narrower viewports). Scale: 0.65 units per foot. Ground line at y=560.

**12 interactive buildings**, arranged roughly geographically west-to-east:
1. **Liberty Memorial** (x=45-130) — Egyptian-revival tapered tower with flame circle crown
2. **Union Station** (x=155-315) — wide horizontal Beaux Arts with colonnade hint lines
3. **Kauffman Center** (x=340-478) — twin Safdie curved shells as two Bezier-curve paths
4. **Bartle Hall** (x=498-620) — base platform + 4 thin pylons + 4 Sky Station sphere caps (the most instantly recognizable silhouette)
5. **Municipal Auditorium** (x=640-750) — wide deco cube with 5 vertical ribs
6. **Power & Light** (x=850-938) — stepped Art Deco crown with illuminated crown light element
7. **909 Walnut / Fidelity Bank** (x=956-1030) — Art Deco setbacks
8. **One KC Place** (x=1160-1240) — tallest, clean rectangular glass
9. **Jackson County Courthouse** (x=1260-1350) — stepped deco
10. **City Hall** (x=1370-1460) — stepped with explicit pyramid crown triangle
11. **T-Mobile Center** (x=1475-1575) — curved arena roof via cubic-bezier path
12. **(Town Pavilion)** at x=1055-1115 is **fill only** — no detail page exists

**Fill buildings** (no `data-building` attribute, non-interactive): Crown Center (low wide), Federal Reserve, Commerce Tower, Bank of America tower, Hotel Phillips, Town Pavilion, eastern/western atmospheric fades.

**Time-of-day toggle** (Dawn/Day/Dusk/Night) sits inside a `<fieldset class="skyline-controls">` directly above the SVG container. Implementation:
- 4 `<input type="radio">` + `<label>` pairs
- Radio inputs visually hidden, keyboard-accessible via `:focus-visible + label`
- `.skyline-hero:has(#tod-night:checked) { background: …night gradient… }` — uses `:has()` for cross-element state queries
- Each state changes: hero gradient, building stroke/fill colors
- The P&L Building has a `<g class="building-crown-light">` element (3 concentric circles + horizontal bar) hidden by default (`opacity: 0`), faded in + animated with `crown-pulse` keyframes at dusk/night
- `prefers-reduced-motion: reduce` disables the pulse animation

**Spotlight hover pattern:** `.skyline-svg:has(g[data-building]:hover) g[data-building]:not(:hover) { opacity: 0.18 }` — when a building is hovered, all others dim to 18%.

### 3. Walking Tour Maps — `visit/*-walk.html`
Each of 4 tour pages now has an inline SVG route map showing:
- Schematic street grid
- Curved dashed gold path connecting numbered stops
- First stop marker is larger (gold-light); subsequent stops are smaller (gold)
- Street labels in warm-grey
- North arrow + tour title in upper corners
- Maps use `.troost-map` wrapper class (reused from history maps)

### 4. Mobile Nav
CSS-only checkbox + label hamburger that activates at ≤900px:
- Hamburger button is fixed top-right (gold border, gold bars)
- Bars rotate to form an X when checked
- Nav becomes a fullscreen overlay with all 8 sections stacked vertically
- Dropdowns expand inline on `:focus-within` or `:hover`
- Desktop layout (>900px) is unchanged

---

## Page Template Structure (standard detail page)

```html
<nav>…</nav>
<!-- optional: <nav class="page-toc">…</nav> for long pages -->
<div class="breadcrumb">Home ◆ Section ◆ Page</div>
<div class="detail-hero">
  <img src="…" style="object-position: center X%;" alt="…" />
  <div class="detail-hero-overlay">
    <span class="eyebrow">Context</span>
    <h1>Title<br /><span>Subtitle</span></h1>
  </div>
</div>
<main>
  <div class="detail-body">
    <div class="detail-facts">…</div>
    <div class="deco-rule"><span class="deco-rule-icon">◆</span></div>
    <div class="detail-section" id="some-anchor">…</div>
    <!-- galleries, SVG maps, before/after panels, pullquotes -->
    <div class="detail-section">Related links…</div>
  </div>
</main>
<footer>…</footer>
```

History pages add `.history-masthead`, `.author-byline`, `.history-dateline` right after the hero.

---

## SVG Map Conventions

Wrapped in `.troost-map` div, use class `.troost-map-svg` on the `<svg>` element:
- Dark background (`<rect width="…" height="…" fill="#1a1610"/>`)
- Gold strokes (`#C9A84C`) for primary elements
- Warm-grey (`#8C7E6A`) for labels/secondary elements
- Common viewBox sizes: `0 0 560 320` (river/troost), `0 0 560 420` (walking tours), `0 0 2400 1000` (compare-heights)

For walking tour maps:
- Stop markers: `<circle r="10">` or `<circle r="13">` for first stop
- Numbered stops: gold text inside dark circle
- Route line: `<path>` with `stroke-dasharray="8,4"` for dashed connection

---

## Image Pattern

All hero images use Wikimedia Commons URLs. Hero images use `object-fit: cover` (set in CSS) with inline `style="object-position: center X%;"` to frame the subject. **Never use `object-fit: contain`** — it causes letterboxing.

---

## Print Stylesheet

`@media print` block in style.css covers:
- Hides nav, footer, breadcrumb, page-toc, mobile-nav-button, skyline-controls, deco rules
- Light theme (white bg, dark text)
- `.detail-section` and reading entries get `page-break-inside: avoid`
- Walking tour pages (`<body class="visit-walking-tour">`) get `page-break-before: always` between stops
- Maps get `page-break-after: always` so they print on their own page first

---

## Editorial Voice

The site balances architectural appreciation with honest history. Key tensions it holds:
- J.C. Nichols built beautiful, enduring neighborhoods **and** used racially restrictive deed covenants
- The Pendergast machine was corrupt **and** built the Art Deco infrastructure that defines KC
- Urban renewal destroyed vibrant Black neighborhoods **and** produced enduring civic buildings
- The streetcar system shaped the city's geography **and** reinforced racial boundaries (Troost line)

Pages are written in a literary, unhurried voice — detailed but never dry. Drop-caps on first paragraphs of long history pieces. Pullquotes for argument-anchoring statements.

---

## Browser Support Notes

- `:has()` selector — used heavily for spotlight dimming (skyline + compare-heights) and time-of-day state. Chrome 105+, Firefox 121+, Safari 15.4+
- CSS Grid + flex — universal
- `preserveAspectRatio="xMidYMax slice"` on SVG — universal
- `prefers-reduced-motion: reduce` — respected for all animations (skyline crown pulse, comparison transitions)

---

## v6 batch — full completion

All six tracks shipped. The site expanded from ~77 pages (end of v5) to ~102 pages.

### Track 1 — History restructure
12-item History nav collapsed to 5 (Timeline + Eras/Figures/Themes/Episodes). Four new category hub pages. The streetcar consolidation hub at `history/streetcar.html`. 6 new full essays (race-and-the-city, kessler, walt-disney-kc, buck-oneil-monarchs, jazz-and-architecture, civic-imagination) + 3 full episodes (convention-hall-fire, union-station-massacre, 1968-riots) + 5 stubs (railroad-boom, mid-century, contemporary, battle-of-westport, great-flood-1951). Master `history.html` redesigned.

### Track 2 — Hub redesigns with signature SVGs
- `history.html`: **mini horizontal timeline** with 14 clickable dots spanning 1821–2026, 1925 and 2026 highlighted. Uses `.mini-timeline` CSS class.
- `neighborhoods.html`: **schematic SVG map** with 7 neighborhood regions, Troost Avenue dividing line, Missouri + Kansas River edges, compass. Brookside added. Uses `.neighborhood-map` + `.nbhd-region` + `.nbhd-label`.
- `styles.html`: **style-dominance timeline SVG** — 6 style rows × 15 decade columns, darker bands marking dominant periods, "1950s–1990s — little distinctive style work" annotation across the quiet period. Uses `.style-timeline` CSS class.
- `buildings.html`: **downtown district map** — schematic street grid with 13 building markers (4 highlighted bigger: One KC Place, Power & Light, City Hall, Liberty Memorial). Town Pavilion shown as fill for visual context. Uses `.buildings-district` + `.district-mark`.

### Track 3 — Blog infrastructure
`/blog/` section with `index.html` hub, `about.html` editorial statement, and 3 inaugural posts dated 2026-04-22:
- `2026-04-22-welcome.html` — "Welcome to the Notebook"
- `2026-04-22-power-and-light-at-dusk.html` — a walks piece
- `2026-04-22-the-mcconahay-building.html` — news/restoration piece cross-linking to the new `walt-disney-kc.html`

Blog CSS classes: `.blog-hub-header`, `.blog-hub-sub`, `.blog-featured`, `.blog-featured-card`, `.blog-post-list`, `.blog-post-card`, `.blog-post-card-body`, `.blog-post-eyebrow`, `.blog-continue`, `.blog-post-meta`.

**Homepage `From the Blog` section** added below the main hub grid, featuring all three inaugural posts with a "All Blog Posts →" link out.

### Track 4 — Quick wins
- `buildings/town-pavilion.html` **detail page created** (590 ft, 1986, HOK, postmodern). Town Pavilion **promoted to interactive** in the homepage skyline SVG (`data-building="town-pavilion"` with `<a href="buildings/town-pavilion.html">` wrapper) and in the compare-heights SVG.
- Photo credits audit: scanned `credits.html` (271 lines, 14 key images referenced). Adequate for now; a comprehensive pass could happen in a later batch.
- PNG fallback favicons and default OG image **not done** in this batch — the SVG favicon works in all modern browsers. PNG fallbacks require image generation tooling.
- `seville.html` decision: **kept** (344 lines, substantial Plaza-influence reference).

### Track 5 — Cross-linking pass
Related sections of 6 key existing pages updated to link to v6 essays:
- `nichols-legacy.html` → adds Race & the City, Kessler
- `pendergast.html` → adds Civic Imagination, Convention Hall Fire, Union Station Massacre
- `urban-renewal.html` → adds Race & the City, 1968 Riots
- `lost-kansas-city.html` → adds Convention Hall Fire, Great Flood
- `neighborhoods/18th-vine.html` → adds Jazz & Architecture, Buck O'Neil, Race & the City, 1968 Riots
- `buildings/union-station.html` → adds Union Station Massacre
- `history/the-river.html` → adds Great Flood 1951

### Track 6 — Documentation
This context doc updated. Mobile verification: the 9-item nav with the new 5-item History dropdown works through the existing mobile nav hamburger pattern unchanged from v5.

- ✅ **Track 1C (Hubs):** Built 4 new category hub pages — `history/eras.html`, `figures.html`, `themes.html`, `episodes.html`. Each uses `.card-grid` with `.hub-card` children.
- ✅ **Track 1E (Master hub):** Redesigned `history.html` with intro explaining the 4 categories, a 2x2 category card grid, a featured essays block (Race & the City, Nichols Legacy, Lost Kansas City), and a flat "All History Pages" browse-by-category index at the bottom. The mini horizontal timeline that was called for in the brief was NOT added (deferred — the existing vertical timeline on `timeline.html` covers the need).
- ✅ **Track 1F (Essays):** Wrote full content for 6 new essays — `race-and-the-city.html`, `kessler.html`, `walt-disney-kc.html`, `buck-oneil-monarchs.html`, `jazz-and-architecture.html`, `civic-imagination.html`. All use the standard history page template with masthead, dateline, dropcap, pullquote (where appropriate), and Related links.
- ✅ **Track 1G (Streetcar hub):** Built `history/streetcar.html` consolidating the historic + modern streetcar pages into a single Themes entry point with a short timeline and links to the two companion essays. The two existing streetcar pages remain at their URLs.
- ✅ **Track 1H (Episodes):** Wrote full content for 3 of 5 episode pages — `convention-hall-fire.html`, `union-station-massacre.html`, `1968-riots.html`.
- ✅ **Stubs:** 5 pages shipped as placeholders with 2-paragraph holding copy — `railroad-boom.html`, `mid-century.html`, `contemporary.html`, `battle-of-westport.html`, `great-flood-1951.html`.
- ✅ **Track 1D (Nav update):** Bulk perl replacement converted the 12-item History dropdown to the 5-item version on 113 pages (root + subdirs). Zero pages still have the old nav.

## v7 batch — status

Tracks 1, 2, 4 and most of 3 and 5 shipped; site now ~115 pages.

### Track 1 — Map of Everything ✅
- `map.html` at site root (810 lines). Large interactive schematic SVG (viewBox `0 0 1600 1200`) with 36+ markers across categories (buildings, fountains, history sites, walking tour stops, demolished buildings, overlooks). CSS-only category filter via `:has()` + `:checked` radio pattern. Legend, "What You're Looking At" / "Finding What You Want" / "What's Not Here" editorial sections. Added "Map" as standalone top-level nav item (between Home and Styles, per v7 Option A).
- "See every X on the Map" inline callouts added to the four main hubs: `buildings.html`, `fountains.html`, `history.html`, `neighborhoods.html`.

### Track 2 — Five history stubs fleshed out ✅
All five stubs upgraded from 2-paragraph placeholders to full essays, voice-matched to the existing history pages:
- `history/railroad-boom.html` — Hannibal Bridge → Stockyards → population growth → Kessler 1893
- `history/mid-century.html` — postwar pause → 1950s transition → 1960s urban renewal → 1970s hollowed-out decade → preservation movement
- `history/contemporary.html` — Union Station 1999 → 2000s cultural investment → Kauffman Center → 2010s return to core → 2020s → tensions that haven't resolved
- `history/battle-of-westport.html` — October 1864, the Gettysburg of the West
- `history/great-flood-1951.html` — the flood that ended Kansas City as a river city

### Track 3 — Advanced design (partial) ✅ + open
Scroll-driven animations live in `style.css` (~line 2205–2295, inside `@supports (animation-timeline: scroll()/view())` + `prefers-reduced-motion` block):
- **3A:** Hero `<h1>` rise-and-brighten as user scrolls past a detail-hero
- **3B:** `.lost-building-name` elements fade in/out as they pass through viewport (used on Lost Kansas City page)
- **3C:** `.detail-section` fade-reveal on prose sections as they enter view

**Not implemented from v7 spec:** reading-progress bar, Kessler Boulevard Network SVG, CSS anchor positioning for Compare Heights tooltips, container queries for cards, broader `<details>` collapsibles pattern.

### Track 4 — New content pages ✅
- `glossary.html` (374 lines) — architectural field guide with terms organized by zones / ornament / materials / windows / structure / style-specific
- `sources.html` (256 lines) — methodology & sources page (books, archives, walking tours, acknowledgments)
- `visit/events.html` (281 lines) — recurring KC architectural events and ongoing organizations

Added to nav: Glossary under Styles as "Field Guide"; Events and Sources under Visit.

### Track 5 — Blog expansion ✅
Three new v7 posts shipped (all dated 2026-04-22), each with its own voice register:
- `blog/2026-04-22-on-honest-history.html` — editorial, ~1,500 words — the method argument (why the site refuses to sequester hard history). Most editorially important piece; featured on blog hub and homepage.
- `blog/2026-04-22-world-cup-reflection.html` — editorial, ~1,100 words — World Cup through the lens of civic imagination
- `blog/2026-04-22-a-walk-through-the-crossroads.html` — walks, ~950 words — brick vs. limestone at night, P&L crown from eight blocks south

Blog index reordered: featured card is "On Honest History"; 6 posts listed. Homepage "From the Blog" section updated to show the 3 newest. `blog/about.html` notes ~one-post-a-month cadence target.

### Track 6 — Quick wins (partial)
- ✅ **RSS feed:** `blog/rss.xml` hand-maintained, all 6 posts listed. `<link rel="alternate" type="application/rss+xml">` added to `<head>` of all 8 blog HTML files.
- ❌ PNG fallback favicons — still deferred (needs image generation tooling)
- ❌ Default OG image (1200x630) — still deferred
- ❌ Photo credits deep audit — `credits.html` not yet systematically reviewed for v6/v7 additions
- Partial: cross-linking pass — only the 4 hub → Map callouts added; broader page-by-page pass (building, neighborhood, fountain → v6/v7 essays) not done

### Tracks 7 & 8 — Structural + docs
- Not done: About dropdown nav restructure, Blog dropdown showing 3 newest posts
- This context doc update is the Track 8 contribution for v7

## Still open / could be picked up next

- **PNG favicon fallbacks** (16x16, 32x32, 180x180, 192x192, 512x512) — requires image generation tooling; SVG favicon works in modern browsers.
- **Default OG image** (1200x630) — same, needs image generation.
- **5 history stubs to expand to full essays**: railroad-boom, mid-century, contemporary, battle-of-westport, great-flood-1951. Each has a 2-paragraph placeholder currently.
- **Broader cross-linking pass** — v6 touched 6 key pages, but many detail pages could benefit from a Related-section refresh linking to v6 essays.
- **Photo credits deep audit** — `credits.html` currently adequate but could use a systematic pass to ensure all Wikimedia images are properly attributed.
- **RSS feed** for blog — brief mentioned it as optional.
- **Town Pavilion SVG** on `buildings/compare.html` could get a more distinctive silhouette (currently a standard postmodern shape). Same for some of the recent additions that share silhouettes.
- **Neighborhood pages not yet built**: Quality Hill, Hyde Park, Waldo, Volker.
- **More building pages**: Bryant Building, Commerce Tower, Soldiers & Sailors Monument.

## What's Been Built (v5 + skyline rebuild summary)

- ✅ **Track 0:** Confirmed timeline page is in good shape (463 lines, 27 events 1821–2026)
- ✅ **Track 1:** `buildings/compare.html` — 16-building comparison SVG with hover spotlight
- ✅ **Track 2:** Homepage time-of-day toggle (Dawn/Day/Dusk/Night) with P&L crown illumination
- ✅ **Track 3:** SVG route maps for all 4 walking tours
- ✅ **Track 4:** CSS-only mobile nav (hamburger + accordion) at ≤900px breakpoint
- ✅ **Track 5:** SVG favicon (gold diamond on dark) + web manifest + theme-color meta
- ✅ **Track 6:** 404 page rewritten as Lost Kansas City editorial moment with vanished-building SVG
- ✅ **Track 7:** Anchor link `#` hover indicator on `.detail-section[id] > h2`
- ✅ **Track 8:** Print stylesheet enhanced for walking tours (per-stop page breaks)
- ✅ **Track 9:** "Six neighborhoods" copy fixed to "Seven", "Four Districts" to "Seven Districts"
- ✅ **Post-v5 skyline rebuild:** Homepage SVG expanded from 7 to 12 interactive buildings with accurate silhouettes (Kauffman Center twin shells, Bartle Hall 4 pylons with sphere caps, Municipal Auditorium vertical ribs, City Hall pyramid crown, T-Mobile arena curve, Liberty Memorial flame, Union Station colonnade, One KC Place as clear tallest). Geographic arrangement west-to-east. Switched `preserveAspectRatio` from `slice` to `meet` so all buildings stay visible at every viewport aspect. Bumped `style.css?v=5` cache-bust.

---

## Potential Next Work

- **PNG fallback favicons** — 16x16, 32x32, 180x180 (apple-touch-icon), 192x192, 512x512 PNG sizes. SVG favicon works in all modern browsers but PNG fallback is needed for older browsers and iOS home-screen icons.
- **Default OG image** (1200x630) — referenced in some pages but a single canonical fallback hasn't been generated.
- **Skyline polish** — possible next touches:
  - Dawn/dusk states could animate transitions for smoother feel (respect `prefers-reduced-motion`)
  - Additional atmospheric touches: subtle building window lights at night (small gold dots inside silhouettes)
  - More fill buildings could add density (Kansas City Star Building, 1201 Walnut, Commerce Bank Tower specifically)
  - Consider adding a small "The River" suggestion at the bottom edge to show the Missouri
- **Town Pavilion detail page** — it's currently fill-only in the skyline because there's no detail page yet. If built, promote to interactive with `data-building="town-pavilion"` + `<a href="buildings/town-pavilion.html">`.
- **Track 10 editorial deep-dives** (lower priority):
  - "The Pendergast / Art Deco Argument" essay
  - "Jazz and Architecture" piece on 18th & Vine
  - "Buildings That Almost Weren't" — proposed but never built / nearly demolished
- **More neighborhood pages** — Quality Hill, Hyde Park, Waldo, Volker
- **More building pages** — Bryant Building, Commerce Tower, Soldiers & Sailors Monument, Town Pavilion
- **Soft-decision needed:** keep `seville.html` as-is (344 lines, substantial) or fold into `plaza.html`?
- **Photo credits audit** — `credits.html` may need a review pass after the v5 batch

---

## Working with Claude Code on this site

- Always `rsync` to `/tmp/kc_site/` after edits to see them in the preview
- Force-reload `style.css` via `link.href = '/style.css?v=' + Date.now()` if styles aren't applying
- Bulk nav updates: use perl `-i -0pe` for multi-line in-place replacement
- The TodoWrite tool is helpful for tracking multi-track work
- Test mobile nav at actual narrow viewport (`preview_resize` to mobile preset)
- **Deployed-site caching gotcha:** if a CSS change looks fine locally but broken on the GitHub Pages site after a push, it's almost always browser/CDN cache serving a stale `style.css`. Fix: bump the `?v=` version on `index.html`'s stylesheet link (currently `?v=5`). Browsers treat different query strings as different URLs, forcing a fresh download.
- **SVG aspect ratio trap:** on the homepage skyline, `preserveAspectRatio="xMidYMax meet"` keeps all buildings visible at any viewport. `slice` clips the left and right edges on narrower viewports, hiding the buildings near the SVG's edge. If adding buildings to the far left or right of the skyline, verify visibility at mobile + laptop widths.
