import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import ConceptChip from "@/app/components/ConceptChip";
import ReadingProgress from "@/app/components/ReadingProgress";
const components = {
    ConceptChip,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        {...props}
        className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-white mt-12 mb-6 tracking-tight border-b border-zinc-200 dark:border-zinc-800 pb-2"
      />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        {...props}
        className="text-xl sm:text-2xl font-serif font-bold text-amber-900 dark:text-amber-400 mt-10 mb-4 tracking-tight"
      />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        {...props}
        className="mb-6 leading-relaxed text-zinc-800 dark:text-zinc-300"
      />
    ),
    // Con el signo ! forzamos que Tailwind venza la especificidad del plugin 'prose'
    a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        {...props}
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="!font-medium !text-amber-600 dark:!text-amber-400 !underline !decoration-amber-500/50 !underline-offset-4 hover:!text-amber-500 dark:hover:!text-amber-300 hover:!decoration-amber-500 transition-colors"
      >
        {children}
      </a>
    ),
    hr: () => (
      <hr className="my-10 border-zinc-200 dark:border-zinc-800" />
    ),
  };

// 1. Secuencia ordenada exacta por SLUG de los archivos .mdx
const READING_SEQUENCE = [
  // VOLUMEN 1
  "01-vecina",
  "02-el-algoritmo-social-primitivo",
  "03-la-busqueda-de-la-verdad-fija",
  "04-medir-lo-invisible",
  "05-el-gran-espejo-digital",
  "06-la-ventana-infinita",
  
  // INTERLUDIO
  "la-cueva-virtual",
  
  // VOLUMEN 2
  "v2-01-la-topologia-del-pensamiento",
  "v2-02-la-ley-de-la-resolucion",
  "v2-03-el-mapa-compartido",
  "v2-04-la-simbiosis-evolutiva",
  "v2-05-el-meta-experimento",
];

const CONTENT_FOLDERS = ["volumen-1", "volumen-2", "interludio"];

// Modifica la función de lectura para calcular las palabras
async function getChapterContent(slug: string) {
  let filePath: string | null = null;

  for (const folder of CONTENT_FOLDERS) {
    const tempPath = path.join(process.cwd(), "content", folder, `${slug}.mdx`);
    if (fs.existsSync(tempPath)) {
      filePath = tempPath;
      break;
    }
  }

  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  let frontmatter: Record<string, string> = {};
  let content = fileContent;

  if (match) {
    const frontmatterBlock = match[1];
    content = fileContent.replace(frontmatterRegex, "").trim();

    frontmatterBlock.split("\n").forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length) {
        frontmatter[key.trim()] = valueParts
          .join(":")
          .trim()
          .replace(/^['"]|['"]$/g, "");
      }
    });
  }

  // CALCULO DINÁMICO DE TIEMPO DE LECTURA
  const words = content.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
  const calculatedReadTime = `${readingTimeMinutes} min de lectura`;

  return { 
    frontmatter, 
    content, 
    readTime: frontmatter.readTime || calculatedReadTime 
  };
}

export async function generateStaticParams() {
  const allParams: { slug: string }[] = [];

  for (const folder of CONTENT_FOLDERS) {
    const dirPath = path.join(process.cwd(), "content", folder);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files
        .filter((file) => file.endsWith(".mdx"))
        .forEach((file) => {
          allParams.push({
            slug: file.replace(/\.mdx$/, ""),
          });
        });
    }
  }

  return allParams;
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getChapterContent(slug);

  if (!data) {
    notFound();
  }

  const { frontmatter, content } = data;

  // 2. Calcular cuál es el slug del capítulo siguiente
  const currentIndex = READING_SEQUENCE.indexOf(slug);
  const nextSlug =
    currentIndex !== -1 && currentIndex < READING_SEQUENCE.length - 1
      ? READING_SEQUENCE[currentIndex + 1]
      : null;

  // 3. Cargar los datos del capítulo siguiente para obtener su título real
  const nextChapterData = nextSlug ? await getChapterContent(nextSlug) : null;

  return (
    <main className="min-h-screen bg-amber-50/20 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
     <ReadingProgress slug={slug} title={frontmatter.title} />
      <article className="max-w-2xl mx-auto">
        {/* Cabecera del Capítulo / Poema */}
        <header className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3">
            <span>
              {frontmatter.volume && frontmatter.volume !== "0"
                ? `Volumen ${frontmatter.volume}`
                : "Interludio Poético"}
            </span>
            <span>{frontmatter.readTime || "5 min de lectura"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            {frontmatter.title}
          </h1>

          {frontmatter.summary && (
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed italic">
              {frontmatter.summary}
            </p>
          )}
        </header>

        {/* Cuerpo del Ensayo / Poema */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none 
          prose-headings:font-serif prose-headings:font-semibold 
          prose-p:leading-relaxed prose-p:text-zinc-800 dark:prose-p:text-zinc-300
          prose-blockquote:border-l-amber-500 prose-blockquote:bg-amber-50/50 dark:prose-blockquote:bg-zinc-900/50 
          prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:rounded-r
          prose-a:text-amber-600 dark:prose-a:text-amber-400
          text-left [hyphens:auto] [lang=es]"
        >
          <MDXRemote source={content} components={components} />
        </div>

        {/* Pie de página con Navegación Secuencial */}
        <footer className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-sans">
          <Link
            href="/"
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            ← Volver al Índice
          </Link>

          {/* Renderizado dinámico del capítulo siguiente */}
          {nextSlug && nextChapterData && (
            <Link
              href={`/capitulo/${nextSlug}`}
              className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-5 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity text-xs sm:text-sm text-center"
            >
              <span>Siguiente: {nextChapterData.frontmatter.title}</span>
              <span>→</span>
            </Link>
          )}
        </footer>
      </article>
    </main>
  );
}