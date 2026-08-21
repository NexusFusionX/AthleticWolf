-- Run once in Supabase SQL Editor.
-- Public form inserts leads; only service role (admin API) reads them.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  mobile text not null,
  email text not null,
  fitness_status text not null,
  hardest_part text not null,
  work text not null,
  income_range text not null,
  open_to_invest text not null,
  instagram text not null,
  raw_json jsonb not null default '{}'::jsonb
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

drop policy if exists "Anyone can submit a lead" on public.leads;
create policy "Anyone can submit a lead"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- No public SELECT policy: reads go through service role (admin API).
