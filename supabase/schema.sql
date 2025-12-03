-- ============================
-- LIUIFY PLANNING TOOL MVP
-- Production-Grade Supabase Schema
-- ============================

-- ============================
-- ENUMS
-- ============================
create type shift_status as enum ('open', 'assigned', 'completed', 'cancelled');
create type assignment_status as enum ('offered', 'accepted', 'declined', 'expired');

-- ============================
-- GUARDS
-- ============================
create table guards (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  email text unique,
  created_at timestamp with time zone default now()
);

-- INDEXES
create index guards_full_name_idx on guards (full_name);

-- ============================
-- CLIENTS
-- ============================
create table clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamp with time zone default now()
);

-- ============================
-- LOCATIONS
-- ============================
create table locations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  name text not null,
  address text,
  created_at timestamp with time zone default now()
);

create index locations_client_idx on locations (client_id);

-- ============================
-- SHIFTS
-- ============================
create table shifts (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references locations(id) on delete cascade,
  starts_at timestamp with time zone not null,
  ends_at timestamp with time zone not null,
  status shift_status default 'open',
  created_at timestamp with time zone default now()
);

create index shifts_location_idx on shifts (location_id);
create index shifts_status_idx on shifts (status);

-- ============================
-- GUARD AVAILABILITY
-- ============================
create table guard_availability (
  id uuid primary key default gen_random_uuid(),
  guard_id uuid references guards(id) on delete cascade,
  available_from timestamp with time zone not null,
  available_to timestamp with time zone not null,
  created_at timestamp with time zone default now()
);

create index guard_availability_guard_idx on guard_availability (guard_id);

-- ============================
-- ASSIGNMENTS (shift → guard)
-- ============================
create table assignments (
  id uuid primary key default gen_random_uuid(),
  shift_id uuid references shifts(id) on delete cascade,
  guard_id uuid references guards(id) on delete cascade,
  status assignment_status default 'offered',
  offered_at timestamp with time zone default now(),
  accepted_at timestamp with time zone,
  declined_at timestamp with time zone,
  expired_at timestamp with time zone,
  offer_token text unique,
  created_at timestamp with time zone default now()
);

create index assignments_shift_idx on assignments (shift_id);
create index assignments_guard_idx on assignments (guard_id);
create index assignments_status_idx on assignments (status);

-- ============================
-- SEED DATA (Optional)
-- ============================
insert into clients (name) values 
  ('Acme Security'), ('Prime Guard Co');

insert into locations (client_id, name, address) values 
  ((select id from clients limit 1), 'Mall Security', 'Central Mall, Main Road'),
  ((select id from clients limit 1), 'Construction Site', 'Block 22 Industrial Zone');

insert into guards (full_name, phone, email) values
  ('John Doe', '+123456789', 'guard1@test.com'),
  ('Samuel Stone', '+123456799', 'guard2@test.com'),
  ('Lucas Rivera', '+123456700', 'guard3@test.com');

insert into shifts (location_id, starts_at, ends_at) values
  ((select id from locations limit 1),
    now() + interval '1 day',
    now() + interval '1 day 8 hours'),
  ((select id from locations limit 1 offset 1),
    now() + interval '2 days',
    now() + interval '2 days 8 hours');

insert into guard_availability (guard_id, available_from, available_to) values
  ((select id from guards limit 1), now(), now() + interval '7 days'),
  ((select id from guards limit 1 offset 1), now(), now() + interval '7 days');

-- ============================
-- RLS POLICIES - Enable Row Level Security
-- ============================
alter table guards enable row level security;
alter table clients enable row level security;
alter table locations enable row level security;
alter table shifts enable row level security;
alter table guard_availability enable row level security;
alter table assignments enable row level security;

-- ============================
-- RLS POLICIES - Read Access (MVP-safe for all authenticated users)
-- ============================
create policy "allow read" on guards for select using (true);
create policy "allow read" on clients for select using (true);
create policy "allow read" on locations for select using (true);
create policy "allow read" on shifts for select using (true);
create policy "allow read" on guard_availability for select using (true);
create policy "allow read" on assignments for select using (true);

-- ============================
-- RLS POLICIES - Write Access (MVP-safe for authenticated users)
-- ============================
create policy "allow insert" on assignments for insert with check (true);
create policy "allow insert" on guard_availability for insert with check (true);

-- ============================
-- END OF SCHEMA
-- ============================
