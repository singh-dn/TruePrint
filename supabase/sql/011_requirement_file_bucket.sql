-- Private file bucket for optional homepage project references.
-- Run after creating the form tables.

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'trueprint-requirement-files',
  'trueprint-requirement-files',
  false,
  8388608,
  array[
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/heic',
    'image/heif'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- No public Storage policies are created. Uploads and cleanup are performed
-- only by the server using the Supabase service role key.
