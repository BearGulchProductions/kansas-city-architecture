# 18th & Vine District Sign — Photo-Derived Accuracy Spec

**Source:** 2 reference photos provided by Brian on 2026-04-25 (full scope + closer front-facing without the DISTRICT banner cutoff)
**Purpose:** Spec for the docket #1 accuracy pass on the 18th & Vine signature scene
**Audience:** Claude Code

---

## Composition (top to bottom, from the front-facing photo)

1. Lit elements (the big composition): staff bars + "18TH" + "VINE" + treble clef
2. White rectangular banner reading "DISTRICT" in black uppercase
3. Steel-beam frame holding everything (visible behind and around the lit parts)
4. Brick building base — only relevant when the ground is in frame

---

## Lit elements — element-by-element

### "18TH" (top half of the central lettering)
- Color: hot red/orange neon, ~`#E63A2A`
- "1" — straight vertical neon stroke
- "8" — figure-eight outlined neon
- "TH" — small superscript to the upper right of the "8", noticeably smaller than the digits
- All rendered as glowing outline, no fill

### "VINE" (bottom half of the central lettering)
- Color: cobalt blue neon, ~`#1E5BC6` (NOT navy, NOT cyan)
- Letterforms are angular/slab — block neon, not rounded
- The "N" in particular is chevron/zigzag (reads almost like Π with diagonals), not standard parallel verticals — this is the most-stylized character and the easiest to get wrong
- "I" is a single vertical
- "V" is wide
- "E" is three horizontal bars + a vertical

### Staff bars (the framing)
- Color: same red as "18TH"
- Multiple parallel horizontal neon bars at musical-staff line heights, on BOTH sides of the central lettering
- Function: the lettering and clef sit "on" a musical staff
- Bars extend outward from the lettering all the way to the edges of the sign frame
- Gap between rows ≈ bar thickness (open space, sky shows through)

### Treble clef (right of the central lettering)
- Color: green, ~`#2EAD3E`
- **Critical detail from the close-up photo: composed of clusters of small round bulbs, NOT a continuous neon tube.** The clef has a distinctly dotted/sparkle texture.
- Vertical extent: spans more staff lines than either lettering row (taller than both)
- Position: right side, slightly inset from the right edge of the sign frame
- Yellow/gold solid round bulb (~`#F5C842`) at the bottom curl/swash terminus — a single glowing dot

### "DISTRICT" banner
- White opaque rectangular panel, ~`#F2F2F0` (warm white, not pure)
- Black uppercase letterforms, sans-serif, evenly spaced, ~`#181818`
- Sits just below the bottom row of staff bars

### Frame & mounting
- Steel beams, silver-grey ~`#6E7378`, slightly weathered, visible behind/around the lit elements
- 1–2 cabling lines visible (don't render every cable; suggest with a couple of thin strokes)
- Frame extends slightly past the lit elements on all sides

---

## Relative proportions (units relative to one lettering row)

- "18TH" lettering height: 1.0
- "VINE" lettering height: 1.0
- Treble clef height: ~2.6 (taller than both rows combined)
- DISTRICT banner height: ~0.45
- Sign aspect ratio (lit-element box, before frame): ~1.4 wide per 1.0 tall

---

## Color palette tokens

| Element | Hex | Notes |
|---|---|---|
| Red neon | `#E63A2A` | hot, slightly orange-pushed |
| Blue neon | `#1E5BC6` | cobalt, distinctive |
| Green clef | `#2EAD3E` | medium-saturated, leaf-adjacent |
| Yellow terminus | `#F5C842` | single bulb |
| Banner white | `#F2F2F0` | warm white |
| Banner text black | `#181818` | |
| Frame steel | `#6E7378` | weathered grey |

---

## Likely audit findings for current SVG (best guesses — Code, please verify against actual file)

- Is "TH" sized correctly as a superscript (small, upper-right of the "8")?
- Is the "N" of VINE chevron-shaped or a generic block N?
- Is the clef solid neon or dotted bulbs? (Currently expected solid; truth is dotted — this becomes a polish-list item, not a Round-1 fix.)
- Are there multiple staff bar rows on both sides, or just a single decorative line?
- Is the DISTRICT banner present, with black-on-white type?
- Is the yellow terminus bulb present at the clef's bottom curl?

---

## Out-of-scope for this spec

- Sign-mounted halo/glow on the surrounding sky (atmospheric — separate decision)
- Building below the sign (unrelated to sign accuracy)
- Sparkle animation on clef bulbs (deferred — see `POLISH_LIST.md`)

---

**End of spec.**
