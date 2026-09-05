# TruePrint Website

The homepage includes a functional white sourcing-request form in the “Beyond the catalogue” section. It accepts visitor contact details, organization, request description and an optional reference photo.

This repository contains the complete TruePrint marketing website, category catalogue pages, contact experience, and Supabase/PostgreSQL form backend.

## Included

- Responsive homepage, Contact page, and eight product-category pages
- Shared navigation, footer, search, galleries, video showcase, catalogue cards, and responsive animations
- SEO metadata, structured data, `robots.txt`, and `sitemap.xml`
- Four server-side form workflows:
  - Two-step homepage project intake
  - Contact Us enquiry
  - Category-specific catalogue PDF access
  - Homepage special-sourcing request with optional photo upload
- Supabase/PostgreSQL configuration and server-only REST helpers
- Twelve ready-to-run SQL files, including one catalogue lead table for each category, a dedicated sourcing table and a private upload bucket
- Cloudflare Turnstile on every lead-capture form, with mandatory server-side token verification
- Environment-variable template in `.env.example`

## Technology

- TypeScript, React, and Next-compatible Vinext routing
- Vite and Cloudflare Workers-compatible build configuration
- Supabase PostgreSQL and private Supabase Storage
- CSS-based responsive layout and animation system

## Requirements

- Node.js 22.13 or newer
- npm
- A Supabase project for live form persistence
- A Cloudflare Turnstile widget for production bot protection

## Local setup

1. Copy the environment template:

   ```bash
   cp .env.example .env.local
   ```

2. Add your Supabase project URL, service-role key and Cloudflare Turnstile keys to `.env.local`. Keep both secret keys server-side only.

3. Run the SQL files in `supabase/sql/` in numerical order. Full database instructions are in `supabase/README.md`.

4. Install dependencies and start the development server:

   ```bash
   npm install
   npm run dev
   ```

5. Create a production build when ready:

   ```bash
   npm run build
   ```

## Form behaviour

- Homepage Step 1 is stored before Step 2 opens.
- Step 2 securely completes the same database row using a one-time continuation token.
- Contact enquiries are written to their own table.
- Each catalogue category writes to its own table before the configured Google Drive PDF opens.
- Optional homepage reference files are stored in a private Supabase Storage bucket.
- Special sourcing submissions write to their own `source_requests` table and store uploaded photos under `source-requests/`.
- Every public lead form must pass Cloudflare Turnstile before the server writes to Supabase.
- Database credentials are never sent to the browser.

## Important directories

- `app/` — pages, components, API routes, metadata, and styles
- `public/` — website images and static assets
- `lib/server/` — validation, Supabase configuration, REST access, and category routing
- `lib/server/turnstile.ts` — server-side Cloudflare Turnstile verification
- `supabase/sql/` — separate PostgreSQL setup files
- `supabase/README.md` — complete database setup and security notes
- `tests/` — rendered-site checks

## Hosting

The project includes Cloudflare-compatible Sites configuration, but it can be hosted on another Node-compatible platform. Configure the values from `.env.example` in the host's environment before building. The public Turnstile site key must be available during the client build; the Supabase service-role key and Turnstile secret must remain server-only. Do not commit a real `.env` file or any secret key.
# Local handoff status

Backend form routes and Turnstile verification are implemented locally. Credentials and actual database connectivity remain unset/unverified. Uploads are limited to 8 MiB (JPEG, PNG, WebP, GIF, HEIC, HEIF; project intake also permits PDF).

The data adapter currently targets Supabase REST and private Storage. Choosing Hostinger for web hosting does not automatically replace that database adapter. Confirm the hosting plan supports the application runtime; a static-only deployment cannot execute the API routes. No Hostinger deployment has been tested. Run the SQL setup, configure server secrets and the public Turnstile key, then test all forms against your real services before launch.
