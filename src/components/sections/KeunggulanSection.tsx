import { Stethoscope, Microscope, ShieldCheck, Lock, HeartHandshake } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const keunggulan = [
  {
    icon: Stethoscope,
    title: "Ditangani Langsung Dokter Spesialis",
    description:
      "Setiap konsultasi dan perawatan ditangani langsung oleh dr. Nadia Kirana, SpKK — dokter spesialis kulit dan kelamin yang berpengalaman.",
  },
  {
    icon: Microscope,
    title: "Peralatan Medis Berstandar Klinis",
    description:
      "Menggunakan peralatan medis yang terstandar, steril, dan terawat untuk hasil perawatan yang optimal dan aman.",
  },
  {
    icon: ShieldCheck,
    title: "Produk Skincare Terverifikasi BPOM",
    description:
      "Semua produk yang digunakan dan direkomendasikan telah terdaftar BPOM, aman untuk kulit, dan dipilih sesuai kebutuhan pasien.",
  },
  {
    icon: Lock,
    title: "Privasi & Kenyamanan Pasien Diutamakan",
    description:
      "Setiap sesi perawatan dilakukan secara privat dalam ruangan yang nyaman. Data pasien dijaga kerahasiaannya.",
  },
  {
    icon: HeartHandshake,
    title: "Konsultasi Jujur Tanpa Tekanan Beli",
    description:
      "Rekomendasi perawatan disampaikan secara transparan sesuai kondisi kulit. Tidak ada target penjualan — fokus pada hasil terbaik untuk pasien.",
  },
];

export function KeunggulanSection() {
  return (
    <Section id="keunggulan" background="white">
      <Container>
        <div className="text-center mb-14 md:mb-18 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-blush-100 rounded-full text-tiny font-medium text-sage-700 mb-5">
            Keunggulan
          </span>
          <h2 className="font-serif text-h1 md:text-h1-md lg:text-h1-lg text-gray-900 text-balance">
            Mengapa Memilih Klinik Estetika Cahaya?
          </h2>
          <p className="mt-4 text-lead md:text-lead-md text-gray-600 max-w-2xl mx-auto">
            Kami percaya perawatan kulit yang baik lahir dari kepercayaan, bukan transaksi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {keunggulan.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group bg-white border border-gray-200/80 rounded-2xl p-7 hover:border-sage-200 hover:shadow-card-hover transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="w-12 h-12 bg-blush-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blush-100 transition-colors duration-200">
                  <Icon className="w-6 h-6 text-sage-600" aria-hidden="true" />
                </div>
                <h3 className="text-h3 text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-body text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}