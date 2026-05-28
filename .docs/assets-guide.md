# Assets Guide — Klinik Estetika Cahaya

> File ini adalah **daftar lengkap aset** project, spek teknis, sumber, dan status. Project ini punya kategori aset sensitif (before-after pasien) yang butuh handling privasi khusus. Cek file ini sebelum build setiap section.

---

## 1. Asset Inventory Overview

| Kategori | Total | Status |
|---|---|---|
| Logo & branding | 4 file | ✅ Sudah final |
| Foto dr. Nadia | 2 file | ⏳ Sesi foto dijadwalkan |
| Foto suasana klinik | 4–6 file | ⏳ Bersamaan sesi foto |
| Before-after | 4–6 set | ⚠️ Perlu izin tertulis |
| Logo/badge sertifikasi | 3 file | ✅ Scan diterima |
| Ikon | ~20 ikon | ✅ Dari library |
| Konten teks | Lihat section 8 | ✅ Final |
| OG image | 1 file | ⏳ Dibuat developer |

---

## 2. Logo & Branding

| File | Format | Spek | Penggunaan | Status |
|---|---|---|---|---|
| `logo-full-color.svg` | SVG | Vector | Header, footer | ✅ |
| `logo-white.svg` | SVG | All white | Footer di bg sage/gelap | ✅ |
| `logo-mark.svg` | SVG | Symbol only | Favicon, CRM sidebar | ✅ |
| `logo-full-color.png` | PNG | 512x512 | Favicon source | ✅ |

### Brand color dari klien
Klien sudah punya panduan warna. Konfirmasi apakah selaras dengan palet sage/blush di `design-system.md`. Jika klien punya warna brand spesifik, sesuaikan token `sage-*` agar match logo.

### Favicon
Generate dari `logo-mark.svg` via realfavicongenerator.net:
- `favicon.ico`, `apple-touch-icon.png` (180x180), `icon-192.png`, `icon-512.png`

---

## 3. Foto dr. Nadia

### Hero photo
| Field | Spek |
|---|---|
| **Filename** | `doctor-hero.webp` |
| **Aspect ratio** | 4:5 (portrait) |
| **Resolusi** | 1200x1500 minimum |
| **File size** | < 200 KB |
| **Konten** | dr. Nadia, jas dokter/pakaian klinik, senyum tulus, eye contact |
| **Background** | Interior klinik bersih & terang |
| **Mood** | Profesional, hangat, approachable |

### About photo
| Field | Spek |
|---|---|
| **Filename** | `doctor-about.webp` |
| **Aspect ratio** | 1:1 |
| **Resolusi** | 800x800 |
| **Treatment** | Konsisten dengan hero (sesi sama) |

### Status
- Sesi foto profesional dijadwalkan (PIC: admin)
- Estimasi: konfirmasi tanggal ke klinik
- **Placeholder plan:** pakai stock photo dokter profesional sementara, swap saat foto asli datang

---

## 4. Foto Suasana Klinik

| Filename | Konten | Sizing | Tujuan |
|---|---|---|---|
| `clinic-room.webp` | Ruang treatment bersih | 1200x800 | Tunjukkan standar medis |
| `clinic-equipment.webp` | Peralatan medis/laser | 800x600 | Kredibilitas teknologi |
| `clinic-reception.webp` | Area resepsionis | 800x600 | Suasana nyaman |
| `clinic-detail.webp` | Detail menenangkan (tanaman, dll) | 600x600 | Warm touch |

Semua format WebP, treatment natural & terang, < 150 KB per file.

---

## 5. Before-After Gallery (PRIVACY-CRITICAL)

> ⚠️ **Kategori paling sensitif.** Jangan tampilkan before-after apapun tanpa izin tertulis pasien. Ini menyangkut privasi & potensi masalah hukum.

### Aturan privasi wajib
1. **Izin tertulis** dari setiap pasien sebelum foto ditampilkan
2. **Crop area treatment** jika pasien tidak izinkan wajah penuh tampil
3. **Tidak ada nama/identitas** pasien di foto atau caption
4. **Watermark logo** klinik subtle (anti-penyalahgunaan)
5. Simpan **dokumen izin** terpisah dari repo (Google Drive klinik)

### Spek teknis
| Field | Spek |
|---|---|
| **Filename** | `before-after-{nomor}-{treatment}.webp` |
| **Aspect ratio** | 1:1 per foto (before & after sama) |
| **Resolusi** | 800x800 per foto |
| **Konsistensi** | Angle, lighting, jarak HARUS sama before & after |
| **Label** | "Sebelum" / "Sesudah" + jenis & jumlah sesi |

### Daftar before-after (status izin)
| Set | Treatment | Status Izin |
|---|---|---|
| 1 | Chemical Peeling | ⚠️ Perlu konfirmasi |
| 2 | Laser flek | ⚠️ Perlu konfirmasi |
| 3 | Acne treatment | ⚠️ Perlu konfirmasi |
| 4 | Facial medis | ⚠️ Perlu konfirmasi |

### Backup plan jika izin belum siap
- Tampilkan section dengan ilustrasi proses treatment (bukan foto pasien)
- Atau tunda section before-after, tambahkan setelah izin lengkap
- Jangan pernah pakai foto dari internet / stock sebagai "hasil klinik" (menyesatkan & tidak etis)

---

## 6. Badge & Sertifikasi

| File | Konten | Penggunaan | Status |
|---|---|---|---|
| `badge-str.png` | Logo/teks STR dokter | Trust section | ✅ Scan diterima |
| `badge-bpom.svg` | Logo BPOM (produk terverifikasi) | Keunggulan section | ✅ |
| `badge-google-rating.svg` | Rating Google (jika ≥ 4.7) | Trust section | ⏳ Cek rating aktual |

> **Catatan:** Tampilkan nomor STR dokter (bukan scan dokumen penuh) untuk verifikasi tanpa membocorkan dokumen pribadi. Format: "STR: xxxx-xxxx-xxxx".

---

## 7. Icon Set

Pakai **Lucide React**. Daftar lengkap mapping ada di `design-system.md` section 7. Install:
```bash
npm install lucide-react
```

---

## 8. Konten Teks (Copywriting Final)

### Hero
- **Headline:** Kulit Sehat, Bukan Sekadar Cantik.
- **Subheadline:** Perawatan kulit berbasis medis yang personal, aman, dan berdampak nyata — bersama dr. Nadia Kirana, SpKK.
- **CTA Primary:** Booking Konsultasi
- **CTA Secondary:** Tanya via WhatsApp

### Keunggulan (5 item)
| Keunggulan | Deskripsi singkat |
|---|---|
| Ditangani Dokter Spesialis | Setiap perawatan diawasi langsung dr. Nadia Kirana, SpKK |
| Peralatan Berstandar Medis | Teknologi dan alat dengan standar klinis, bukan salon |
| Produk Terverifikasi BPOM | Semua produk yang digunakan aman dan terdaftar resmi |
| Privasi & Kenyamanan | Ruang perawatan privat dengan pelayanan personal |
| Konsultasi Jujur | Rekomendasi sesuai kebutuhan kulit, tanpa tekanan beli |

### About
**Heading:** Ditangani Langsung oleh Dokter Spesialis Kulit

**Paragraf:**
> dr. Nadia Kirana, SpKK adalah dokter spesialis kulit dan kelamin yang berpengalaman menangani berbagai masalah kulit. Sebelum mendirikan Klinik Estetika Cahaya, beliau berpraktik di klinik kecantikan ternama, dan kini berkomitmen memberikan perawatan yang lebih personal dan tidak terburu-buru.

**Filosofi (quote):**
> "Kulit yang sehat harus dirawat dari dalam dan luar, bukan hanya ditutup-tutupi."

### Layanan (6 item)
| Layanan | Deskripsi |
|---|---|
| **Konsultasi Kulit Wajah** | Analisis menyeluruh kondisi kulit Anda oleh dokter spesialis. |
| **Facial Medis** | Perawatan wajah mendalam dengan standar dan produk medis. |
| **Chemical Peeling** | Eksfoliasi terkontrol untuk regenerasi dan kecerahan kulit. |
| **Laser Treatment** | Penanganan flek, bekas jerawat, dan peremajaan kulit. |
| **Perawatan Acne & Bekas Jerawat** | Program menyeluruh untuk mengatasi jerawat hingga tuntas. |
| **Paket Perawatan Bulanan** | Program perawatan berkelanjutan dengan harga lebih hemat. |

### Testimoni (5 sudah ada izin)
> *"Awalnya ragu, tapi dr. Nadia menjelaskan semuanya dengan sabar. Hasil treatment-nya benar-benar terlihat."*
> **— Dewi A.**, Facial Medis & Chemical Peeling

> *"Klinik yang bersih dan dokternya jujur. Tidak dipaksa beli paket mahal-mahal."*
> **— Rina S.**, Konsultasi & Acne Treatment

> *"Bekas jerawat saya yang lama akhirnya memudar setelah beberapa sesi laser. Recommended!"*
> **— Maya P.**, Laser Treatment

> *"Pelayanannya personal, beda dari klinik franchise yang buru-buru. Nyaman banget."*
> **— Sinta W.**, Paket Perawatan Bulanan

> *"Dokter spesialis asli, bukan cuma terapis. Itu yang bikin saya percaya."*
> **— Lia H.**, Facial Medis

### Booking / CTA
- **Heading:** Ingin kulit lebih sehat? Mulai dengan konsultasi.
- **Subtext:** Isi form di bawah, dan tim kami akan menghubungi Anda untuk konfirmasi jadwal.
- **Form fields:** Nama, Nomor WhatsApp, Tanggal Preferensi, Keluhan Singkat (textarea)
- **Submit:** Kirim Permintaan Booking
- **Below:** Atau tanya dulu via WhatsApp →

### Contact
- **Alamat:** [konfirmasi alamat lengkap klinik di Bekasi Selatan + landmark]
- **WhatsApp:** +62 8xx-xxxx-xxxx
- **Jam Praktik:** [konfirmasi — misal: Senin–Sabtu, 10.00–19.00 WIB]
- **Instagram:** @klinikestetikacahaya
- **Pembayaran:** Tunai, transfer, kartu debit/kredit, QRIS [konfirmasi]

---

## 9. Open Graph Image

| Field | Spek |
|---|---|
| **Filename** | `og-image.png` |
| **Ukuran** | 1200x630 |
| **Konten** | Logo + "Klinik Estetika Cahaya" + "Perawatan Kulit Berbasis Medis" + foto dr. Nadia (opsional) |
| **Background** | sage-50 atau white dengan aksen sage |

---

## 10. Alt Text Reference

| Gambar | Alt text |
|---|---|
| Hero dr. Nadia | dr. Nadia Kirana, dokter spesialis kulit di Klinik Estetika Cahaya |
| Suasana klinik | Ruang perawatan Klinik Estetika Cahaya yang bersih dan modern |
| Before-after | Hasil perawatan [jenis treatment] di Klinik Estetika Cahaya |
| Badge STR | Tanda registrasi dokter spesialis kulit |

### Aturan
- Deskriptif, bahasa Indonesia, maks 125 karakter
- Before-after: jangan sebut nama pasien di alt text

---

## 11. Folder Structure di Repository

```
public/
├── images/
│   ├── doctor/
│   │   ├── doctor-hero.webp
│   │   └── doctor-about.webp
│   ├── clinic/
│   │   ├── clinic-room.webp
│   │   └── ...
│   ├── before-after/
│   │   └── before-after-1-peeling.webp
│   └── og/og-image.png
├── logo/
│   ├── logo-full-color.svg
│   ├── logo-white.svg
│   └── logo-mark.svg
├── badges/
│   ├── badge-bpom.svg
│   └── badge-google-rating.svg
└── favicon.ico
```

> **Catatan:** Dokumen izin pasien untuk before-after **TIDAK disimpan di repo**. Simpan di Google Drive klinik yang aman.

---

## 12. Asset Optimization Checklist

- [ ] Semua foto WebP + fallback JPG
- [ ] Ukuran sesuai display, quality 80–85%
- [ ] `next/image` untuk semua, hero pakai `priority`
- [ ] Before-after: watermark logo subtle ditambahkan
- [ ] Logo & badge dalam SVG
- [ ] Font: hanya weight terpakai (Inter 400/500/600, Fraunces 500/600)

---

## 13. Asset Tracking Log

| Tanggal | Aset | Aksi | Catatan |
|---|---|---|---|
| (kickoff) | Logo final | Diterima | Sudah final |
| (kickoff) | Konten teks + testimoni | Diterima | 5 testimoni ada izin |
| (kickoff) | Scan STR & sertifikat | Diterima | Tampilkan nomor saja |
| (TBD) | Foto dr. Nadia + klinik | Menunggu | Sesi foto dijadwalkan |
| (TBD) | Before-after | Menunggu izin | Konfirmasi izin tertulis dulu |

---

*Aset before-after adalah area paling sensitif project ini. Saat ragu soal privasi pasien, pilih opsi paling konservatif: jangan tampilkan.*
