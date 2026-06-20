import { MessageCircle, MapPin } from "lucide-react";
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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-white font-semibold font-serif text-xl mb-4">
                Klinik Estetika Cahaya
              </h3>
              <p className="text-gray-400 text-body leading-relaxed max-w-md text-pretty">
                Klinik kecantikan berbasis medis di Bekasi Selatan.
                Ditangani langsung oleh dokter spesialis kulit dan kelamin,
                dr. Nadia Kirana, SpKK.
              </p>
              <div className="flex gap-3 mt-6">
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-sage-700 hover:text-white transition-all duration-200"
                  aria-label="Hubungi via WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="https://instagram.com/klinikestetikacahaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-sage-700 hover:text-white transition-all duration-200"
                  aria-label="Instagram Klinik Estetika Cahaya"
                >
                  <InstagramIcon className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="https://maps.google.com/?q=Grand+Galaxy+City+Bekasi+Selatan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-sage-700 hover:text-white transition-all duration-200"
                  aria-label="Lihat lokasi di Google Maps"
                >
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4 text-small uppercase tracking-wider">
                Jam Operasional
              </h4>
              <ul className="text-body text-gray-400 space-y-2.5">
                <li>
                  <span className="text-gray-300">Senin—Jumat</span>
                  <br />
                  09:00 – 20:00
                </li>
                <li>
                  <span className="text-gray-300">Sabtu</span>
                  <br />
                  09:00 – 17:00
                </li>
                <li className="text-gray-500 text-small pt-1">
                  Minggu &amp; Libur Nasional: Tutup
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4 text-small uppercase tracking-wider">
                Navigasi
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Beranda", href: "#beranda" },
                  { label: "Tentang", href: "#tentang" },
                  { label: "Layanan", href: "#layanan" },
                  { label: "Testimoni", href: "#testimoni" },
                  { label: "Booking", href: "#booking" },
                  { label: "Kontak", href: "#kontak" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-body"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-small">
            &copy; {year} Klinik Estetika Cahaya. Hak cipta dilindungi.
          </p>
          <p className="text-gray-600 text-tiny">
            Klinik kecantikan berbasis medis — Bukan salon.
          </p>
        </div>
      </div>
    </footer>
  );
}