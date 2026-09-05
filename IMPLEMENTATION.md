# TruePrint Implementation Record

## Local hardening — not deployed

Form bodies now have streaming byte limits (32 KiB JSON, 9 MiB multipart), including requests without Content-Length. Malformed payloads receive controlled errors. Intake continuation credentials are checked before uploading, with a conditional update still preventing repeated completion. Upload MIME types and the maximum 8 MiB size align with the private bucket SQL. Cleanup failures do not replace the original submission error. Quantities are bounded to the database integer range.

Real database connectivity and provider deployment are not verified. The backend currently uses Supabase REST and Storage; a different database engine needs an adapter, not just replacement credentials. The existing hosting/runtime configuration is not a tested Hostinger deployment recipe. Provider runtime compatibility, secrets, SQL execution and end-to-end tests remain required.

Sections 1 onward below are historical implementation notes, not a statement of current backend readiness.

## Latest backend readiness update

All four lead-capture workflows now have complete local backend preparation. The special sourcing form writes to its own `source_requests` table and stores optional photos privately under the `source-requests/` Storage prefix with separate path, name, type and size metadata. The database setup now contains SQL files `001` through `012`.

Cloudflare Turnstile is integrated into the homepage project intake, Contact page enquiry, special sourcing form and every category catalogue form. Each client submits a short-lived token, and the corresponding server route verifies the token with Cloudflare Siteverify before any Supabase write. Verification also checks the expected action and allowed hostname. Homepage Step 2 remains protected by the one-time continuation token issued only after the Turnstile-protected Step 1 succeeds.

Provider work includes checking runtime compatibility, running the SQL files and supplying the values documented in `.env.example`: Supabase project credentials, the private Storage bucket name if overridden, the Cloudflare Turnstile site key, server secret and optional hostname allowlist. Real credentials are intentionally not stored in the repository. Actual database writes and bot verification must be tested after configuration.

## Latest update: homepage sourcing form

The right-hand packaging image in the “Give us the clue. We’ll find the object.” section has been replaced with a white sourcing-request form while preserving the surrounding section, dark background, left-hand editorial content and angular corner silhouette.

The form collects name, phone number, email, organization, a description of what the visitor is searching for and an optional reference photo. Submissions are sent to `/api/forms/source-request`. Contact details and the request are stored with the existing contact-enquiries workflow; an uploaded reference is stored privately and its storage path is attached to the saved enquiry. The form includes loading, error and confirmation states and adapts to a single-column mobile layout.

## 1. Purpose of this file

This document is the detailed technical and product handoff for the TruePrint website. It records what was requested, what was implemented, the type of code used, the reasoning behind major choices, current limitations and the exact areas that must be updated when more business information is supplied.

This file and `README.md` must be updated whenever the site gains or changes a page, feature, integration, dependency, data structure, environment variable, deployment setting or visual rule.

## 2. Requirements received so far

1. Build a website for a new printing firm.
2. Begin with the homepage design before adding broader business requirements.
3. Follow the structure and visual character of the supplied luxury-product homepage reference as closely as practical without copying its original brand or product content.
4. Add a large `TruePrint` word at the bottom with very low visibility in grey.
5. Give that background word a layered or three-dimensional appearance and keep it behind the main content.
6. Maintain both a concise `README.md` and this detailed `IMPLEMENTATION.md` throughout the project.
7. Explain every important implementation detail and identify the code, languages, frameworks and libraries being used so another developer can continue the work.
8. Replace the large right-side homepage image with a transparent, blurred liquid-glass form.
9. Shape the glass panel like the supplied third reference, using a large inward curved cut-out on the left side.
10. Reduce the form's overall size, align the circular CTA precisely with the cut-out and match the faint uppercase bottom `TRUEPRINT` treatment in the latest reference.

## 3. Scope of this implementation

The current milestone is a single, presentation-led homepage with an interactive quote-form preview. It establishes the visual identity, responsive hero experience and basic browser-side form validation. It does not yet include dedicated service pages, an operational search engine, user accounts, saved products, a shopping cart, quote persistence, payment, a content-management system, a database or external delivery services.

Several header controls are intentionally visual interaction points at this stage:

- Navigation links use homepage anchors.
- The search field accepts text but does not submit a search request.
- Saved-products and quote-basket buttons expose accessible names but do not store data.
- `Get a Quote`, `Start a project` and `Contact` target the liquid-glass form at the `#contact` anchor.
- The quote form validates required fields and shows a local preview-complete state, but it deliberately does not send or store personal information until a receiving email address or CRM is confirmed.

When their intended workflows are supplied, these controls can be connected without redesigning the header.

## 4. Reference-to-implementation mapping

| Reference characteristic | TruePrint implementation |
| --- | --- |
| Large rounded white browser-like canvas | `siteCard` with a 38px radius, inner border and layered soft shadow |
| Compact logo and centred navigation | TruePrint ink-dot mark, brand name and centred five-link navigation |
| Search and circular action controls | Search field, saved-products icon, quote-basket icon and round quote badge |
| Oversized two-line luxury headline | `Ideas, made tangible.` in a tight editorial display scale |
| Short supporting copy and pill CTA | Printing-specific description and `Explore our print` action |
| Small product image at bottom left | Featured foil and letterpress material card |
| Circular rotating CTA between columns | SVG text path orbit with an inner `Start a project` button |
| Dark translucent UI reference | Smoky liquid-glass form with layered transparency, blur and soft highlights |
| Rounded panel with inward left curve | Radial CSS mask with a circular rim aligned to the project CTA |
| Faint background typography | Oversized `TruePrint` word behind content with perspective and layered shadows |

## 5. Technology and code types

### 5.1 TypeScript

`app/page.tsx`, `app/quote-form.tsx` and `app/layout.tsx` use TypeScript with JSX, commonly called TSX. TypeScript provides typed application source while JSX describes the HTML-like React component tree.

The form submit handler uses the typed `FormEvent<HTMLFormElement>` event. No custom domain model is necessary at this stage.

### 5.2 React

React components render the homepage. `Home` is the route component. Small icon components return accessible inline SVG geometry for search, saved products, the quote basket and directional arrows.

`Home` remains server-rendered. Only `QuoteForm` uses the `use client` directive because it needs a submit handler and one `useState` value for the local preview-complete state. This keeps the interactive browser bundle limited to the form.

### 5.3 Vinext and Next-compatible routing

The project uses the supplied Vinext starter and Next-compatible App Router conventions:

- `app/page.tsx` maps to `/`.
- `app/layout.tsx` wraps the route and supplies document metadata.
- `app/globals.css` is imported once by the root layout.

The existing Sites Vite integration, dependency versions, package lock and hosting manifest are preserved.

### 5.4 CSS

The visual implementation uses standard CSS in `app/globals.css`. Tailwind is available through the starter and remains imported, but the TruePrint interface uses semantic class names and custom CSS because the design requires precise layered styling.

CSS is responsible for:

- Grid and flex layouts
- Colour variables
- Typography scale and spacing
- Borders, radii and shadows
- Responsive breakpoints
- Hover and keyboard-focus feedback
- Image framing and cropping
- Liquid-glass translucency and `backdrop-filter` blur
- A radial mask and clipped circular rim for the inward form cut-out
- Warm blurred gradient orbs behind the transparent panel
- Circular CTA rotation
- Low-visibility 3D background typography
- Reduced-motion behaviour

### 5.5 SVG

Inline SVG is used only for functional icons and the circular CTA text path. It is vector-based, scales cleanly and inherits the current CSS colour. Decorative product imagery is not drawn with CSS or SVG.

### 5.6 PNG imagery

The featured-finish image and social-preview card are original raster assets placed under `public/`. The earlier `trueprint-hero.png` asset is retained for version continuity but is no longer rendered after the form replaced the right-side image.

## 6. File structure

```text
trueprint/
├── .openai/
│   └── hosting.json            Site identity and optional binding declarations
├── app/
│   ├── globals.css             Global visual system and responsive rules
│   ├── layout.tsx              Metadata and root HTML structure
│   ├── quote-form.tsx          Form fields, validation and completion state
│   └── page.tsx                Homepage component
├── public/
│   ├── favicon.svg             Current starter favicon, pending final logo asset
│   ├── og.png                  TruePrint social sharing card
│   ├── trueprint-detail.png    Featured print-finish image
│   └── trueprint-hero.png      Retained earlier hero asset, currently unused
├── IMPLEMENTATION.md           This detailed record
├── README.md                   Quick project introduction and setup
├── package.json                Scripts and dependencies
├── package-lock.json           Locked dependency graph
├── tsconfig.json               TypeScript settings
└── vite.config.ts              Vinext/Sites build integration
```

Starter files not listed above remain unchanged unless a later requirement needs them.

## 7. Page structure

### 7.1 Outer page shell

`pageShell` centres the homepage canvas on desktop and supplies a warm grey background made from layered CSS gradients. The canvas becomes edge-to-edge on small mobile screens.

### 7.2 Site card

`siteCard` is the main rounded surface. It has:

- A semi-opaque warm-white background
- A white outer border and subtle inner line
- Multiple soft shadows for physical depth
- Hidden overflow so the oversized background word and visual accents remain clipped to the card
- `isolation: isolate` to keep the internal stacking order predictable

### 7.3 Header

The header is a three-column CSS Grid:

1. Brand mark and TruePrint name
2. Centred navigation
3. Search and action controls

Below 980px, the desktop navigation and tools are hidden. A native HTML `details` element provides a keyboard-operable mobile navigation menu without adding client-side JavaScript.

### 7.4 Hero copy

The left column contains:

- An eyebrow line
- Main headline
- Supporting paragraph
- Primary pill-shaped CTA
- Featured-finish image and description

The headline uses responsive `clamp()` sizing and intentionally tight tracking to reflect the supplied editorial reference.

### 7.5 Circular CTA

The CTA uses an SVG circular path and `textPath` for the surrounding words. It is now a child of `formStage`, so its centre can share the exact same 78% vertical position as the panel mask rather than relying on a percentage of the full hero grid. CSS rotates the outer SVG continuously while the inner action remains stationary. `prefers-reduced-motion: reduce` disables the rotation for visitors who request less motion.

### 7.6 Liquid-glass quote form

The right column is a reduced-width `formStage` containing decorative blurred colour orbs behind a compact dark transparent `quotePanel`. The panel uses `backdrop-filter: blur(28px) saturate(1.28)`, a layered semi-transparent gradient, a pale glass border and inset highlights.

A radial CSS mask removes a 72px circle from the panel's left edge at 78% of its height. A clipped circular border called `notchRim` reinforces the curved glass edge. The rotating `Start a project` control and rim are positioned inside the same parent with matching centres, removing the earlier horizontal and vertical drift.

`QuoteForm` contains required name, email, print-requirement, quantity, project-details and contact-consent fields. Native browser validation handles empty fields and email/number formats. Submitting valid fields resets the form and displays an honest preview-complete state. No network request is made.

### 7.7 Background TruePrint word

The `depthWord` element is decorative and therefore has `aria-hidden="true"`. Its latest treatment is produced by:

- Very low-opacity grey text
- Uppercase `TRUEPRINT` content
- Large responsive type cropped by the bottom edge
- Negative letter spacing
- A restrained soft shadow rather than perspective distortion
- A stacking level below the meaningful hero content

This matches the supplied faint full-width bottom word reference while keeping it behind the design.

## 8. Responsive behaviour

### Above 1180px

- Full navigation and header tools
- Two-column hero
- Circular CTA fits into the liquid-glass panel's concave edge

### 981px to 1180px

- Narrower search and navigation spacing
- Slightly smaller circular CTA
- Two-column structure and curved panel mask remain intact

### 621px to 980px

- Mobile navigation replaces the desktop controls
- Hero changes to one column
- Copy appears above the quote form
- The glass panel becomes a standard rounded rectangle so fields retain usable width
- Circular CTA moves above the form
- Background word is repositioned to remain visible behind the transition area

### 620px and below

- Edge-to-edge page surface
- Reduced horizontal padding
- Smaller featured-product image and typography
- Quote fields change from two columns to one column
- Submit button expands to the available width
- Touch targets remain at least approximately 42px where applicable

## 9. Accessibility

- The document language is English.
- Main navigation has explicit accessible labels.
- Icon-only controls have meaningful `aria-label` values.
- Decorative SVG and the background word are hidden from assistive technology.
- Product images include descriptive alternative text.
- Every quote input has a visible label and required browser validation.
- The completion message uses `role="status"`.
- The contact-consent checkbox is required.
- The search field has a visually hidden label.
- Mobile navigation uses native `details` and `summary` keyboard behaviour.
- Keyboard focus uses browser focus outlines and underline movement where relevant.
- Continuous animation is removed when reduced motion is requested.
- Text and interactive controls use high-contrast black, white and copper combinations.

## 10. Metadata and SEO

Current metadata:

- Title: `TruePrint | Premium Printing & Finishing`
- Description: `Premium print, precise colour and thoughtful finishing for brands that care about every detail.`
- Social title and description are set for Open Graph and X.
- The social card uses `summary_large_image` formatting.
- Open Graph and X image metadata use the verified production origin and `/og.png`.

The final business location, service area and real company description are not yet available. Structured data, local-business schema, canonical URLs and location keywords should be added only after those facts are supplied.

## 11. Content status

The following copy is provisional and can be replaced when the company profile is provided:

- `Made to be remembered`
- `Ideas, made tangible.`
- Hero paragraph
- `Explore our print`
- `Foil & letterpress`
- `Texture you can see. Quality you can feel.`
- `Tell us what you're printing.`
- Form description, product options and preview-status wording

`TruePrint` is treated as the current working brand name because it was specifically requested for the design.

## 12. Data, APIs and environment variables

There is currently:

- No database schema
- No API route
- No user-authentication flow
- No file upload
- No third-party integration
- No application-specific environment variable
- No `.env` file required
- One local React state value controlling the form's preview-complete screen

Form contents remain in the browser only until submit. The submit handler prevents a network request, resets the fields and changes the local display state. It does not use local storage, cookies, analytics, email or a CRM.

The hosting manifest keeps optional D1 and R2 bindings as `null`. Future environment variables must be added to `.env.example` at the same time they are introduced, but secret values must never be committed to source files or documentation.

## 13. Security considerations

The displayed quote form does not transmit or persist its contents. It clearly identifies itself as a design preview. Before real delivery is enabled, implementation must include:

- Server-side validation in addition to browser validation
- Length and file-type restrictions
- Rate limiting and spam protection
- Safe output encoding
- Explicit consent language for personal information
- Secure secret storage for mail or CRM credentials
- A clear success and error state
- Logging that excludes confidential form contents

No security-sensitive workflow should be implied by the current visual-only header controls.

## 14. Performance considerations

- No client-side state library is loaded.
- The page is server-rendered except for the small quote-form client component.
- Form state uses React itself and does not introduce a state-management package.
- Functional icons are small inline SVG elements.
- Motion uses transform properties.
- Product images should be exported at an appropriate display resolution and compressed before future replacements.
- External font requests are avoided; the site uses a system font stack.

Future multi-page work should retain route-level simplicity and avoid introducing large libraries for small interactions.

## 15. Validation expectations

Each future milestone should verify:

1. Production build completes.
2. Homepage title and description match the current business copy.
3. All referenced public images exist.
4. Desktop and mobile CSS rules remain valid.
5. Navigation destinations exist or are clearly marked as pending.
6. Interactive elements can be reached by keyboard.
7. Reduced-motion behaviour is preserved.
8. No private credentials or personal information are committed.
9. Form fields expose visible labels and required validation.
10. Submitting the preview does not produce a network request.

## 16. Known limitations and pending decisions

- Final logo and favicon are pending.
- Exact company name styling must be confirmed.
- Official company overview is pending.
- Services and machine capabilities are pending.
- Paper stocks, finishes and product categories are pending.
- Address, phone, email, business hours and service locations are pending.
- Quote delivery destination, server handling and production success/error states are pending.
- Search, saved items and quote basket behaviour are pending.
- Legal pages and privacy wording are pending.
- Final domain and public access policy are pending.

## 17. Change history

### 2026-08-25: Form sizing and alignment refinement

- Reduced the desktop glass form to 92% of its grid column and lowered its height.
- Tightened form padding, fields, spacing and heading scale without removing content.
- Moved the circular CTA into `formStage` and matched its centre to the notch mask.
- Scaled the mask, rim and CTA together at the intermediate desktop breakpoint.
- Changed the bottom wordmark to faint, oversized, uppercase `TRUEPRINT` with edge cropping.
- Preserved simpler mask-free form behaviour on tablet and mobile layouts.
- Updated both project guides.

### 2026-08-25: Liquid-glass quote form

- Replaced the right-side hero photograph with an interactive quote-form preview.
- Added smoky glass transparency, background blur, layered light reflections and warm liquid orbs.
- Added the reference-inspired concave left edge with a radial CSS mask.
- Aligned the rotating project CTA with the curved cut-out.
- Added required quote fields, native validation, consent and a local completion state.
- Added responsive behaviour that removes the mask and stacks fields on smaller screens.
- Updated `README.md` and this implementation handoff.

### 2026-08-25: Homepage design foundation

- Created the TruePrint site from the standard Vinext starter.
- Replaced the starter page with a printing-focused premium hero layout.
- Mapped the supplied reference design to TruePrint content and controls.
- Added the low-visibility three-dimensional `TruePrint` background word.
- Added responsive desktop, tablet and mobile rules.
- Added accessible navigation, labels, alternative text and reduced-motion handling.
- Updated page metadata.
- Replaced the starter README with a project-specific guide.
- Created this implementation record.

## 18. Next recommended information to collect

Before the next build stage, collect:

1. Official business name and preferred spelling/capitalisation
2. Logo or preferred logo direction
3. City, address and service area
4. Phone, email and WhatsApp details
5. Complete list of printing services and specialities
6. Target customers: individuals, businesses, agencies, events or mixed
7. Actual project/product photographs
8. Preferred quote-request process
9. Required pages
10. Domain name and launch audience

These inputs will determine the final information architecture and prevent speculative features from becoming permanent.
