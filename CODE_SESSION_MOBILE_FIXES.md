# Mobile View Bug Fixes — Claude Code Session

**Session Goal:** Fix mobile layout issues with hero scene overlays and spacing gaps

**Server:** http://localhost:7890  
**Main files:** `style.css`, scene HTML pages  
**Audience:** Claude Code (iterative, conversational fixes)

---

## Session Summary

This Cowork window identified three concrete mobile view bugs that need fixing:

1. **Ghost button overlay blocking scene** (18th & Vine, West Bottoms)
2. **Scenes floating / spacing gaps** (Midtown, potentially others)
3. **Audit for similar patterns** across all scene pages

The issues are CSS-driven and fixable without major structural changes. Brian is new to coding—iterate conversationally, show the fixes visually in DevTools before committing.

---

## Bug #1: Ghost Button Overlay (18th & Vine, West Bottoms)

### What's Happening

File: `neighborhoods/18th-vine.html` (lines 120–136)

```html
<section class="vine-hero-scene" aria-labelledby="vine-hero-h1">
  <input type="checkbox" id="vine-ghost-toggle" class="scene-ghost-toggle-input" />
  <div class="vine-hero-backdrop">...</div>
  <div class="vine-hero-overlay">
    <span class="eyebrow">Kansas City Neighborhoods • Jazz History</span>
    <h1>18th &<br/><span>Vine</span></h1>
    <label for="vine-ghost-toggle" class="scene-ghost-toggle-label">
      The neighborhood that made the music that made America
    </label>  <!-- ← THIS IS THE PROBLEM -->
  </div>
  <svg class="vine-hero-svg">...</svg>
</section>
```

**Current CSS (`style.css`):**

```css
.vine-hero-overlay {
  position: absolute;
  top: 2.2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  text-align: center;
  pointer-events: none;
  max-width: 58%;
}

.scene-ghost-toggle-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.42rem 0.95rem;
  border: 1px solid rgba(201, 168, 76, 0.42);
  border-radius: 999px;
  background: rgba(14, 10, 6, 0.55);
  color: var(--cream);
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  cursor: pointer;
  pointer-events: auto;  /* ← overrides parent's pointer-events: none */
  user-select: none;
  backdrop-filter: blur(2px);
}

@media (max-width: 640px) {
  .vine-hero-overlay { top: 0.9rem; max-width: 90%; }  /* ← TOO WIDE on mobile */
}
```

**The Issue:**

- `.vine-hero-overlay` has `max-width: 90%` on mobile, forcing the label text to wrap and take up significant vertical space
- The label text ("The neighborhood that made the music...") is styled as a **button** but is part of the **title overlay**
- On mobile portrait, this blocks the SVG scene view behind it
- The button's purpose (toggle ghost buildings) gets lost in the visual hierarchy — it reads as a subtitle, not an interactive control

### What Needs to Happen

1. **Separate the button from the overlay:**
   - Move `<input>` and `<label>` outside `.vine-hero-overlay` (or reposition them separately)
   - The text "The neighborhood that made the music..." should be a **subtitle**, not button label text

2. **Create proper subtitle styling:**
   - Restore the visual pattern from other scene pages (check Midtown, fountains)
   - Subtitle should be small, centered, non-intrusive

3. **Reposition ghost button:**
   - Can be floating (position: absolute/fixed relative to viewport or section)
   - Or placed below the SVG scene in the overlay with controlled sizing
   - Should not take up overlay text space

4. **Affected pages:**
   - ✓ `neighborhoods/18th-vine.html` (primary example)
   - Check `districts/west-bottoms-antiques.html` and `west-bottoms-haunted.html` for same pattern
   - Check `neighborhoods/crossroads.html` if it has ghost toggle

### Suggested Approach (Discuss with Brian)

**Option A: Move button below SVG**
- Keep `.vine-hero-overlay` for title/eyebrow only
- Create subtitle as separate text element inside overlay (smaller, non-interactive)
- Position ghost toggle absolutely below the SVG, centered

**Option B: Float button in corner**
- Keep subtitle in overlay as text element (not button label)
- Position ghost checkbox+label as floating control (top-right or bottom-center of hero section)
- Reduces overlay bloat, makes button more discoverable

**Recommendation:** Option A seems cleaner—keeps subtitle in title overlay, separates button from text.

---

## Bug #2: Scenes Floating / Spacing Gaps (Midtown)

### What's Happening

File: `neighborhoods/midtown.html` — SVG scene container (lines 120–133+)

```html
<section class="midtown-hero-scene">
  <div class="midtown-hero-backdrop">...</div>
  <svg class="midtown-hero-svg" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice">
    <!-- 1600x600 viewBox with xMidYMax slice = centers horizontally, aligns to bottom -->
  </svg>
</section>

<!-- Next section starts here — but there's a visible gap on mobile -->
<section class="detail-body">
  ...
</section>
```

**Current CSS (`style.css`):**

```css
.midtown-hero-scene {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
}

@media (max-width: 900px) {
  .midtown-hero-scene { height: 440px; }
}

@media (max-width: 640px) {
  .midtown-hero-scene { height: 360px; }
}
```

**The Issue:**

- Fixed `height` on `.midtown-hero-scene` container
- SVG has `preserveAspectRatio="xMidYMax slice"` — this clips/scales the viewBox to fit the container while maintaining aspect ratio
- On mobile, the rendered SVG doesn't fill the full 360px container height
- Creates a gap between scene bottom and next section top
- Visual effect: scene looks "floating" or disconnected from page flow

### What Needs to Happen

1. **Measure actual SVG height on mobile:**
   - Open DevTools (640px viewport)
   - Inspect `.midtown-hero-scene` — what's the actual rendered height?
   - Inspect `.midtown-hero-svg` — does it match the container?

2. **Fix the spacing:**
   - Option A: Adjust container height to match actual SVG render (measure precisely)
   - Option B: Use `aspect-ratio` + `overflow: hidden` instead of fixed heights (more flexible)
   - Option C: Remove fixed heights, let SVG natural dimensions + padding control flow

3. **Ensure flush connection:**
   - `.detail-body` (next section) should have `margin-top: 0`
   - `.midtown-hero-scene` should have `margin-bottom: 0`
   - No unexpected padding creating gaps

4. **Affected pages:**
   - ✓ `neighborhoods/midtown.html` (primary example)
   - **Audit needed:** All pages with `.hero-scene` pattern (fountains, neighborhoods, etc.)

### Suggested Approach (Discuss with Brian)

**Quick fix:** Measure actual SVG height on 640px viewport, adjust media query height to match exactly

**Better fix:** Replace fixed heights with aspect-ratio (future-proof, scales responsively)

```css
.midtown-hero-scene {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;  /* or measure the actual ratio from your scene */
  overflow: hidden;
}

/* Remove or adjust media query heights */
```

**Start with measurement first** — tell us what the gap looks like in DevTools.

---

## Bug #3: Audit for Similar Issues

### Pages to Check

**Scene pages (hero-scene pattern):**
- [ ] `neighborhoods/downtown.html`
- [ ] `neighborhoods/westport.html`
- [ ] `neighborhoods/brookside.html`
- [ ] `neighborhoods/quality-hill.html`
- [ ] `neighborhoods/crossroads.html`
- [ ] `districts/west-bottoms-antiques.html`
- [ ] `districts/west-bottoms-haunted.html`
- [ ] `fountains/fountain-day.html`
- [ ] `fountains/jc-nichols.html` (and other fountain detail pages)

**For each page:**
- Open on mobile (640px viewport)
- Scroll through hero scene — does ghost button block content? (if ghost toggle present)
- Is there a visible gap between scene and next section?
- Subtitle styling — is it clear and not overblown?

### Audit Template

Document findings in a simple list:

```
✓ page-name.html
  - Ghost button: NO ISSUE / NEEDS FIX (describe)
  - Scene spacing: OK / GAP OBSERVED (describe size/impact)
  - Subtitle: GOOD / NEEDS ADJUSTMENT (describe)
  - Notes: ...
```

---

## Testing Workflow

1. **Open DevTools → Responsive Design Mode (640px portrait)**
2. **Navigate to page**
3. **Inspect `.{page}-hero-scene` container:**
   - What's the rendered height?
   - Is there padding/margin creating gaps?
4. **Scroll past hero:**
   - Smooth connection to next section?
   - Any floating/gap effect?
5. **Check button interaction (if present):**
   - Does label text overlap the SVG?
   - Is button clickable and functional?

---

## CSS Reference (Key Classes)

| Class | Purpose | Current Behavior |
|-------|---------|------------------|
| `.{page}-hero-scene` | SVG container section | Fixed height, overflow hidden |
| `.{page}-hero-backdrop` | Time-of-day background layers | Positioned absolutely |
| `.{page}-hero-overlay` | Title/subtitle overlay | Absolutely positioned, z-index 3 |
| `.{page}-hero-svg` | Inline SVG | viewBox 0 0 1600 600, preserveAspectRatio="xMidYMax slice" |
| `.scene-ghost-toggle-input` | Hidden checkbox (v20 pattern) | display: none, used for :checked state |
| `.scene-ghost-toggle-label` | Ghost button pill | Positioned inside overlay, takes up space |
| `.scene-ghost-building` | Ghost building SVG groups | opacity: 0 by default, 0.62 when checked |

---

## Notes for Iteration

- **Don't break existing functionality:** Ghost toggle (opacity fade) should continue to work
- **Maintain accessibility:** Keep aria labels, ensure button remains keyboard-accessible
- **Mobile-first approach:** Test at 640px and 480px breakpoints
- **Keep the aesthetic:** Subtitle should blend with page (cream text, serif font, small size)
- **Future note:** Cardinal directions + Southwest Boulevard placement on Crossroads scene → defer to Opus session (noted in HANDOFF.md)

---

## Questions for Brian / Next Steps

1. **Ghost button position:** Does Brian want the button floating, or integrated into a reorganized overlay?
2. **Midtown spacing:** What does the gap look like? Should we measure and adjust heights, or use aspect-ratio?
3. **Priority:** Fix 18th & Vine first (clearest example), then Midtown (common pattern), then audit others?

Ready to start iterating—which page should we tackle first?
