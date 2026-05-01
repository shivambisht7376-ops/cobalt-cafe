---
name: Artisanal Hearth
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#504442'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#827471'
  outline-variant: '#d4c3bf'
  surface-tint: '#755750'
  primary: '#361f1a'
  on-primary: '#ffffff'
  primary-container: '#4e342e'
  on-primary-container: '#c19c94'
  inverse-primary: '#e5beb5'
  secondary: '#50652a'
  on-secondary: '#ffffff'
  secondary-container: '#cfe99f'
  on-secondary-container: '#546a2e'
  tertiary: '#252616'
  on-tertiary: '#ffffff'
  tertiary-container: '#3a3c2b'
  on-tertiary-container: '#a5a690'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad2'
  primary-fixed-dim: '#e5beb5'
  on-primary-fixed: '#2b1611'
  on-primary-fixed-variant: '#5c403a'
  secondary-fixed: '#d2eca2'
  secondary-fixed-dim: '#b6d088'
  on-secondary-fixed: '#131f00'
  on-secondary-fixed-variant: '#394d14'
  tertiary-fixed: '#e4e4cc'
  tertiary-fixed-dim: '#c8c8b0'
  on-tertiary-fixed: '#1b1d0e'
  on-tertiary-fixed-variant: '#474836'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 20px
  margin: 24px
---

## Brand & Style

This design system is built around the concept of **"Electric Minimalist."** It balances the high-performance energy of an urban coffee hub with the sleek, streamlined efficiency of a modern digital experience. The brand personality is bold, professional, and unapologetically modern, aiming to evoke the precision of a science lab and the vibrancy of a metropolitan center.

The visual style employs a refined **Industrial Minimalism**. By utilizing high-quality whitespace and sharp geometric lines, the interface feels premium and high-tech. The goal is to create a digital "high-performance sanctuary" that mirrors the physical environment of Cobalt Caffe—innovative, energetic, and precise.

## Colors

The palette is derived from natural, organic elements found in a premium cafe environment. 

- **Primary (Cobalt/Deep Brown):** Represents roasted espresso and industrial steel. Used for core branding, primary buttons, and headings to provide a sense of authority.
- **Secondary (Electric Teal/Green):** Inspired by neon energy and fresh botanicals. This is used for highlights, success states, and accents to bring a "vibrant" feel to the design.
- **Tertiary (Sleek Gray/Cream):** A cool off-white used for backgrounds and surfaces. It provides a clean, neutral canvas that emphasizes the bold primary colors.
- **Neutral (Steel/Charcoal):** Used for body text and precise borders to ensure clinical legibility and a high-performance aesthetic.

## Typography

The typography strategy focuses on a sophisticated "Serif-Sans" pairing. 

**Noto Serif** is utilized for all headings. Its timeless, literary quality adds an air of authority and elegance to the cafe's offerings. It should be used with generous leading to allow the letterforms to breathe.

**Plus Jakarta Sans** serves as the functional workhorse for body copy and UI labels. Its sharp, geometric letterforms complement the modern brand voice while maintaining exceptional legibility. Use medium weights for labels and buttons to ensure they stand out against the sleek backgrounds.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop environments (centered at 1200px) to maintain a controlled, editorial feel. On mobile devices, it transitions to a fluid 4-column system.

The spacing rhythm is built on an 8px baseline. Use "Large" (48px) and "Extra Large" (80px) vertical spacing between major sections to emphasize the minimalist aesthetic. Gutters are kept tight at 20px to keep related content, such as menu items, feeling cohesive. Margin containers should always provide a minimum of 24px safety space from the screen edge.

## Elevation & Depth

To maintain a modern yet warm feel, this design system avoids heavy shadows. Instead, it uses **Tonal Layers** and **Ambient Shadows**.

1.  **Level 0 (Base):** The Cream (`#F5F5DC`) background.
2.  **Level 1 (Cards/Floating elements):** White or slightly lighter cream surfaces with a very soft, diffused shadow (15% opacity of the Primary Brown) to suggest they are sitting lightly on a wooden table.
3.  **Interaction:** When a user hovers over a menu card or button, the shadow should slightly expand (increase blur, not opacity) to simulate the object being "lifted."

Avoid using harsh black shadows; always tint shadows with the primary brown to maintain color harmony.

## Shapes

The shape language is defined by **Precision Geometry** and subtle rounded corners, which reinforce the "high-performance" and "innovative" brand pillars. 

- Standard components (Buttons, Input Fields) use a 0.5rem (8px) radius.
- Larger containers (Menu Cards, Image Containers) use the `rounded-lg` 1rem (16px) radius.
- Interactive chips or tags (e.g., "Vegetarian") should use a full pill shape to distinguish them from actionable buttons.

## Components

### Buttons
- **Primary:** Solid Deep Brown with White text. Rounded corners (8px). 
- **Secondary:** Outlined Deep Brown with a 1px border. 
- **Ghost:** No border, Earthy Green text for subtle actions like "View Details."

### Menu Cards
Menu items should be presented in a clean card layout. Use a 16px corner radius. The top half features a high-quality food photograph, while the bottom half contains the item name in Noto Serif, the price in Plus Jakarta Sans (Bold), and a brief description. Apply a soft ambient shadow to separate the card from the cream background.

### Chips & Tags
Used for dietary preferences (e.g., Vegan, Gluten-Free). These should be pill-shaped with a light Earthy Green background and dark green text.

### Input Fields
Clean, 8px rounded corners with a subtle 1px border in a muted brown. Focus states should transition the border to the Secondary Green.

### Integrated Map
The map component should be customized to match the design system. Use a "Silver" or "Retro" base map style with all saturation reduced. Custom markers should be the Deep Brown primary color with a small coffee cup icon. High-contrast labels should be replaced with Noto Serif for location names to keep the branding consistent even within the map view.
