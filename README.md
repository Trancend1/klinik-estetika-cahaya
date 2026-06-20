# Klinik Estetika Cahaya

Website company profile + CRM internal untuk klinik kecantikan berbasis medis di Bekasi Selatan.

## Tech Stack

**Framework:** Next.js 14 (App Router) + TypeScript  
**Styling:** Tailwind CSS 3.4  
**Database:** Neon (PostgreSQL serverless)  
**Auth:** NextAuth.js v4 (Credentials + JWT)  
**Analytics:** GA4 + Vercel Analytics  
**Icons:** Lucide React  
**Fonts:** Inter (body) + Fraunces (headings publik)

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local — isi DATABASE_URL, NEXTAUTH_SECRET, dll

# Run migration (buat tabel + seed data)
npm run db:migrate

# Start development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Routes

### Website Publik (tanpa login)

| Route       | Konten                                                                                |
| ----------- | ------------------------------------------------------------------------------------- |
| `/`         | One-page landing (Hero → Keunggulan → About → Layanan → Testimoni → Booking → Kontak) |
| `/#booking` | Form booking konsultasi                                                               |

### Admin CRM (perlu login)

| Route               | Konten                                        |
| ------------------- | --------------------------------------------- |
| `/login`            | Login page                                    |
| `/dashboard`        | Statistik ringkas                             |
| `/pasien`           | Daftar pasien (cari, filter, export CSV)      |
| `/pasien/baru`      | Tambah pasien baru                            |
| `/pasien/[id]`      | Detail pasien + riwayat treatment + follow-up |
| `/pasien/[id]/edit` | Edit data pasien                              |
| `/booking`          | Antrian booking dari website                  |

## Default Credentials (seed data)

| Email                      | Password   | Role   |
| -------------------------- | ---------- | ------ |
| `admin@klinikcahaya.id`    | `admin123` | Admin  |
| `dr.nadia@klinikcahaya.id` | `admin123` | Dokter |

## Environment Variables

| Variable                      | Required | Keterangan                            |
| ----------------------------- | -------- | ------------------------------------- |
| `DATABASE_URL`                | ✅       | Neon PostgreSQL connection string     |
| `NEXTAUTH_SECRET`             | ✅       | Generate: `openssl rand -base64 32`   |
| `NEXTAUTH_URL`                | ✅       | `http://localhost:3000` (dev)         |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | ❌       | Nomor WA admin klinik (format: 628xx) |
| `NEXT_PUBLIC_GA_ID`           | ❌       | Google Analytics ID                   |
| `NEXT_PUBLIC_SITE_URL`        | ❌       | Untuk OG image & metadata             |

## Database

Migration + seed:

```bash
npm run db:migrate
```

SQL files di `db/migrations/` dan `db/seed.sql`.

## Scripts

| Script     | Perintah             |
| ---------- | -------------------- |
| Dev server | `npm run dev`        |
| Build      | `npm run build`      |
| Lint       | `npm run lint`       |
| Migrate DB | `npm run db:migrate` |
