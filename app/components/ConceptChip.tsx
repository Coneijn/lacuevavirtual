"use client";

import React from "react";

interface ConceptChipProps {
  title: string;
  description: string;
}

export default function ConceptChip({ title, description }: ConceptChipProps) {
  return (
    <details className="group my-8 border-l-4 border-amber-500 bg-amber-50/60 dark:bg-zinc-900/80 p-4 rounded-r-lg transition-all shadow-sm">
      <summary className="flex items-center justify-between w-full text-left font-semibold text-amber-900 dark:text-amber-300 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2 pr-2">
          <span className="text-[10px] sm:text-xs bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded uppercase tracking-wider font-mono font-bold shrink-0">
            Concepto Clave
          </span>
          <span className="text-sm sm:text-base leading-snug">{title}</span>
        </span>
        
        {/* Ícono que rota automáticamente cuando el <details> se abre */}
        <span className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 font-mono shrink-0 ml-1 transition-transform duration-200 group-open:rotate-180">
          ▼
        </span>
      </summary>

      <div className="mt-3 text-sm text-zinc-700 dark:text-zinc-300 border-t border-amber-200/60 dark:border-zinc-800 pt-3 leading-relaxed">
        {description}
      </div>
    </details>
  );
}