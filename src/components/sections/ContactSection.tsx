import { MapPin, Clock, CreditCard, MessageCircle, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getWhatsAppNumber } from "@/lib/constants";

const waNumber = getWhatsAppNumber();

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const waDisplay = waNumber.startsWith("62") ? "0" + waNumber.slice(2) : waNumber;

export function ContactSection() {
  const contactItems = [
    {
      icon: MapPin,
      title: "Alamat",
      content: (
        <>
          Ruko Grand Galaxy City Blok A1 No. 12
          <br />
          Jalan Raya Alternatif, Bekasi Selatan
          <br />
          Jawa Barat 17436
          <br />
          <span className="text-small text-gray-500 mt-1 block">
            (Sebelah RS Grata, depan Alfamidi)
          </span>
        </>
      ),
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Admin",
      content: (
        <a
          href={`https://wa.me/${waNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sage-600 hover:text-sage-700 transition-colors font-medium inline-flex items-center gap-1.5 group"
        >
          {waDisplay}
          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
        </a>
      ),
    },
    {
      icon: Clock,
      title: "Jam Praktik dr. Nadia",
      content: (
        <ul className="space-y-1.5">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0" aria-hidden="true" />
            Senin — Jumat: 09:00 – 20:00
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0" aria-hidden="true" />
            Sabtu: 09:00 – 17:00
          </li>
          <li className="text-small text-gray-500 mt-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" aria-hidden="true" />
            Minggu &amp; Hari Libur Nasional: Tutup
          </li>
        </ul>
      ),
    },
    {
      icon: CreditCard,
      title: "Metode Pembayaran",
      content: (
        <span className="text-gray-600">
          Tunai, Transfer Bank (BCA/Mandiri), dan QRIS
        </span>
      ),
    },
    {
      icon: InstagramIcon,
      title: "Media Sosial",
      content: (
        <a
          href="https://instagram.com/klinikestetikacahaya"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sage-600 hover:text-sage-700 transition-colors font-medium inline-flex items-center gap-1.5 group"
        >
          @klinikestetikacahaya
          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
        </a>
      ),
    },
  ];
  return (
    <Section id="kontak" background="gray">
      <Container>
        <div className="text-center mb-14 md:mb-18 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-gray-200 rounded-full text-tiny font-medium text-gray-700 mb-5">
            Kontak
          </span>
          <h2 className="font-serif text-h1 md:text-h1-md lg:text-h1-lg text-gray-900 text-balance">
            Hubungi Kami
          </h2>
          <p className="mt-4 text-lead md:text-lead-md text-gray-600 max-w-2xl mx-auto">
            Senang bertemu Anda secara langsung — datang dan rasakan sendiri perawatan
            kami
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          <div className="space-y-5">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200 animate-fade-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex gap-4">
                    <div className="w-11 h-11 bg-sage-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-sage-500" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <div className="text-body text-gray-600 leading-relaxed">
                        {item.content}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200/80 h-[400px] lg:h-full min-h-[400px] shadow-card">
            <iframe
              src="https://www.google.com/maps?q=Ruko+Grand+Galaxy+City+Blok+A1+No+12+Bekasi+Selatan&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta lokasi Klinik Estetika Cahaya di Grand Galaxy City, Bekasi Selatan"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}