import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Rincón Inexplorado | La Cueva Virtual",
  description: "Parece que te has adentrado demasiado en las sombras de la cueva.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-amber-50/20 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Resplandor ambiental de fondo (Estilo linterna en la oscuridad) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-xl mx-auto text-center space-y-8">
        {/* Etiqueta / Chip superior */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-mono uppercase tracking-widest">
          <span>⚠️ Error 404</span>
          <span>•</span>
          <span>Callejón Sin Salida</span>
        </div>

        {/* Número artístico y Título filosófico */}
        <div className="space-y-4">
          <h1 className="text-6xl sm:text-8xl font-serif font-extrabold text-amber-500/30 dark:text-amber-500/20 tracking-tighter select-none">
            IV • IV
          </h1>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-zinc-900 dark:text-white">
            Sombras en la pared de la cueva
          </h2>
        </div>

        {/* Descripción literaria */}
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
          Tu curiosidad te ha traído hasta un túnel inexplorado donde aún no existe ningún mapa digital. El camino que buscas ha cambiado de forma o nunca se escribió.
        </p>

        {/* Caja de cita metafórica */}
        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-zinc-900/60 border border-amber-500/20 text-xs sm:text-sm font-serif italic text-zinc-700 dark:text-zinc-300">
          «A veces, para comprender la luz de la fogata, primero hay que aprender a retroceder de la oscuridad.»
        </div>

        {/* Acción principal (CTA) */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-zinc-950 px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-98"
          >
            <span>← Regresar al Índice Principal</span>
          </Link>
        </div>
      </div>

      {/* Pie minimalista */}
      <footer className="absolute bottom-6 text-xs font-mono text-zinc-400 dark:text-zinc-600 tracking-widest uppercase">
        La Cueva Virtual • Sistema de Navegación
      </footer>
    </main>
  );
}