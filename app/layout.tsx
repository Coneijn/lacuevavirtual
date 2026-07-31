import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Reemplaza esto con tu URL real cuando despliegues (ej: "https://mi-proyecto.vercel.app")
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lacuevavirtual.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "La Cueva Virtual — De la Sabana a la Inteligencia Artificial",
    template: "%s | La Cueva Virtual",
  },
  description:
    "Un ensayo interactivo sobre la evolución de la curiosidad humana, la topología del pensamiento y la co-evolución con la IA.",
  openGraph: {
    title: "La Cueva Virtual — De la Sabana a la Inteligencia Artificial",
    description:
      "Un ensayo interactivo sobre la evolución de la curiosidad humana, la topología del pensamiento y la co-evolución con la IA.",
    url: siteUrl,
    siteName: "La Cueva Virtual",
    locale: "es_MX",
    type: "website",
    // Configuración explícita que exige el scraper de WhatsApp:
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "La Cueva Virtual - De la Sabana a la Inteligencia Artificial",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Cueva Virtual — De la Sabana a la Inteligencia Artificial",
    description:
      "Un ensayo interactivo sobre la evolución de la curiosidad humana y la IA.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-amber-50/20 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}