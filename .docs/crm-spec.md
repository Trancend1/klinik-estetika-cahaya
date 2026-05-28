# CRM Spec — Klinik Estetika Cahaya

> File ini adalah **spesifikasi teknis fitur CRM**. Data model, security, alur kerja, dan prinsip UX untuk admin non-teknis semuanya ada di sini. Baca file ini sebelum mulai membangun bagian CRM. Ini file tambahan yang tidak ada di project company profile biasa karena project ini menyimpan data pasien.

---

## 1. Prinsip Dasar CRM

### Filosofi: "CRM untuk admin yang bukan orang IT"

Setiap keputusan desain CRM diuji dengan satu pertanyaan: **"Bisakah Mbak Rina (admin) pakai ini tanpa baca manual?"** Jika jawabannya ragu, sederhanakan.

Implikasi konkret:
- Tidak ada jargon teknis di interface (pakai "Pasien Baru", bukan "Create Record")
- Tombol aksi besar dan jelas, bukan ikon ambigu
- Maksimal 2 klik untuk tugas paling sering (cari pasien, ubah status)
- Konfirmasi sebelum aksi destruktif (hapus, ubah masal)
- Bahasa Indonesia di semua label

### Scope: CRM operasional, BUKAN rekam medis legal

Ini perlu ditegaskan ke klien dan ditulis di disclaimer sistem:
- CRM ini untuk **manajemen operasional & follow-up**
- BUKAN Electronic Medical Record (EMR) tersertifikasi
- Untuk dokumen medis legal, klinik tetap pakai sistem resmi terpisah
- Catatan medis di CRM bersifat ringkasan operasional, bukan rekam medis hukum

---

## 2. User Roles & Akses

| Role | Siapa | Bisa Akses | Tidak Bisa |
|---|---|---|---|
| **Admin** | Mbak Rina | Semua data pasien, booking, status, export | Hapus permanen data pasien |
| **Dokter** | dr. Nadia | Semua data + tambah catatan medis | — |
| **Publik** | Pengunjung web | TIDAK ada akses CRM sama sekali | Semua data CRM |

### Aturan akses kritis
- Tidak ada satupun data pasien yang bisa diakses tanpa login
- Login pakai email + password (Supabase Auth)
- Row Level Security (RLS) Supabase **wajib aktif** di semua tabel
- Session timeout otomatis setelah 30 menit idle
- Tidak ada "registrasi publik" — akun dibuat manual oleh developer untuk admin & dokter

---

## 3. Data Model

### Tabel: `patients` (Pasien)

| Kolom | Tipe | Wajib | Catatan |
|---|---|---|---|
| `id` | UUID | ✅ | Primary key, auto-generate |
| `nama` | text | ✅ | Nama lengkap pasien |
| `nomor_wa` | text | ✅ | Format: 628xxx |
| `tanggal_lahir` | date | ❌ | Opsional |
| `jenis_kulit` | enum | ❌ | normal / berminyak / kombinasi / sensitif / kering |
| `alergi` | text | ❌ | Catatan alergi yang diketahui |
| `status_followup` | enum | ✅ | Lihat section 4, default: "kunjungan_pertama" |
| `tanggal_pengingat` | date | ❌ | Untuk fitur pengingat manual |
| `catatan_umum` | text | ❌ | Catatan bebas admin |
| `created_at` | timestamp | ✅ | Auto |
| `updated_at` | timestamp | ✅ | Auto |

### Tabel: `treatments` (Riwayat Treatment)

| Kolom | Tipe | Wajib | Catatan |
|---|---|---|---|
| `id` | UUID | ✅ | Primary key |
| `patient_id` | UUID | ✅ | Foreign key ke `patients` |
| `tanggal` | date | ✅ | Tanggal treatment |
| `jenis_treatment` | text | ✅ | Nama treatment yang dilakukan |
| `catatan_dokter` | text | ❌ | Ringkasan catatan (bukan rekam medis legal) |
| `produk_diresepkan` | text | ❌ | Produk skincare yang diresepkan |
| `created_by` | UUID | ✅ | User yang input (admin/dokter) |
| `created_at` | timestamp | ✅ | Auto |

### Tabel: `booking_requests` (Permintaan Booking dari Website)

| Kolom | Tipe | Wajib | Catatan |
|---|---|---|---|
| `id` | UUID | ✅ | Primary key |
| `nama` | text | ✅ | Nama pemohon |
| `nomor_wa` | text | ✅ | Kontak |
| `tanggal_preferensi` | date | ✅ | Tanggal yang diinginkan |
| `keluhan` | text | ❌ | Keluhan singkat |
| `status` | enum | ✅ | baru / dikonfirmasi / dijadwalkan_ulang / selesai / batal |
| `linked_patient_id` | UUID | ❌ | Jika sudah jadi pasien, link ke `patients` |
| `created_at` | timestamp | ✅ | Auto (waktu submit dari web) |

### Relasi
```
patients (1) ──< (many) treatments
booking_requests (1) ──> (0..1) patients  [linked saat booking jadi pasien]
```

---

## 4. Status Follow-up (State Machine)

Status pasien mengikuti alur ini:

```
kunjungan_pertama → kontrol_dijadwalkan → perlu_diingatkan → aktif
                                                                 ↓
                                                          tidak_aktif
```

| Status | Label UI | Arti | Warna badge |
|---|---|---|---|
| `kunjungan_pertama` | Kunjungan Pertama | Baru pertama datang | Biru |
| `kontrol_dijadwalkan` | Kontrol Dijadwalkan | Sudah ada jadwal kontrol berikutnya | Hijau |
| `perlu_diingatkan` | Perlu Diingatkan | Waktunya dihubungi untuk kontrol | Amber |
| `aktif` | Pasien Aktif | Rutin datang | Hijau tua |
| `tidak_aktif` | Tidak Aktif | Sudah lama tidak datang | Abu-abu |

Status bisa diubah manual oleh admin kapan saja (tidak dipaksa linear).

---

## 5. Fitur CRM (Functional Requirements)

### F1 — Manajemen Pasien
- **Lihat daftar pasien** — tabel dengan kolom: nama, nomor WA, status, treatment terakhir
- **Cari pasien** — search box by nama atau nomor WA (instant filter)
- **Tambah pasien baru** — form sederhana, hanya nama & WA yang wajib
- **Edit pasien** — ubah data kapan saja
- **Lihat detail pasien** — halaman detail dengan riwayat treatment lengkap

### F2 — Riwayat Treatment
- **Tambah treatment** — dari halaman detail pasien, form: tanggal, jenis, catatan, produk
- **Lihat riwayat** — list treatment terurut dari terbaru
- **Edit treatment** — koreksi jika salah input

### F3 — Status & Follow-up
- **Ubah status** — dropdown di tabel atau detail pasien
- **Filter by status** — lihat hanya pasien dengan status tertentu
- **Filter "perlu dihubungi"** — daftar pasien dengan `tanggal_pengingat` ≤ hari ini

### F4 — Pengingat Manual
- **Set pengingat** — admin set `tanggal_pengingat` per pasien (misal: "kontrol 1 bulan lagi")
- **Daftar pengingat hari ini** — widget di dashboard menampilkan siapa yang perlu dihubungi
- **Tandai sudah dihubungi** — clear pengingat setelah follow-up

### F5 — Booking Request
- **Antrian booking baru** — daftar booking dari website, status "baru" di-highlight
- **Konfirmasi booking** — ubah status, opsional kirim WA manual ke pasien
- **Jadwalkan ulang** — ubah tanggal jika slot tidak available
- **Convert ke pasien** — jika booking jadi pasien baru, buat record pasien

### F6 — Dashboard Ringkas
Widget angka di halaman utama CRM:
- Booking baru hari ini (belum dikonfirmasi)
- Pasien perlu dihubungi hari ini
- Total pasien aktif
- Treatment minggu ini

### F7 — Export Data
- **Export pasien ke CSV** — semua atau berdasarkan filter
- **Export treatment ke CSV** — untuk backup
- Tombol export jelas, hasil download langsung

---

## 6. Alur Kerja Utama (User Flows)

### Flow A — Pasien booking dari website
```
1. Pengunjung isi form booking di website
2. Data masuk ke tabel booking_requests (status: baru)
3. Admin lihat notifikasi "booking baru" di dashboard CRM
4. Admin cek slot, konfirmasi via WA manual ke pasien
5. Admin ubah status booking → dikonfirmasi
6. Saat pasien datang, admin convert booking → pasien baru
```

### Flow B — Admin catat treatment
```
1. Pasien datang & dilayani
2. Admin/dokter buka detail pasien (cari by nama/WA)
3. Klik "Tambah Treatment"
4. Isi: tanggal, jenis treatment, catatan, produk
5. Set pengingat kontrol berikutnya (opsional)
6. Update status follow-up jika perlu
```

### Flow C — Follow-up pasien
```
1. Admin buka dashboard pagi hari
2. Lihat widget "Perlu Dihubungi Hari Ini"
3. Hubungi pasien via WA
4. Tandai sudah dihubungi / reschedule pengingat
```

---

## 7. Keamanan & Privasi Data

Karena ini data pasien (sensitif), keamanan adalah fondasi:

### Wajib
- [ ] Supabase Row Level Security (RLS) aktif di semua tabel
- [ ] Hanya user terautentikasi yang bisa baca/tulis data
- [ ] Password di-hash (handled by Supabase Auth)
- [ ] Koneksi HTTPS only (enforced by Vercel)
- [ ] Environment variables untuk semua secret (tidak hardcode)
- [ ] API route CRM cek session sebelum return data

### Disarankan
- [ ] Session timeout 30 menit idle
- [ ] Audit: kolom `created_by` & `updated_at` untuk tracking
- [ ] Backup otomatis Supabase (built-in di free tier: 7 hari)
- [ ] Disclaimer di sistem: "CRM operasional, bukan rekam medis legal"

### Catatan privasi untuk klien
Sampaikan ke klien bahwa data pasien:
- Disimpan di server Supabase (cloud, terenkripsi)
- Hanya bisa diakses admin & dokter yang punya akun
- Bisa di-export & dihapus sesuai kebutuhan
- Bukan pengganti kewajiban rekam medis sesuai regulasi kesehatan

---

## 8. Prinsip UX untuk Admin Non-Teknis

### Do
- ✅ Label bahasa Indonesia, ramah ("Tambah Pasien Baru")
- ✅ Tombol primer besar dengan ikon + teks
- ✅ Konfirmasi visual setelah aksi ("Pasien berhasil disimpan")
- ✅ Search yang instant (tidak perlu klik "cari")
- ✅ Empty state yang menjelaskan ("Belum ada pasien. Klik tombol di atas untuk menambah.")
- ✅ Warna status yang konsisten & intuitif

### Don't
- ❌ Jargon teknis ("query", "record", "entity")
- ❌ Aksi destruktif tanpa konfirmasi
- ❌ Tabel dengan terlalu banyak kolom sekaligus
- ❌ Multi-step form yang panjang (pecah jadi sederhana)
- ❌ Ikon ambigu tanpa label

---

## 9. Tech Implementation Notes

| Aspek | Pilihan | Alasan |
|---|---|---|
| Database | Supabase (PostgreSQL) | Free tier cukup, Auth + RLS built-in, mudah |
| Auth | Supabase Auth (email/password) | Tidak perlu bangun sendiri, aman |
| CRM UI | Next.js route group `(dashboard)` | Terpisah dari halaman publik |
| State | React Query / SWR | Cache & sync data dengan server |
| Form | React Hook Form + Zod | Validasi konsisten |
| Table | TanStack Table (opsional) | Untuk sorting & filter, atau native jika simpel |
| Export CSV | Client-side (papaparse) | Sederhana, tidak perlu server |

### Route structure CRM
```
src/app/(dashboard)/
├── layout.tsx              ← cek auth, sidebar nav
├── dashboard/page.tsx      ← widget ringkas
├── pasien/
│   ├── page.tsx            ← daftar pasien
│   ├── [id]/page.tsx       ← detail + riwayat treatment
│   └── baru/page.tsx       ← form tambah pasien
├── booking/page.tsx        ← antrian booking request
└── login/page.tsx          ← halaman login
```

---

## 10. CRM Acceptance Criteria

CRM dinyatakan selesai ketika:

- [ ] Login admin & dokter berfungsi dengan role-based access
- [ ] Tanpa login, tidak ada data pasien yang bisa diakses (test: buka URL CRM tanpa login → redirect ke login)
- [ ] CRUD pasien lengkap & berfungsi
- [ ] Riwayat treatment per pasien tercatat & tampil
- [ ] Status follow-up bisa diubah & difilter
- [ ] Pengingat manual berfungsi, widget dashboard akurat
- [ ] Booking dari website masuk ke antrian CRM
- [ ] Export CSV menghasilkan file yang benar
- [ ] RLS aktif & teruji (coba akses data user lain → ditolak)
- [ ] Admin (Mbak Rina) berhasil pakai semua fitur utama di sesi onboarding tanpa bantuan

---

*CRM ini adalah pembeda utama project ini. Prioritaskan kesederhanaan & keamanan di atas fitur canggih.*
