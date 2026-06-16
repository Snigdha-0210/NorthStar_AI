---
name: Obsidian Orbit
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#e1bfb5'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#a98a80'
  outline-variant: '#594139'
  surface-tint: '#ffb59d'
  primary: '#ffb59d'
  on-primary: '#5d1900'
  primary-container: '#ff6b35'
  on-primary-container: '#5f1900'
  inverse-primary: '#ab3500'
  secondary: '#ffd795'
  on-secondary: '#422c00'
  secondary-container: '#fbb400'
  on-secondary-container: '#694900'
  tertiary: '#4ae183'
  on-tertiary: '#003919'
  tertiary-container: '#00b15c'
  on-tertiary-container: '#003b1a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#832600'
  secondary-fixed: '#ffdea9'
  secondary-fixed-dim: '#ffba27'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4100'
  tertiary-fixed: '#6bfe9c'
  tertiary-fixed-dim: '#4ae183'
  on-tertiary-fixed: '#00210c'
  on-tertiary-fixed-variant: '#005228'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

The design system is engineered for a premium personal career operating system, blending high-performance utility with a sophisticated, futuristic aesthetic. The brand personality is authoritative yet empowering, acting as a silent, high-tech partner in a user's professional trajectory.

The visual style is **Sophisticated Dark SaaS with Glassmorphic Accents**. It utilizes deep obsidian surfaces to provide a high-contrast backdrop for vibrant kinetic energy (Burnt Orange and Golden Amber). The interface relies on generous whitespace (dark space), precise geometry, and subtle translucency to evoke a sense of depth and intelligence. The emotional goal is to make the user feel like they are operating a command center for their future—focused, expensive, and cutting-edge.

## Colors

This design system utilizes a high-contrast, warm-on-dark palette. Blue and purple tones are strictly avoided to differentiate the product from generic SaaS aesthetics and to lean into a more "industrial-luxe" feel.

- **Primary (#FF6B35):** Burnt Orange is used for primary actions, progress indicators, and active states. It represents heat, energy, and ambition.
- **Secondary (#FFB703):** Golden Amber is reserved for highlights, specialized career milestones, and premium insights.
- **Success (#2ECC71):** A vibrant emerald used exclusively for achievement unlocked states and positive growth metrics.
- **Monochrome Hierarchy:** 
    - `Background`: #0A0A0A (Pure depth)
    - `Surface`: #121212 (Main UI containers)
    - `Card`: #1E1E1E (Interactive components)
    - `Text`: #F5F5F5 (High legibility white)

## Typography

The typography strategy pairs high-end contemporary sans-serifs with a technical monospaced font for data points.

- **Headlines:** Hanken Grotesk provides a sharp, professional, and slightly geometric appearance that feels modern and "designed."
- **Body:** Inter ensures maximum readability across dense career data and AI-generated insights.
- **Labels/Data:** JetBrains Mono is used for "system" information—metadata, timestamps, and AI confidence scores—reinforcing the "Operating System" narrative.

All headlines should use tight letter-spacing to maintain a compact, premium feel. Body text maintains a generous line-height for long-form career advice and resume analysis.

## Layout & Spacing

The design system employs a **Fluid-Fixed Hybrid Grid**. Content is centered within a 1440px max-width container, utilizing a 12-column system on desktop. 

- **Rhythm:** An 8px base unit governs all dimensions.
- **Borders:** Containers use generous internal padding (32px+) to maintain an airy, premium feel despite the dark theme.
- **Responsiveness:** On mobile, margins shrink to 20px, and the 12-column grid collapses into a single-column stack. Section gaps are intentionally large (120px on desktop) to allow the "Obsidian" background to act as a natural separator, reducing the need for horizontal rules.

## Elevation & Depth

Depth in this design system is created through **Luminance and Glassmorphism** rather than traditional shadows.

1.  **Z-Index 0 (Background):** #0A0A0A.
2.  **Z-Index 1 (Surfaces):** #121212. Used for sidebars and persistent navigation.
3.  **Z-Index 2 (Cards):** #1E1E1E. These elements feature a subtle 1px border (#FFFFFF with 5% opacity) to define edges against the dark background.
4.  **Glass Layers:** Floating modals and dropdowns use a semi-transparent background (#1E1E1E with 80% opacity) with a 20px Backdrop Blur.
5.  **Glows:** Primary buttons and active AI states utilize a soft Burnt Orange outer glow (20px blur, 15% opacity) to simulate a light-emitting source.

## Shapes

The shape language is defined by "Large Soft Geometry." 

- **Primary Containers:** 16px corner radius for standard cards and sections.
- **Large Components:** 24px corner radius for hero sections and main dashboard views.
- **Interactive Elements:** Buttons and input fields follow a 12px radius, ensuring they feel integrated but distinct from the larger structural containers.
- **Pill Elements:** Tags and status indicators (chips) use full rounding (999px) to contrast against the structured grid.

## Components

- **Buttons:** 
    - *Primary:* Solid #FF6B35 with #0A0A0A text. Heavy 600 weight.
    - *Secondary:* Ghost style with #FFB703 border (1px) and text.
- **Cards:** Background #1E1E1E, 16px radius, 1px #FFFFFF (5% opacity) border. Hover state increases border opacity to 15% and adds a subtle upward translation (4px).
- **Inputs:** Darker than the card background (#121212). Focus state triggers a 1px #FF6B35 border and a soft orange inner shadow.
- **Chips/Badges:** JetBrains Mono font, 12px, uppercase. Success badges use #2ECC71 with 10% opacity background and solid text.
- **AI Career Path (Custom Component):** A vertical timeline using #FFB703 for the "Active" node, with a blurred glow effect to represent "The Future" path.
- **Lists:** High-density rows with 1px #FFFFFF (3% opacity) bottom separators and generous 24px vertical padding.