-- Contact Us page enquiry form.
-- Run this file in the Supabase SQL Editor for the target project.

create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 254 and email = lower(email)),
  phone text not null check (char_length(phone) between 8 and 30),
  organization text check (organization is null or char_length(organization) <= 180),
  requirement text not null check (char_length(requirement) between 10 and 3000),
  source_page text not null default '/contact',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed', 'spam')),
  submitted_at timestamptz not null default now()
);

create index if not exists contact_enquiries_submitted_at_idx
  on public.contact_enquiries (submitted_at desc);

create index if not exists contact_enquiries_status_idx
  on public.contact_enquiries (status, submitted_at desc);

create index if not exists contact_enquiries_email_idx
  on public.contact_enquiries (lower(email));

alter table public.contact_enquiries enable row level security;
revoke all on table public.contact_enquiries from anon, authenticated;
grant select, insert, update, delete on table public.contact_enquiries to service_role;

comment on table public.contact_enquiries is
  'Leads submitted through the TruePrint Contact Us page.';
