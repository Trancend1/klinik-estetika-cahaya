import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GraduationCap, Award, Stethoscope } from "lucide-react";

export function AboutSection() {
  return (
    <Section id="tentang" background="white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-sage-100 via-sage-50 to-white border border-sage-200/60 flex items-center justify-center shadow-card order-2 lg:order-1 animate-fade-up"
            role="img"
            aria-label="Ilustrasi dr. Nadia Kirana, SpKK"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-sage-100/30 to-transparent" aria-hidden="true" />
            <div className="text-center p-8 relative z-10">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-elevated border border-sage-200/50">
                <Stethoscope className="w-16 h-16 text-sage-500" aria-hidden="true" />
              </div>
              <p className="text-sage-900 font-semibold font-serif text-xl">
                dr. Nadia Kirana, SpKK
              </p>
              <p className="text-sage-600 text-small mt-1">
                Spesialis Kulit &amp; Kelamin
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-tiny text-sage-700 shadow-sm border border-sage-200/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-500" aria-hidden="true" />
                  STR Aktif
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-tiny text-sage-700 shadow-sm border border-sage-200/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-500" aria-hidden="true" />
                  IDI Terdaftar
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6 order-1 lg:order-2 animate-fade-up animate-delay-200">
            <span className="inline-block px-4 py-1.5 bg-sage-100 rounded-full text-tiny font-medium text-sage-700">
              Tentang Dokter
            </span>
            <h2 className="font-serif text-h1 md:text-h1-md lg:text-h1-lg text-gray-900 text-balance">
              Ditangani Langsung{" "}
              <span className="text-sage-700">Dokter Spesialis Kulit</span>
            </h2>

            <div className="space-y-5 text-body text-gray-600 leading-relaxed text-pretty">
              <p>
                dr. Nadia Kirana, SpKK, adalah dokter spesialis kulit dan kelamin
                yang berpraktik dengan pendekatan personal. Setelah bertahun-tahun
                berpengalaman di klinik franchise besar, dr. Nadia memilih untuk
                membuka praktik sendiri — dengan satu misi: memberikan perawatan
                yang tidak terburu-buru, jujur, dan benar-benar berfokus pada
                kesehatan kulit pasien.
              </p>
              <p>
                Filosofi medisnya sederhana:{" "}
                <em className="text-sage-700 font-medium not-italic">
                  kulit yang sehat harus dirawat dari dalam dan luar, bukan hanya
                  ditutup-tutupi
                </em>
                . Setiap pasien mendapatkan analisis kondisi kulit menyeluruh
                sebelum direkomendasikan perawatan yang tepat.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-sage-50 rounded-xl p-5 border border-sage-100 text-center hover:shadow-card transition-shadow duration-200">
                <GraduationCap className="w-6 h-6 text-sage-600 mx-auto mb-2" aria-hidden="true" />
                <p className="text-small font-medium text-gray-900">
                  Spesialis Kulit &amp; Kelamin
                </p>
              </div>
              <div className="bg-sage-50 rounded-xl p-5 border border-sage-100 text-center hover:shadow-card transition-shadow duration-200">
                <Award className="w-6 h-6 text-sage-600 mx-auto mb-2" aria-hidden="true" />
                <p className="text-small font-medium text-gray-900">
                  STR &amp; Sertifikasi Aktif
                </p>
              </div>
              <div className="bg-sage-50 rounded-xl p-5 border border-sage-100 text-center hover:shadow-card transition-shadow duration-200">
                <Stethoscope className="w-6 h-6 text-sage-600 mx-auto mb-2" aria-hidden="true" />
                <p className="text-small font-medium text-gray-900">
                  2,5 Tahun Praktik Mandiri
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}