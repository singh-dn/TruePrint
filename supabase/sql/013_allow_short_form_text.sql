-- Apply after 001–012, including on existing databases.
-- Accept any nonblank text; retain upper limits and all other validation.
begin;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'homepage_project_intakes', 'contact_enquiries', 'source_requests',
    'diary_catalogue_downloads', 'visiting_cards_catalogue_downloads',
    'pens_catalogue_downloads', 'joining_kits_catalogue_downloads',
    'tech_products_catalogue_downloads', 'bags_catalogue_downloads',
    'drinkware_catalogue_downloads', 't_shirts_catalogue_downloads'
  ] loop
    execute format('alter table public.%I drop constraint %I', table_name, table_name || '_name_check');
    execute format('alter table public.%I add constraint %I check (char_length(btrim(name)) > 0 and char_length(name) <= 120)', table_name, table_name || '_name_check');
  end loop;
end $$;

alter table public.homepage_project_intakes
  drop constraint homepage_project_intakes_requirement_check,
  add constraint homepage_project_intakes_requirement_check
    check (char_length(btrim(requirement)) > 0 and char_length(requirement) <= 3000);

alter table public.contact_enquiries
  drop constraint contact_enquiries_requirement_check,
  add constraint contact_enquiries_requirement_check
    check (char_length(btrim(requirement)) > 0 and char_length(requirement) <= 3000);

alter table public.source_requests
  drop constraint source_requests_requirement_check,
  add constraint source_requests_requirement_check
    check (char_length(btrim(requirement)) > 0 and char_length(requirement) <= 2400),
  drop constraint source_requests_organization_check,
  add constraint source_requests_organization_check
    check (char_length(btrim(organization)) > 0 and char_length(organization) <= 180);

commit;
