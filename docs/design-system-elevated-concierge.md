# Design System — The Elevated Concierge

North Star: **The Digital Atelier** — editorial, high-end hospitality aesthetic. “Trustworthy” via spacing + typography + tonal depth (not heavy borders).

## Core rules

### No-Line Rule
- **Dilarang** menggunakan `1px solid` untuk sectioning/layout containment.
- Struktur harus muncul dari **perbedaan surface/background** + whitespace.
- Jika butuh garis untuk aksesibilitas, pakai **Ghost Border**: `outline-variant` dengan 20% opacity.

### Glass & Gradient Rule
- Overlay (modal/popover): glassmorphism memakai `surface-container-lowest` opacity + `backdrop-filter: blur(12px)`.
- Primary CTA: **Signature Texture** gradient 135° `primary → primary-container`.

## Tokens (apps/web)

Semua token disentralisasi di `apps/web/src/index.css`:

- **Surfaces**
  - `--surface` `#f9f9fb`
  - `--surface-container-low` `#f3f3f5`
  - `--surface-container-lowest` `#ffffff`
  - `--surface-container-high` `#e8e8ea`
  - `--surface-variant` `#ececf2`
- **Text**
  - `--on-surface` `#1a1c1d`
  - `--on-surface-variant` `#454652`
- **Brand**
  - `--primary` `#000666`
  - `--primary-container` `#1A237E`
  - `--on-primary` `#ffffff`
  - `--secondary-container` `#94f0df`
  - `--on-secondary-container` `#006f62`
  - `--tertiary` `#006b5e`
  - `--tertiary-fixed-dim` `#e9c176`
- **Outline**
  - `--outline-variant` `#c6c5d4`
- **Status**
  - `--danger` `#b3261e`
  - `--success` `#0f8a5f`
  - `--warning` `#b07d12`

Tailwind v4 di-map melalui `@theme` sehingga bisa dipakai sebagai class:
- `bg-surface`, `bg-surface-container-low`, `bg-surface-container-lowest`, `bg-surface-container-high`
- `text-on-surface`, `text-on-surface-variant`
- `bg-primary`, `bg-primary-container`, `text-primary`, dll (via token)

## Typography

- **Display/Headlines**: **Manrope**
- **Body/UI**: **Inter**

Guideline:
- Jangan pakai `on-surface` untuk semuanya. Pakai `on-surface-variant` untuk label/secondary text.

## Component guidance

### Buttons
- **Primary**: gradient 135° `primary → primary-container`, radius `0.75rem`, **tanpa shadow**
- **Secondary**: `secondary-container` + `on-secondary-container`
- **Tertiary**: transparent + `primary` text

### Inputs
- Background `surface-container-high`, **tanpa border**
- Focus: background `surface-container-lowest` + ghost border `primary` (20% opacity)

### Cards & Lists
- **Dilarang divider** untuk list rows; pakai whitespace atau alternating surface.
- Radius utama: `1rem` (`rounded-[1rem]`).

### Shadows
- Hanya untuk overlay (modal/popover):
  - `0px 12px 32px rgba(26, 28, 29, 0.06)`

## Implementation status

Primitives yang sudah mengikuti design system:
- `apps/web/src/components/ui/button.tsx`
- `apps/web/src/components/ui/input.tsx`
- `apps/web/src/components/ui/card.tsx`
- `apps/web/src/components/ui/table.tsx`
- `apps/web/src/components/ui/modal.tsx`
- `apps/web/src/components/AppShell.tsx` (surface layering + no-line rule)

