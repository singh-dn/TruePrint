# TruePrint admin setup

The dashboard is at `/admin`. It connects to the existing 11 form-data tables through server-side Supabase HTTPS requests. Existing public forms, Turnstile, schemas and website design are unchanged.

## Create your pre-defined login

In your Supabase dashboard, open **Authentication → Users → Add user → Create new user**. Enter the admin email and a strong password, confirm the email, and copy the new user's UUID. There is no public signup and no password embedded in the website.

Alternatively, on your own computer with server credentials in your ignored `.env.local`, run:

```sh
node --env-file=.env.local scripts/create-admin.mjs
```

This asks for your email, creates a new Auth account with a random password, and displays that password once in your local terminal. Save it privately. It does not reset existing accounts. Never commit credentials or terminal output.

## Configure Hostinger

Keep the existing `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and storage settings. Add these server-only values:

```dotenv
TRUEPRINT_ADMIN_USER_IDS=your-supabase-auth-user-uuid
TRUEPRINT_ADMIN_DEMO=false
```

Multiple admin UUIDs may be separated with commas. Apply/redeploy the environment changes. Never use NEXT_PUBLIC_ for these settings. Remove an ID and redeploy to revoke that admin's access. Supabase email/password sign-in must be enabled. Use Supabase for account/password recovery. If Supabase Auth CAPTCHA is enabled, it needs a separate integration before using this login; the existing form Turnstile is not an Auth CAPTCHA token.

**The review site has no Supabase credentials or real admin account configured.** Its sample dashboard is isolated fictional data, with no database writes. Live connection and sign-in verification remain pending until private environment configuration is supplied. Do not paste the service-role key or your password into chat.

## What is included

- All 11 mapped form tables: project intakes, contact enquiries, sourcing requests and eight separate catalogue-download tables.
- Table counts, search, status and UTC-date filters, sorting, pagination, column visibility, all saved fields and private attachment download.
- Status updates with concurrency checks. Incomplete intakes cannot be marked complete or given consent by the admin.
- Real `.xlsx` exports for selected current-page rows, every filtered row across pages, or all tables as separate worksheets. All allowed columns are exported, even hidden ones.
- Local rule-based lead briefs, missing-information suggestions, editable reply drafts and plain-language filters. No external AI model is used and no messages are automatically sent. Duplicate hints cover only the current page.

Tables are explicitly mapped in `lib/admin/schema.ts`. New database tables/columns added elsewhere need an explicit mapping. Auth tables, service keys and `completion_token_hash` are never exposed. Existing row-level security stays intact; the server verifies an approved admin before using the service-role key.

## Export and security boundaries

Exports are capped at 50,000 rows; split larger datasets with date filters. All-table export ignores filters and fails if a table is unavailable. Records arriving after export begins are excluded. Count changes or duplicate IDs abort for retry, but this is not a transactional database snapshot. Untrusted strings are written as text cells, never formulas. Workbooks are generated in the browser only when requested.

Sessions use HttpOnly, SameSite=Strict cookies, Secure on HTTPS, with no browser refresh token. Sign-in is required again within one hour or sooner if the provider token expires. Sign-out clears the cookie and calls Supabase logout. A previously copied access token can remain valid until its provider expiry. Server-side authorization is enforced on every data endpoint, independent of the UI. Admin pages are excluded from indexing and framing; no customer records are stored in localStorage. No delete, bulk-message or schema-changing controls are included.

## Verify before production use

1. Sign in at `/admin` with the assigned account after configuring its UUID.
2. Compare all table counts with Supabase; unavailable tables must be resolved before all-table export.
3. Find a known row using search/date/status filters and inspect its full details.
4. Change a suitable record's status and confirm it persists after refresh.
5. Download a known attachment and export a filtered table; compare the row counts.
6. Sign out and verify an incognito request to `/api/admin/records?table=contact_enquiries` returns 401.

Run `npm run test:admin` for a build and focused admin tests. Tests use mocked provider responses and fictional rows, not a live Supabase connection. The existing checkout has three unrelated Cloudflare TypeScript diagnostics and two legacy SEO test failures; the affected files are unchanged by this work.
