# Star Experience Behaviour Inventory & Git Audit

## 1. Git History Audit

Inspected commits across the repository:
- `00fcf13` (`feat: complete interactive universe for fatima`) — Original `app/components/Constellation.tsx` (14 scattered stars gliding to a parametric heart curve on tap/drag).
- `60951f4` (`feat: merge Option A and Option B into luxury Apple obsidian experience`) — `app/components/ConstellationTab.tsx` with 8 named constellation stars (`Patience`, `Grace`, `Warmth`, `Peace`, `Trust`, `Kindness`, `Light`, `Care`), pointer drag connection, auto-connect, and harmonic plucks.
- `0263749` (`feat(final): complete autonomy-first UX, accessibility, privacy sanitization`) — Accessible 44px touch targets, direct jump to closing letter, polygon fill on completion.
- `3b06e30` & `c2508a6` — Simplified 5-star ambient canvas (which lost the scattered-to-heart gathering and constellation line connection mechanics).

## 2. Original Behaviour Inventory to Restore & Preserve

1. **Parametric Heart Constellation Geometry (`00fcf13`)**:
   - `N = 14` stars with deterministic scattered start coordinates `(sx, sy)` and parametric heart-curve target coordinates `(hx, hy)`:
     - `hx = 50 + (16 * sin^3(t)) * 2.7`
     - `hy = 44 - (13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t)) * 2.5`
   - Key stars carry personal labels from `0263749` (`Patience`, `Grace`, `Warmth`, `Peace`, `Trust`, `Kindness`, `Light`, `Care`).
2. **Interactive Gathering & Pointer Drag**:
   - Tapping an unlit star (`onClick`) or dragging a finger/cursor across the sky (`onPointerDown` / `onPointerMove` within hit radius) activates that star.
   - Upon activation, the star smoothly glides from its scattered position `(sx, sy)` to its heart constellation position `(hx, hy)` over `1.1s cubic-bezier(0.2, 0.8, 0.2, 1)`.
3. **Constellation Line Drawing & Heart Polygon**:
   - SVG `<line>` elements connect adjacent active stars `(i, (i + 1) % N)` with a `600ms` `stroke-dashoffset` reveal (`1px` Lavender Mist `#BDB3DC`).
   - When all `N = 14` stars are gathered (`done = count === N`), a soft inner polygon fills the heart constellation and reveals the message:
     *"Made with care. Nothing expected in return."*
4. **Acoustic Feedback & Autonomy Controls**:
   - Each star plays a gentle Web Audio harmonic chime note on activation (when audio is enabled), and completing the constellation plays a soft chord.
   - Controls: `"Light the next star"`, `"Gather all stars"` (auto-connect), and `"Replay"` (reset).
   - Never blocks or gates the closing letter below it.
5. **Konpeitō Night Visual Enhancement**:
   - Stars are rendered as faceted 8-point rounded Konpeitō sugar-stars with SVG `<radialGradient>` glow (`#FFF4D6` core, `#FFE9A8` mid, `#9B7BE8` edge).
   - Twinkle animation uses `opacity` oscillation (`0.6` to `1.0` over `2.5s–5s`), never scale pulsing.
   - Small Yume-on-the-crescent-moon illustration rests quietly in the upper corner of the constellation sky.
   - Available at all times of day via a contained deep-indigo night sky window.
