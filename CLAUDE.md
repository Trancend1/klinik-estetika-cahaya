# Klinik Estetika Cahaya

Website company profile one-page + CRM internal sederhana untuk klinik kecantikan berbasis medis di Bekasi Selatan — bukan salon, bukan EMR, bukan e-commerce.

---

## 1. Documentation Map

| Topik | Source of Truth |
|---|---|
| Konteks project & identitas | `.docs/klinik-estetika-cahaya.md` |
| Brief klien & scope resmi | `.docs/client-brief.md` |
| Spesifikasi CRM (data model, roles, flows) | `.docs/crm-spec.md` |
| Visual language & component specs | `.docs/design-system.md` |
| Urutan eksekusi teknis & folder structure | `.docs/execution-blueprint.md` |
| Inventori & spek aset (logo, foto, copywriting) | `.docs/assets-guide.md` |

CLAUDE.md ini cite, tidak duplikasi. Untuk detail, baca file source-of-truth-nya.

---

## 2. Progress

### 2.1 Roadmap

```
Phase 1: Foundation & Supabase Setup   (Hari 1–2, ~8 jam)
Phase 2: Core UI Components            (Hari 3, ~6 jam)
Phase 3: Website Publik (7 section)    (Hari 4–5, ~12 jam)
Phase 4: CRM Auth & Manajemen Pasien  (Hari 6–7, ~12 jam)
Phase 5: CRM Treatment, Booking, Integrasi (Hari 8–9, ~12 jam)
Phase 6: Polish & QA                  (Hari 10–11, ~8 jam)
Phase 7: Deploy, Onboarding & Handover (Hari 12, ~6 jam)
```

### 2.2 Reusable Phase Gate

Checklist ini wajib terpenuhi sebelum pindah ke phase berikutnya:

- [ ] Scope phase tidak merembet ke phase lain
- [ ] Acceptance criteria phase terpenuhi (lihat `.docs/execution-blueprint.md`)
- [ ] Security check: data pasien tidak bocor, RLS aktif di tabel yang relevan
- [ ] Demo ke diri sendiri: fitur berjalan end-to-end
- [ ] Phase Log diupdate dengan lesson learned

### 2.3 Active Phase

**Phase 1 — Foundation & Supabase Setup**

Sprint fokus:
- Init Next.js 14 + TypeScript + Tailwind
- Setup Supabase project + schema (patients, treatments, booking_requests)
- Aktifkan RLS di semua tabel
- Generate TypeScript types dari Supabase
- Init git, push GitHub

### 2.4 Exit Criteria (Phase 1)

- [ ] `npm run dev` jalan tanpa error
- [ ] Database Supabase terkoneksi dari app
- [ ] Schema 3 tabel sesuai `.docs/crm-spec.md` section 3
- [ ] RLS aktif di semua tabel (verify via Supabase dashboard)
- [ ] TypeScript types ter-generate & tidak ada type error
- [ ] Tailwind config dengan token sage/blush/gold dari `.docs/design-system.md`
- [ ] Seed data dummy tersedia untuk testing

### 2.5 Phase Log

| Phase | Status | Lesson | Carry-Forward |
|---|---|---|---|
| — | — | — | — |

---

## 3. Stack (Locked)

| Layer | Pilihan | Alasan kunci |
|---|---|---|
| Framework | Next.js 14 App Router | Route groups — pisahkan (public) dan (dashboard) dengan bersih |
| Language | TypeScript strict mode | Wajib; generate types dari Supabase schema |
| Styling | Tailwind CSS 3.4 | Token sage/blush/gold di `tailwind.config.ts` |
| Database & Auth | Supabase (PostgreSQL + Auth + RLS) | Free tier cukup, RLS built-in — kunci keamanan data pasien |
| Form | React Hook Form + Zod | Validasi konsisten di publik & CRM |
| Data fetching | SWR atau TanStack Query | Cache & sync |
| Table | TanStack Table atau native | CRM patient list |
| CSV Export | papaparse (client-side) | Tidak perlu server |
| Email | Resend | Notifikasi booking (opsional) |
| Analytics | Google Analytics 4 + Vercel Analytics | — |
| Hosting | Vercel (web) + Supabase (DB) | Free tier, budget Rp 3 juta |
| Icons | Lucide React | Tunggal, konsisten |
| Fonts | Inter + Fraunces (Google Fonts via next/font) | Inter untuk semua; Fraunces hanya website publik |

**Perubahan stack wajib lewat ADR (tulis keputusan + alasan di Phase Log).**

---

## 4. AI Instructions

### 4.1 Before Coding

1. Baca `.docs/klinik-estetika-cahaya.md` untuk orientasi.
2. Jika menyentuh CRM, baca `.docs/crm-spec.md` section yang relevan.
3. Jika menyentuh UI, baca `.docs/design-system.md` section yang relevan.
4. Cek `Active Phase` di CLAUDE.md ini — kerjakan hanya yang ada di scope phase aktif.
5. Jalankan `rtk git status --short --branch` sebelum edit file. Jika ada WIP yang overlap, laporkan dulu.

### 4.2 Code Rules (Non-Negotiable)

**Keamanan data pasien — tidak bisa dikompromikan:**
- `SUPABASE_SERVICE_ROLE_KEY` hanya di server-side (API routes). Tidak pernah di client bundle.
- RLS harus aktif di semua tabel `patients`, `treatments`, `booking_requests`.
- Setiap API route CRM **wajib** cek session Supabase sebelum return data.
- Middleware `src/middleware.ts` protect semua route `(dashboard)` — redirect ke `/login` jika tidak auth.
- Tidak ada "registrasi publik" di CRM. Akun dibuat manual.

**Arsitektur:**
- Route group `(public)` untuk website publik, `(dashboard)` untuk CRM. Tidak boleh campur.
- Folder `src/lib/supabase/` punya tiga file terpisah: `client.ts` (browser), `server.ts` (server), `middleware.ts`. Jangan satukan.
- TypeScript types dari `src/types/database.ts` — generated, tidak ditulis manual.

**UI & UX:**
- Website publik: mobile-first. CRM: desktop-first.
- CRM label bahasa Indonesia semua. Tidak ada jargon teknis di interface.
- Tombol CRM pakai `rounded-md`, tombol publik pakai `rounded-full` — beda konteks, beda style.
- Konfirmasi sebelum aksi destruktif di CRM. Selalu.
- Empty state harus ada penjelasan + tombol aksi jelas.

**Before-after gallery:**
- Tidak ada foto before-after tanpa izin tertulis pasien. Jika belum ada izin, gunakan placeholder / skip section.
- Tidak pernah pakai foto dari internet sebagai "hasil klinik".

### 4.3 Anti-Slop

- ❌ Jangan animasi tanpa tujuan. Filter: "apakah ini menggerakkan pengunjung ke booking?"
- ❌ Jangan tambah fitur CRM di luar `.docs/crm-spec.md` tanpa konfirmasi klien.
- ❌ Jangan pakai warna di luar token palette (sage, blush, gold, gray, semantic status colors).
- ❌ Jangan pakai font di luar Inter + Fraunces.
- ❌ Jangan tampilkan data pasien di mana pun tanpa auth check.
- ❌ Jangan gunakan pink mencolok / gradient warna-warni / font script berlebihan.
- ❌ Jangan buat helper, abstraksi, atau util kecuali langsung dibutuhkan.

### 4.4 Scope Discipline

**In scope:**
- One-page website publik, 7 section sesuai `.docs/client-brief.md` section 6
- CRM internal: pasien, treatment, booking request, status follow-up, export CSV
- Auth CRM: email + password (admin & dokter saja)
- Hosting: Vercel + Supabase free tier

**Out of scope (tegaskan jika muncul):**
- ❌ EMR tersertifikasi / rekam medis legal
- ❌ Payment gateway / e-commerce
- ❌ Aplikasi mobile native
- ❌ Akses CRM untuk pasien
- ❌ Auto-reminder via WA/SMS (pengingat manual only)

Jika permintaan baru datang di luar scope ini, catat di Change Log `.docs/client-brief.md` section 12, konfirmasi ke klien, baru kerjakan.

### 4.5 Communication

- Update progress ke klien tiap akhir phase (WA/email ke dr. Nadia — decision maker).
- Update harian ke admin (WhatsApp klinik — Mbak Rina).
- Libatkan Mbak Rina untuk test CRM mulai Phase 4. Feedback dari user asli > asumsi developer.
- Demo link + screenshot tiap akhir phase.

### 4.6 Contribution Identity

- ❌ Tidak ada `Co-Authored-By: Claude` di commit message.
- ❌ Tidak ada tag `🤖 Generated with Claude Code` di commit / PR body.
- ❌ Tidak ada AI identity di git author/committer.
- ✅ Author + committer = owner repo (manusia).
- ✅ AI = ghostwriter. Akuntabilitas di owner.
- ✅ Kontribusi AI boleh disebutkan hanya di prosa PR description / changelog, bukan git trailer.
