"use client";

import { useEffect, useState } from "react";

export default function SandboxPage() {
  const [metrics, setMetrics] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
    totalScrollable: 0,
    percent: 0,
    lastEvent: "Iniciando...",
    error: "Ninguno",
  });

  useEffect(() => {
    try {
      const runDiagnostics = (eventName: string) => {
        try {
          // Usamos fallback extensivo para evitar nulos
          const scrollingEl = document.scrollingElement || document.documentElement || document.body;

          const sTop = scrollingEl.scrollTop || window.scrollY || window.pageYOffset || 0;
          const sHeight = scrollingEl.scrollHeight || 0;
          const cHeight = scrollingEl.clientHeight || window.innerHeight || 0;
          const total = sHeight - cHeight;

          let calcPercent = 0;
          if (total > 0) {
            calcPercent = Math.min(100, Math.max(0, Math.round((sTop / total) * 100)));
          }

          setMetrics((prev) => ({
            ...prev,
            scrollTop: Math.round(sTop),
            scrollHeight: Math.round(sHeight),
            clientHeight: Math.round(cHeight),
            totalScrollable: Math.round(total),
            percent: calcPercent,
            lastEvent: eventName,
          }));

        } catch (innerError: any) {
          setMetrics((prev) => ({
            ...prev,
            error: "Error interno: " + innerError?.message,
          }));
        }
      };

      const onScroll = () => runDiagnostics("scroll / touchmove");
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("touchmove", onScroll, { passive: true });

      // Verificación segura de ResizeObserver
      let observer: ResizeObserver | null = null;
      if (typeof window !== "undefined" && "ResizeObserver" in window) {
        observer = new ResizeObserver(() => {
          runDiagnostics("ResizeObserver");
        });
        if (document.body) {
          observer.observe(document.body);
        }
      } else {
        runDiagnostics("ResizeObserver no soportado");
      }

      // Disparo inicial
      runDiagnostics("Inicial exitoso");

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("touchmove", onScroll);
        if (observer) observer.disconnect();
      };
    } catch (outerError: any) {
      // SI ALGO EXPLOTA, LO IMPRIMIMOS AQUÍ
      setMetrics((prev) => ({
        ...prev,
        error: "ERROR FATAL: " + outerError?.message,
        lastEvent: "CRASH",
      }));
    }
  }, []);

  return (
    <div className="min-h-[3000px] bg-zinc-950 text-white p-4 font-mono">
      {/* HUD DE DIAGNÓSTICO MATEMÁTICO */}
      <div className="fixed top-4 left-2 right-2 z-50 bg-black/95 border-2 border-amber-500 rounded-xl p-4 shadow-2xl text-xs space-y-3">
        
        {/* BLOQUE DE ERRORES VISIBLES */}
        {metrics.error !== "Ninguno" && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-2 rounded text-[10px] font-bold break-words">
            🚨 {metrics.error}
          </div>
        )}

        <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
          <span className="font-bold text-amber-400">
            RADIOGRAFÍA CON TRY/CATCH
          </span>
          <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px]">
            Evento: {metrics.lastEvent}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">scrollTop:</span>
            <span className="text-base font-bold text-green-400">{metrics.scrollTop} px</span>
          </div>

          <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">scrollHeight:</span>
            <span className="text-base font-bold text-blue-400">{metrics.scrollHeight} px</span>
          </div>

          <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">clientHeight:</span>
            <span className="text-base font-bold text-purple-400">{metrics.clientHeight} px</span>
          </div>

          <div className="bg-zinc-900 p-2 rounded border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">totalScrollable:</span>
            <span className="text-base font-bold text-amber-400">{metrics.totalScrollable} px</span>
          </div>
        </div>
      </div>
    </div>
  );
}