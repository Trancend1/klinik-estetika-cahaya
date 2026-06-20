import { HeroSection } from "@/components/sections/HeroSection";
import { KeunggulanSection } from "@/components/sections/KeunggulanSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { LayananSection } from "@/components/sections/LayananSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <KeunggulanSection />
      <AboutSection />
      <LayananSection />
      <TrustSection />
      <BookingSection />
      <ContactSection />
    </>
  );
}
