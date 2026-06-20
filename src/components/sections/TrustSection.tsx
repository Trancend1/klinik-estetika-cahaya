import { Star, ShieldCheck, ImageIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const testimoni = [
  {
    nama: "Dewi Rahayu",
    treatment: "Facial Medis & Chemical Peeling",
    quote:
      "Kulitku jadi jauh lebih cerah dan halus. Dr. Nadia menjelaskan setiap langkah treatment dengan jelas. Aku jadi paham kondisi kulitku sendiri.",
    rating: 5,
  },
  {
    nama: "Sinta Wulandari",
    treatment: "Perawatan Acne",
    quote:
      "Aku sudah coba berbagai produk, tapi baru di sini jerawatku benar-benar membaik. Dokternya sabar banget menjelaskan rutinitas skincare yang tepat.",
    rating: 5,
  },
  {
    nama: "Putri Handayani",
    treatment: "Laser Treatment",
    quote:
      "Awalnya takut, tapi ternyata nyaman. Hasil flek hitam di pipiku mulai pudar setelah 3 sesi. Recommended banget.",
    rating: 5,
  },
  {
    nama: "Anisa Fitriani",
    treatment: "Konsultasi & Paket Bulanan",
    quote:
      "Beda dengan klinik lain — di sini tidak ada drama 'harus beli produk ini-itu'. Rekomendasinya sesuai kondisi, tidak dipaksa-paksa.",
    rating: 5,
  },
];

export function TrustSection() {
  return (
    <Section id="testimoni" background="blush">
      <Container>
        <div className="text-center mb-14 md:mb-18 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-blush-100 rounded-full text-tiny font-medium text-sage-700 mb-5">
            Testimoni
          </span>
          <h2 className="font-serif text-h1 md:text-h1-md lg:text-h1-lg text-gray-900 text-balance">
            Kepercayaan Pasien Kami
          </h2>
          <p className="mt-4 text-lead md:text-lead-md text-gray-600 max-w-2xl mx-auto">
            Hasil nyata dan pengalaman langsung dari mereka yang telah merasakan
            perawatan di Klinik Estetika Cahaya
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {testimoni.map((item, index) => (
            <div
              key={item.nama}
              className="bg-white border border-gray-200/80 rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-4" aria-label={`${item.rating} dari 5 bintang`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-gold-400 text-gold-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="text-body text-gray-600 leading-relaxed mb-5 text-pretty">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900">{item.nama}</div>
                <div className="text-small text-gray-500 mt-0.5">
                  Treatment: {item.treatment}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-7 text-center hover:shadow-card transition-shadow duration-200">
            <ShieldCheck
              className="w-10 h-10 text-sage-500 mx-auto mb-4"
              aria-hidden="true"
            />
            <h4 className="font-semibold text-gray-900 mb-1.5">
              Dokter Spesialis Terpercaya
            </h4>
            <p className="text-small text-gray-500 leading-relaxed">
              dr. Nadia Kirana, SpKK — STR aktif, terdaftar di IDI
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-7 text-center hover:shadow-card transition-shadow duration-200">
            <div
              className="flex gap-1 justify-center mb-4"
              aria-label="Rating 4.9 dari 5"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-gold-400 text-gold-400"
                  aria-hidden="true"
                />
              ))}
            </div>
            <h4 className="font-semibold text-gray-900 mb-1.5">
              Rating Google 4.9
            </h4>
            <p className="text-small text-gray-500 leading-relaxed">
              Dari puluhan ulasan pasien kami
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-7 text-center hover:shadow-card transition-shadow duration-200">
            <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-sage-100 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-sage-500" aria-hidden="true" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1.5">
              Hasil Before-After Nyata
            </h4>
            <p className="text-small text-gray-500 leading-relaxed">
              Galeri akan hadir setelah izin pasien terbit
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}