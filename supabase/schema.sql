create extension if not exists pgcrypto;

create type public.report_modality as enum ('ct', 'ultrasound');
create type public.report_status as enum (
  'uploaded',
  'processing',
  'analyzed',
  'needs_ocr_configuration',
  'failed'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  modality public.report_modality not null,
  source_filename text not null,
  storage_path text not null,
  report_date date,
  raw_text text,
  status public.report_status not null default 'uploaded',
  encryption_key_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reports_storage_path_unique unique (storage_path)
);

create table public.report_analysis (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  analysis_json jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint report_analysis_one_per_report unique (report_id)
);

create table public.report_findings (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  comparison_key text not null,
  body_region text,
  measurement_value numeric,
  measurement_unit text,
  finding_date date not null default current_date,
  created_at timestamptz not null default now()
);

create table public.report_comparisons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  baseline_report_id uuid not null references public.reports(id) on delete cascade,
  followup_report_id uuid not null references public.reports(id) on delete cascade,
  comparison_json jsonb not null,
  created_at timestamptz not null default now()
);

create index reports_user_created_idx on public.reports(user_id, created_at desc);
create index report_findings_user_key_date_idx on public.report_findings(user_id, comparison_key, finding_date);
create index report_analysis_user_report_idx on public.report_analysis(user_id, report_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger reports_set_updated_at
before update on public.reports
for each row execute function public.set_updated_at();

create trigger report_analysis_set_updated_at
before update on public.report_analysis
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.reports enable row level security;
alter table public.report_analysis enable row level security;
alter table public.report_findings enable row level security;
alter table public.report_comparisons enable row level security;

create policy "Users read own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users read own reports"
on public.reports for select
using (auth.uid() = user_id);

create policy "Users insert own reports"
on public.reports for insert
with check (auth.uid() = user_id);

create policy "Users update own reports"
on public.reports for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users read own analysis"
on public.report_analysis for select
using (auth.uid() = user_id);

create policy "Users insert own analysis"
on public.report_analysis for insert
with check (auth.uid() = user_id);

create policy "Users read own findings"
on public.report_findings for select
using (auth.uid() = user_id);

create policy "Users insert own findings"
on public.report_findings for insert
with check (auth.uid() = user_id);

create policy "Users read own comparisons"
on public.report_comparisons for select
using (auth.uid() = user_id);

create policy "Users insert own comparisons"
on public.report_comparisons for insert
with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'reports',
  'reports',
  false,
  15728640,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Users can read own stored reports"
on storage.objects for select
using (
  bucket_id = 'reports'
  and owner = auth.uid()
);

create policy "Users can upload own report files"
on storage.objects for insert
with check (
  bucket_id = 'reports'
  and owner = auth.uid()
  and (storage.foldername(name))[1] = auth.uid()::text
);
