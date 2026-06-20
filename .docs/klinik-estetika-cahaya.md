# Klinik Estetika Cahaya — Project Constitution

> File ini adalah **pintu masuk utama** project. Semua dokumentasi lain bercabang dari sini. Baca file ini terlebih dahulu sebelum mulai coding.

---

## 1. Identitas Project

| Field | Value |
|---|---|
| **Nama Project** | klinik-estetika-cahaya |
| **Tipe** | One Page Company Profile + CRM Sederhana |
| **Stack** | Next.js 14 (App Router) + TypeScript + Tailwind CSS + Neonbase |
| **Estimasi Effort** | 9–12 hari kerja efektif |
| **Budget Klien** | Rp 3.000.000 |
| **Status** | Sprint 1 — Active |

---

## 2. Ringkasan Klien (TL;DR)

**Klinik Estetika Cahaya** adalah klinik kecantikan berbasis medis (dipimpin dokter spesialis kulit) di Bekasi Selatan. Dibuka 2,5 tahun lalu oleh dr. Nadia Kirana, SpKK. Melayani 15–20 pasien/hari, kapasitas mulai mendekati batas.

**Masalah inti:** Booking masih 100% manual via WhatsApp. Slot tidak terisi optimal, pasien lama tidak diingatkan kontrol, data riwayat treatment tersebar di chat WA. Admin kewalahan. Klinik juga belum punya website resmi yang membangun kredibilitas sebagai klinik medis (bukan salon).

**Goal project:** Dua hal sekaligus — (1) website yang membangun kredibilitas klinik medis profesional, dan (2) sistem CRM sederhana untuk manajemen data pasien, riwayat treatment, dan booking request.

> Detail lengkap brief klien ada di `client-brief.md`. Spesifikasi CRM detail ada di `crm-spec.md`.

---

## 3. Filosofi Project

Project ini dibangun dengan **Semi Vibe Coding workflow**. Karena project ini punya komponen data pasien (sensitif), ada satu prinsip tambahan dibanding project company profile biasa:

### a. Kredibilitas medis di atas estetika kecantikan
Klien menekankan: website harus bikin pasien percaya ini **klinik medis sungguhan**, bukan salon yang pakai nama "klinik". Setiap keputusan desain harus lewat filter: *"Apakah ini bikin klinik kelihatan lebih medis & terpercaya, atau lebih seperti salon biasa?"*

### b. Privasi & keamanan data pasien adalah non-negotiable
Project ini menyimpan data pasien (nama, kontak, jenis kulit, alergi, riwayat treatment). Ini data sensitif. Keamanan akses, enkripsi, dan kepatuhan privasi bukan fitur tambahan — ini fondasi.

### c. Admin bukan orang IT
Klien tegas: "Admin saya bukan orang IT, jadi harus mudah dipakai tanpa pelatihan panjang." Setiap fitur CRM harus lulus tes: *"Bisakah admin pakai ini tanpa baca manual?"*

### d. Fungsi sebelum dekorasi
Tidak ada animasi tanpa tujuan. Setiap section menggerakkan pengunjung lebih dekat ke booking.

---

## 4. Struktur Dokumentasi

Project ini punya file fondasi yang saling bertaut. Karena ada komponen CRM, ada file tambahan dibanding project company profile biasa.

```
klinik-estetika-cahaya.md      ← KAMU DI SINI (pintu masuk)
│
├── client-brief.md             ← Apa yang klien minta (the WHAT)
├── execution-blueprint.md      ← Bagaimana eksekusinya (the HOW)
├── design-system.md            ← Visual language project (the LOOK)
├── assets-guide.md             ← Daftar & spesifikasi aset (the SOURCE)
│
└── crm-spec.md                 ← Spesifikasi fitur CRM (the DATA)
    └── (file tambahan karena project punya komponen CRM)
```

### Urutan baca rekomendasi:

1. **`klinik-estetika-cahaya.md`** — Konteks besar (file ini)
2. **`client-brief.md`** — Apa yang diminta klien dan kenapa
3. **`crm-spec.md`** — Spesifikasi data & fitur CRM (krusial, baca sebelum execution)
4. **`design-system.md`** — Bagaimana visualnya harus terasa
5. **`execution-blueprint.md`** — Urutan kerja teknis
6. **`assets-guide.md`** — Siapkan aset sebelum build

---

## 5. Quick Facts (cheat sheet)

| Aspek | Nilai |
|---|---|
| Halaman public | 1 (one page, scroll-based) |
| Halaman privat | Dashboard CRM (login required) |
| Section publik | 7 (Hero → Keunggulan → About → Layanan → Trust → Booking/CTA → Contact) |
| Bahasa konten | Indonesia |
| Target device publik | Mobile-first (pasien buka dari HP) |
| Target device CRM | Desktop-first (admin pakai dari komputer klinik) |
| CTA utama | Form booking konsultasi + tombol WhatsApp |
| Auth CRM | Email + password (admin & dokter saja) |
| Database | Neonbase (PostgreSQL) |
| Hosting | Vercel + Neonbase |
| Analytics | Google Analytics 4 |

---

## 6. Definition of Done

Project dinyatakan selesai ketika **semua** kriteria berikut terpenuhi:

### Website Publik
- [ ] Semua 7 section tampil sesuai design system di mobile dan desktop
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] Form booking terkirim & masuk ke antrian CRM dengan benar
- [ ] Tombol WhatsApp membuka chat dengan pesan template
- [ ] Google Maps embed akurat
- [ ] Metadata SEO lengkap + OG image
- [ ] Before-after gallery tampil dengan handling privasi

### CRM
- [ ] Login admin & dokter berfungsi dengan role berbeda
- [ ] Database pasien: tambah, edit, lihat, cari berfungsi
- [ ] Riwayat treatment per pasien tercatat
- [ ] Status follow-up bisa diubah & difilter
- [ ] Booking request dari website masuk ke antrian & bisa dikonfirmasi
- [ ] Pengingat manual (tandai pasien yang perlu dihubungi) berfungsi
- [ ] Export data pasien ke CSV berfungsi
- [ ] Data pasien hanya bisa diakses setelah login (tidak bocor ke publik)

### Handover
- [ ] Klien dapat handover doc + video tutorial CRM singkat
- [ ] Admin sudah dilatih pakai CRM (sesi onboarding)
- [ ] Domain custom aktif + SSL
- [ ] Satu round revision sudah disetujui klien

---

## 7. Catatan Penting

- **Tone visual** klien: tenang, bersih, hangat — klinik medis yang nyaman, bukan dingin seperti rumah sakit.
- **Kredibilitas medis** dibangun lewat: foto dr. Nadia asli, badge STR/sertifikasi, before-after nyata, bahasa yang medis tapi tidak menakutkan.
- **Privasi before-after:** wajah pasien tidak ditampilkan penuh tanpa izin tertulis. Bisa crop area treatment saja.
- **Data pasien** disimpan di Neonbase dengan Row Level Security aktif. Tidak ada data pasien yang bisa diakses tanpa autentikasi.
- **Logo klinik** sudah final (dikirim klien). Brand color sudah ada panduan dari klien.

---

## 8. Kontak & Channel

| Pihak | Channel | Catatan |
|---|---|---|
| Klien (dr. Nadia) | WhatsApp pribadi | Decision maker, balas di luar jam praktik |
| Admin (Mbak Rina) | WhatsApp klinik | Akan jadi user utama CRM, libatkan saat testing |
| Developer | (kamu) | Update progress per milestone |

---

*Last updated: project kickoff. Update file ini setiap ada perubahan scope mayor.*
