# Design System — Klinik Estetika Cahaya

> File ini adalah **visual language project**. Mencakup dua konteks: website publik (membangun kepercayaan pasien) dan CRM (interface untuk admin non-teknis). Setiap deviasi harus dijustifikasi.

---

## 1. Design Philosophy

Visual language project ini dibangun dengan satu filter utama:

> *"Apakah pilihan ini bikin klinik kelihatan lebih medis & terpercaya, atau lebih seperti salon biasa?"*

Inspirasi referensi:
- Klinik dermatologi premium — bersih, tenang, putih dominan, sentuhan warm
- Brand skincare medis (Avène, La Roche-Posay) — clinical tapi approachable
- **Bukan:** salon kecantikan (pink mencolok, glitter, font script berlebihan)

### Tiga prinsip visual

1. **Tenang & bersih (clinical calm)** — banyak whitespace, warna lembut, tidak ramai
2. **Hangat, bukan dingin** — klinik medis yang nyaman, hindari kesan rumah sakit yang steril & menakutkan
3. **Kredibilitas lewat kejujuran visual** — foto asli dokter & klinik, before-after nyata, badge sertifikasi

---

## 2. Color Palette

### Primary — Sage / Teal lembut

Warna utama brand. Memberi kesan medis-natural yang menenangkan.

| Token | Hex | Penggunaan |
|---|---|---|
| `sage-50` | `#F2F7F4` | Background section alternatif |
| `sage-100` | `#DCEBE3` | Card subtle, hover |
| `sage-300` | `#A8CDB8` | Border emphasis, accent ringan |
| `sage-500` | `#5B9E78` | **Primary button, link** |
| `sage-700` | `#3D6E53` | **Heading emphasis, button hover** |
| `sage-900` | `#22402F` | Text strong |

### Secondary — Blush (warm accent)

Sentuhan hangat untuk kelembutan. Dipakai terbatas — jangan dominan.

| Token | Hex | Penggunaan |
|---|---|---|
| `blush-50` | `#FBF3F1` | Background hangat sangat lembut |
| `blush-100` | `#F6E1DC` | Highlight section, badge |
| `blush-300` | `#E8B5AB` | Accent decorative terbatas |

### Accent — Gold muted (premium touch)

Hanya untuk elemen kredibilitas (badge sertifikasi, rating star). Sangat terbatas.

| Token | Hex | Penggunaan |
|---|---|---|
| `gold-400` | `#C9A961` | Rating star, badge sertifikasi |
| `gold-100` | `#F5EDD8` | Background badge |

### Neutral — Gray

| Token | Hex | Penggunaan |
|---|---|---|
| `white` | `#FFFFFF` | Background utama |
| `gray-50` | `#FAFAF9` | Background alternatif (warm white) |
| `gray-100` | `#F2F1EF` | Card background subtle |
| `gray-300` | `#D6D3CE` | Border default |
| `gray-500` | `#78736C` | Secondary text |
| `gray-700` | `#403C37` | Body text |
| `gray-900` | `#1F1C19` | Heading (warm black) |

### Semantic (untuk CRM status & feedback)

| Token | Hex | Penggunaan |
|---|---|---|
| `status-blue` | `#3B82F6` | Status "Kunjungan Pertama" |
| `status-green` | `#16A34A` | Status "Aktif" / sukses |
| `status-amber` | `#D97706` | Status "Perlu Diingatkan" / warning |
| `status-gray` | `#9CA3AF` | Status "Tidak Aktif" |
| `error-500` | `#DC2626` | Form error |

### Pemakaian dilarang
- ❌ Pink salon yang mencolok / saturated
- ❌ Gradient warna-warni
- ❌ Lebih dari 1 accent (blush ATAU gold per section, jangan dua-duanya dominan)
- ❌ Hitam pekat `#000` — pakai `gray-900` warm

---

## 3. Typography

### Font Family

Dua font untuk hierarki yang elegan:

- **Headings:** *Fraunces* atau *Lora* (serif lembut) — kesan elegan, medis-premium
- **Body & UI:** *Inter* (sans-serif) — readable, profesional

```tsx
import { Inter, Fraunces } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });
```

> **Catatan:** Di CRM, pakai **Inter saja** untuk semua teks. Serif hanya untuk website publik. CRM butuh keterbacaan fungsional, bukan keanggunan.

### Type Scale (Website Publik)

| Token | Mobile | Desktop | Font | Weight | Penggunaan |
|---|---|---|---|---|---|
| `text-display` | 36px/44px | 52px/60px | Fraunces | 600 | Hero headline |
| `text-h1` | 28px/36px | 38px/46px | Fraunces | 600 | Section heading |
| `text-h2` | 22px/30px | 28px/36px | Fraunces | 500 | Sub-heading |
| `text-h3` | 18px/26px | 20px/28px | Inter | 600 | Card title |
| `text-lead` | 18px/28px | 20px/32px | Inter | 400 | Subheadline |
| `text-body` | 16px/26px | 16px/28px | Inter | 400 | Body |
| `text-small` | 14px/22px | 14px/22px | Inter | 400 | Caption |

### Type Scale (CRM)

CRM lebih kompak & fungsional, semua Inter:

| Token | Size | Weight | Penggunaan |
|---|---|---|---|
| `crm-title` | 24px | 600 | Page title |
| `crm-section` | 18px | 600 | Section heading |
| `crm-body` | 14px | 400 | Tabel & teks |
| `crm-label` | 13px | 500 | Label form |
| `crm-meta` | 12px | 400 | Metadata, hint |

---

## 4. Spacing & Layout

Sama dengan project lain — Tailwind default scale (4px multiples).

### Section padding (publik)
```tsx
className="py-16 md:py-20 lg:py-24"
```

### Container (publik)
```tsx
className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8"
```

### CRM layout
```tsx
// Sidebar + content
className="flex min-h-screen"
// Content padding lebih kecil (fungsional)
className="p-4 md:p-6"
// CRM container lebih lebar untuk tabel
className="max-w-full"
```

---

## 5. Component Specs — Website Publik

### Button Primary
```tsx
className="
  inline-flex items-center justify-center
  px-6 py-3
  bg-sage-500 text-white
  font-medium text-base rounded-full
  hover:bg-sage-700
  focus:outline-none focus:ring-2 focus:ring-sage-300 focus:ring-offset-2
  transition-colors duration-150
"
```

> **Catatan:** Button publik pakai `rounded-full` untuk kesan lembut & approachable (sesuai vibe klinik kecantikan). CRM pakai `rounded-md` (lebih fungsional).

### Button Secondary
```tsx
className="
  inline-flex items-center justify-center px-6 py-3
  bg-white text-sage-700 font-medium text-base rounded-full
  border border-sage-300
  hover:bg-sage-50
  focus:outline-none focus:ring-2 focus:ring-sage-300 focus:ring-offset-2
"
```

### Service Card
```tsx
<div className="bg-white border border-gray-300 rounded-2xl p-6">
  <div className="w-12 h-12 bg-sage-50 rounded-full flex items-center justify-center mb-4">
    <Icon className="w-6 h-6 text-sage-500" />
  </div>
  <h3 className="text-h3 mb-2 text-gray-900">Facial Medis</h3>
  <p className="text-body text-gray-700">Deskripsi singkat...</p>
</div>
```

### Testimonial Card
```tsx
<div className="bg-blush-50 border border-gray-300 rounded-2xl p-6">
  <div className="flex gap-1 mb-3 text-gold-400">★★★★★</div>
  <blockquote className="text-lead text-gray-700 mb-4">"Kutipan..."</blockquote>
  <div className="font-medium text-gray-900">Nama Pasien</div>
  <div className="text-small text-gray-500">Treatment: Facial Medis</div>
</div>
```

### Before-After Card (privacy-aware)
```tsx
<div className="rounded-2xl overflow-hidden border border-gray-300">
  <div className="grid grid-cols-2">
    <div className="relative">
      <img className="w-full aspect-square object-cover" alt="Sebelum perawatan" />
      <span className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-tiny">Sebelum</span>
    </div>
    <div className="relative">
      <img className="w-full aspect-square object-cover" alt="Sesudah perawatan" />
      <span className="absolute top-2 left-2 bg-sage-500 text-white px-2 py-1 rounded text-tiny">Sesudah</span>
    </div>
  </div>
  <div className="p-4 text-small text-gray-500">Treatment: Chemical Peeling — 4 sesi</div>
</div>
```

---

## 6. Component Specs — CRM

CRM punya bahasa visual sendiri: **fungsional, kompak, mudah dipindai mata**. Tetap pakai palet yang sama tapi lebih netral.

### CRM Sidebar
```tsx
<aside className="w-60 bg-gray-50 border-r border-gray-300 p-4">
  <nav className="space-y-1">
    <a className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-sage-50 hover:text-sage-700">
      <Icon className="w-5 h-5" /> Dashboard
    </a>
    {/* active state: bg-sage-100 text-sage-700 */}
  </nav>
</aside>
```

### CRM Table
```tsx
<table className="w-full text-crm-body">
  <thead>
    <tr className="border-b border-gray-300 text-left text-gray-500 text-crm-label">
      <th className="py-3 px-2">Nama</th>
      <th className="py-3 px-2">Nomor WA</th>
      <th className="py-3 px-2">Status</th>
      <th className="py-3 px-2">Treatment Terakhir</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
      {/* baris pasien */}
    </tr>
  </tbody>
</table>
```

### Status Badge (CRM)
```tsx
// Mapping warna sesuai crm-spec.md section 4
const statusStyle = {
  kunjungan_pertama: 'bg-blue-50 text-blue-700',
  kontrol_dijadwalkan: 'bg-green-50 text-green-700',
  perlu_diingatkan: 'bg-amber-50 text-amber-700',
  aktif: 'bg-sage-100 text-sage-700',
  tidak_aktif: 'bg-gray-100 text-gray-500',
};

<span className="px-2.5 py-1 rounded-full text-tiny font-medium {statusStyle}">
  Perlu Diingatkan
</span>
```

### CRM Dashboard Stat Card
```tsx
<div className="bg-white border border-gray-300 rounded-lg p-5">
  <div className="text-crm-meta text-gray-500 mb-1">Booking baru hari ini</div>
  <div className="text-3xl font-semibold text-gray-900">3</div>
</div>
```

### CRM Button (fungsional)
```tsx
// Primary CRM — rounded-md, bukan rounded-full
className="px-4 py-2 bg-sage-500 text-white rounded-md font-medium text-crm-body hover:bg-sage-700"
```

### CRM Empty State
```tsx
<div className="text-center py-12">
  <Icon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
  <p className="text-gray-500 mb-4">Belum ada pasien terdaftar.</p>
  <button className="...">+ Tambah Pasien Baru</button>
</div>
```

---

## 7. Icon System

Pakai **Lucide React** tunggal.

### Website Publik
| Konteks | Icon |
|---|---|
| Dokter spesialis | `Stethoscope` |
| Peralatan medis | `Microscope` |
| BPOM/verified | `ShieldCheck` |
| Privasi | `Lock` |
| Konsultasi jujur | `MessageHeart` / `HeartHandshake` |
| Facial | `Sparkles` |
| Laser | `Zap` |
| Konsultasi | `ClipboardList` |
| WhatsApp | `MessageCircle` |

### CRM
| Konteks | Icon |
|---|---|
| Dashboard | `LayoutDashboard` |
| Pasien | `Users` |
| Booking | `CalendarClock` |
| Tambah | `Plus` |
| Cari | `Search` |
| Edit | `Pencil` |
| Export | `Download` |
| Pengingat | `Bell` |
| Logout | `LogOut` |

---

## 8. Imagery Guidelines

### Foto dr. Nadia (Hero & About)
- Aspect ratio: 4:5 (portrait) untuk hero, 1:1 untuk about
- Treatment: natural, hangat, jas dokter / pakaian profesional klinik
- Mood: approachable, senyum tulus, eye contact
- Background: interior klinik yang bersih & terang

### Foto suasana klinik
- Ruang treatment yang bersih & modern
- Peralatan medis (menunjukkan kredibilitas medis)
- Detail yang menenangkan (tanaman, pencahayaan lembut)

### Before-after (privacy-critical)
- **Wajib izin tertulis pasien**
- Crop area treatment saja jika tidak izin tampil wajah penuh
- Konsisten: angle, lighting, jarak sama untuk before & after
- Watermark subtle logo klinik (anti-misuse)
- Label jelas: "Sebelum" / "Sesudah" + jenis & jumlah treatment

---

## 9. Motion & Interaction

Minimal motion, sama dengan project lain. Tambahan untuk klinik:
- Hindari motion yang "genit" / playful — jaga kesan medis
- Before-after boleh pakai slider interaktif sederhana (drag untuk reveal), tapi opsional
- CRM: transisi minimal, prioritaskan kecepatan respons

---

## 10. Accessibility

WCAG AA minimum. Khusus klinik:
- Kontras teks medis penting (alergi, catatan) harus jelas
- Form booking mudah diisi di mobile (target tap besar)
- CRM: navigable dengan keyboard untuk efisiensi admin

---

## 11. Tailwind Config Snippet

```ts
theme: {
  extend: {
    colors: {
      sage: { 50:'#F2F7F4', 100:'#DCEBE3', 300:'#A8CDB8', 500:'#5B9E78', 700:'#3D6E53', 900:'#22402F' },
      blush: { 50:'#FBF3F1', 100:'#F6E1DC', 300:'#E8B5AB' },
      gold: { 100:'#F5EDD8', 400:'#C9A961' },
    },
    fontFamily: {
      sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
    },
    borderRadius: { '2xl': '1rem', 'full': '9999px' },
  },
}
```

---

## 12. Quick Reference Card

| Element | Website Publik | CRM |
|---|---|---|
| Background | `bg-white` | `bg-gray-50` |
| Heading | Fraunces, `text-gray-900` | Inter, `text-gray-900` |
| Body | Inter, `text-gray-700` | Inter, `text-crm-body` |
| Primary action | sage-500, `rounded-full` | sage-500, `rounded-md` |
| Card radius | `rounded-2xl` | `rounded-lg` |
| Accent | blush / gold (terbatas) | status colors only |

---

*Dua konteks (publik & CRM) berbagi palet tapi punya tone berbeda: publik = elegan & menenangkan, CRM = fungsional & cepat. Jaga konsistensi dalam masing-masing konteks.*
