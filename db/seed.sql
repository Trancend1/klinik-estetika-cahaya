-- ============================================================
-- Seed Data — Klinik Estetika Cahaya (testing)
-- ============================================================
-- Jalankan SETELAH migration 001_initial_schema.sql

-- Admin user (password: admin123)
insert into users (email, password_hash, nama, role) values
  ('admin@klinikcahaya.id', '$2b$10$AdwAnxWtSdhxBfa42PUFNuZi5CAb1EEY0DhH/lq.rYn2aBstOcbr6', 'Admin Klinik', 'admin'),
  ('dr.nadia@klinikcahaya.id', '$2b$10$AdwAnxWtSdhxBfa42PUFNuZi5CAb1EEY0DhH/lq.rYn2aBstOcbr6', 'dr. Nadia Kirana', 'dokter');

-- Patients dummy
insert into patients (nama, nomor_wa, tanggal_lahir, jenis_kulit, alergi, status_followup, catatan_umum) values
  ('Dewi Rahayu', '628111111001', '1995-03-15', 'berminyak', null, 'aktif', 'Pasien setia, rutin kontrol tiap bulan'),
  ('Sinta Wulandari', '628111111002', '1988-07-22', 'sensitif', 'Benzoyl peroxide', 'kontrol_dijadwalkan', null),
  ('Rina Marlina', '628111111003', '2000-11-08', 'kombinasi', null, 'kunjungan_pertama', 'Pertama kali datang untuk konsultasi acne'),
  ('Putri Handayani', '628111111004', '1992-05-30', 'kering', null, 'perlu_diingatkan', null),
  ('Anisa Fitriani', '628111111005', '1997-09-12', 'normal', null, 'tidak_aktif', 'Sudah 6 bulan tidak datang');

-- Set tanggal pengingat untuk pasien yang perlu dihubungi
update patients set tanggal_pengingat = current_date
  where nama = 'Putri Handayani';

-- Booking requests dummy
insert into booking_requests (nama, nomor_wa, tanggal_preferensi, keluhan, status) values
  ('Maulida Safitri', '628222222001', current_date + 1, 'Bekas jerawat di pipi', 'baru'),
  ('Yuni Astuti', '628222222002', current_date + 2, 'Konsultasi kulit sensitif', 'baru'),
  ('Citra Permata', '628222222003', current_date - 1, 'Peeling wajah', 'dikonfirmasi');

-- Treatment seed (menggunakan user dokter yang sudah ada)
insert into treatments (patient_id, tanggal, jenis_treatment, catatan_dokter, produk_diresepkan, created_by)
select
  p.id,
  current_date - 30,
  'Facial Medis',
  'Kulit membaik setelah seri pertama. Lanjutkan dengan chemical peeling ringan bulan depan.',
  'Retinol 0.025%, SPF 50+ pagi hari',
  u.id
from patients p, users u
where p.nama = 'Dewi Rahayu' and u.email = 'dr.nadia@klinikcahaya.id';
