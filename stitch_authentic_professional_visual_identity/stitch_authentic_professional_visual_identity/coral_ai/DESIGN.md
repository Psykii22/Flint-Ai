---
name: Coral AI
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#383939'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#292a2a'
  surface-container-highest: '#343535'
  on-surface: '#e3e2e2'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#e3e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8b90a0'
  outline-variant: '#414755'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e69'
  primary-container: '#4b8eff'
  on-primary-container: '#00285c'
  inverse-primary: '#005bc1'
  secondary: '#ffd799'
  on-secondary: '#432c00'
  secondary-container: '#feb300'
  on-secondary-container: '#6a4800'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#929090'
  on-tertiary-container: '#2a2a29'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#ffdeac'
  secondary-fixed-dim: '#ffba38'
  on-secondary-fixed: '#281900'
  on-secondary-fixed-variant: '#604100'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121414'
  on-background: '#e3e2e2'
  surface-variant: '#343535'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 24px
  sidebar-width: 260px
---

## Brand & Style
The design system is engineered for high-performance FinOps environments, where speed of thought and clarity of data are paramount. The brand personality is technical, precise, and authoritative, drawing inspiration from high-end code editors and data-dense IDEs.

The style is **Minimalist-Technical**, utilizing deep monochromatic layers to minimize cognitive load, punctuated by high-signal accents. It evokes a "command center" feel—calm under pressure, yet ready to surface critical financial anomalies instantly. The UI should feel like a specialized tool for experts: sharp, fast, and uncompromisingly functional.

## Colors
The palette is rooted in a "True Dark" foundation to maximize contrast for data visualization. 

- **Obsidian Blue (#007AFF):** The primary action color, used for execution paths and primary navigation.
- **Alert Amber (#FFB300):** A sharp, high-visibility color reserved for FinOps anomalies, budget overages, and critical warnings.
- **Coral SQL (#FF7F50):** Specifically designated for the SQL terminal interface to distinguish query syntax and database interactions from standard application logic.
- **AI Investigator Status:** Uses a "Living Teal" (#00FFC2) for active scanning states and a muted charcoal for idle states, ensuring the user always knows when the agent is processing.

## Typography
This design system utilizes **Geist** for its systematic, neutral, and developer-friendly character across all UI headings and body copy. For data-rich environments and the SQL terminal, **JetBrains Mono** is employed to ensure character distinctness (important for financial figures and query syntax).

Large headlines use negative letter spacing to feel "locked-in" and architectural. Labels are frequently set in uppercase JetBrains Mono to denote metadata and system statuses, providing a clear visual distinction from user-generated content.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. Navigation and investigative sidebars are fixed-width to maintain a consistent workspace, while the primary "Work-Bench" (SQL terminal and data grid) expands fluidly to maximize data visibility.

A strict 4px grid governs all spatial relationships. Grids and tables use "Compact" density, prioritizing the amount of information on screen over whitespace. Content is contained within subtle 1px borders rather than expansive padding to maintain a "dense tool" aesthetic.

## Elevation & Depth
In this dark-mode-first system, depth is communicated through **Tonal Layering** rather than shadows. 

- **Level 0 (Background):** The base layer (#0D0D0D).
- **Level 1 (Panels):** Raised surfaces like sidebars and terminal wells (#161616).
- **Level 2 (Modals/Popovers):** Focused elements (#222222) with a 1px solid stroke in a slightly lighter grey (#333333).

Avoid all drop shadows. Use 1px borders to define boundaries between UI regions. This ensures the interface feels like a single, cohesive piece of high-performance hardware.

## Shapes
The shape language is **Technical and Precise**. We use a "Soft" roundedness (4px) for most interactive components like buttons and inputs to provide just enough approachability without losing the professional, engineered feel. 

The SQL Terminal and AI Investigator status chips use a sharp 2px radius to emphasize their nature as "raw" system outputs. Large container panels should remain perfectly square to maintain the structural integrity of the grid.

## Components
- **Buttons:** Primary buttons are solid Obsidian Blue with white text. Secondary buttons are ghost-style with a 1px stroke.
- **AI Investigator Status:** A dedicated component featuring a pulsing 8px dot (Teal for active, Amber for anomaly found) next to a JetBrains Mono label.
- **Coral SQL Terminal:** Dark background (#0D0D0D) with Coral (#FF7F50) keywords and Blue strings. The cursor should be a solid block for high visibility.
- **Data Grids:** Zero-border headers with 1px horizontal dividers. Alternating row highlights are not used; instead, use a subtle hover state (#1A1A1A).
- **Anomalies:** Highlighted using a vertical "Alert Amber" left-border on list items or cards to indicate financial risk without overwhelming the text.
- **Inputs:** Darker than the panel they sit on, using a 1px blue border only when focused.