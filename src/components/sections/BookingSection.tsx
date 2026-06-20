"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281111111111";

interface FormData {
  nama: string;
  nomor_wa: string;
  tanggal: string;
  keluhan: string;
}

const initialForm: FormData = {
  nama: "",
  nomor_wa: "",
  tanggal: "",
  keluhan: "",
};

export function BookingSection() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData(initialForm);
      } else {
        const data = await res.json();
        setError(data.error || "Gagal mengirim booking. Silakan coba lagi.");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section id="booking" background="sage">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 max-w-lg mx-auto">
            <span className="inline-block px-4 py-1.5 bg-white/80 rounded-full text-tiny font-medium text-sage-700 mb-5">
              Booking
            </span>
            <h2 className="font-serif text-h1 md:text-h1-md lg:text-h1-lg text-gray-900 text-balance">
              Ingin Kulit Lebih Sehat?{" "}
              <span className="text-sage-700">Mulai dengan Konsultasi.</span>
            </h2>
            <p className="mt-4 text-lead md:text-lead-md text-gray-600">
              Isi form di bawah dan kami akan menghubungi Anda untuk konfirmasi
              jadwal.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white border border-sage-200/80 rounded-2xl p-10 md:p-12 text-center shadow-card animate-scale-in">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-sage-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h3 className="text-h2 text-gray-900 mb-3">
                Permintaan Booking Terkirim!
              </h3>
              <p className="text-body text-gray-600 max-w-md mx-auto">
                Tim kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi
                jadwal dalam 1x24 jam.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6 bg-white border border-sage-200/80 rounded-2xl p-8 md:p-10 shadow-card">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-small text-red-700">
                  {error}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="booking-nama"
                    className="block text-small font-medium text-gray-700 mb-1.5"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="booking-nama"
                    name="nama"
                    type="text"
                    required
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-body focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all duration-150"
                    placeholder="Masukkan nama lengkap Anda"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-wa"
                    className="block text-small font-medium text-gray-700 mb-1.5"
                  >
                    Nomor WhatsApp
                  </label>
                  <input
                    id="booking-wa"
                    name="nomor_wa"
                    type="tel"
                    required
                    value={formData.nomor_wa}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-body focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all duration-150"
                    placeholder="Contoh: 628123456789"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-tanggal"
                  className="block text-small font-medium text-gray-700 mb-1.5"
                >
                  Tanggal Preferensi
                </label>
                <input
                  id="booking-tanggal"
                  name="tanggal"
                  type="date"
                  required
                  value={formData.tanggal}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-body focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all duration-150"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-keluhan"
                  className="block text-small font-medium text-gray-700 mb-1.5"
                >
                  Keluhan Singkat
                </label>
                <textarea
                  id="booking-keluhan"
                  name="keluhan"
                  rows={3}
                  value={formData.keluhan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-body focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all duration-150 resize-y"
                  placeholder="Ceritakan kondisi kulit Anda secara singkat..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-sage-600 text-white font-medium text-body rounded-full hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:ring-offset-2 transition-all duration-150 inline-flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm hover:shadow-md"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
                {submitting ? "Mengirim..." : "Kirim Permintaan Booking"}
              </button>
            </form>
          )}

          <div className="text-center mt-8">
            <p className="text-small text-gray-500 mb-3">Atau hubungi langsung</p>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Halo Klinik Estetika Cahaya, saya ingin booking konsultasi...")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-sage-700 font-medium rounded-full border-2 border-sage-200 hover:border-sage-400 hover:bg-sage-50 transition-all duration-150"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Tanya dulu via WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}