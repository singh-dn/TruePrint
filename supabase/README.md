# TruePrint Supabase setup

This directory contains the ready-to-run PostgreSQL setup for every lead-capture form on the TruePrint website. Credentials remain environment-based so the same project can be hosted with any provider that supports the application runtime.

## Form-to-table mapping

| Site form | API endpoint | PostgreSQL table | SQL file |
| --- | --- | --- | --- |
| Homepage project intake | `/api/forms/project-intake` | `homepage_project_intakes` | `sql/001_homepage_project_intakes.sql` |
| Contact Us enquiry | `/api/forms/contact-enquiry` | `contact_enquiries` | `sql/002_contact_enquiries.sql` |
| Homepage special sourcing | `/api/forms/source-request` | `source_requests` | `sql/012_source_requests.sql` |
| Diaries catalogue gate | `/api/forms/catalogue-download` | `diary_catalogue_downloads` | `sql/003_diary_catalogue_downloads.sql` |
| Visiting Cards catalogue gate | `/api/forms/catalogue-download` | `visiting_cards_catalogue_downloads` | `sql/004_visiting_cards_catalogue_downloads.sql` |
| Pens catalogue gate | `/api/forms/catalogue-download` | `pens_catalogue_downloads` | `sql/005_pens_catalogue_downloads.sql` |
| Joining Kits catalogue gate | `/api/forms/catalogue-download` | `joining_kits_catalogue_downloads` | `sql/006_joining_kits_catalogue_downloads.sql` |
| Tech Products catalogue gate | `/api/forms/catalogue-download` | `tech_products_catalogue_downloads` | `sql/007_tech_products_catalogue_downloads.sql` |
| Bags catalogue gate | `/api/forms/catalogue-download` | `bags_catalogue_downloads` | `sql/008_bags_catalogue_downloads.sql` |
| Drinkware catalogue gate | `/api/forms/catalogue-download` | `drinkware_catalogue_downloads` | `sql/009_drinkware_catalogue_downloads.sql` |
| T-Shirts catalogue gate | `/api/forms/catalogue-download` | `t_shirts_catalogue_downloads` | `sql/010_t_shirts_catalogue_downloads.sql` |

Optional homepage reference files are stored in the private `trueprint-requirement-files` Supabase Storage bucket created by `sql/011_requirement_file_bucket.sql`. Project-intake uploads use `project-intakes/`; sourcing photos use `source-requests/`. Only metadata and private object paths are stored in PostgreSQL.

## Setup order

1. Create or open your Supabase project.
2. Open the Supabase SQL Editor.
3. Run the SQL files in numerical order from `001` through `012`.
4. Add the values listed in `.env.example` to the hosting provider's server environment.
5. Build and start the website using the commands in the root `README.md`.

## Required server settings

- `SUPABASE_URL`: the project URL shown in Supabase project settings.
- `SUPABASE_SERVICE_ROLE_KEY`: the server-only service role key. Never expose it through a `NEXT_PUBLIC_` variable.
- `SUPABASE_STORAGE_BUCKET`: optional override for the private upload bucket name.
- `SUPABASE_MAX_UPLOAD_BYTES`: optional upload limit, with an 8 MB default and 25 MB hard maximum.

## Submission behaviour

- Homepage Step 1 is saved immediately as an incomplete lead before Step 2 opens.
- Step 2 uses a one-time continuation token to complete the same database row without creating a duplicate.
- Visitors who leave during Step 2 remain available as incomplete leads.
- Contact enquiries are saved only after server-side validation succeeds.
- Special sourcing requests are saved to `source_requests`, not appended to contact-enquiry text.
- Every catalogue form is routed through a fixed category allowlist to its category-specific table.
- A catalogue PDF opens only after its database record is successfully saved.

## Security model

- All tables have Row Level Security enabled.
- Browser roles receive no direct table access.
- Website forms submit through same-origin server endpoints.
- Server-side validation runs before every insert or update.
- The service role key is read only from the server runtime.
- Reference uploads accept images and PDFs only and are stored in a private bucket.
- Failed database completion attempts trigger cleanup of any newly uploaded reference file.
- Cloudflare Turnstile tokens are verified by the server before any database write or sourcing-file upload.
- Turnstile action and hostname values must match the expected form and configured domain.
- The browser cannot select an arbitrary database table; category-to-table routing is server-controlled.

The existing Cloudflare D1 and R2 bindings remain disabled. Supabase is accessed from the server through its HTTPS APIs, which is compatible with Cloudflare Workers and standard Node-compatible hosting platforms.

## Cloudflare Turnstile settings

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: public widget site key; provide it during the client build.
- `TURNSTILE_SECRET_KEY`: server-only secret used with Cloudflare Siteverify.
- `TURNSTILE_ALLOWED_HOSTNAMES`: optional comma-separated production hostname allowlist. When omitted, the request hostname is required.

Turnstile tokens are single-use and expire quickly. The server verifies the token, expected action and hostname before accepting a submission. Use production keys for the live website; Cloudflare test keys are suitable only for local testing.
