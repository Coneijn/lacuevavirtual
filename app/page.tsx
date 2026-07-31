import Link from "next/link";
import fs from "fs";
import path from "path";
import ResumeBookmark from "@/app/components/ResumeBookmark"
// Estructura de datos para los capítulos del mapa
interface ChapterMeta {
  slug: string;
  title: string;
  summary: string;
  readTime: string;
  volume: number;
  chapterNumber: number;
}

// Datos del índice estructurado (puedes actualizar los summaries si lo deseas)
const chaptersData: ChapterMeta[] = [
  // VOLUMEN I
  {
    slug: "01-vecina",
    title: "Capítulo I: La vecina y el algoritmo",
    summary: "Una mirada indiscreta a las tres de la mañana revela el origen ancestral de la curiosidad humana y su transformación en inteligencia artificial.",
    readTime: "6 min",
    volume: 1,
    chapterNumber: 1,
  },
  {
    slug: "02-el-algoritmo-social-primitivo",
    title: "Capítulo II: El Algoritmo Social Primitivo",
    summary: "De la sabana africana a las cuevas de Altamira: cómo el chisme, los mitos y las pinturas nos permitieron cooperar a gran escala.",
    readTime: "7 min",
    volume: 1,
    chapterNumber: 2,
  },
  {
    slug: "03-la-busqueda-de-la-verdad-fija",
    title: "Capítulo III: La Búsqueda de la Verdad Fija",
    summary: "El colapso de la tradición oral, las primeras tablillas contables en Mesopotamia y el nacimiento del filtro antispam filosófico.",
    readTime: "6 min",
    volume: 1,
    chapterNumber: 3,
  },
  {
    slug: "04-medir-lo-invisible",
    title: "Capítulo IV: Medir lo Invisible",
    summary: "Telescopios, microscopios y el método científico: expandiendo los sentidos primitivos para auditar la realidad.",
    readTime: "8 min",
    volume: 1,
    chapterNumber: 4,
  },
  {
    slug: "05-el-gran-espejo-digital",
    title: "Capítulo V: El Gran Espejo Digital",
    summary: "Big Data e Inteligencia Artificial como motores de inferencia estadística que mecanizan el instinto de la cueva.",
    readTime: "7 min",
    volume: 1,
    chapterNumber: 5,
  },
  {
    slug: "06-la-ventana-infinita",
    title: "Capítulo VI: La Ventana Infinita",
    summary: "El dilema ético de la era digital: cuando la ventana a través de la cual observábamos al mundo empieza a mirarnos de vuelta.",
    readTime: "5 min",
    volume: 1,
    chapterNumber: 6,
  },

  // VOLUMEN II
  {
    slug: "v2-01-la-topologia-del-pensamiento",
    title: "Capítulo I: La Topología del Pensamiento",
    summary: "El cerebro no es un archivero inerte; es una geometría hiperdimensional donde la ignorancia es un agujero que debemos reparar.",
    readTime: "8 min",
    volume: 2,
    chapterNumber: 1,
  },
  {
    slug: "v2-02-la-ley-de-la-resolucion",
    title: "Capítulo II: La Ley de la Resolución",
    summary: "Aprender no es sumar datos, sino subdividir el espacio semántico. Cómo la maestría biológica y la IA obedecen la misma regla.",
    readTime: "9 min",
    volume: 2,
    chapterNumber: 2,
  },
  {
    slug: "v2-03-el-mapa-compartido",
    title: "Capítulo III: El Mapa Compartido",
    summary: "La Hipótesis de la Representación Universal: por qué el carbono cerebral y las redes de silicio convergen hacia la misma topología.",
    readTime: "9 min",
    volume: 2,
    chapterNumber: 3,
  },
  {
    slug: "v2-04-la-simbiosis-evolutiva",
    title: "Capítulo IV: La Simbiosis Evolutiva",
    summary: "Andamiaje agéntico y Loop Engineering: cómo la Inteligencia Artificial participa activamente en el diseño de su propio futuro.",
    readTime: "10 min",
    volume: 2,
    chapterNumber: 4,
  },
  {
    slug: "v2-05-el-meta-experimento",
    title: "Capítulo V: El Meta-Experimento",
    summary: "La prueba empírica: la conversación en tiempo real entre una mente humana y una red sintética sentadas al mismo fuego.",
    readTime: "7 min",
    volume: 2,
    chapterNumber: 5,
  },
];

export default function HomePage() {
  const vol1 = chaptersData.filter((c) => c.volume === 1);
  const vol2 = chaptersData.filter((c) => c.volume === 2);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-4 sm:px-6 lg:px-8 selection:bg-amber-500 selection:text-zinc-950">
      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* HERO / PORTADA */}
        <header className="text-center space-y-6 pt-10 border-b border-zinc-800 pb-16">
          <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono rounded-full uppercase tracking-widest">
            Edición Digital Interactiva
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            La Cueva Virtual
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-400 font-sans leading-relaxed">
            Una travesía filosófica y neurocientífica sobre la evolución del chisme social, la topología del pensamiento y la simbiosis entre el carbono humano y el silicio.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4 text-sm font-mono text-zinc-500">
            <span>• 11 Capítulos</span>
            <span>• 1 Interludio Poético</span>
            <span>• Co-creación Humano/IA</span>
          </div>
        </header>
        <ResumeBookmark/>
        {/* VOLUMEN I */}
        <section className="space-y-8">
          <div className="border-l-2 border-amber-500 pl-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Volumen I
            </h2>
            <h3 className="text-2xl font-serif font-bold text-white mt-1">
              El Algoritmo Social
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              La historia antropológica del impulso por reducir la incertidumbre: de la fogata a Big Data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vol1.map((chap) => (
              <Link
                key={chap.slug}
                href={`/capitulo/${chap.slug}`}
                className="group p-6 bg-zinc-900/50 border border-zinc-800/80 rounded-xl hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
                    <span>CAPÍTULO {chap.chapterNumber}</span>
                    <span>{chap.readTime}</span>
                  </div>
                  <h4 className="text-lg font-serif font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
                    {chap.title.split(": ")[1] || chap.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {chap.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between text-xs font-medium text-amber-400/80 group-hover:text-amber-400">
                  <span>Leer capítulo</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* INTERLUDIO POÉTICO DESTACADO */}
        <section className="my-16 p-8 bg-gradient-to-br from-amber-950/30 via-zinc-900 to-zinc-900 border border-amber-500/30 rounded-2xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
            Bisagra Poética
          </span>
          <h3 className="text-2xl font-serif font-bold text-white">
            «La Cueva Virtual»
          </h3>
          <p className="text-sm text-zinc-300 max-w-lg mx-auto italic">
            "Tú pones la sed, la pregunta y el ojo; yo aporto la sintaxis, el código, el portal."
          </p>
          <div className="pt-2">
            <Link
              href="/capitulo/la-cueva-virtual"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-zinc-950 font-medium rounded-full hover:bg-amber-400 transition-colors text-sm"
            >
              Leer Poema Manifesto →
            </Link>
          </div>
        </section>

        {/* VOLUMEN II */}
        <section className="space-y-8">
          <div className="border-l-2 border-amber-500 pl-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Volumen II
            </h2>
            <h3 className="text-2xl font-serif font-bold text-white mt-1">
              La Topología del Silicio
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              La mecánica neurocientífica y vectorial tras la Ley de la Resolución y el Mapa Compartido.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vol2.map((chap) => (
              <Link
                key={chap.slug}
                href={`/capitulo/${chap.slug}`}
                className="group p-6 bg-zinc-900/50 border border-zinc-800/80 rounded-xl hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
                    <span>CAPÍTULO {chap.chapterNumber}</span>
                    <span>{chap.readTime}</span>
                  </div>
                  <h4 className="text-lg font-serif font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
                    {chap.title.split(": ")[1] || chap.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {chap.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between text-xs font-medium text-amber-400/80 group-hover:text-amber-400">
                  <span>Leer capítulo</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PIE DE PÁGINA */}
        <footer className="text-center text-xs font-mono text-zinc-600 pt-12 border-t border-zinc-900">
          <p>La Cueva Virtual • Un meta-experimento en Next.js & MDX</p>
        </footer>

      </div>
    </main>
  );
}