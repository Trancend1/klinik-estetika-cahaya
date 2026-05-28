-- ============================================================
-- Klinik Estetika Cahaya — Initial Schema
-- ============================================================

-- Enums
create type jenis_kulit as enum ('normal', 'berminyak', 'kombinasi', 'sensitif', 'kering');
create type status_followup as enum ('kunjungan_pertama', 'kontrol_dijadwalkan', 'perlu_diingatkan', 'aktif', 'tidak_aktif');
create type status_booking as enum ('baru', 'dikonfirmasi', 'dijadwalkan_ulang', 'selesai', 'batal');

-- ============================================================
-- Tabel: patients
-- ============================================================
create table patients (
  id                uuid primary key default gen_random_uuid(),
  nama              text not null,
  nomor_wa          text not null,
  tanggal_lahir     date,
  jenis_kulit       jenis_kulit,
  alergi            text,
  status_followup   status_followup not null default 'kunjungan_pertama',
  tanggal_pengingat date,
  catatan_umum      text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger patients_updated_at
  before update on patients
  for each row execute function update_updated_at();

-- ============================================================
-- Tabel: treatments
-- ============================================================
create table treatments (
  id                  uuid primary key default gen_random_uuid(),
  patient_id          uuid not null references patients(id) on delete cascade,
  tanggal             date not null,
  jenis_treatment     text not null,
  catatan_dokter      text,
  produk_diresepkan   text,
  created_by          uuid not null references auth.users(id),
  created_at          timestamptz not null default now()
);

-- ============================================================
-- Tabel: booking_requests
-- ============================================================
create table booking_requests (
  id                  uuid primary key default gen_random_uuid(),
  nama                text not null,
  nomor_wa            text not null,
  tanggal_preferensi  date not null,
  keluhan             text,
  status              status_booking not null default 'baru',
  linked_patient_id   uuid references patients(id) on delete set null,
  created_at          timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table patients enable row level security;
alter table treatments enable row level security;
alter table booking_requests enable row level security;

-- Hanya authenticated users bisa akses semua tabel
create policy "Authenticated can read patients"
  on patients for select
  to authenticated
  using (true);

create policy "Authenticated can insert patients"
  on patients for insert
  to authenticated
  with check (true);

create policy "Authenticated can update patients"
  on patients for update
  to authenticated
  using (true);

create policy "Authenticated can read treatments"
  on treatments for select
  to authenticated
  using (true);

create policy "Authenticated can insert treatments"
  on treatments for insert
  to authenticated
  with check (auth.uid() = created_by);

create policy "Authenticated can update treatments"
  on treatments for update
  to authenticated
  using (true);

create policy "Authenticated can read bookings"
  on booking_requests for select
  to authenticated
  using (true);

create policy "Authenticated can update bookings"
  on booking_requests for update
  to authenticated
  using (true);

-- Booking dari website publik bisa insert (anon) — form booking
create policy "Anon can insert booking"
  on booking_requests for insert
  to anon
  with check (true);

-- ============================================================
-- Indexes
-- ============================================================
create index idx_patients_status on patients(status_followup);
create index idx_patients_pengingat on patients(tanggal_pengingat) where tanggal_pengingat is not null;
create index idx_treatments_patient on treatments(patient_id);
create index idx_bookings_status on booking_requests(status);
