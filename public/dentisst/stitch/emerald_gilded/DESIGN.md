# Design System Specification: The Sovereign Sanctuary

## 1. Overview & Creative North Star
This design system is built upon the "Sovereign Sanctuary" creative north star. We are not building a utility; we are crafting a digital concierge. This system rejects the cluttered, "boxed-in" layout of traditional booking platforms in favor of a high-end editorial experience. 

By utilizing intentional asymmetry, expansive white space, and a refined "Old Money" palette, we create a sense of temporal luxury—the feeling that time slows down the moment a client engages with the brand. We move beyond the grid by allowing imagery to break containers and typography to breathe, ensuring the interface feels curated rather than generated.

---

## 2. Colors: The Regal Palette
The palette is rooted in the interplay between organic depth and metallic precision.

### The Emerald & Gold Core
- **Primary (Emerald):** `#003527` (Primary). This is the "Heritage" color. Use it for high-impact backgrounds or hero typography to establish authority.
- **Secondary (Gold):** `#735c00` (Secondary). This is "The Accent." Use it sparingly for interactive elements or delicate "jewelry" borders.
- **Surface (Warm Cream):** `#fbf9f5` (Surface). The canvas. This is not a stark white; it is a warm, breathable foundation that prevents eye strain and feels premium.

### The "No-Line" Rule
To maintain a high-end feel, **1px solid grey borders are strictly prohibited for sectioning.** 
- **Structural Separation:** Boundaries must be defined through background shifts. Transition from `surface` to `surface-container-low` (`#f5f3ef`) or `surface-container` (`#efeeea`) to denote a new section.
- **The "Glass & Gradient" Rule:** For primary CTAs and header overlays, utilize a subtle gradient from `primary` (`#003527`) to `primary-container` (`#064e3b`). This adds a "soul" to the color that flat hex codes cannot achieve.

---

## 3. Typography: Editorial Authority
The typography scale relies on the tension between a traditional, high-contrast serif and a modern, architectural sans-serif.

- **Display & Headlines (Noto Serif):** These are the "Lead Actors." Used for `display-lg` (3.5rem) down to `headline-sm` (1.5rem). The high-contrast strokes of the serif convey luxury and heritage. Use `primary` or `on-surface` for these.
- **Body & UI (Manrope):** The "Supporting Cast." Clean, sophisticated, and highly legible. Used for `body-lg` (1rem) and `title-md` (1.125rem). Manrope’s geometric nature balances the ornate serif, ensuring the UI feels "now" rather than "then."
- **Intentional Scale:** Use extreme scale differences. A `display-lg` headline paired with a `label-md` uppercase caption creates a professional, editorial look found in premium fashion magazines.

---

## 4. Elevation & Depth: Tonal Layering
In this design system, depth is a feeling, not a drop-shadow.

### The Layering Principle
Hierarchy is achieved by "stacking" surface tiers.
- **Level 0 (Base):** `surface` (`#fbf9f5`)
- **Level 1 (Sections):** `surface-container-low` (`#f5f3ef`)
- **Level 2 (Cards/Modals):** `surface-container-lowest` (`#ffffff`) placed on top of Level 1. This creates a natural "lift" without artificial shadows.

### Ambient Shadows
Where floating elements (like a premium booking modal) are required, use **Ambient Shadows**:
- **Color:** A 6% opacity tint of `primary` (`#003527`).
- **Style:** Extra-diffused (Blur: 32px, Spread: -4px). This mimics natural gallery lighting.

### The "Jewelry" Border
While structural borders are forbidden, "Jewelry" borders are encouraged. These are `secondary` (Gold) or `outline-variant` (`#bfc9c3`) borders used at 0.5px or 1px thickness to frame a single hero image or a primary CTA. They are decorative, not functional.

---

## 5. Components

### Buttons: The Touch of Gold
- **Primary:** Background: `primary` (#003527); Text: `on-primary` (#ffffff). Shape: `md` (0.375rem). 
- **Secondary (The Gold Frame):** Background: Transparent; Border: 1.5px solid `secondary` (#735c00); Text: `secondary`.
- **Interaction:** On hover, primary buttons should transition to `primary-container` with a gentle 2px upward shift (parallax) to simulate a physical "press-ready" state.

### Cards & Collections
- **Visuals:** Forbid divider lines. Use `surface-container-high` (`#eae8e4`) as a background for cards against a `surface` background.
- **Spacing:** Use generous padding (at least 2rem) within cards to maintain the "Sovereign" feel.
- **Glassmorphism:** For mobile navigation bars or floating "Book Now" bars, use `surface` at 85% opacity with a `24px` backdrop-blur.

### Input Fields: Sophisticated Input
- **Style:** Underline-only or Ghost style. Avoid heavy boxes.
- **Active State:** The label should float and transition to `secondary` (Gold), with the underline expanding from the center.

### Custom Component: The Treatment Card
A signature component for this system. A large-format card using `surface-container-lowest`, featuring a high-fashion image with a 10% `outline-variant` "Ghost Border" and a gold `secondary_fixed` accent line (2px height) at the top of the card.

---

## 6. Do's and Don'ts

### Do:
- **Use "White Space as a Luxury":** Treat empty space as an expensive material. If a section feels crowded, double the padding.
- **Asymmetric Layouts:** Place text on the left and images slightly offset to the right. This breaks the "template" feel.
- **Smooth Fades:** Every page transition and hover state should have a minimum 400ms duration with a `cubic-bezier(0.4, 0, 0.2, 1)` easing.

### Don't:
- **Don't Use Pure Black:** Never use `#000000`. Use `on-background` (`#1b1c1a`) for text to maintain the "Warm Cream" harmony.
- **Don't Use Sharp Corners:** Avoid the `none` roundedness scale for UI elements. Luxury is soft; use `md` (0.375rem) or `lg` (0.5rem).
- **Don't Use Standard Dividers:** If you need to separate content, use a 48px vertical gap or a subtle change in surface tone. No horizontal grey lines.
- **Don't Over-Gold:** Gold is a spice, not the main course. If the screen is more than 5% gold, it moves from "Royal" to "Gaudy."

---

## 7. Motion & Animation
Movement must be "Liquid-Smooth." 
- **Parallax:** Hero images should have a subtle 5-10% scroll parallax to create depth.
- **Staggered Entrance:** When a page loads, headlines should fade in and slide up 20px, followed by body text 100ms later. This "cascading" effect feels like a curated unveiling.