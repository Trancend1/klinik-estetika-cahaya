import { MessageCircle, Calendar, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281111111111";

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-gradient-to-b from-sage-50 via-white to-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% -20%, rgba(91, 158, 120, 0.12), transparent), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(200, 170, 100, 0.06), transparent)",
        }}
      />
      <Container className="py-16 md:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-7 lg:space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sage-100/80 rounded-full text-tiny font-medium text-sage-700">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-500" aria-hidden="true" />
              Klinik Kecantikan Berbasis Medis
            </div>
            <h1 className="font-serif text-display md:text-display-md lg:text-display-lg text-gray-900 text-balance">
              Kulit Sehat,{" "}
              <span className="text-sage-700">Bukan Sekadar Cantik.</span>
            </h1>
            <p className="text-lead md:text-lead-md text-gray-700 max-w-xl text-pretty">
              Perawatan kulit berbasis medis yang personal, aman, dan berdampak
              nyata — bersama dr. Nadia Kirana, SpKK.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#booking"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-sage-500 text-white font-medium rounded-full hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Calendar className="w-5 h-5" aria-hidden="true" />
                Booking Konsultasi
                <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" aria-hidden="true" />
              </a>
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Halo Klinik Estetika Cahaya, saya ingin bertanya tentang perawatan kulit.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-sage-700 font-medium rounded-full border-2 border-sage-200 hover:border-sage-400 hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:ring-offset-2 transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                Tanya via WhatsApp
              </a>
            </div>
          </div>

          <div
            className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-sage-100/80 via-sage-50/50 to-white border border-sage-200/60 flex items-center justify-center shadow-card animate-fade-up animate-delay-200"
            role="img"
            aria-label="Ilustrasi Klinik Estetika Cahaya — dr. Nadia Kirana, SpKK"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-sage-100/20 to-transparent" aria-hidden="true" />
            <div className="text-center p-8 relative z-10">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-elevated border border-sage-200/50">
                <svg
                  className="w-16 h-16 text-sage-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <p className="text-sage-900 font-semibold font-serif text-xl">
                dr. Nadia Kirana, SpKK
              </p>
              <p className="text-sage-600 text-small mt-1">
                Dokter Spesialis Kulit &amp; Kelamin
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-tiny text-sage-700 shadow-sm border border-sage-200/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-500" aria-hidden="true" />
                  STR Aktif
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-tiny text-sage-700 shadow-sm border border-sage-200/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-500" aria-hidden="true" />
                  Terdaftar di IDI
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
