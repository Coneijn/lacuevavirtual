import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lacuevavirtual.vercel.app/";

// Secuencia exacta de los slugs de tus capítulos
const READING_SEQUENCE = [
  "01-vecina",
  "02-el-algoritmo-social-primitivo",
  "03-la-busqueda-de-la-verdad-fija",
  "04-medir-lo-invisible",
  "05-el-gran-espejo-digital",
  "06-la-ventana-infinita",
  "la-cueva-virtual",
  "v2-01-la-topologia-del-pensamiento",
  "v2-02-la-ley-de-la-resolucion",
  "v2-03-el-mapa-compartido",
  "v2-04-la-simbiosis-evolutiva",
  "v2-05-el-meta-experimento",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Página principal (Índice)
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];

  // 2. Rutas dinámicas para cada capítulo
  const chapterRoutes: MetadataRoute.Sitemap = READING_SEQUENCE.map((slug) => ({
    url: `${siteUrl}/capitulo/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...routes, ...chapterRoutes];
}