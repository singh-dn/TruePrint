-- Homepage special-sourcing request form with an optional reference image.
-- Run after creating the private Storage bucket in 011_requirement_file_bucket.sql.

create table if not exists public.source_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 254 and email = lower(email)),
  phone text not null check (char_length(phone) between 8 and 30),
  organization text not null check (char_length(organization) between 2 and 180),
  requirement text not null check (char_length(requirement) between 10 and 2400),
  reference_file_path text,
  reference_file_name text,
  reference_file_type text,
  reference_file_size bigint check (reference_file_size is null or reference_file_size >= 0),
  source_page text not null default '/',
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'sourced', 'contacted', 'closed', 'spam')),
  submitted_at timestamptz not null default now()
);

create index if not exists source_requests_submitted_at_idx
  on public.source_requests (submitted_at desc);

create index if not exists source_requests_status_idx
  on public.source_requests (status, submitted_at desc);

create index if not exists source_requests_email_idx
  on public.source_requests (lower(email));

alter table public.source_requests enable row level security;
revoke all on table public.source_requests from anon, authenticated;
grant select, insert, update, delete on table public.source_requests to service_role;

comment on table public.source_requests is
  'Special sourcing requests submitted through the TruePrint homepage.';
