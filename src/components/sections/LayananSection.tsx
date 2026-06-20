import { Sparkles, Zap, ClipboardList, Eye, Droplets, CalendarCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const layanan = [
  {
    icon: ClipboardList,
    title: "Konsultasi Kulit Wajah",
    description:
      "Analisis kondisi kulit menyeluruh oleh dokter spesialis. Termasuk pemeriksaan jenis kulit, identifikasi masalah, dan rekomendasi perawatan yang tepat.",
  },
  {
    icon: Sparkles,
    title: "Facial Medis",
    description:
      "Perawatan wajah dengan standar medis menggunakan produk dan teknik yang disesuaikan dengan kondisi kulit masing-masing pasien.",
  },
  {
    icon: Droplets,
    title: "Chemical Peeling",
    description:
      "Eksfoliasi terkontrol menggunakan larutan kimia aman untuk mengangkat sel kulit mati, merangsang regenerasi, dan memperbaiki tekstur kulit.",
  },
  {
    icon: Zap,
    title: "Laser Treatment",
    description:
      "Penanganan flek hitam, bekas jerawat, pigmen tidak merata, dan peremajaan kulit dengan teknologi laser yang aman dan terukur.",
  },
  {
    icon: Eye,
    title: "Perawatan Acne & Bekas Jerawat",
    description:
      "Program penanganan jerawat menyeluruh — dari penghentian inflamasi, pengontrolan minyak, hingga pemudaran bekas jerawat.",
  },
  {
    icon: CalendarCheck,
    title: "Paket Perawatan Bulanan",
    description:
      "Program perawatan berkelanjutan dengan harga spesial. Dirancang untuk pasien yang ingin menjaga hasil optimal jangka panjang.",
  },
];

export function LayananSection() {
  return (
    <Section id="layanan" background="sage">
      <Container>
        <div className="text-center mb-14 md:mb-18 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-sage-100 rounded-full text-tiny font-medium text-sage-700 mb-5">
            Layanan
          </span>
          <h2 className="font-serif text-h1 md:text-h1-md lg:text-h1-lg text-gray-900 text-balance">
            Layanan Kami
          </h2>
          <p className="mt-4 text-lead md:text-lead-md text-gray-600 max-w-2xl mx-auto">
            Perawatan berbasis medis untuk setiap kebutuhan kulit Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {layanan.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group bg-white border border-gray-200/80 rounded-2xl p-7 hover:border-sage-300 hover:shadow-card-hover transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="w-12 h-12 bg-sage-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-sage-100 transition-colors duration-200">
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
