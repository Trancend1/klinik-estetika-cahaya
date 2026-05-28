# Execution Blueprint — Klinik Estetika Cahaya

> File ini adalah **rencana eksekusi teknis** project. Karena project punya komponen CRM + website, fase kerjanya lebih panjang dari company profile biasa. Jika `client-brief.md` adalah *the WHAT* dan `crm-spec.md` adalah *the DATA*, file ini adalah *the HOW*.

---

## 1. Stack & Tooling

| Layer | Tools |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS 3.4 |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth (email/password) |
| **Form** | React Hook Form + Zod |
| **Data fetching** | SWR atau TanStack Query |
| **Table** | TanStack Table (untuk CRM) atau native |
| **CSV Export** | papaparse (client-side) |
| **Email** | Resend (notifikasi booking opsional) |
| **Analytics** | Google Analytics 4 + Vercel Analytics |
| **Hosting** | Vercel (web) + Supabase (DB) |
| **Repository** | GitHub (private) |

### Justifikasi stack untuk budget Rp 3 juta

Project ini punya CRM tapi budget terbatas. Kunci profitabilitas adalah pakai tools gratis di tier yang cukup:
- **Supabase free tier**: 500 MB DB, 50.000 monthly active users, Auth + RLS included → lebih dari cukup untuk 1 klinik
- **Vercel free tier**: hosting + serverless functions gratis untuk traffic klinik
- **Tidak ada biaya bulanan** yang membebani klien jangka panjang → poin jual ke klien

---

## 2. Project Structure

```
klinik-estetika-cahaya/
├── docs/
│   ├── klinik-estetika-cahaya.md
│   ├── client-brief.md
│   ├── crm-spec.md
│   ├── execution-blueprint.md
│   ├── design-system.md
│   └── assets-guide.md
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── doctor/             ← foto dr. Nadia
│   │   ├── clinic/             ← suasana klinik
│   │   ├── before-after/       ← gallery (privacy-handled)
│   │   └── og/
│   ├── logo/
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── (public)/           ← website publik
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx        ← one page landing
│   │   │
│   │   ├── (dashboard)/        ← CRM (auth required)
│   │   │   ├── layout.tsx      ← auth guard + sidebar
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── pasien/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/page.tsx
│   │   │   │   └── baru/page.tsx
│   │   │   ├── booking/page.tsx
│   │   │   └── login/page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── booking/route.ts    ← terima booking dari web
│   │   │   └── contact/route.ts
│   │   │
│   │   ├── layout.tsx          ← root
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── sections/           ← section landing publik
│   │   ├── crm/                ← komponen khusus CRM
│   │   │   ├── PatientTable.tsx
│   │   │   ├── PatientForm.tsx
│   │   │   ├── TreatmentForm.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── BookingQueue.tsx
│   │   │   └── DashboardStats.tsx
│   │   ├── ui/
│   │   └── layout/
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       ← browser client
│   │   │   ├── server.ts       ← server client
│   │   │   └── middleware.ts   ← auth refresh
│   │   ├── constants.ts
│   │   ├── validations.ts
│   │   └── utils.ts
│   │
│   ├── types/
│   │   ├── database.ts         ← generated Supabase types
│   │   └── index.ts
│   │
│   └── middleware.ts           ← protect (dashboard) routes
│
├── supabase/
│   ├── migrations/             ← SQL schema migrations
│   └── seed.sql                ← data dummy untuk testing
│
├── .env.local
├── .env.example
└── ...config files
```

---

## 3. Phase Breakdown (Sprint 9–12 Hari)

Project dibagi 7 fase. Website publik & CRM dibangun bergantian agar bisa demo bertahap.

### Phase 1 — Foundation & Supabase Setup (Hari 1–2, ~8 jam)

**Goal:** Project skeleton + database siap.

- [ ] Initialize Next.js 14 + TypeScript + Tailwind
- [ ] Setup ESLint + Prettier
- [ ] Buat struktur folder sesuai blueprint (public + dashboard route groups)
- [ ] Setup `globals.css` dengan CSS variables dari `design-system.md`
- [ ] Konfigurasi `tailwind.config.ts` dengan theme klinik
- [ ] **Setup Supabase project** (buat project, simpan keys)
- [ ] **Buat schema database** sesuai `crm-spec.md` (patients, treatments, booking_requests)
- [ ] **Aktifkan Row Level Security** di semua tabel
- [ ] Generate TypeScript types dari Supabase schema
- [ ] Buat seed data dummy untuk testing
- [ ] Init git, push ke GitHub

**Acceptance:** `npm run dev` jalan, database terkoneksi, schema & RLS aktif.

---

### Phase 2 — Core UI Components (Hari 3, ~6 jam)

**Goal:** Component dasar siap untuk publik & CRM.

- [ ] Button (primary, secondary, ghost)
- [ ] Input, Textarea, Select, DatePicker
- [ ] Card (service, testimonial, stat)
- [ ] Container, Section wrapper
- [ ] Badge (untuk status CRM)
- [ ] Table base component
- [ ] Header & Footer publik
- [ ] CRM Sidebar navigation

**Acceptance:** Semua primitives match design system, dipakai ulang konsisten.

---

### Phase 3 — Website Publik (Hari 4–5, ~12 jam)

**Goal:** Semua 7 section landing terbangun dengan konten final.

Urutan build:
1. HeroSection — headline, foto dr. Nadia, CTA booking
2. KeunggulanSection — 5 keunggulan grid
3. AboutSection — profil dr. Nadia + filosofi
4. LayananSection — 6 layanan grid
5. TrustSection — before-after gallery + testimoni + badge STR
6. BookingSection — form booking (UI, handler di Phase 5)
7. ContactSection — info + Google Maps

Checklist per section: mobile/tablet/desktop responsive, alt text, kontras, no console error.

**Acceptance:** Landing tampil end-to-end mobile & desktop dengan konten final.

---

### Phase 4 — CRM Auth & Pasien (Hari 6–7, ~12 jam)

**Goal:** Login + manajemen pasien berfungsi.

- [ ] Setup Supabase Auth (login page)
- [ ] Middleware proteksi route `(dashboard)` — redirect ke login jika belum auth
- [ ] Buat akun admin & dokter (manual via Supabase dashboard)
- [ ] Dashboard layout dengan sidebar
- [ ] **Daftar pasien** — tabel dengan search & filter status
- [ ] **Tambah pasien** — form sederhana
- [ ] **Detail pasien** — halaman dengan info + riwayat treatment
- [ ] **Edit pasien** — ubah data
- [ ] Test RLS: akses tanpa login ditolak

**Acceptance:** Admin bisa login, CRUD pasien lengkap, data aman (RLS teruji).

---

### Phase 5 — CRM Treatment, Booking & Integrasi (Hari 8–9, ~12 jam)

**Goal:** Treatment, booking flow, dan integrasi web↔CRM jalan.

- [ ] **Tambah/lihat/edit treatment** per pasien
- [ ] **Status follow-up** — ubah & filter
- [ ] **Pengingat manual** — set tanggal + widget "perlu dihubungi"
- [ ] **API booking** — form web submit → masuk tabel `booking_requests`
- [ ] **Antrian booking** di CRM — lihat, konfirmasi, reschedule, convert ke pasien
- [ ] **Dashboard stats** — widget angka ringkas
- [ ] **Export CSV** pasien & treatment
- [ ] WhatsApp button di web dengan template
- [ ] Setup GA4 + Vercel Analytics

**Acceptance:** Booking dari web masuk CRM, semua fitur CRM di `crm-spec.md` berfungsi.

---

### Phase 6 — Polish & QA (Hari 10–11, ~8 jam)

**Goal:** Production-ready, teruji menyeluruh.

#### Polish
- [ ] Audit copywriting (typo, tone medis yang tepat)
- [ ] Optimasi gambar (WebP, ukuran tepat)
- [ ] Before-after gallery dengan privacy handling final
- [ ] Loading & success/error state form
- [ ] Empty states di CRM ("Belum ada pasien...")
- [ ] Smooth scroll, favicon, OG image

#### QA
- [ ] Test 3 browser (Chrome, Safari, Firefox)
- [ ] Test 2 device (Android + iPhone)
- [ ] Lighthouse audit (target tercapai)
- [ ] **Security test CRM:** akses URL CRM tanpa login, coba akses data lintas-user
- [ ] Test full booking flow: web → CRM → convert pasien
- [ ] Test export CSV
- [ ] Meta tags, sitemap, robots.txt

**Acceptance:** Semua acceptance criteria di `klinik-estetika-cahaya.md` & `crm-spec.md` tercapai.

---

### Phase 7 — Deploy, Onboarding & Handover (Hari 12, ~6 jam)

**Goal:** Live + admin terlatih + serah-terima.

#### Deploy
- [ ] Deploy web ke Vercel production
- [ ] Setup custom domain + DNS + SSL
- [ ] Verifikasi Supabase production config
- [ ] Submit sitemap ke Google Search Console
- [ ] Setup Google Business Profile klinik

#### Onboarding (krusial untuk project ini)
- [ ] Buat video tutorial CRM singkat (5–10 menit, screen recording)
- [ ] Sesi onboarding live dengan Mbak Rina (admin) — dampingi pakai semua fitur
- [ ] Buat dokumen handover 1–2 halaman (panduan harian CRM)
- [ ] Pastikan admin bisa: tambah pasien, catat treatment, lihat booking, export — tanpa bantuan

#### Handover
- [ ] Serah akses (kredensial admin & dokter)
- [ ] Invoice final
- [ ] Approval tertulis dari dr. Nadia

**Acceptance:** Website live, CRM jalan, admin terlatih & confirm bisa pakai mandiri.

---

## 4. Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx       # server-only, JANGAN expose

# Email (notifikasi booking, opsional)
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL_TO=admin@klinikcahaya.id

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=628xxxxxxxxxx

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site
NEXT_PUBLIC_SITE_URL=https://klinikestetikacahaya.id
```

> **Kritis:** `SUPABASE_SERVICE_ROLE_KEY` hanya dipakai di server-side (API routes). Jangan pernah expose ke client — ini bypass RLS.

---

## 5. Git Workflow

Conventional Commits. Branch: `main` (production), `dev` (default), `feature/*` per fitur.

Tambahan untuk project ini: commit migration Supabase secara terpisah dengan prefix `chore(db):` agar mudah dilacak.

---

## 6. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance (publik) | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| LCP | < 2.5s |
| CRM page load | < 2s |

CRM tidak perlu skor SEO (noindex), fokus ke kecepatan & keamanan.

---

## 7. Risk Register

| Risk | Likelihood | Impact | Mitigasi |
|---|---|---|---|
| Foto dr. Nadia delay | Sedang | Tinggi | Placeholder profesional, swap saat foto datang |
| Izin before-after lama | Tinggi | Sedang | Mulai tanpa gallery, tambah saat izin siap; atau pakai ilustrasi |
| Admin kesulitan pakai CRM | Sedang | Tinggi | Onboarding intensif + video tutorial + UX sesederhana mungkin |
| Supabase free tier limit | Rendah | Sedang | Volume 1 klinik jauh di bawah limit; monitor usage |
| Kebocoran data pasien | Rendah | **Sangat tinggi** | RLS wajib, security test sebelum deploy, no public access |
| Scope creep ke EMR penuh | Sedang | Tinggi | Tegaskan di brief & sistem: ini CRM operasional, bukan EMR legal |

---

## 8. Komunikasi Project

| Frekuensi | Channel | Konten |
|---|---|---|
| Daily | WA ke admin | Progress singkat |
| End of Phase | WA/email ke dr. Nadia | Demo link + screenshot |
| Phase 4 & 5 | Libatkan admin | Test CRM bareng admin (UX feedback) |
| Final | Zoom/onsite | Onboarding + handover |

> **Tips khusus:** Libatkan Mbak Rina (admin) sejak Phase 4 untuk test CRM. Feedback dari user asli lebih berharga dari asumsi developer soal "kemudahan".

---

## 9. Post-Launch Checklist (Hari 13+)

- [ ] Monitor Supabase usage & Vercel analytics 7 hari pertama
- [ ] Cek booking request masuk dengan benar
- [ ] Follow-up admin: ada kesulitan pakai CRM?
- [ ] Verifikasi GA4 menerima data
- [ ] Invoice final & minta testimoni untuk portfolio

---

*Blueprint ini panduan, bukan kontrak ketat. Yang tidak bisa dikompromikan: keamanan data pasien & kemudahan CRM untuk admin.*
