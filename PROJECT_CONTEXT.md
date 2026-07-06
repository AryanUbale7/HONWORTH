# Honworth Website — Project Context

## Stack
- Next.js 15, App Router, TypeScript (strict mode)
- Tailwind CSS v4
- Zod for all form/input validation
- React Hook Form for forms
- Sanity for CMS (Insights blog)
- Hosting: Vercel

## Brand
- Name: Honworth (capital H only, never all-caps)
- Tone: calm, premium, understated, educational. No urgency, no hype.
- Never use: "maximise", "guaranteed", "assured", "best", "high returns", "risk-free"

## Palette (Tailwind tokens — use these exact hex values, name them in tailwind.config)
- ivory: #FBF8F0 (primary background)
- sage: #AEC3B0
- sage-mist: #E8EFE6
- gold: #B8923E (accents only, not backgrounds)
- deep-green: #2E4A3A (headings, footer — small accents only, never full background)
- charcoal: #36403B (body text)
- NEVER use red or pure black anywhere

## Typography
- Headings: elegant serif (Cormorant Garamond or Playfair Display via next/font)
- Body: clean sans (Inter or Work Sans via next/font)

## Logo
- Logo files are in /public/logo/ (already added by me — check this folder before asking)
- Use for: header, footer, favicon, Open Graph share image

## Code standards
- Strict TypeScript, no `any`
- All external data (CMS, form input) validated with Zod before use — never trust unvalidated data
- Wrap CMS-fetching components in error boundaries with graceful fallback UI (never let a fetch failure crash the page)
- Mobile-first, accessible (proper contrast despite light palette, semantic HTML, alt text)