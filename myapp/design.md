# Design System — Task Manager Mobile App

> All color values extracted directly from Figma selection colors. No approximations.

---

## Color Tokens

### Light Theme — Full Token Set

| Hex | Opacity | Role |
|-----|---------|------|
| `#FFFFFF` | 100% | App background, card surface, primary text on dark |
| `#000000` | 100% | Primary text, icon strokes, dark fills |
| `#EAD6D6` | 100% | Inactive nav icon — primary fill (dusty rose) |
| `#36338C` | 100% | Brand primary — project cards, active icon containers |
| `#363487` | 100% | Brand secondary — buttons, highlights |
| `#514B4B` | 100% | Secondary text, muted labels |
| `#5C58BD` | 10% | Subtle tint overlays, ghost states |
| `#D7C3C3` | 100% | Inactive nav icon — mid tone |
| `#E1E8F5` | 100% | Light surface tint, input backgrounds |
| `#7D7575` | 100% | Tertiary text, timestamps |
| `#7D7979` | 100% | Muted icon fill |
| `#9F9898` | 100% | Inactive nav icon — shadow layer |
| `#F3F6FF` | 100% | Lightest surface, page background tint |

### Dark Theme — Full Token Set

| Hex | Opacity | Role |
|-----|---------|------|
| `#FFFFFF` | 100% | Primary text, icon strokes on dark |
| `#000000` | 100% | Card / surface background |
| `#0F0F10` | 100% | App background (near-black) |
| `#363487` | 100% | Brand primary — active states, buttons |
| `#EAD6D6` | 100% | Inactive nav icon — primary fill (dusty rose, same as light) |
| `#3A378B` | 100% | Brand accent variant — highlights |
| `#8A8080` | 100% | Inactive nav icon — shadow / depth layer |
| `#EFE0E0` | 100% | Inactive nav icon — highlight layer |

---

## Theme Comparison

| Element | Light | Dark |
|---------|-------|------|
| App background | `#FFFFFF` | `#0F0F10` |
| Card / surface | `#F3F6FF` | `#000000` |
| Primary text | `#000000` | `#FFFFFF` |
| Secondary text | `#514B4B` | `#8A8080` |
| Tertiary text / timestamps | `#7D7575` | `#8A8080` |
| Brand primary | `#36338C` | `#363487` |
| Brand accent | `#363487` | `#3A378B` |
| Subtle overlay / ghost | `#5C58BD` at 10% | — |
| Input / surface tint | `#E1E8F5` | — |
| Bottom nav background | `#FFFFFF` | `#000000` |
| Bottom nav — active icon | `#36338C` | `#363487` |
| Bottom nav — inactive (primary fill) | `#EAD6D6` | `#EAD6D6` |
| Bottom nav — inactive (mid tone) | `#D7C3C3` | — |
| Bottom nav — inactive (shadow) | `#9F9898` | `#8A8080` |
| Bottom nav — inactive (highlight) | — | `#EFE0E0` |
| Bottom nav — inactive (stroke) | `#000000` | `#FFFFFF` |

---

## Bottom Navigation — Inactive Icon Layers (Exact)

The nav icons are **multi-layer**, not flat fills.

### Light Mode
| Layer | Hex | Opacity |
|-------|-----|---------|
| Primary fill | `#EAD6D6` | 100% |
| Mid tone | `#D7C3C3` | 100% |
| Shadow / depth | `#9F9898` | 100% |
| Muted fill | `#7D7979` | 100% |
| Base stroke | `#000000` | 100% |

### Dark Mode
| Layer | Hex | Opacity |
|-------|-----|---------|
| Primary fill | `#EAD6D6` | 100% |
| Shadow / depth | `#8A8080` | 100% |
| Highlight | `#EFE0E0` | 100% |
| Base stroke | `#FFFFFF` | 100% |

> The dusty rose `#EAD6D6` is the shared base across both modes. Depth and stroke values flip per theme.

---

## Typography

**Font Family:** `Inter`

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Heading 1 | 28px | 500 Medium | Page / screen titles |
| Heading 2 | 14px | 400 Regular | Section labels, captions |
| Heading 3 | 15px | 500 Medium | Card titles, list item names |
| Heading 4 | 15px | 500 Medium | Sub-section labels |
| Heading 5 | 13px | 500 Medium | Tags, timestamps, metadata |

---

## Spacing & Shape

| Token | Value |
|-------|-------|
| Card border radius | `16px` |
| Date chip border radius | `14px` |
| Pill / tag border radius | `999px` |
| Card padding | `16px` |
| Bottom nav height | `64px` |
| Avatar size | `36px` diameter |

---

## Buttons

| Variant | Background | Text | Border | Radius | Example |
|---------|------------|------|--------|--------|---------|
| Primary CTA | `#363487` | `#FFFFFF` | none | `12px` | `Create Task` |
| Dark solid pill | `#000000` | `#FFFFFF` | none | `999px` | `Marketing`, `Meeting`, `Production` |
| Dark outline pill | `transparent` | `#000000` | 1px `#000000` | `999px` | `Deff`, `Dashboard design`, `Ui Design` |
| Active tag | `#363487` | `#FFFFFF` | none | `999px` | `My tasks` |
| Inactive tag | `#E1E8F5` | `#514B4B` | none | `999px` | `Projects`, `Note` |
| Add task outline | `transparent` | `#363487` | 1px `#363487` | `999px` | `+ ADD TASK` |

---

## Tab Row (Top — Light Mode)

| State | Background | Text | Radius |
|-------|------------|------|--------|
| Active | `#363487` | `#FFFFFF` | `999px` |
| Inactive | transparent | `#514B4B` | — |

Labels: `My tasks` · `Projects` · `Note`

---

## Icons

All icons are **outline style only**, `22–24px`.

| Icon | Usage |
|------|-------|
| `home` | Bottom nav |
| `clipboard-list` | Bottom nav + task list items |
| `pencil-square` | Bottom nav |
| `users / people` | Bottom nav |
| `search` | Top bar |
| `sliders / adjustments` | Top bar filter |
| `arrow-left` | Back navigation |
| `menu / hamburger` | Top-left drawer trigger |

---

## Components

### Greeting Header (Light Mode)
- Left: hamburger icon, `#000000`
- Right: circular avatar, `36px`
- Main: `HELLO, john!` — 28px medium, name in bold
- Sub: `Have a nice day!` — 13px, `#7D7575`

### Project Cards
- Background: `#36338C`
- Text: `#FFFFFF`
- Border radius: `16px`
- Contents: month label (13px) · project title (15px medium) · progress bar (thin, `#5C58BD` at 10% tint fill) · progress % (13px, right-aligned)

### Task List Items

**Light Mode**

| Property | Value |
|----------|-------|
| Row background | `#F3F6FF` |
| Icon container | `#363487` rounded square |
| Task name | 15px medium, `#000000` |
| Date | 13px, `#7D7575` |
| Action menu | `⋮` `#9F9898` |

**Dark Mode**

| Property | Value |
|----------|-------|
| Row background | `#0F0F10` |
| Icon container | `#363487` rounded square |
| Task name | 15px medium, `#FFFFFF` |
| Date | 13px, `#8A8080` |
| Action menu | `⋮` `#8A8080` |

### Date Chips (Dark Mode Calendar)

| State | Background | Text | Radius |
|-------|------------|------|--------|
| Default | `#000000` | `#FFFFFF` | `14px` |
| Selected | `#363487` | `#FFFFFF` | `14px` |

Format: day number bold 18px + day name uppercase 11px

---

## Screen Breakdown

### Screen 1 — Home (Light Mode)
1. Top bar: hamburger (left) + avatar (right)
2. Greeting: `HELLO, john!` + `Have a nice day!` (`#7D7575`)
3. Tab row: `My tasks` active (`#363487` pill) · `Projects` · `Note`
4. Project cards: 2-col horizontal scroll, `#36338C` bg, white text
5. Section label: `progress`, `#000000`
6. Task rows: `#363487` icon square + task name + date (`#7D7575`) + `⋮`
7. Bottom nav: bg `#FFFFFF`, inactive layers `#EAD6D6` / `#D7C3C3` / `#9F9898`

### Screen 2 — Calendar / Tasks (Dark Mode)
1. Top bar: `←` back · `OCT, 2020` bold `#FFFFFF` · search + filter icons
2. `+ ADD TASK` `#363487` outline pill (top right)
3. Date chips: Mon 10 selected (`#363487`) + Thu 11–13 (`#000000`)
4. Section label: `Task` + `...` overflow
5. Task rows: `#363487` icon square + `Ui development` + `17 aug 2022` (`#8A8080`) + `⋮`
6. Bottom nav: bg `#000000`, inactive layers `#EAD6D6` / `#8A8080` / `#EFE0E0`

---

## Design Principles

- **All hex values are exact Figma exports** — no approximations or guesses.
- **Single dusty rose base** `#EAD6D6` shared for inactive nav icons across both themes.
- **Brand indigo family**: `#36338C` → `#363487` → `#3A378B` — three close variants used across cards, buttons and accents.
- **Subtle overlay**: `#5C58BD` at 10% opacity used for ghost states and progress fill tints.
- **All corners rounded** — `16px` cards · `14px` chips · `999px` pills.
- **Icons always outline**, never filled, `22–24px`.
- **Typography exclusively Inter** — Regular (400) and Medium (500) only.