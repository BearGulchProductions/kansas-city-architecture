# Next Session Plan

**Updated:** 2026-04-26 · Cowork-Opus
**Purpose:** Durable plan for the next Code session. Read this BEFORE starting a session. Append (don't rewrite) at the end of each session.

---

## Pre-flight — resolve BEFORE Code starts

**One open decision is gating the next big session: official Crossroads POV.**

The v24 planning brief said south-facing from 18th & Baltimore. The Round 1 layout that got partially started elsewhere implicitly built north-facing (Bartle Hall + Kauffman + 21c + downtown skyline at VP — all of which are NORTH of 18th & Baltimore). `CROSSROADS_ROUND_2_GEOGRAPHY.md` recommends officially flipping to north-facing.

**Brian decides:**

- **(A) North-facing:** run the Chat landmark lookup cassette in `CROSSROADS_ROUND_2_GEOGRAPHY.md`, paste results back into that doc, then amend Q1 in `CROSSROADS_ROUND_1_DECISIONS.md` to reflect the locked POV. Drop Western Auto and Crossroads Hotel from Crossroads inventory (both are south of POV); keep them in `POLISH_LIST.md` for future scenes.
- **(B) South-facing:** keep brief's original POV, but amend the Round 1 inventory to drop Bartle Hall + Kauffman + 21c + downtown skyline (all north of POV). Replace VP anchors with Crown Center + Union Station + Liberty Memorial obelisk. Western Auto can stay as a left-field landmark.
- **(C) Unresolved at session start:** skip Crossroads, run Plan B below. Don't let Code guess.

My recommendation remains (A). Reasons in `CROSSROADS_ROUND_2_GEOGRAPHY.md`.

---

## Plan A — Crossroads Round 1 primary (if pre-flight resolves)

**Goal:** v25 Round 1 block-out per `CROSSROADS_ROUND_1_DECISIONS.md` (with the amended POV + amended inventory).
**Estimate:** 3–4 hours.
**Definition of done:**
- All 13 elements from the locked Round 1 build list rendered as block-out shapes (flat fills, no detail)
- Scene hero wrapper using canonical `.crossroads-hero-scene` pattern
- Scene Gallery tile on homepage with placeholder thumbnail
- Cache bump applied (style.css `?v=` AND any JS `?v=` per the landmines in STATE.md)
- `responsive-hero.js` SELECTOR list updated if a new SVG selector is needed
- Append a "v25 done" block to STATE.md and to this file

**If Code finishes early:** drop into the Overflow queue below, in order.

---

## Plan B — Cleanup pipeline (if Crossroads is gated by unresolved POV)

Run in priority order. Each item is independent and Code-solo (no Cowork iteration needed mid-task). Stop when out of time.

1. **18th & Vine sign accuracy fix** — per `SIGN_18TH_AND_VINE_SPEC.md`. Audit current SVG against the checklist in §"Likely audit findings." Apply corrections. ~1 hr.
2. **Sun/moon clip-path** — plan exists in HANDOFF.md (v18 docket item #6 / search "sun/moon clip-path"). ~1–2 hrs.
3. **18th & Vine geographic pass** — Blue Room should be west of cross-street (inside the district). See HANDOFF docket item #3. ~30 min.
4. **Building alignment audit on 18th & Vine** — load the page (headless browser if available; otherwise generate a screenshot via the build script) and flag any buildings floating or sinking on the sidewalk line. If Code can't auto-flag, queue for Brian's next visual review and move on.

---

## Overflow queue (works for either Plan A or Plan B — never sit idle)

Always work down this list before stopping a session that has time left. Items are intentionally varied in size — small first, larger last, so any window of time gets used.

1. **POLISH_LIST item #1** — sparkle-bulb treble clef on 18th & Vine (~30–45 min)
2. **Building alignment audit, ALL signature scenes** — Midtown, West Bottoms, Penn Valley, Nichols, Meyer, Bacchus, Pomona, Volker, Firefighters. Same flag-or-fix pass as above. (~30 min per scene if no fixes; longer if fixes needed)
3. **Western Auto Sign — start a planning brief** in a new file `WESTERN_AUTO_PLANNING.md`, modeled on `CROSSROADS_PLANNING_v24.md`. NO implementation. Just §1–§9: scene identity, POV, TOD, landmark inventory (Western Auto is the anchor; what else lives in the frame?), palette, energy plan, animation plan, risks, open questions. ~45 min for a usable v0 brief.
4. **HANDOFF.md compaction pass** — HANDOFF is at 1,860 lines. Many older v-sections (v12–v17) are no longer referenced day-to-day. Move them to `HANDOFF_ARCHIVE.md` and leave a pointer. Reduces token cost on any future deep-dive read. ~30 min.
5. **STATE.md hygiene** — confirm the landmines list still matches reality, prune anything stale, update the HANDOFF section pointers if any sections moved during compaction.

---

## Hard stops — do NOT do this session even if there's time

- **Crossroads Round 2 facade detail** — Round 1 review must come first; Round 2 starts only after Brian sees Round 1 and redirects.
- **Mobile horizontal scroll feature** — still planning-stage only per Code's handoff note. Don't implement until Brian + Cowork scope it.
- **Any new signature scene without a planning brief** — applies to Western Auto, Quality Hill, etc. Brief first, build second.
- **Editing closed/locked decision docs** without Brian's call — `CROSSROADS_ROUND_1_DECISIONS.md` is locked except for the Q1 amendment described in pre-flight.

---

## Forward roadmap — next 2–3 sessions beyond this one

Tentative — Brian's review at end of Round 1 can redirect any of these.

- **Session N+1:** Brian reviews Crossroads Round 1 → calls out adjustments → Code applies adjustments → Crossroads Round 2 detail begins (4–5 hrs per planning brief §10): facades, mural motifs, food truck, string lights, neon signage, gallery storefronts, rail bridge silhouette detail.
- **Session N+2:** Crossroads Round 3 polish (2–3 hrs): crowd density (8–12 walkers in clusters), food truck queue, street musician, patio figures, bicycle, dog, scene gallery tile refresh, cache bump, HANDOFF append.
- **Session N+3:** Pick from these candidates depending on energy:
  - Western Auto signature scene Round 1 (if planning brief landed)
  - Quality Hill looking-down scene (long-deferred per BRAINSTORM_SEED)
  - OpenGraph images micro-session (per BRAINSTORM_SEED Option E)
  - View Transitions API exploration (per BRAINSTORM_SEED Option D)

---

## Update procedure (every session)

**Append a dated block to the bottom of this file:**

```
## Session yyyy-mm-dd
- Done: [...]
- Skipped/blocked: [...]
- Carry-forward to next session: [...]
- Pre-flight items raised: [...]
```

Don't rewrite the plan above. Let it accumulate as a session log. Cowork reads the latest block + the active plan when scoping the next session.

---

## Session 2026-04-26
- Done:
  - Pre-flight resolved: CROSSROADS_ROUND_1_DECISIONS.md Q1 corrected to north-facing (v24 brief had a direction typo; not a design change). Cowork clarification note drafted.
  - v25 Crossroads Round 1 block-out confirmed complete (SVG scene was already built in a prior session today). All 13 elements present and rendering.
  - Scene Gallery tile (tile 7 of 7) added to homepage — teal M1 mural wall, cobalt M2, orange M3, Bartle Hall spires, 1-point perspective street, Kauffman curved roof, TWA rocket.
  - Cache bumped from ?v=24a → ?v=25b across all 125 HTML files.
  - Preview server fixed: serve_kc.py now points to real project directory (was /tmp/kc_site/ causing stale-file issues every session).
- Skipped/blocked: Overflow queue items (ran out of session scope after docs + tile + cache).
- Carry-forward to next session: Brian reviews Crossroads Round 1 → calls adjustments → Round 2 detail begins per forward roadmap above.
- Pre-flight items raised: None — all pre-flight cleared this session.

---

## Session 2026-04-26 (Code session 2 — Building detail + roads)
- Done:
  - Building detail pass on 8 landmarks: Town Topic (marquee sign structure + storefront), Grinders (brick coursework + loading doors + windows), TWA (window grid + floor banding + styled rocket), RecordBar (blank brick wall + bold signage), Crossroads Hotel (extensive 8-column window grid + floor banding), 21c Museum Hotel (ornamental cornice + arched windows + brick coursework), Kauffman (glass facade window grid + TWO iconic curved roof shells), Bartle Hall (spire count corrected from 5 to 4).
  - Southwest Boulevard geometry initiated: diagonal triangle in 1-point perspective, south curb follows existing left-sidewalk edge (0,490→940,320), north curb ~70px higher. **Status: visible but geometry needs refinement — right edge should terminate at Baltimore's crosswalk intersection (~y=400-410), NOT at VP. Defer full fix to next session.**
  - Midtown KCTV5 tower beacon clipping fixed: transform corrected to `translate(93, 93) scale(0.9, 0.77)` — beacon now visible at 1920px desktop, base planted correctly.
- Skipped/blocked:
  - Kauffman curved roof detail pass (wasted tokens attempting to match reference; deferred for dedicated session with full reference focus).
  - Town Topic marquee sign (requires major quality pass with reference images — iconic element deserves focused work, not rushed cycles).
  - Additional buildings (Bartle Hall base building, others) — deferred to allow Southwest Boulevard work.
- Carry-forward to next session:
  - **Southwest Boulevard right-edge fix:** termination point should be at the Baltimore/Southwest crosswalk (real intersection), NOT at VP. Geometry is in place; just needs endpoint adjustment. Reference the real map (user provided) showing 4-way crosswalk.
  - **Town Topic marquee sign refinement:** needs dedicated quality pass with Art Deco reference images. Sign should feel iconic and read clearly. Currently covers geometry issue (street/building layering) that will be exposed when sign is moved.
  - **Town Topic sign repositioning:** sign is covered by ground plane — needs vertical repositioning so it sits visibly above the building. Streets may need layer reordering.
  - **Kauffman curved roof (if time):** verify TWO-shell representation is visually clear; consider enhancing panel articulation lines if they're too subtle.
  - Major quality passes flagged for future:
    - Town Topic sign (iconic, needs reference accuracy)
    - TWA building rocket (needs Art Deco retro-futuristic refinement per reference)
    - Overall scene layering/z-order (ground plane may be covering building bases)
- Pre-flight items raised for next session: None — all technical. Proceed directly to Southwest Boulevard fix.

---

**End of next-session plan.**
