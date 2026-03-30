# Delphi Temple Redesign Design

**Date:** 2026-03-19

**Scope:** Entire marketing site and shared public-facing theme layer

## Goal

Refactor the existing SaaS-style Chronnote website into a unified "Delphi Temple" experience that matches the approved Chronnote brand direction: restrained, academic, calm, ritualized, and trustworthy.

## Problem

The current site still carries generic SaaS marketing patterns:

- large promo hero with heavy CTA emphasis
- gradient, beam, ripple, glow, and oversized rounded cards
- section structure optimized for selling features instead of presenting a thinking space
- weak alignment with the existing Chronnote design system in `docs/design-system.md`

This creates a mismatch between the product metaphor ("Delphi temple", "Pythia", "oracle") and the site experience.

## Approved Direction

### Brand Frame

Chronnote should feel like a main hall for thinking rather than a startup landing page. The site should express:

- calm
- order
- authority
- editorial depth
- restrained ritual

### Visual System

- Base surfaces use warm parchment, sand, limestone, and ink/leather relationships.
- Serif is reserved for moments with narrative weight: hero headline, key section openings, select page titles.
- Sans remains the default for navigation, body text, controls, and dense reading.
- Accent color is controlled and semantic. Warm terracotta/rust is the primary brand emphasis.
- Shadows are neutral and subtle. They communicate layering, not decoration.
- Gradients, glassmorphism, beams, glow, and decorative motion are removed from primary UI surfaces.
- Radius grammar follows the design system: compact surfaces, no oversized card rounding.

### Structural Model

The site should read as a sequence of temple spaces rather than stacked marketing blocks.

- Navbar becomes a thin architectural frame, not a floating SaaS toolbar.
- Hero becomes the entry into the main hall.
- Feature sections become "chambers" or ordered knowledge corridors rather than promo cards.
- Pricing becomes a pledge / usage / laurel system presentation rather than a sales promotion panel.
- Footer becomes a quiet index / inscription layer.

### Interaction Model

- Motion is reduced to short state transitions and subtle reveal.
- Hover states only change one major property at a time.
- Focus states remain visible and accessible.
- Dark mode uses deep ink/leather tones instead of high-contrast neon black UI.

## Content Direction

- Reduce hype language and duplicated CTAs.
- Emphasize Chronnote as a place for asking, thinking, remembering, and synthesizing.
- Use Chronnote brand terms only where they add meaning.
- Keep operational UI copy clear and direct.

## Global Change Areas

1. `src/styles/globals.css`
   Rebuild the public visual foundation around Delphi tokens, typography, radius, shadows, and page atmosphere.

2. Shared layout and navigation
   Restyle navbar, footer, container rhythm, buttons, and common page shell.

3. Marketing homepage composition
   Rebuild the current block stack into a more cohesive temple narrative with quieter transitions between sections.

4. Section components
   Rewrite hero, feature, pricing, FAQ, CTA, and related blocks to remove SaaS-template visuals and align with the approved editorial/architectural structure.

## Success Criteria

- The site no longer reads as a generic SaaS template.
- The homepage and pricing page clearly reflect the Delphi x Arena direction from the design system.
- Shared layout elements feel unified across marketing pages.
- Accent, motion, shadow, and radius usage stay within system constraints.
- The result remains responsive and accessible on desktop and mobile.
