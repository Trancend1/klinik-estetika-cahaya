import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://klinikestetikacahaya.id";

export const metadata: Metadata = {
  title: {
    default: "Klinik Estetika Cahaya",
    template: "%s | Klinik Estetika Cahaya",
  },
  description:
    "Klinik kecantikan berbasis medis di Bekasi Selatan. Ditangani langsung dokter spesialis kulit, dr. Nadia Kirana, SpKK.",
  openGraph: {
    title: "Klinik Estetika Cahaya",
    description:
      "Klinik kecantikan berbasis medis di Bekasi Selatan. Ditangani langsung dokter spesialis kulit, dr. Nadia Kirana, SpKK.",
    url: siteUrl,
    siteName: "Klinik Estetika Cahaya",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/og/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Klinik Estetika Cahaya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klinik Estetika Cahaya",
    description:
      "Klinik kecantikan berbasis medis di Bekasi Selatan. Ditangani langsung dokter spesialis kulit.",
    images: [`${siteUrl}/images/og/og-image.svg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
