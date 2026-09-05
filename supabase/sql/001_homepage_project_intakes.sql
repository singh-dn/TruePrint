-- Homepage two-step project intake form.
-- Step 1 creates an incomplete lead. Step 2 securely completes the same row.
-- Run this file in the Supabase SQL Editor for the target project.

create table if not exists public.homepage_project_intakes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 254 and email = lower(email)),
  phone text not null check (char_length(phone) between 8 and 30),
  requirement text not null check (char_length(requirement) between 10 and 3000),
  estimated_quantity integer check (estimated_quantity is null or estimated_quantity > 0),
  organization text check (organization is null or char_length(organization) <= 180),
  reference_file_path text,
  reference_file_name text,
  reference_file_type text,
  reference_file_size bigint check (reference_file_size is null or reference_file_size >= 0),
  consent boolean not null default false,
  completion_status text not null default 'incomplete'
    check (completion_status in ('incomplete', 'complete')),
  completion_token_hash text unique
    check (completion_token_hash is null or char_length(completion_token_hash) = 64),
  source_page text not null default '/',
  status text not null default 'incomplete'
    check (status in ('incomplete', 'new', 'contacted', 'qualified', 'closed', 'spam')),
  step_one_submitted_at timestamptz not null default now(),
  completed_at timestamptz,
  submitted_at timestamptz not null default now(),
  constraint homepage_project_intakes_completion_check check (
    (completion_status = 'incomplete' and completion_token_hash is not null)
    or
    (completion_status = 'complete' and completion_token_hash is null and estimated_quantity is not null and consent = true)
  )
);

create index if not exists homepage_project_intakes_submitted_at_idx
  on public.homepage_project_intakes (submitted_at desc);

create index if not exists homepage_project_intakes_completion_idx
  on public.homepage_project_intakes (completion_status, submitted_at desc);

create index if not exists homepage_project_intakes_status_idx
  on public.homepage_project_intakes (status, submitted_at desc);

create index if not exists homepage_project_intakes_email_idx
  on public.homepage_project_intakes (lower(email));

alter table public.homepage_project_intakes enable row level security;
revoke all on table public.homepage_project_intakes from anon, authenticated;
grant select, insert, update, delete on table public.homepage_project_intakes to service_role;

comment on table public.homepage_project_intakes is
  'Two-step homepage leads. Incomplete rows preserve visitors who leave before Step 2.';
