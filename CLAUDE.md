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
Phase 1: Foundation & Database Setup   (Hari 1–2, ~8 jam) ✅
Phase 2: Core UI Components            (Hari 3, ~6 jam) ✅
Phase 3: Website Publik (7 section)    (Hari 4–5, ~12 jam) ✅
Phase 4: CRM Auth & Manajemen Pasien  (Hari 6–7, ~12 jam) ✅
Phase 5: CRM Treatment, Booking, Integrasi (Hari 8–9, ~12 jam) ✅
Phase 6: Polish & QA                  (Hari 10–11, ~8 jam) ✅
Phase 7: Deploy, Onboarding & Handover (Hari 12, ~6 jam) ← CURRENT
```

### 2.2 Reusable Phase Gate

Checklist ini wajib terpenuhi sebelum pindah ke phase berikutnya:

- [x] Scope phase tidak merembet ke phase lain
- [x] Acceptance criteria phase terpenuhi (lihat `.docs/execution-blueprint.md`)
- [x] Security check: data pasien tidak bocor via middleware + server-side session check
- [x] Demo ke diri sendiri: fitur berjalan end-to-end
- [x] Phase Log diupdate dengan lesson learned

### 2.3 Active Phase

**Phase 7 — Deploy, Onboarding & Handover**

Sprint fokus:
- Deploy web ke Vercel production
- Setup custom domain + DNS + SSL
- Verifikasi Neon production config
- Submit sitemap ke Google Search Console
- Setup Google Business Profile klinik
- Buat video tutorial CRM singkat (5–10 menit, screen recording)
- Sesi onboarding live dengan Mbak Rina (admin)
- Buat dokumen handover 1–2 halaman
- Serah akses (kredensial admin & dokter)
- Invoice final
- Approval tertulis dari dr. Nadia

### 2.4 Exit Criteria (Phase 2 & 3)

**Phase 2 ✅**
- [x] All UI primitives match design-system.md specs
- [x] Components reusable across public & CRM contexts
- [x] `npm run build` lulus tanpa error
- [x] No console errors in components

**Phase 3 ✅**
- [x] All 7 sections completed
- [x] Mobile, tablet, desktop responsive
- [x] Good visual hierarchy and UX
- [x] Accessibility basics implemented (alt text, semantic HTML, aria attributes)
- [x] No broken layouts
- [x] No console errors
- [x] Landing page works end-to-end and ready for Phase 4

### 2.5 Exit Criteria (Phase 4 — baru selesai)

**Phase 4 ✅**
- [x] Login/logout works (NextAuth.js Credentials + JWT)
- [x] Protected routes work (middleware + server-side session check)
- [x] CRM layout complete (sidebar desktop + bottom nav mobile)
- [x] Patient CRUD complete (list, create, read, update via API + pages)
- [x] Search/filter/pagination work (by name/WA, status filter, paginated table)
- [x] Responsive on all devices (sidebar hidden on mobile, bottom nav)
- [x] No console errors
- [x] Ready for next phase integrations (treatment, booking, export)

### 2.5 Exit Criteria (Phase 5 — baru selesai)

**Phase 5 ✅**
- [x] Treatment workflow complete (add/list via modal on patient detail)
- [x] Follow-up status management (dropdown + reminder date picker)
- [x] Manual reminder system (widget dashboard + list pasien perlu dihubungi)
- [x] Booking API live (POST publik → booking_requests, GET auth for CRM)
- [x] CRM booking queue (filter, confirm, reschedule, cancel, convert→patient)
- [x] Dashboard stats (5 stat cards + actionable reminder list + treatment export)
- [x] CSV export (patients + treatments, reusable ExportButton component)
- [x] WhatsApp integration (env-based number across all public sections + patient detail inline WA)
- [x] GA4 + Vercel Analytics (root layout, conditional GA)
- [x] `npm run build` + `npm run lint` lulus tanpa error
- [x] No console errors
- [x] Ready for Phase 6 polish

### 2.5 Exit Criteria (Phase 6 — baru selesai)

**Phase 6 ✅**
- [x] Audit copywriting: typo fix (Mengexport→Mengekspor), tone polish across CRM (Convert→Konversi, booking→reservasi, login heading)
- [x] Fix critical bug: `tanggal_pengingat` not saved in PUT API route
- [x] Fix broken CSS classes: `text-crm-body`, `text-crm-label`, `text-crm-meta`, `text-crm-section` defined in globals.css
- [x] Fix silent catch blocks: `console.error` added to TreatmentSection, BookingQueue, FollowUpControl, ExportButton
- [x] Add OG image + Twitter card metadata in root layout
- [x] Add SVG favicon
- [x] Clean up contact/route.ts stub → proper handler
- [x] `npm run build` + `npm run lint` lulus tanpa error
- [x] Ready for Phase 7 deploy

### 2.6 Phase Log

| Phase | Status | Lesson | Carry-Forward |
|---|---|---|---|---|---|
| 1 | ✅ Done | ADR: Supabase → Neon + NextAuth.js. Reason: client request. RLS diganti middleware + server session. | Auth flow dengan NextAuth.js Credentials provider + JWT sudah jalan. |
| 2 | ✅ Done | UI primitives reusable across public & CRM via context prop. Section wrapper simplifies spacing. | Pakai komponen Section/Container/Button di phase berikutnya. |
| 3 | ✅ Done | 7 section landing selesai. `Instagram` tidak ada di lucide-react — pakai inline SVG. Section bg type perlu diperluas. | Placeholder foto klinik masih perlu diganti asli. Structur siap untuk integrasi booking API di Phase 5. |
| 4 | ✅ Done | CRM auth & CRUD pasien selesai. API routes pakai pattern server-side session check. Sidebar desktop + bottom nav mobile. | Form masih vanilla JS (belum React Hook Form). Siap untuk integrasi treatment & booking di Phase 5. |
| 5 | ✅ Done | Treatment/booking flow selesai. CSV export reusable. Booking queue satu halaman client component dengan semua aksi. WA number pakai NEXT_PUBLIC env var. | Struktur siap untuk Phase 6 polish. |
| 6 | ✅ Done | Bug: tanggal_pengingat missing dari PUT handler → follow-up reminder tidak tersimpan. Fix: tambah ke destructured body + SQL. CSS: text-crm-* classes tidak terdefinisi → rusak styling 8 komponen. | Semua aset foto masih placeholder. README updated. Siap deploy. |

---

## 3. Stack (Locked)

| Layer | Pilihan | Alasan kunci |
|---|---|---|
| Framework | Next.js 14 App Router | Route groups — pisahkan (public) dan (dashboard) dengan bersih |
| Language | TypeScript strict mode | Wajib; generate types dari database schema |
| Styling | Tailwind CSS 3.4 | Token sage/blush/gold di `tailwind.config.ts` |
| Database | Neon (PostgreSQL serverless) | Free tier cukup, migrated from Supabase |
| Auth | NextAuth.js v4 (Credentials provider + JWT) | Migrated from Supabase Auth. Session di-middleware & server. |
| Form | React Hook Form + Zod | Validasi konsisten di publik & CRM |
| Data fetching | SWR atau TanStack Query | Cache & sync |
| Table | TanStack Table atau native | CRM patient list |
| CSV Export | papaparse (client-side) | Tidak perlu server |
| Email | Resend | Notifikasi booking (opsional) |
| Analytics | Google Analytics 4 + Vercel Analytics | — |
| Hosting | Vercel (web) + Neon (DB) | Free tier, budget Rp 3 juta |
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
- `DATABASE_URL` hanya di server-side (API routes & server components). Tidak pernah di client bundle.
- Setiap API route CRM **wajib** cek session NextAuth.js sebelum return data.
- Middleware `src/middleware.ts` protect semua route `(dashboard)` — redirect ke `/login` jika tidak auth via NextAuth.js.
- Tidak ada "registrasi publik" di CRM. Akun dibuat manual.

**Arsitektur:**
- Route group `(public)` untuk website publik, `(dashboard)` untuk CRM. Tidak boleh campur.
- Folder `src/lib/` punya: `db.ts` (Neon client), `auth.ts` (NextAuth.js config).
- TypeScript types dari `src/types/database.ts` — hand-written (tidak ada Supabase CLI untuk generate).
- Database di Neon. Auth di NextAuth.js (Credentials + JWT).

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
- Hosting: Vercel + Neon free tier

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
