# Design — Apex Fitness Center

**World: wayfinding.** The site is built like the club's own signage system: deep signage-green plates, a cool glazed-tile ground, and a signal-yellow arrow that marks every way forward. Arrows point the way you read, so they flip in Arabic. Calm, clean, legible from across a room. No hype, no neon, no dark "beast mode" gym.

Light ground was chosen for the scene: a parent on a phone in daylight, checking whether this is a clean, respectful place to train.

## Tokens (`frontend/css/style.css` `:root`)

### Colour
| Token | Value | Role |
|---|---|---|
| `--tile` | `#F2F5F3` | page ground |
| `--tile-2` | `#E2E9E5` | second surface, one tone step down |
| `--paper` | `#FFFFFF` | raised: form, lead quote, scrolled nav |
| `--sign` | `#0B4F45` | signage green: hero plate, directory, pictogram plates |
| `--sign-2` | `#0E5F53` | rows on a green field, hover |
| `--sign-deep` | `#08372F` | footer, photo fallback |
| `--on-sign` / `--on-sign-2` | `#FFFFFF` / `#BFD9D2` | text on green (secondary 7.6:1) |
| `--arrow` / `--arrow-2` | `#F5C518` / `#FFD84D` | primary action, focus ring, selection, facility band |
| `--ink` / `--ink-2` | `#0F1F1B` / `#41544E` | text on tile (secondary 7.4:1) |
| `--error` / `--ok` | `#B3261E` / `#1B6E3A` | form status |

Strategy: **Committed.** Green owns whole regions (hero plate, services, footer); yellow appears only where the visitor acts or where the "what's inside" strip sits.

### Type
| Token | Value |
|---|---|
| Latin | Overpass 400 / 600 / 800 / 900 (highway-sign lineage) |
| Arabic | Noto Kufi Arabic 400 / 600 / 800 / 900 |
| `--t-display` | `clamp(2.5rem, 6.4vw, 6rem)`, 900, leading 0.92, tracking −0.035em |
| `--t-h2` | `clamp(2.25rem, 5vw, 4.25rem)`, 900, leading 0.98, tracking −0.03em |
| `--t-h3` | `clamp(1.5rem, 2.4vw, 2rem)`, 900 |
| `--t-lead` | `clamp(1.125rem, 1.4vw, 1.3125rem)` |
| `--t-body` | `1.0625rem` / 1.55 (Arabic 1.75) |
| `--t-small` | `0.9375rem` |

Arabic never inherits Latin tracking or the tight display leading; headings get 1.22–1.3 leading.

### Space and shape
- `--gutter: clamp(16px, 5vw, 72px)` is the one outer margin.
- Scale: 8 / 16 / 24 / 40 / 64; sections are `clamp(96px, 12vw, 176px)` apart.
- `--r: 4px` on every plate, button and field: signs have slightly eased corners.
- Surfaces are separated by tone steps and 4px gaps, never hairlines.

## Components
- **Buttons:** 56px tall, 4px radius. Primary is yellow with an arrow pictogram that nudges 4px toward the reading direction on hover. Secondary is a 2px outline on green. `:active` presses 1px.
- **Pictogram plates:** 48–56px green squares with a white 2px-stroke pictogram from the inline sprite (`#i-*`). No emoji anywhere.
- **Section plate** (`.section-tag`): green arrow plus sentence-case label. It acts as the signpost for the section it opens.
- **Directory rows** (services): the label in the side column, then title and description, with the photo in a fixed column on the opposite side. They stack on phones.
- **Fields:** tile-filled with a 2px bottom rule. Focus draws a full 2px green frame; `:user-invalid` turns the rule red.
- **Focus:** 3px yellow outline, 3px offset, everywhere.

## Motion
- Signature: the hero plate wipes open along the reading direction (`clip-path`), then the headline, line, and buttons rise in a 80ms stagger.
- Section parts rise 24px as they enter, staggered 80ms. Only JS arms this, so content is visible without it.
- "Open now" dot pulses slowly. Reduced motion drops all travel.

## Live element
`#openNow` prints the visitor's local time with "we're open". It's always true, because the club is open 24 hours.
