-- Tech Products catalogue access records.
-- Run this file in the Supabase SQL Editor for the target project.

create table if not exists public.tech_products_catalogue_downloads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 254 and email = lower(email)),
  phone text not null check (char_length(phone) between 8 and 30),
  category_key text not null default 'tech-products' check (category_key = 'tech-products'),
  catalogue_slot text not null check (char_length(catalogue_slot) between 1 and 120),
  catalogue_title text not null check (char_length(catalogue_title) between 1 and 180),
  catalogue_url text not null check (char_length(catalogue_url) between 8 and 1000),
  source_page text not null default '/categories/tech-products',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed', 'spam')),
  accessed_at timestamptz not null default now()
);

create index if not exists tech_products_catalogue_downloads_accessed_at_idx
  on public.tech_products_catalogue_downloads (accessed_at desc);

create index if not exists tech_products_catalogue_downloads_status_idx
  on public.tech_products_catalogue_downloads (status, accessed_at desc);

create index if not exists tech_products_catalogue_downloads_email_idx
  on public.tech_products_catalogue_downloads (lower(email));

create index if not exists tech_products_catalogue_downloads_catalogue_idx
  on public.tech_products_catalogue_downloads (catalogue_slot, accessed_at desc);

alter table public.tech_products_catalogue_downloads enable row level security;
revoke all on table public.tech_products_catalogue_downloads from anon, authenticated;
grant select, insert, update, delete on table public.tech_products_catalogue_downloads to service_role;

comment on table public.tech_products_catalogue_downloads is
  'Tech Products catalogue access records captured before the PDF viewer opens.';
