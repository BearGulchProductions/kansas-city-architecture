# Western Auto Sign — Signature Scene Planning Brief

**Version:** v0 planning document
**Author:** Claude Code (2026-04-26)
**Purpose:** Creative north star for a future Western Auto signature scene. No code, no SVG, no CSS. Intent + composition only. Modeled on CROSSROADS_PLANNING_v24.md §1–§9.

---

## 1. Scene identity in one paragraph

Western Auto is one of the most purely cinematic signs in Kansas City — a mid-century arrow-and-logo assemblage that was built to be seen from moving cars on a mid-century boulevard, and that somehow survived into an era that renders it more nostalgic and strange than it ever was when it was functional advertising. The building beneath it has been converted to lofts; the sign has been preserved as a landmark; the whole composition reads as a postcard of what American commercial architecture looked like when it still believed in grandeur at the scale of signage. Where the Crossroads scene is *color against brick*, the Western Auto scene is *light against dark* — one iconic object glowing against a night sky, surrounded by the quieter urban fabric that has grown up around it. The tension here is between obsolescence and icon: the sign outlasted its business, outlasted its era, and is still the most recognizable man-made object on the South Kansas City skyline.

---

## 2. POV decision

**Recommended:** Street-level looking NORTH up Grand Boulevard from roughly 22nd–23rd Street, with the Western Auto Lofts building mid-frame and the sign rising above it at the vanishing point.

**Why this POV:**
- Puts the sign at the VP where it belongs — the entire composition terminates with the arrow and logo, which is what the real-world experience of approaching it on Grand feels like.
- Grand Boulevard is the natural axis. The sign was designed to read from this corridor. Using Baltimore or a cross-street would fight the sign's inherent orientation.
- Looking north gives a slight distant-skyline hint at the deep VP (downtown towers in haze), creating the same visual-bridge device used in the Crossroads scene without duplicating the Crossroads frame.
- The loft building's brick mass anchors the mid-ground; the sign rises above it on its original pole structure — two-layer composition that's easy to block out clearly.

**Rejected alternatives:**
- *Looking south from north of the sign:* the sign faces north; looking at its back is architecturally pointless.
- *Looking east from Southwest Blvd:* loses the Grand Blvd axis and the north-facing VP connection to downtown.
- *Overhead / isometric:* Quality Hill owns the "looking down" POV; don't burn it twice. Western Auto is best as a street-level approach.

**VP target:** Sign face at roughly x=760–840, y=200–280 in a 1600×560 viewBox. Sign sits above the building roofline — its crown should reach y≈120 at the deep distance.

---

## 3. TOD target

**Recommended:** Night — roughly 10 PM on an ordinary weekday. Sky is deep blue-black, the sign's red-and-white neon illuminates the surrounding air with a red atmospheric glow, a few loft windows warm yellow, Grand Boulevard streetlamps in recession.

**Why:**
- The sign was designed to be read at night. Day scenes lose the entire point — it's just a metal structure in daylight. The neon glow IS the scene identity.
- Night also simplifies the background: dark sky means the sign reads pure against nothing. No competing color.
- TOD cycle still runs (dawn through night on 40s loop), but the "money moment" is night — the glow halo is only visible then, the window lights only read then, the streetlamp recession only reads then.

**Fallback if full-night feels too dark for the TOD cycle:** Dusk — the deep blue hour where the sky still has color but the sign is lit. Gives the scene more readable background. West Bottoms uses dusk well; this scene could follow that pattern.

---

## 4. Landmark inventory

The scene carries fewer landmarks than Crossroads — this is a one-anchor composition. Everything else supports the sign.

| Landmark | Position | Notes |
|---|---|---|
| **Western Auto Sign** | VP center, above roofline | The anchor. Red neon arrow + "WESTERN AUTO" lettering. Arrow should animate (cycle or pulse) — this is the scene's only animated detail beyond TOD. |
| **Western Auto Lofts building** | Mid-ground center | Brick mid-rise. Original industrial building. Shows the loft conversion: some windows warm-lit (residential), some dark. |
| **Grand Boulevard** | FG pavement converging to VP | 1-point perspective, boulevard median strip visible, streetlamps in recession on both sides. |
| **2–3 boulevard streetlamps** | Left and right recession | Art Deco KC boulevard type (same grammar as Crossroads lamps). Halos at night. |
| **Distant downtown towers** | Deep VP, ≤25% opacity | 2 towers maximum. Visual bridge to homepage. Lower opacity than Crossroads VP towers — should feel like suggestion, not content. |
| **Brick warehouse neighbors** | Left and right mid-ground | 1–2 smaller brick buildings flanking the loft. Low detail — support the main building, don't compete. |
| **Parked cars (silhouette)** | FG left or right sidewalk | 1–2 car silhouettes suggest ordinary street life. Grounds the scale. No detail. |

**What is NOT in inventory:**
- Crown Center (wrong axis, too far northwest)
- Union Station (too far, and this isn't the Union Station scene)
- Kauffman Center (belongs to Crossroads frame; don't repeat)
- Any figures in the street — the night/empty feel is intentional. This is not a First Friday crowd scene. One lone pedestrian at most.

---

## 5. Palette

| Layer | Color direction | Notes |
|---|---|---|
| Sky (night) | Deep blue-black `#0A0C14` → `#12162A` | Slightly warmer than pure black; hints of indigo |
| Sign neon (red) | `#E8302A` with glow halo `rgba(220,50,40,0.35)` | Arrow and lettering. Halo radius should bleed into surrounding sky |
| Sign neon (white) | `#F0EDE8` with blue-white glow | "WESTERN AUTO" lettering in white neon; cooler tone than the warm building lights |
| Building brick | `#5C2A14` → `#7A3A1E` | Warm dark brick; lit from below by sign spill-light, slightly warm on the sign-facing facade |
| Window lights | `rgba(255, 200, 120, 0.85)` | Warm residential yellow; not all windows lit — maybe 30–40% |
| Boulevard pavement | `#1A1814` | Near-black, wet-look; faint lamp reflection as thin vertical strokes |
| Streetlamp halos | `rgba(255, 200, 140, 0.22)` radial | Soft glow only; no hard circle |

**Palette philosophy:** This is the site's first predominantly-red scene. Every other night scene (Plaza, West Bottoms, 18th & Vine) is gold/amber or deep purple. The Western Auto red makes it immediately distinct in the gallery grid.

---

## 6. Energy plan

**Low energy, high precision.** This is not a First Friday crowd scene. The energy is solitary urban night — one large glowing object in an otherwise quiet street. Contrasts:
- Crossroads: packed sidewalks, multiple murals, streetcar, food truck, 5+ walkers → high energy
- Western Auto: empty boulevard, one sign, a few lit windows, maybe one pedestrian → low energy, contemplative

This contrast is intentional across the site's scene gallery. Not every scene should feel like a civic event.

**Motion budget (Round 1):**
- TOD cycle: 40s, standard
- Sign arrow: slow pulse or chase-light cycle (~8–12s loop). NOT a fast strobe — slow, confident.
- Cloud drift: 1 cloud, slow (200s). Optional — sky may be too dark for clouds to read.

**Motion reserved for Round 2:**
- Window flicker (1–2 windows with occasional light change)
- Streetlamp halo pulse (very slow, almost imperceptible)

---

## 7. Animation plan (sign arrow detail)

The arrow is the scene's one kinetic hero element. Two approaches:

**Option A — Chase-light sequence:** The arrow segments illuminate left-to-right in sequence (like vintage chase lighting), then reset and repeat. 3–4 segments, ~3s per full cycle. This is historically accurate to how these signs worked.

**Option B — Pulse/breathe:** The entire sign brightens and dims on a slow 6–8s cycle (brightness oscillation via opacity). Simpler to implement; less historically specific.

**Recommendation:** Option A for Round 2 (requires the arrow to be broken into segments in the SVG). Option B for Round 1 (single opacity animation on the whole sign group). Round 1 should block out the arrow shape correctly so Round 2 can segment it without rework.

---

## 8. Risks

| Risk | Severity | Mitigation |
|---|---|---|
| R1 — Sign too small at scene scale | Medium | The sign needs to be large enough to read as the focal point. VP placement helps. If it reads small, widen the viewBox or reduce building height to give sign more vertical dominance. |
| R2 — Red-dominant scene feels aggressive | Low | The rest of the site's dark palette (navy, near-black) absorbs the red. The sign should feel like a jewel, not a warning sign. Keep red constrained to the sign group and its halo. |
| R3 — Empty boulevard feels lifeless | Medium | Two parked cars + one streetlamp-lit pedestrian silhouette + lit loft windows = enough life. Don't add a crowd — that kills the scene's identity. If it feels dead, add 1 more lit window, not more people. |
| R4 — Night-only scene has weak TOD cycle | Low | The "money moment" is night, same as Plaza Lights. The day and dawn phases just show the building + sign in natural light — less dramatic but still coherent. Brief has this precedent. |
| R5 — Grand Blvd perspective axis gets confused with Crossroads | Low | Different dominant color (red vs. teal/cobalt), different energy (quiet vs. crowd), different anchor (sign vs. mural wall). These scenes are not confused in the gallery. |

---

## 9. Open questions (for Brian + Cowork before Code starts)

1. **ViewBox height:** 560px (matches most scenes) or 640px (matches Crossroads)? The sign has vertical emphasis — 640px may serve it better, but test the composition at 560 first.
2. **Arrow direction:** The real Western Auto arrow points (roughly) east — toward the original auto parts customer coming from downtown. Confirm the arrow direction is preserved in the SVG; it matters for the historical accuracy read.
3. **Loft windows:** How many lit? Suggesting 30–40% occupancy. Too few looks abandoned; too many looks like a party. Is there a preferred density?
4. **One pedestrian or none?** The "empty boulevard at night" read may be stronger with zero pedestrians. But one lone figure walking away from the viewer could add scale and a narrative hint. Brian's call.
5. **Sign animation Round 1:** Option A (chase) or Option B (pulse) for the initial build? Option B is simpler and can be upgraded in Round 2.
6. **TOD fixed or cycling?** The Plaza tile uses `scene-gallery-tile-dusk` to fix TOD at dusk. Should the Western Auto gallery tile be fixed at night (to show the glow), or let it cycle? Recommend fixing at night for the gallery tile — otherwise a day-TOD viewer sees an unremarkable brick building.

---

**End of planning brief v0.**
