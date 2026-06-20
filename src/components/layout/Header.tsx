"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Booking", href: "#booking" },
  { label: "Kontak", href: "#kontak" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((i) => i.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-sm"
          : "bg-white/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <a
            href="#beranda"
            className="text-lg md:text-xl font-semibold text-gray-900 font-serif tracking-tight"
          >
            <span className="text-sage-700">Klinik Estetika</span> Cahaya
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi utama">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-small font-medium rounded-lg transition-all duration-150 ${
                    isActive
                      ? "text-sage-700 bg-sage-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#booking"
              className="ml-2 inline-flex items-center justify-center px-5 py-2 bg-sage-500 text-white text-small font-medium rounded-full hover:bg-sage-700 transition-all duration-150 shadow-sm hover:shadow-md"
            >
              Booking
            </a>
          </nav>

          <button
            className="md:hidden p-2 -mr-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-gray-200 bg-white shadow-elevated"
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi"
        >
          <nav className="flex flex-col px-5 py-5 gap-1.5" aria-label="Navigasi mobile">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-base font-medium px-4 py-3 rounded-xl transition-all duration-150 ${
                    isActive
                      ? "text-sage-700 bg-sage-50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={close}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#booking"
              className="inline-flex items-center justify-center px-4 py-3 bg-sage-500 text-white font-medium rounded-full hover:bg-sage-700 transition-colors mt-3"
              onClick={close}
            >
              Booking
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}