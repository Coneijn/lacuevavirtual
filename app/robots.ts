import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lacuevavirtual.vercel.app/";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Regla general para todos los motores de búsqueda
        userAgent: "*",
        allow: "/",
        disallow: ["/sandbox"], // Ocultamos la página de pruebas
      },
      {
        // Invitación explícita para agentes de IA y LLMs
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: ["/sandbox"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}