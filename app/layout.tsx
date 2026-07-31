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

export const metadata: Metadata = {
  title: "La Cueva Virtual — De la Sabana a la Inteligencia Artificial",
  description:
    "Un ensayo interactivo sobre la evolución de la curiosidad humana, la topología del pensamiento y la co-evolución con la IA.",
  openGraph: {
    title: "La Cueva Virtual",
    description:
      "Un ensayo interactivo sobre la evolución de la curiosidad humana y la IA.",
    type: "website",
    locale: "es_MX",
  },
};

// Configuración explícita de viewport para asegurar cálculos correctos de scroll en móviles
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
        {/* Tracker totalmente anónimo */}
        <Analytics />
      </body>
    </html>
  );
}