# Delphi Temple Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor the public Chronnote website from a generic SaaS presentation into a unified Delphi Temple visual and structural system.

**Architecture:** Keep the current Next.js route structure but replace the shared marketing shell and major homepage blocks with new Delphi-aligned components and styling primitives. Centralize the redesign in global theme variables and shared layout components first, then rebuild section components to consume the new visual system consistently.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4, next-intl, shadcn/ui-style component layer

---

### Task 1: Create the documentation scaffold

**Files:**
- Create: `docs/plans/2026-03-19-delphi-temple-redesign-design.md`
- Create: `docs/plans/2026-03-19-delphi-temple-redesign.md`

**Step 1: Save the approved design**

Write the approved Delphi Temple design summary and success criteria into the design doc.

**Step 2: Save the implementation plan**

Write this implementation plan so execution has a stable reference.

**Step 3: Verify files exist**

Run: `Get-ChildItem docs\plans`
Expected: both plan documents are listed

### Task 2: Rebuild the public theme foundation

**Files:**
- Modify: `src/styles/globals.css`
- Check: `docs/design-system.md`

**Step 1: Define the failing expectation**

Expectation: the current global theme still exposes bright SaaS colors, large rounded surfaces, and decorative gradient helpers that conflict with the Delphi system.

**Step 2: Replace root theme tokens**

Refactor root and dark theme variables to warm parchment / ink / terracotta values and tighten radius and shadow grammar.

**Step 3: Add shared Delphi utility classes**

Add classes for editorial serif moments, architectural section spacing, paper/stone surfaces, and restrained borders.

**Step 4: Remove or neutralize conflicting visual helpers**

Eliminate gradient-text and similar template-era helpers that would reintroduce the wrong visual language.

**Step 5: Verify**

Run: `npm run type-check`
Expected: no type errors caused by the stylesheet-driven redesign

### Task 3: Restyle shared public shell

**Files:**
- Modify: `src/app/[locale]/(marketing)/layout.tsx`
- Modify: `src/components/layout/navbar.tsx`
- Modify: `src/components/layout/footer.tsx`

**Step 1: Make the shell architectural**

Update the marketing layout to provide a stable Delphi background and spacing rhythm.

**Step 2: Redesign the navbar**

Reduce visual noise, use calmer typography, remove template-like blurred SaaS chrome, and align actions with the new shell.

**Step 3: Redesign the footer**

Shift the footer from startup-grid footer to inscription/index style while keeping key links accessible.

**Step 4: Verify**

Run: `npm run type-check`
Expected: no type errors in the shared shell components

### Task 4: Rebuild homepage composition

**Files:**
- Modify: `src/app/[locale]/(marketing)/(home)/page.tsx`
- Modify: `src/components/blocks/hero/hero.tsx`
- Modify: `src/components/blocks/features/features.tsx`
- Modify: `src/components/blocks/features/features2.tsx`
- Modify: `src/components/blocks/features/features3.tsx`
- Modify: `src/components/blocks/pricing/pricing.tsx`
- Modify: `src/components/blocks/faqs/faqs.tsx`
- Modify: `src/components/blocks/calltoaction/calltoaction.tsx`
- Review as needed: `messages/zh.json`, `messages/en.json`

**Step 1: Recompose the page sequence**

Simplify or reorder blocks so the homepage reads as an entry procession instead of a SaaS pitch deck.

**Step 2: Rebuild the hero**

Remove ripple, heavy CTA framing, and oversized screenshot dominance. Introduce a serif-led hero with a calmer interaction surface.

**Step 3: Rebuild feature sections**

Translate feature promotion into structured chambers with research-like hierarchy and restrained media framing.

**Step 4: Rebuild pricing**

Remove promotional gradients and flashy offer framing. Present plans as usage covenants / laurel system with clear data and calm emphasis.

**Step 5: Adjust FAQ and CTA**

Bring the closing sections into the same voice and geometry so the page lands quietly instead of ending with startup-style urgency.

**Step 6: Verify**

Run: `npm run type-check`
Expected: homepage blocks compile cleanly

### Task 5: Format and final verification

**Files:**
- Modify: files changed in Tasks 2-4

**Step 1: Format touched files**

Run: `npm run format`
Expected: files are rewritten consistently

**Step 2: Run final type verification**

Run: `npm run type-check`
Expected: exit code 0

**Step 3: Run production build verification**

Run: `npm run build`
Expected: successful Next.js production build

**Step 4: Review diffs**

Run: `git diff -- docs/plans src/styles/globals.css src/components/layout src/components/blocks src/app/[locale]/(marketing)`
Expected: changes are limited to the redesign scope
