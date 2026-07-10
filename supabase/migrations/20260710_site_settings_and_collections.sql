-- ============================================================
-- Migration: site_settings + collection_items
-- Run once in Supabase → SQL Editor
-- ============================================================


-- ── 1. site_settings ────────────────────────────────────────

create table if not exists public.site_settings (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute procedure public.set_updated_at();

-- Seed default hero image
insert into public.site_settings (key, value)
values ('hero_image', '/images/HeroNew.png')
on conflict (key) do nothing;

alter table public.site_settings enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'site_settings' and policyname = 'Public can read site_settings'
  ) then
    create policy "Public can read site_settings"
      on public.site_settings for select using (true);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'site_settings' and policyname = 'Admins can upsert site_settings'
  ) then
    create policy "Admins can upsert site_settings"
      on public.site_settings for all
      using (
        exists (
          select 1 from public.profiles
          where profiles.id = auth.uid()
            and profiles.is_admin = true
        )
      );
  end if;
end $$;


-- ── 2. collection_items ──────────────────────────────────────

create table if not exists public.collection_items (
  id         integer primary key,          -- fixed 1-6, matches DEFAULT_CATEGORIES
  name       text    not null,
  src        text    not null,             -- image URL (Supabase storage or local path)
  href       text    not null,             -- link target
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

drop trigger if exists collection_items_set_updated_at on public.collection_items;
create trigger collection_items_set_updated_at
  before update on public.collection_items
  for each row execute procedure public.set_updated_at();

-- Seed the 6 default collection cards
insert into public.collection_items (id, name, src, href, sort_order) values
  (1, 'Ring Boxes',     '/images/collection_ring.png',     '/products?category=ring-boxes',     1),
  (2, 'Earring Boxes',  '/images/collection_earring.png',  '/products?category=earring-boxes',  2),
  (3, 'Necklace Boxes', '/images/collection_necklace.png', '/products?category=necklace-boxes', 3),
  (4, 'Drawer Boxes',   '/images/collection_drawer.png',   '/products?category=drawer-boxes',   4),
  (5, 'Magnetic Boxes', '/images/collection_magnetic.png', '/products?category=magnetic-boxes', 5),
  (6, 'Paper Bags',     '/images/collection_bag.png',      '/products?category=paper-bags',     6)
on conflict (id) do nothing;

alter table public.collection_items enable row level security;

create policy "Public can read collection_items"
  on public.collection_items for select
  using (true);

create policy "Admins can upsert collection_items"
  on public.collection_items for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.is_admin = true
    )
  );
